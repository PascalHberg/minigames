/* shared/core.js – gemeinsame Helfer für alle Minispiele
 * Einbinden mit: <script src="../../shared/core.js"></script>  (aus games/<name>/)
 * Highscore-Schlüssel immer pro Spiel eindeutig wählen, z. B. "superball_hi", "snake_hi".
 */
(function (w) {
  var Core = {};

  // Highscore: Cookie (1 Jahr) plus localStorage als Rückfall; der höhere Wert gilt
  Core.getHi = function (key) {
    var a = 0, b = 0;
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + key + '=(\\d+)'));
      if (m) a = +m[1];
    } catch (e) {}
    try { b = parseInt(localStorage.getItem(key)) || 0; } catch (e) {}
    return Math.max(a, b);
  };

  Core.setHi = function (key, n) {
    var exp = new Date(Date.now() + 3.15e10).toUTCString();
    try { document.cookie = key + '=' + n + '; expires=' + exp + '; path=/; SameSite=Lax'; } catch (e) {}
    try { localStorage.setItem(key, String(n)); } catch (e) {}
  };

  // Sternenhimmel: el ist ein leeres Element mit id="stars" (siehe style.css)
  Core.stars = function (el, n) {
    var s = [];
    for (var i = 0; i < (n || 90); i++) {
      s.push((Math.random() * 100).toFixed(1) + 'vw ' + (Math.random() * 100).toFixed(1) + 'vh 0 ' +
        (Math.random() < .2 ? 1 : 0) + 'px rgba(255,255,255,' + (.3 + Math.random() * .6).toFixed(2) + ')');
    }
    if (el) el.style.boxShadow = s.join(',');
  };

  // Sound: einfache Töne ohne Audiodateien (Web Audio API)
  var AC = null;
  Core.muted = false;
  Core.tone = function (f, d, type, vol, f2) {
    if (Core.muted) return;
    try {
      AC = AC || new (w.AudioContext || w.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime;
      o.type = type || 'square';
      o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
      g.gain.setValueAtTime(vol || .08, t);
      g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(AC.destination);
      o.start(t); o.stop(t + d);
    } catch (e) {}
  };

  w.Core = Core;
})(window);
