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
public/streams/   featured_streams.csv: the app's Featured TV and radio lists, which the app
                  downloads (copy of app/assets/streams/featured_streams.csv in the app repo)
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
- **Domain.** The site lives at https://drivebridge.nytcoders.com. Canonical links, share images,
  `public/sitemap.xml` and `public/robots.txt` use that address; change them together if it moves.
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
- **Git deployment** (Websites > Advanced > Git): this only pulls files, it doesn't build, so it
  deploys the **`hostinger` branch**, which holds the built site at the top level. Set the
  repository to `https://github.com/ckevinroque/drivebridge-site.git`, the branch to `hostinger`,
  and the install path to the subdomain's folder (empty it first; Hostinger only deploys into an
  empty folder). After changing the site, run `npm run deploy:hostinger` (builds and pushes the
  branch), then press **Deploy** in hPanel or turn on auto-deployment with the webhook it shows.

Then enable the free SSL certificate in hPanel. `public/.htaccess` already redirects http to https
and makes `/privacy` open the privacy policy.
