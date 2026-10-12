# DriveBridge website

Marketing landing page and privacy policy for the DriveBridge Android app. Plain HTML, CSS and
JavaScript, built with [Vite](https://vite.dev). No framework, no web fonts, no analytics and no
third-party scripts.

```
index.html        Landing page
privacy.html      Privacy policy (same wording as docs/PRIVACY.md in the app repo)
src/style.css     All styles; brand colours are CSS custom properties on :root
src/main.js       Google Play link switch (see below)
public/           Copied as-is to dist/: icons, logo, screenshots, og-image.png, robots.txt
```

Requires Node.js 20.19+ or 22.12+.

## Develop

```
npm install
npm run dev        # local dev server with live reload
npm run build      # production build into dist/
npm run preview    # serve dist/ locally to check the build
```

## Before publishing

- **Google Play button.** The app isn't public yet, so the button reads "Coming soon to Google
  Play" and links nowhere. When it is live, set `PLAY_STORE_LIVE = true` in `src/main.js`
  (the URL is `PLAY_STORE_URL` in the same file) and rebuild.
- **Domain.** Once the domain is known, uncomment the `<link rel="canonical">` in both HTML files,
  make `og:image` / `twitter:image` absolute (`https://YOUR-DOMAIN/og-image.png`), and add a
  `Sitemap:` line to `public/robots.txt`. A sitemap only needs two URLs: `/` and `/privacy.html`.
- **Privacy policy.** `privacy.html` is a hand-made copy of `docs/PRIVACY.md`. When the policy
  changes, update both.

## Deploy on Hostinger

The site is fully static: everything needed is in `dist/` after `npm run build`.

### Option A: upload with hPanel File Manager

1. Run `npm run build` locally.
2. In hPanel, open **Websites > Manage > File Manager** and go to `public_html`.
3. Upload the **contents** of `dist/` (not the `dist` folder itself), so `public_html/index.html`
   exists. Replace any old files, including the old `assets/` folder.

### Option B: Hostinger Git deployment or Node.js web app

Push this folder to a Git repository, then in hPanel either:

- **Node.js web app** (on plans that include it): connect the repository, set the build command to
  `npm run build` and the output directory to `dist`.
- **Git deployment** (Websites > Advanced > Git): this only pulls files, it doesn't build. Either
  commit a built `dist/` on a separate deploy branch, or use Option A.

Then enable the free SSL certificate in hPanel and turn on **Force HTTPS**.
