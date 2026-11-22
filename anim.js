(function () {
  var root = document.documentElement;
  if (!root.classList.contains('anim')) return;
  window.__animOK = true;
  var $ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function R(sel, step, base) {
    $(sel).forEach(function (el, i) { el.dataset.r = 'up'; el.style.setProperty('--d', (base || 0) + i * step + 'ms'); });
  }
  /* sayfa açılışı: başlık, yazı, düğmeler, telefon sırayla */
  R('h1', 0, 0); R('.hero .lead', 0, 120); R('.hero .cta', 0, 220); R('.hero .fine', 0, 300); R('.hero .stage', 0, 150);

  /* aşağıdakiler kaydırınca hafifçe belirir */
  R('.steps li', 100, 0);
  $('.row').forEach(function (row) {
    R_in(row.querySelector('.text'), 0); R_in(row.querySelector('.shots'), 120);
  });
  function R_in(el, d) { if (el) { el.dataset.r = 'up'; el.style.setProperty('--d', d + 'ms'); } }
  R('.extras > div', 100, 0); R('.devrow figure', 120, 0); R('.dl', 120, 0);

  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  $('[data-r]').forEach(function (el) { io.observe(el); });

  /* SSS: yumuşak açılma */
  $('.faq details').forEach(function (d) {
    var p = d.querySelector('p'), wrap = document.createElement('div');
    wrap.className = 'ans'; p.replaceWith(wrap); wrap.appendChild(p);
    var busy = false;
    d.querySelector('summary').addEventListener('click', function (e) {
      e.preventDefault(); if (busy) return; busy = true;
      var opening = !d.open; if (opening) d.open = true;
      var h = wrap.offsetHeight;
      var a = wrap.animate(opening ? [{ height: '0px' }, { height: h + 'px' }] : [{ height: h + 'px' }, { height: '0px' }], { duration: 250, easing: 'ease-out' });
      a.onfinish = function () { if (!opening) d.open = false; busy = false; };
    });
  });
})();
