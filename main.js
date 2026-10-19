(function () {
  'use strict';

  /* ---- Theme toggle ---- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---- Copyright year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Nav scrolled state ---- */
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); document.getElementById('bottomNav').classList.toggle('nav-visible', window.scrollY > 180); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Hero name slide-up ---- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(function () {
    document.querySelectorAll('.anim-up').forEach(function (el, i) {
      el.style.transform = 'translateY(110%)';
      el.style.transition = 'transform 0.9s cubic-bezier(0.22,1,0.36,1) ' + (0.1 + i * 0.12) + 's';
      requestAnimationFrame(function () { el.style.transform = 'translateY(0)'; });
    });
  });

  /* ---- Rotating role word ---- */
  var words = ['Django', 'React', 'Python', 'Next.js', 'REST APIs', 'TypeScript'];
  var rot = document.getElementById('rotator');
  var wi = 0;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rot && !reduceMotion) {
    setInterval(function () {
      wi = (wi + 1) % words.length;
      rot.style.transition = 'opacity .25s ease, transform .25s ease';
      rot.style.opacity = '0';
      rot.style.transform = 'translateY(-6px)';
      setTimeout(function () {
        rot.textContent = words[wi];
        rot.style.transform = 'translateY(6px)';
        requestAnimationFrame(function () {
          rot.style.opacity = '1';
          rot.style.transform = 'translateY(0)';
        });
      }, 250);
    }, 2400);
  }

  /* ---- Marquee seamless loop ---- */
  var mq = document.getElementById('marquee');
  if (mq) mq.innerHTML += mq.innerHTML;

  /* ---- Scroll reveals (repeat on every visit) ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
      } else {
        e.target.classList.remove('in');
      }
    });
  }, { threshold: 0.01, rootMargin: '0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---- Stat counters ---- */
  var statEls = document.querySelectorAll('.stat-n');
  statEls.forEach(function (el) {
    var raw = el.textContent.trim();
    el.dataset.target = parseInt(raw, 10);
    el.dataset.suffix = raw.replace(/[0-9]/g, '');
    el.textContent = '0' + el.dataset.suffix;
  });
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        statEls.forEach(function (el) {
          var target = parseInt(el.dataset.target, 10);
          var suffix = el.dataset.suffix;
          var start = null;
          var duration = 1400;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      } else {
        statEls.forEach(function (el) {
          el.textContent = '0' + el.dataset.suffix;
        });
      }
    });
  }, { threshold: 0.4 });
  var statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) statObserver.observe(statsStrip);

  /* Screenshot gallery and accessible native dialog */
  var dialog = document.getElementById('imageDialog');
  document.querySelectorAll('.image-open').forEach(function (button) {
    button.addEventListener('click', function () {
      document.getElementById('dialogImage').src = button.dataset.image;
      document.getElementById('dialogImage').alt = button.dataset.caption;
      document.getElementById('dialogCaption').textContent = button.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll('[data-hr]').forEach(function (button) {
    button.addEventListener('click', function () {
      var opener = document.querySelector('.image-open');
      var label = 'MDARJ · ' + (button.dataset.hr === 'ar' ? 'Arabic' : 'English') + ' dashboard prototype with sample data';
      opener.dataset.image = 'assets/hr-dashboard-' + button.dataset.hr + '.png';
      opener.dataset.caption = label;
      opener.querySelector('img').src = opener.dataset.image;
      opener.querySelector('img').alt = label;
      document.querySelectorAll('[data-hr]').forEach(function (item) {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });
  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) document.querySelectorAll('.bottom-nav a').forEach(function(link) {
        var active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-20% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(function(section) { sectionObserver.observe(section); });
  /* ---- Skill card spotlight ---- */
  document.querySelectorAll('.tilt').forEach(function (card) {
    card.addEventListener('pointermove', function (ev) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
      card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
    });
  });

}());
