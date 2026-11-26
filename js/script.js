
  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => obs.observe(el));

  // ─── STATS COUNTER ───
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = document.querySelectorAll('.stat-num');
        const data = [['200', '+', 200], ['98', '%', 98], ['30', '+', 30], ['6', 'yrs', 6]];
        nums.forEach((el, i) => animateCounter(el, data[i][2], data[i][1]));
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) statsObs.observe(statsRow);

  // ─── NAV SCROLL ───
  const navEl = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    navEl.style.background = window.scrollY > 60
      ? 'rgba(5,8,22,0.95)'
      : 'rgba(5,8,22,0.75)';
  });

  // ─── MOBILE MENU TOGGLE ───
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a non-dropdown link
    navLinks.querySelectorAll('li > a').forEach(link => {
      const parent = link.parentElement;
      if (!parent.classList.contains('dropdown')) {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      }
    });

    // Toggle dropdowns in mobile menu
    navLinks.querySelectorAll('.dropdown > a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const dropdown = link.parentElement;
          const isOpen = dropdown.classList.toggle('open');
          // Close other open dropdowns
          navLinks.querySelectorAll('.dropdown.open').forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
          });
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }