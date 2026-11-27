/* Focus timer: a short block of work, then a short break. Saved as an end time, so it keeps
   running while you move between pages. No sound, and it never covers the lesson. */
(function () {
  'use strict';
  var PRESETS = { '10/2': [10, 2], '15/3': [15, 3], '25/5': [25, 5] };
  var state, save, tick = null, title = document.title;

  function el() {
    var e = document.getElementById('ftimer');
    if (!e) { document.body.insertAdjacentHTML('beforeend', '<div id="ftimer" role="region" aria-label="Focus timer" hidden></div>'); e = document.getElementById('ftimer'); }
    return e;
  }
  function T() { return state.timer || (state.timer = { preset: '15/3', phase: 'idle' }); }
  function left() { var t = T(); return t.phase === 'idle' || t.phase === 'over' ? 0 : t.left != null ? t.left : Math.max(0, Math.round((t.endsAt - Date.now()) / 1000)); }
  function clock(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function begin(phase) { var t = T(); t.phase = phase; t.left = null; t.endsAt = Date.now() + PRESETS[t.preset][phase === 'work' ? 0 : 1] * 60000; t.open = true; save(); draw(); run(); }
  function stop() { var t = T(); t.phase = 'idle'; t.left = null; t.open = false; save(); draw(); run(); }
  function pause() { var t = T(); if (t.left != null) { t.endsAt = Date.now() + t.left * 1000; t.left = null; } else t.left = left(); save(); draw(); run(); }
  function toggle() { var t = T(); t.open = !t.open; save(); draw(); }

  function draw() {
    var t = T(), e = el(), running = t.phase === 'work' || t.phase === 'break', h = '';
    e.hidden = !(t.open || t.phase === 'over');
    document.body.classList.toggle('timing', !e.hidden);   /* CSS makes room so nothing is covered */
    document.title = running && t.left == null ? clock(left()) + ' · ' + title : t.phase === 'over' ? '⏰ ' + title : title;
    e.className = t.phase;
    if (t.phase === 'idle') {
      h = '<b>Focus timer</b><div class="row">' + Object.keys(PRESETS).map(function (p) { return '<button class="sm" data-preset="' + p + '" aria-pressed="' + (t.preset === p) + '">' + p.replace('/', ' + ') + '</button>'; }).join('') + '</div><small>minutes of work + break</small><div class="row"><button class="primary" data-t="start">Start</button><button class="sm" data-t="close">Close</button></div>';
    } else if (running) {
      h = '<small>' + (t.phase === 'work' ? 'Focus' : 'Break') + (t.left != null ? ' (paused)' : '') + '</small><b class="time">' + clock(left()) + '</b><div class="row"><button class="sm" data-t="pause">' + (t.left != null ? 'Resume' : 'Pause') + '</button><button class="sm" data-t="stop">Stop</button></div>';
    } else {
      var worked = t.was === 'work';
      h = '<b>' + (worked ? '⏰ Block done. Take a break.' : '⏰ Break over.') + '</b><div class="row"><button class="primary" data-t="' + (worked ? 'break' : 'start') + '">' + (worked ? 'Start break' : 'Next block') + '</button><button class="sm" data-t="stop">Finish</button></div>';
    }
    e.innerHTML = h;
    e.querySelectorAll('[data-preset]').forEach(function (b) { b.onclick = function () { t.preset = b.dataset.preset; save(); draw(); }; });
    e.querySelectorAll('[data-t]').forEach(function (b) {
      b.onclick = function () { var a = b.dataset.t; if (a === 'start') begin('work'); else if (a === 'break') begin('break'); else if (a === 'pause') pause(); else if (a === 'stop') stop(); else toggle(); };
    });
  }
  function step() {
    var t = T(); if (t.left != null || (t.phase !== 'work' && t.phase !== 'break')) return;
    if (left() <= 0) { t.was = t.phase; t.phase = 'over'; t.open = true; save(); draw(); run(); return; }
    var time = el().querySelector('.time'); if (time) time.textContent = clock(left()); else if (!el().hidden) draw();
    document.title = clock(left()) + ' · ' + title;
  }
  /* tick only while something is counting down */
  function run() { var t = T(), on = (t.phase === 'work' || t.phase === 'break') && t.left == null; if (on && !tick) tick = setInterval(step, 500); if (!on && tick) { clearInterval(tick); tick = null; } }

  function init(helpers) {
    state = helpers.state; save = helpers.save; title = document.title;
    var b = document.getElementById('timerbtn'); if (b) b.onclick = toggle;
    step(); draw(); run();
  }
  window.Timer = { init: init, toggle: toggle };
})();
