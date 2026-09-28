# Weverse Comment Manager — Callback Ready

This rebuild fixes the misleading login UX.

Flow:
1. Our app starts an authorization request.
2. An authorized Weverse provider would handle login/consent.
3. Provider redirects to `/auth/callback`.
4. Server validates the callback and creates a local session.
5. Dashboard can then display permitted account data.

IMPORTANT: the current static starter cannot invent an OAuth endpoint or claim that the normal Weverse login has connected this app. The official login button opens Weverse only. The callback route is reserved for a documented/authorized provider integration.

Do not collect a Weverse password, browser cookie, or session token in this app.

The current official Weverse help documents normal account login and account security/device management, but I could not verify a public third-party OAuth/API contract for this exact use case.
