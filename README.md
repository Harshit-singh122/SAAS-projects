# SAAS-projects
# SAAS Project — AI Invoice

This repository contains a full-stack SaaS example for generating and managing AI-assisted invoices. It includes a `backend` (Express + Node) and a `frontend` (React + Vite) application.

## Contents
- `backend/` — Express API, MongoDB models, routes, and server entrypoint.
- `frontend/` — React app built with Vite, Tailwind, and Clerk for auth.

## Quickstart
Requirements: Node.js (18+ recommended), npm or yarn, and MongoDB (local or Atlas).

1. Clone the repo and open project root:

```bash
git clone <your-repo-url>
cd "SAAS project"
```

2. Backend setup

```bash
cd backend
npm install
# create a .env file (see Environment variables below)
npm run start
```

3. Frontend setup

```bash
cd frontend
npm install
# create frontend/.env file (see Environment variables below)
npm run dev
```

4. Build for production (frontend)

```bash
cd frontend
npm run build
```

## Environment variables
Do NOT commit secret keys. Create `.env` files locally with the variables below.

- Backend (`backend/.env`):
  - `CLERK_PUBLISHABLE_KEY` — Clerk publishable key
  - `CLERK_SECRET_KEY` — Clerk secret key
  - `GEMINI_API_KEY` — API key for the Gemini/Generative AI integration

- Frontend (`frontend/.env`):
  - `VITE_CLERK_PUBLISHABLE_KEY` — the Clerk publishable key exposed to the browser (prefixed with `VITE_` for Vite)

Example `frontend/.env`:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

## Scripts
- Backend: `npm run start` (uses `nodemon server.js`)
- Frontend: `npm run dev`, `npm run build`, `npm run preview`

## Vercel deployment notes
- This project uses client-side routing (React Router). To avoid 404s on refresh, a rewrite is required. A `frontend/vercel.json` with a rewrite to `/index.html` is included.
- Push your `frontend` build or connect the GitHub repo in Vercel and set the root to the repository root. Configure the build command for the frontend as:

```
cd frontend && npm install && npm run build
```

and the output directory to `frontend/dist`.

Environment variables should be added in the Vercel dashboard (do NOT add secrets to committed files).

## Common troubleshooting
- Case-sensitive imports: development on macOS is case-insensitive, but Vercel/Linux is case-sensitive. Ensure imports match file names exactly (e.g. `Home.jsx`).
- Absolute local paths: avoid absolute paths like `/Users/.../frontend/src/pages/Dashboard.jsx`; use relative imports instead.
- NOT_FOUND on Vercel: usually caused by missing build output, wrong output directory, missing rewrite, or runtime errors during build. Check the Vercel build logs and fix the first error reported.

## Project structure overview
- `backend/server.js` — server entrypoint
- `backend/routes/` — API routes
- `frontend/src/` — React source
- `frontend/vercel.json` — SPA rewrite config

## Security
- Never commit `.env` files or secret keys. Add `.env` to `.gitignore` (already present in this repo).

## Next steps / Improvements
- Add a `Dockerfile` for both services for consistent deployment.
- Add CI (GitHub Actions) to run linting and build on PRs.
- Harden authentication and validate all inputs on backend routes.

---
If you'd like, I can also:
- add a short `CONTRIBUTING.md` and `LICENSE` file
- create a tested GitHub Actions workflow to build frontend and backend

Happy to tailor the README for a public GitHub repo (remove internal notes, add badges, etc.).
# SAAS-projects
