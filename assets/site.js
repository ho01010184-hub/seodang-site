// 서당 홈페이지 공용 — 메뉴(드롭다운·휴대폰 펼침), 스크롤 메뉴, 나타나기
(function () {
  var H = document.documentElement, RM = H.classList.contains('rm');
  function $(id) { return document.getElementById(id); }
  function all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  all('.h-r').forEach(function (el) { el.classList.add('on'); });

  // ---------- 기능 드롭다운 ----------
  var dds = all('.dd');
  function closeDD(except) {
    dds.forEach(function (d) { if (d !== except) { d.classList.remove('open'); d.querySelector('.dd-btn').setAttribute('aria-expanded', 'false'); } });
  }
  dds.forEach(function (d) {
    var b = d.querySelector('.dd-btn');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var on = !d.classList.contains('open');
      closeDD(d); d.classList.toggle('open', on); b.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  });

  // ---------- 휴대폰 메뉴 ----------
  var mnav = $('mnav'), mbtns = all('[data-mbtn]');
  function setM(on) {
    if (!mnav) return;
    mnav.hidden = !on;
    mbtns.forEach(function (b) { b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.setAttribute('aria-label', on ? '메뉴 닫기' : '메뉴 열기'); });
  }
  mbtns.forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); setM(mnav.hidden); }); });
  if (mnav) all('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setM(false); }); });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dd')) closeDD();
    if (mnav && !mnav.hidden && !e.target.closest('#mnav')) setM(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDD(); setM(false); } });

  // ---------- 머리 · 스크롤 메뉴 ----------
  var hd = $('hd'), ln = $('lnav'), first = document.querySelector('section');
  var lnF = ln ? all('a, button', ln) : [], lnOn = false, tick = false;
  function update() {
    tick = false;
    var sy = scrollY;
    if (hd) hd.classList.toggle('glass', sy > 20);
    if (!ln || !first) return;
    var show = sy > first.offsetTop + first.offsetHeight * 0.55;
    if (show !== lnOn) {
      lnOn = show; ln.classList.toggle('show', show); if (hd) hd.classList.toggle('up', show);
      ln.setAttribute('aria-hidden', show ? 'false' : 'true');
      lnF.forEach(function (a) { a.tabIndex = show ? 0 : -1; });
      closeDD();
    }
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  // ---------- 나타나기 ----------
  if ('IntersectionObserver' in window && !RM) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    all('.r:not(.h-r)').forEach(function (el) { io.observe(el); });
  } else {
    all('.r').forEach(function (el) { el.classList.add('on'); });
  }
})();
