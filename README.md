# Weverse Comment Manager — corrected starter

This package fixes the problems in the previous version:
- No fake BTS post.
- No fake people/comments.
- No fake likes/replies.
- No pre-selected targets.
- No pre-filled comments.
- Five comment fields are blank and are entered by you.
- Official Weverse sign-in link is provided.
- The app never asks for your Weverse password.

## Important
The current public Weverse information I could verify confirms the Weverse account/login system and comment-reply feature, but I could not verify a public OAuth/API contract that gives an independent website live access to a user's feed and posting actions.

So this package is **connection-ready, not falsely connected**. A real live integration requires an officially supported Weverse authorization/API mechanism.

## GitHub Pages
Upload the files to your `main` branch. Then GitHub → Settings → Pages → Deploy from branch → `main` → `/root`.

## Your five comments
Open Create Comment and enter all five options yourself. They are saved in your browser's local storage.
