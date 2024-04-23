// ==UserScript==
// @name             Bloobs Idle Adventure - 16-by-9-fix.js
// @description      Fix 16:9 scaling to use 100% of the available height.
// @match            https://html-classic.itch.zone/html/10258407/index.html
// @version          1.0.1
// @updateURL        https://github.com/Opinion/userscripts/raw/main/Games/Bloobs%20Idle%20Adventure/16-by-9-fix.js
// @downloadURL      https://github.com/Opinion/userscripts/raw/main/Games/Bloobs%20Idle%20Adventure/16-by-9-fix.js
// ==/UserScript==

/*
Note: If the game url changes, please let me know :)
      https://github.com/Opinion/userscripts/issues
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

(() => {
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
})();
