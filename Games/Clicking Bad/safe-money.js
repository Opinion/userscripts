// ==UserScript==
// @name             Clicking Bad - safe-money.js
// @description      Adds calculations for how much money is safe to use without affecting laundered money.
// @match            http://clickingbad.nullism.com/
// @version          1.0.0
// @updateURL        https://github.com/Opinion/userscripts/raw/main/Games/Clicking%20Bad/safe-money.js
// @downloadURL      https://github.com/Opinion/userscripts/raw/main/Games/Clicking%20Bad/safe-money.js
// ==/UserScript==

function log(...args) {
  console.log('[usable-money]', ...args);
}

function parseAsNumber(shittyFormat) {
  return parseInt(shittyFormat.replaceAll(',', ''));
}

function toNumberWithCommas(x) {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const style = `
body {
  background: #163046 !important;
  padding: 2px !important;
}

button {
  padding: 5px 14px !important;
  background-color: #eee !important;
  border: 1px solid #939393 !important;
  color: #6b7a8a !important;
  text-shadow: none !important;
  padding: 5px 14px;
}

button:disabled {
  color: #939393 !important;
  background-color: #404040 !important;
  border-color: #5b6975 !important;
}

.tab.active {
  background: #4E6272 !important;
  border: 1px solid #B3BBC2 !important;
  color: #d0d0d0 !important;
}
`;

const template = {
  selected: 'one',
  one: `
<span id="sell_lbl">Cash Money</span> ($<span id="sell_roi">0</span> ea)<br>

<span title="You can use this money without affecting the growth of your landered money. It is calculated like this: (total - laundered = this)">
  $<strong><span id="usable_money">0</span></strong> safe to use
</span><br>

<span title="This is your total amount, using too much can affect laundered money">
  <small>$<span id="sell_amt">0</span> total</small>
</span><br>

<span title="Try to increase laundered money to make IRS audits less frequent">
  <small>$<span id="safe_cash">0</span> laundered</small><br>
</span>

<small>$<span id="seller_rps">0</span> per second</small><br>
  `,
  two: `
<span id="sell_lbl">Cash Money</span> ($<span id="sell_roi">0</span> ea)<br>

<span title="This is your total amount, using too much can affect laundered money">
  $<strong><span id="sell_amt">0</span></strong> total
</span><br>

<span title="Try to increase laundered money to make IRS audits less frequent">
  <small>$<span id="safe_cash">0</span> laundered</small><br>
</span>

<span title="You can use this money without affecting the growth of your landered money. It is calculated like this: (total - laundered = this)">
  <small>$<span id="usable_money">0</span> safe to use</small>
</span><br>

<small>$<span id="seller_rps">0</span> per second</small><br>
  `,
  swapButton: `<button id="swap_template">Swap 'safe to use' and 'total'</button>`,
  swap() {
    const newSelected = this.selected === 'one' ? 'two' : 'one';
    log(`Swapping template to '${newSelected}'...`);
    this.selected = newSelected;
    this.inject();
  },
  inject() {
    log(`Replacing template '${this.selected}'...`);
    document.querySelector('#sell_div > p').innerHTML = this[this.selected];
  },
};

(()=> {
  log('Started.');
  template.inject();

  log('Adding custom style.');
  const styleElement = document.createElement('style');
  styleElement.innerText = style;
  document.body.append(styleElement);

  log('Replacing footer with a \'swap\' button...');
  const shareFooterElement = document.getElementById('share_footer');
  shareFooterElement.innerHTML = template.swapButton;
  document.getElementById('swap_template').addEventListener('click', () => {
    template.swap();
  });

  setInterval(function() {
    const totalElement = document.getElementById('sell_amt');
    const launderedElement = document.getElementById('safe_cash');

    const totalAmount = parseAsNumber(totalElement.innerText);
    const launderedAmount = parseAsNumber(launderedElement.innerText);

    const usableAmount = toNumberWithCommas(totalAmount - launderedAmount);
    document.getElementById('usable_money').innerText = usableAmount;
  }, 200);

  log('You can find more of my userscripts here; https://github.com/Opinion/userscripts');
})();
