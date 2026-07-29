# Manuel Data Plug

Premium digital products platform for MTN, Telecel & AirtelTigo data bundles, AFA registration, and airtime.

**Tagline:** Fast • Affordable • Reliable Data packages

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Zustand (checkout)
- TanStack Query
- Recharts
- Prisma + PostgreSQL (schema ready)
- NextAuth-ready schema
- PWA manifest + SEO

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Demo promo codes

- `MANUEL10` — GHS 10 off
- `DATA5` — GHS 5 off

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
- `npx prisma generate` — generate Prisma client
- `npx prisma migrate dev` — run migrations (requires DATABASE_URL)

## Project structure

```
src/
  app/           # Routes (home, store, auth, admin, legal)
  components/    # UI, layout, home, store, admin
  lib/           # Utils + seed/demo data
  store/         # Client state (checkout cart)
prisma/          # Database schema
```

## Notes

UI and flows are fully built with demo data. Connect PostgreSQL, Redis, Resend, Cloudinary, and payment gateways via `.env` to go live.
