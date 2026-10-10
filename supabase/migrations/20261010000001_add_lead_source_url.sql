-- ==============================================================================
-- Migration: Add lead_source_url to all enquiry tables
-- ==============================================================================

ALTER TABLE public.contact_enquiries ADD COLUMN IF NOT EXISTS lead_source_url TEXT;
ALTER TABLE public.bulk_enquiries ADD COLUMN IF NOT EXISTS lead_source_url TEXT;
ALTER TABLE public.quote_requests ADD COLUMN IF NOT EXISTS lead_source_url TEXT;
ALTER TABLE public.cart_orders ADD COLUMN IF NOT EXISTS lead_source_url TEXT;
