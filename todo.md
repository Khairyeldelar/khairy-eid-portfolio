# Approved public profile links

- [x] Add the approved Facebook, YouTube, Instagram, Spotify, LinkedIn, and FilmFreeway links as visible contact methods.
- [x] Add dedicated platform icons and a safe public fallback for the approved links.
- [x] Verify the public contact query returns all six stored rows.
- [x] Verify the six destinations: Facebook and YouTube opened publicly; Instagram, Spotify, LinkedIn, and FilmFreeway reached their intended public/profile destinations, with platform login walls noted where applicable.
- [x] Run TypeScript, tests, production build, and responsive screenshot checks.
- [x] Save a stable checkpoint after the links are connected.

- [x] Search public TikTok results for «خيري الديلر» and public X results for «Khairy Eid Ali».
- [x] Verify candidate handles against the known YouTube/Facebook identity without collecting sensitive data.
- [x] Present the candidate links for confirmation before adding them to the site.
- [x] Add the confirmed TikTok profile https://www.tiktok.com/@khairy_eldelar1 to visible contact methods with a TikTok icon.
- [x] Add the confirmed X profile https://x.com/EldelarOfficial to visible contact methods with an X icon.
- [x] Verify both links in the public contact query and responsive homepage UI.
- [x] Run Vitest, TypeScript, production build, and save a stable checkpoint.
- [x] Collect the real project titles, bilingual descriptions, categories, tools, URLs, and thumbnail images from verified public sources.
- [x] Present externally discovered project candidates for owner approval before replacing experimental records.
- [x] Replace the experimental project records in the database-backed content workflow with the four approved public projects.
- [x] Verify the real projects render publicly with working links and images.
- [x] Run tests and save a stable checkpoint after the project migration.
- [x] Build the static GitHub Pages artifact with the latest social links and approved projects.
- [x] Commit and push all latest source and Pages updates to the GitHub repository.
- [x] Verify the public GitHub Pages site reflects the latest portfolio content.

# Independent Admin Login

- [x] Add `ADMIN_USERNAME` and `ADMIN_PASSWORD` secrets to the project environment.
- [x] Create a local login tRPC mutation that verifies credentials and issues a session cookie for the admin user.
- [x] Build a standalone `/admin/login` page with a secure form and error handling.
- [x] Update the `/admin` route to redirect unauthenticated users to `/admin/login` instead of the default OAuth portal.
- [x] Ensure the existing `adminProcedure` correctly recognizes the local admin session.
- [x] Run tests, verify the login flow, and save a stable checkpoint.

# Admin Password Change

- [x] Add a protected password-change procedure that verifies the current password and confirmation.
- [x] Store a new password hash in a private database setting used by local admin login without exposing the password to the client.
- [x] Add a password-change form inside the admin settings section.
- [x] Test success and failure paths, verify the UI, and save a stable checkpoint.

# Game Project and Lightweight Portfolio

- [x] Add the public game https://khairyeldelar.github.io/ as a portfolio project with a clear play link.
- [x] Replace the public contact email with khairy.eldelar50@gmail.com in database-backed and fallback content.
- [x] Simplify the public page by reducing secondary sections and keeping the main profile, projects, contact links, and contact form.
- [x] Verify the full-stack and GitHub Pages versions and run tests/build.
- [x] Save a stable checkpoint after the game, email, and lightweight portfolio update.

# Uploaded Image Display Bug

- [x] Inspect the stored image URL/key for the game and trace the upload-to-render flow.
- [x] Inspect the actual updated article/tutorial record; the current database contains no article/tutorial record, so there is no saved article image to verify yet.

- [x] Fix storage URL resolution and image rendering for database-backed and fallback content.
- [x] Verify the game image in the browser and run tests/build.
- [x] Verify a real database-backed article/tutorial image in the reading modal; no article/tutorial record exists currently.

# Game Article Image Update

- [x] Inspect the game record's imageUrl/imageKey and thumbnailUrl/thumbnailKey after the latest upload.
- [x] Ensure the public game card and any game reading view use the latest uploaded image.
- [x] Verify the image in the browser, run tests/build, and save a stable checkpoint.

# GitHub Sync After Image Fix

- [ ] Build the latest static GitHub Pages artifact with the image-rendering fix.
- [ ] Commit and push the latest source and Pages changes to GitHub.
- [ ] Verify GitHub Actions and the public GitHub Pages site.
- [ ] Save a stable checkpoint after synchronization.

