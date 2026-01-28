## Shree Radhagovind Vidyamandir, Ninat — Website

Modern, fast, mobile-first school website built with **Next.js App Router** + **Tailwind CSS**, with a lightweight **/admin** panel for updating:

- Notices / Announcements (CRUD)
- Admissions text
- Contact details

All backend logic lives inside Next.js Route Handlers and is deployable on the **Vercel free tier**.

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Environment variables

See `ENVIRONMENT.md` for the full list.

Create `.env.local` and set at least:

- `MONGODB_URI`
- `AUTH_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

### 3) Run

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin

- Admin URL: `/admin`
- Login URL: `/admin/login`

## Deployment (Vercel)

- Add the environment variables in Vercel (same names as in `ENVIRONMENT.md`)
- Deploy normally (no custom server required)

