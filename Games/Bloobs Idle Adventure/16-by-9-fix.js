// ==UserScript==
// @name             Bloobs Idle Adventure - 16-by-9-fix.js
// @description      Fix 16:9 scaling to use 100% of the available height.
// @match            https://html-classic.itch.zone/html/*/index.html
// @match            https://dev-bloob.itch.io/bloobsadventureidle
// @version          1.1.0
// @updateURL        https://github.com/Opinion/userscripts/raw/main/Games/Bloobs%20Idle%20Adventure/16-by-9-fix.js
// @downloadURL      https://github.com/Opinion/userscripts/raw/main/Games/Bloobs%20Idle%20Adventure/16-by-9-fix.js
// ==/UserScript==

/*
Note: Fullscreen/direct URL changes all the time. Go to https://dev-bloob.itch.io/bloobsadventureidle
      and click the 'open fullscreen' link.
*/

function log(...args) {
  console.log('[16:9-fix]', ...args);
}

const style = `
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background: #06070b;
}

#unity-container.unity-desktop {
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  justify-content: center !important;
}

#unity-canvas {
  height: 100% !important;
  width: auto !important;
}
`;

function fullscreen() {
  log('Detected: Fullscreen');

  log('Removing unity controls...');
  document.getElementById('unity-loading-bar')?.remove();
  document.getElementById('unity-warning')?.remove();
  document.getElementById('unity-footer')?.remove();

  log('Injecting custom style...');
  const styleElement = document.createElement('style');
  styleElement.innerText = style;
  document.body.append(styleElement);

  log('Resizing game canvas to 16:9...');
  const canvasElement = document.getElementById('unity-canvas');
  canvasElement.width = 16;
  canvasElement.height = 9;

  log('Finished. Have fun 👍');
  log('You can find more of my userscripts here; https://github.com/Opinion/userscripts');
}

function storePage() {
  log('Detected: store page');

  const linkElement = document.createElement('a');
  linkElement.href = '#';
  linkElement.innerText = '[16-by-9-fix.js]: Open the game in fullscreen';
  linkElement.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.replace(getIframeLink());
  });

  const containerElement = document.createElement('div');
  containerElement.style = 'font-size: 2rem;';
  containerElement.append(linkElement);

  document.getElementById('header')?.append(containerElement);

  log('Press the fullscreen button to open the game directly.');
}

function getIframeLink() {
  document.querySelector('button.button.load_iframe_btn')?.click();
  return document.querySelector('iframe#game_drop')?.src;
}

(() => {
  if (document.location.href === 'https://dev-bloob.itch.io/bloobsadventureidle') {
    storePage();
    return;
  }

  const fullscreenTitles = [
    'Unity WebGL Player | Bloobs Adventure Idle',
    'Unity WebGL Player | Bloobs Idle Adventure',
  ];
  if (fullscreenTitles.includes(document.title)) {
    fullscreen();
    return;
  }
})();
