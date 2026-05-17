## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and locally in your `.env.local`).

### Required

- `NEXT_PUBLIC_SITE_URL`
  - Example: `http://localhost:3000` (local) / `https://your-domain.com` (prod)
- `AUTH_SECRET`
  - A long random secret used to sign the admin session cookie
- `ADMIN_USERNAME`
  - Admin username (e.g. `admin`)
- `ADMIN_PASSWORD`
  - Admin password (use a strong password)
- `MONGODB_URI`
  - Mongo connection string (Atlas recommended)

### Required for leaving certificate uploads (production)

- `BLOB_READ_WRITE_TOKEN`
  - **Vercel Blob** token for admin PDF uploads. On Vercel: **Storage → Create Blob store → Connect to project** (adds this variable automatically).
  - Without it, uploads work locally (`public/leaving-certificates/`) but **fail on Vercel** because the server filesystem is read-only.

### Optional

- `MONGODB_DB`
  - Database name, e.g. `srvm`


