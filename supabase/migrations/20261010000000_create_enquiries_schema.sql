-- ==============================================================================
-- NOVA GRAIN - Supabase Database Schema Migration
-- Migration: 20261010000000_create_enquiries_schema.sql
-- Description: Creates persistent storage tables for all 6 website forms:
--   1. contact_enquiries (Contact Page)
--   2. bulk_enquiries (Homepage B2B section & Dedicated Bulk Procurement Page)
--   3. quote_requests (Product Cards & Custom Workshop Quote Modal)
--   4. cart_orders (Full Cart Page & Slide-over Cart Drawer)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. CONTACT ENQUIRIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL DEFAULT 'General Technical Inquiry',
    timber_species VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    email_notification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    customer_acknowledgement_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    email_error_message TEXT,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance and querying
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_email ON public.contact_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries(created_at DESC);

-- ==============================================================================
-- 2. BULK ENQUIRIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bulk_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(50) NOT NULL DEFAULT 'bulk_page', -- 'bulk_page' | 'homepage_b2b'
    name VARCHAR(150) NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    customer_type VARCHAR(100) NOT NULL,
    estimated_quantity VARCHAR(100) NOT NULL,
    intended_application VARCHAR(150) NOT NULL,
    delivery_timeline VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    email_notification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    customer_acknowledgement_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    email_error_message TEXT,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bulk_enquiries_email ON public.bulk_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_bulk_enquiries_source ON public.bulk_enquiries(source);
CREATE INDEX IF NOT EXISTS idx_bulk_enquiries_status ON public.bulk_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_bulk_enquiries_created_at ON public.bulk_enquiries(created_at DESC);

-- ==============================================================================
-- 3. QUOTE REQUESTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_interest VARCHAR(200) NOT NULL DEFAULT 'Pure Tung Oil',
    name VARCHAR(150) NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    customer_type VARCHAR(100) NOT NULL,
    estimated_quantity VARCHAR(100) NOT NULL,
    intended_application VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    email_notification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    customer_acknowledgement_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    email_error_message TEXT,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON public.quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_product ON public.quote_requests(product_interest);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests(created_at DESC);

-- ==============================================================================
-- 4. CART ORDERS / QUOTE ALLOCATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.cart_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_ref VARCHAR(50) NOT NULL UNIQUE,
    submission_type VARCHAR(50) NOT NULL DEFAULT 'full_checkout', -- 'full_checkout' | 'drawer_quick_quote'
    name VARCHAR(150),
    company VARCHAR(200),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(30),
    country VARCHAR(100) DEFAULT 'United States',
    notes TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_units INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    email_notification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    customer_acknowledgement_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    email_error_message TEXT,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cart_orders_ref ON public.cart_orders(order_ref);
CREATE INDEX IF NOT EXISTS idx_cart_orders_email ON public.cart_orders(email);
CREATE INDEX IF NOT EXISTS idx_cart_orders_status ON public.cart_orders(status);
CREATE INDEX IF NOT EXISTS idx_cart_orders_created_at ON public.cart_orders(created_at DESC);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Security: Anonymous public users MUST NEVER read submissions.
-- Only the server-side service role key (or authenticated dashboard admins) can query or modify.
-- ==============================================================================

-- Enable Row Level Security on all tables
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_orders ENABLE ROW LEVEL SECURITY;

-- Revoke all public access by default
REVOKE ALL ON public.contact_enquiries FROM anon, authenticated;
REVOKE ALL ON public.bulk_enquiries FROM anon, authenticated;
REVOKE ALL ON public.quote_requests FROM anon, authenticated;
REVOKE ALL ON public.cart_orders FROM anon, authenticated;

-- Allow service_role full access (for secure Next.js server route handlers)
GRANT ALL ON public.contact_enquiries TO service_role;
GRANT ALL ON public.bulk_enquiries TO service_role;
GRANT ALL ON public.quote_requests TO service_role;
GRANT ALL ON public.cart_orders TO service_role;

-- Optional: If anon insert is ever needed directly, restrict it strictly to INSERT only:
-- (Our server API route handlers use SUPABASE_SERVICE_ROLE_KEY to insert safely)
CREATE POLICY "Service role full access on contact_enquiries"
    ON public.contact_enquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access on bulk_enquiries"
    ON public.bulk_enquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access on quote_requests"
    ON public.quote_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access on cart_orders"
    ON public.cart_orders
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Comment documentation
COMMENT ON TABLE public.contact_enquiries IS 'Inquiries submitted through the /contact page';
COMMENT ON TABLE public.bulk_enquiries IS 'Trade and volume requests submitted through /bulk-enquiry and homepage B2B section';
COMMENT ON TABLE public.quote_requests IS 'Custom workshop quote requests submitted through QuoteRequestModal';
COMMENT ON TABLE public.cart_orders IS 'Staged cart orders and drawer batch quote inquiries';
