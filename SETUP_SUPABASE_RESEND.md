# NOVA GRAIN — Supabase & Resend Backend Integration Guide

This guide details how to configure **Supabase** (PostgreSQL persistence & Row Level Security) and **Resend** (transactional emails) for all 6 website forms across the NOVA GRAIN platform.

---

## 1. Architecture Overview

Every form on the website submits directly to dedicated, secure Next.js server Route Handlers:

| Form Name | Page / Component | Endpoint | Supabase Table |
|---|---|---|---|
| **Workshop Trial & B2B Inquiry** | `src/app/page.tsx` | `/api/enquiries/bulk` | `public.bulk_enquiries` |
| **Atelier General Contact** | `src/app/contact/page.tsx` | `/api/enquiries/contact` | `public.contact_enquiries` |
| **Industrial Bulk Procurement** | `src/app/bulk-enquiry/page.tsx` | `/api/enquiries/bulk` | `public.bulk_enquiries` |
| **Product & Custom Workshop Quote** | `src/components/QuoteRequestModal.tsx` | `/api/enquiries/quote` | `public.quote_requests` |
| **Full Cart Staged Checkout** | `src/app/cart/page.tsx` | `/api/enquiries/cart` | `public.cart_orders` |
| **Slide-over Cart Drawer Quick Quote** | `src/components/CartDrawer.tsx` | `/api/enquiries/cart` | `public.cart_orders` |

### Security Measures:
- **Service Role Server Access**: Database writes use the `SUPABASE_SERVICE_ROLE_KEY` strictly inside server Route Handlers. No secrets or service keys are exposed to the browser client.
- **Strict Row Level Security (RLS)**: Anonymous visitors have zero read permissions (`REVOKE ALL FROM anon, authenticated`). Customer submissions cannot be accessed or scraped by public visitors.
- **HTML Injection Defense**: All user-provided fields are sanitized and HTML-escaped (`escapeHtml()`) before being injected into transactional email templates.
- **Spam & Abuse Protection**:
  - In-memory rate limiting (max 5 requests per minute per IP address).
  - Silent honeypot trap fields (`honeypot`, `company_title_verification`, `fax_number_verification`).
  - RFC 5322 email syntax validation and maximum length enforcement.
- **Fault-Tolerant Email Handling**: If an email provider error occurs, the submission remains securely preserved in Supabase with `email_notification_status = 'failed'` for auditing/retries.

---

## 2. Supabase Setup

### Step 2.1: Create a Supabase Project
1. Log in to [supabase.com](https://supabase.com) and click **"New Project"**.
2. Set a project name (e.g., `novagrain-finishes`), database password, and choose your preferred hosting region.
3. Once the database is provisioned, go to **Project Settings** ➔ **API**.
4. Copy the following values:
   - **Project URL** (e.g., `https://yourproject.supabase.co`)
   - **`anon` `public` key**
   - **`service_role` secret key** (Keep this confidential; never commit it to Git).

### Step 2.2: Apply Database Migration
1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Click **"New query"**.
3. Copy the entire contents of [`supabase/migrations/20261010000000_create_enquiries_schema.sql`](file:///c:/src/vorya-tung-oil/supabase/migrations/20261010000000_create_enquiries_schema.sql).
4. Paste into the SQL Editor and click **"Run"**.
5. Verify in the **Table Editor** that the 4 tables have been created:
   - `contact_enquiries`
   - `bulk_enquiries`
   - `quote_requests`
   - `cart_orders`

---

## 3. Resend Email Setup

### Step 3.1: Generate Resend API Key
1. Sign up or log in to [resend.com](https://resend.com).
2. Go to **API Keys** and click **"Create API Key"**.
3. Name it `novagrain-production`, set permissions to **Full Access**, and copy the generated key (`re_...`).

### Step 3.2: Configure Sender Domain
1. In Resend, go to **Domains** ➔ **"Add Domain"**.
2. Enter your custom domain (e.g., `novagrain.com`).
3. Add the provided DNS records (DKIM, SPF, MX) to your domain registrar (Cloudflare, GoDaddy, Namecheap, etc.).
4. Click **"Verify DNS Records"**.
5. **Development Testing Note**: Before your custom domain DNS propagates, Resend allows immediate testing using the default sandbox sender:
   ```env
   RESEND_FROM_EMAIL=NOVA GRAIN Finishes <onboarding@resend.dev>
   ```
   *(Note: With `onboarding@resend.dev`, Resend sends emails exclusively to the email address registered with your Resend account).*

---

## 4. Environment Variables Configuration

Create a file named `.env.local` in the project root (`c:\src\vorya-tung-oil\.env.local`):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Resend Configuration
RESEND_API_KEY=re_123456789abcdef...
RESEND_FROM_EMAIL=NOVA GRAIN Finishes <onboarding@resend.dev>
ADMIN_NOTIFICATION_EMAIL=deepusahani08@gmail.com
```

> **Security Note**: `.env.local` is already included in `.gitignore` and will never be committed to Git.

---

## 5. Deployment on Vercel

When deploying to [Vercel](https://vercel.com):
1. Navigate to your project settings in the Vercel dashboard: **Settings** ➔ **Environment Variables**.
2. Add each of the variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `ADMIN_NOTIFICATION_EMAIL`
3. Select environments: **Production**, **Preview**, and **Development**.
4. Redeploy the project.

---

## 6. How to Test Each Form

### 1. Homepage Workshop Trial Form
1. Visit `http://localhost:3000/#b2b-procurement` (or scroll to Section 10).
2. Enter contact name, business name, valid email, and project scope.
3. Click **"Submit Batch Enquiry"**.
4. Confirm loading indicator appears and success banner displays reference ID (`NG-BLK-xxxxxx`).
5. Verify record appears in Supabase `public.bulk_enquiries` table with `source = 'homepage_b2b'`.

### 2. Contact Page Form
1. Visit `http://localhost:3000/contact`.
2. Fill in Name, Email, Topic, and Message.
3. Click **"Send Message"**.
4. Confirm reference ID (`NG-CNT-xxxxxx`) is displayed.
5. Verify record appears in Supabase `public.contact_enquiries`.

### 3. Dedicated Bulk Procurement Form
1. Visit `http://localhost:3000/bulk-enquiry`.
2. Enter workshop details, volume tier, and specifications.
3. Click **"Request Quotation"**.
4. Verify record appears in Supabase `public.bulk_enquiries` with `source = 'bulk_page'`.

### 4. Custom Workshop Quote Request Modal
1. Visit `http://localhost:3000/shop`.
2. Click **"Request Custom Workshop Quote"** (or click quote buttons on product cards).
3. Fill in contact details and submit.
4. Verify record in Supabase `public.quote_requests`.

### 5. Full Cart Staged Checkout
1. Add products to the cart from `http://localhost:3000/shop/pure-tung-oil`.
2. Go to `http://localhost:3000/cart`.
3. Complete fulfillment details (Name, Email, Delivery Destination).
4. Click **"Stage Formal Order & Quotation"**.
5. Verify order record in Supabase `public.cart_orders` with full item breakdown in the `items` JSONB column.

### 6. Cart Drawer Quick Quote
1. Click the Shopping Bag icon in the header on any page.
2. Enter email in the drawer footer.
3. Click **"Request Formal Batch Quote"**.
4. Verify record in Supabase `public.cart_orders` with `submission_type = 'drawer_quick_quote'`.

---

## 7. Troubleshooting Guide

| Issue | Cause | Solution |
|---|---|---|
| `Database registration failed (500)` | Supabase credentials missing or invalid | Check `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. Ensure SQL migration was applied in Supabase SQL editor. |
| `Too many submission attempts (429)` | IP rate limit triggered | The system limits submissions to 5 per minute per IP. Wait 60 seconds before submitting again. |
| Email not received by admin / customer | Resend API key or sandbox restriction | 1) Verify `RESEND_API_KEY`. 2) If using `onboarding@resend.dev`, Resend only delivers to your registered account email. 3) To send to arbitrary customer addresses, verify your domain in Resend. |
| Form says "Unable to reach server" | Local dev server offline | Ensure Next.js is running via `npm run dev` on port 3000. |
