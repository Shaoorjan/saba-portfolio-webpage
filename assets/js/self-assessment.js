/* =============================================================================
   Safeguarding Self-Assessment — scoring only.

   PRIVACY RULE, NOT A PREFERENCE: this script must never persist or transmit
   anything. No fetch/XHR, no localStorage/sessionStorage, no cookies, no
   analytics events, no query-string round-trips. The page tells users their
   answers stay in the browser, and that claim has to stay literally true.
   Scores live in memory only and are gone when the tab closes.

   The record-field mirroring below is the same deal: it copies what the user
   typed into a sibling element in the live DOM so that print can show the whole
   value instead of the one clipped line an <input> displays. Nothing leaves the
   page, and nothing survives the tab.
   ============================================================================= */

(function () {
  'use strict';

  var DOMAINS = ['A', 'B', 'C', 'D', 'E', 'F'];

  var BANDS = [
    { max: 11, key: '0-11', label: 'Foundational' },
    { max: 20, key: '12-20', label: 'Developing' },
    { max: 26, key: '21-26', label: 'Established' },
    { max: 30, key: '27-30', label: 'Advanced' }
  ];

  var form = document.getElementById('sa-form');
  if (!form) return;

  var bar = document.getElementById('sa-bar');
  var bandList = document.querySelector('[data-bands]');
  var bandLabel = document.querySelector('[data-band-label]');
  var totalEls = document.querySelectorAll('[data-total]');

  function bandFor(total) {
    for (var i = 0; i < BANDS.length; i++) {
      if (total <= BANDS[i].max) return BANDS[i];
    }
    return BANDS[BANDS.length - 1];
  }

  function update() {
    var total = 0;

    DOMAINS.forEach(function (letter) {
      var boxes = form.querySelectorAll('input[type="checkbox"][data-domain="' + letter + '"]');
      var score = 0;

      Array.prototype.forEach.call(boxes, function (box) {
        if (box.checked) score++;
        var item = box.closest('.sa-item');
        if (item) item.classList.toggle('is-yes', box.checked);
      });

      total += score;

      var cells = document.querySelectorAll('[data-subtotal="' + letter + '"]');
      Array.prototype.forEach.call(cells, function (cell) {
        cell.textContent = String(score);
      });
    });

    Array.prototype.forEach.call(totalEls, function (el) {
      el.textContent = String(total);
    });

    var band = bandFor(total);

    if (bandList) {
      Array.prototype.forEach.call(bandList.querySelectorAll('.sa-band'), function (el) {
        el.classList.toggle('is-current', el.getAttribute('data-band') === band.key);
      });
    }

    if (bandLabel) bandLabel.textContent = band.label;
  }

  // A text input renders one line and scrolls the overflow out of view, so a
  // long "Completed by" printed as a fragment. Each field has a print-only twin
  // that carries the same text and wraps; keep the two in step.
  var mirrors = form.querySelectorAll('[data-print-for]');

  function mirrorRecord() {
    Array.prototype.forEach.call(mirrors, function (el) {
      var field = form.elements[el.getAttribute('data-print-for')];
      el.textContent = field ? field.value : '';
    });
  }

  form.addEventListener('change', function (event) {
    if (event.target && event.target.type === 'checkbox') update();
  });

  form.addEventListener('input', mirrorRecord);

  // Belt and braces for values that arrive without an input event, such as
  // browser autofill restored on a back-navigation.
  window.addEventListener('beforeprint', mirrorRecord);

  var printBtn = document.getElementById('sa-print');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  var resetBtn = document.getElementById('sa-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      var answered = form.querySelectorAll('input[type="checkbox"]:checked').length;
      if (answered && !window.confirm('Clear all ' + answered + ' marked indicators and the record fields?')) return;
      form.reset();
      update();
      mirrorRecord();
      var top = document.getElementById('main');
      if (top) top.scrollIntoView({ block: 'start' });
    });
  }

  // The running-score bar is JS-only; it stays hidden without scripting.
  if (bar) bar.hidden = false;

  update();
  mirrorRecord();
})();
