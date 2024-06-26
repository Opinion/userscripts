// ==UserScript==
// @name             Twitch - bonus-collector.js
// @description      Automatically collect bonus in live channels.
// @match            *://*.twitch.tv/*
// @version          1.0.1
// @updateURL        https://github.com/Opinion/userscripts/raw/main/Services/Twitch/bonus-collector.js
// @downloadURL      https://github.com/Opinion/userscripts/raw/main/Services/Twitch/bonus-collector.js
// ==/UserScript==

function log(...args) {
  console.log('[bonus-collector]', ...args);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  log('Started.');
  log('You can find more of my userscripts here; https://github.com/Opinion/userscripts');
  while (true) {
    const button = document.querySelector('button[aria-label="Claim Bonus"]');
    if (button) {
      button.click();
    }
    await sleep(10000);
  }
})();
