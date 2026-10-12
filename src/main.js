// Google Play listing. Set PLAY_STORE_LIVE to true once the app is public on Google Play;
// every [data-play-link] button then becomes a real link to the listing.
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nytcoders.drivebridge';
export const PLAY_STORE_LIVE = false;

function activatePlayLinks() {
  for (const link of document.querySelectorAll('[data-play-link]')) {
    link.href = PLAY_STORE_URL;
    link.removeAttribute('aria-disabled');
    link.classList.add('btn-primary');
    link.rel = 'noopener';
    const label = link.querySelector('[data-play-label]');
    if (label) label.textContent = 'Get it on Google Play';
  }
  for (const note of document.querySelectorAll('[data-play-note]')) {
    note.textContent = 'For Android 10 and newer.';
  }
}

if (PLAY_STORE_LIVE) activatePlayLinks();
