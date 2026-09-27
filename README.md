# Weverse Comment Manager — Starter

A responsive static dashboard prototype for organizing Weverse comment targets, five reply templates, schedules, and local activity history.

## Run it

No Node.js is required for this starter.

1. Extract the ZIP.
2. Open `index.html` in your browser.
3. Everything in the demo dashboard works locally using browser `localStorage`.

## GitHub

Create a repository, then upload all files/folders from this project.

For GitHub Pages:
- Repository → Settings → Pages
- Deploy from branch
- Select `main` and `/root`
- Save

## Important integration note

This starter deliberately does **not** collect a Weverse password, imitate the Weverse app, or claim that live Weverse posting is connected.

The UI/data layer is ready for an officially authorized integration later:
- account connection
- live community/post retrieval
- live comment retrieval
- selecting five different comment targets
- posting a permitted reply
- reading permitted engagement data
- server-side authentication/token handling

Do not put a real access token or secret in `app.js` or other browser-side files. If an authorized API becomes available, use a backend/serverless endpoint for secrets.

## Current demo behavior

- Dashboard navigation works.
- Five comment templates can be edited and saved.
- Five different target comments can be selected.
- Post-comment and reply-to-comment screens are available.
- Schedule settings can be saved locally.
- Review modal works.
- "Run Demo / Record Activity" records local activity without sending anything to Weverse.
- Activity log persists in browser storage.
- Mobile sidebar and responsive layout work.

## Suggested production stack

Frontend: Next.js or React
Backend: server/API routes
Database: Supabase/Postgres
Auth: only an official Weverse authorization mechanism, if available
Secrets: server-side environment variables
Hosting: Vercel

Before implementing live posting, verify the current Weverse developer/API terms and permissions for your intended account actions.
