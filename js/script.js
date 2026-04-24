/* ==========================================================================
   SignSight | Dynamic Sign Language Recognition
   Shared JavaScript — nav, animations, form, scroll effects
   ========================================================================== */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // Navbar shadow on scroll + active link highlight
  // ----------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const handleNavScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Highlight active page link based on filename
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ----------------------------------------------------------
  // Scroll reveal (IntersectionObserver)
  // ----------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ----------------------------------------------------------
  // Count-up animation for hero / highlight stats
  // ----------------------------------------------------------
  const countEls = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && countEls.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    countEls.forEach(el => co.observe(el));
  }

  // ----------------------------------------------------------
  // Scroll-to-top button
  // ----------------------------------------------------------
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 500) scrollBtn.classList.add('visible');
      else scrollBtn.classList.remove('visible');
    };
    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ----------------------------------------------------------
  // Contact form (no backend — front-end feedback only)
  // ----------------------------------------------------------
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      status.textContent = 'Thank you! Your message has been received. We will reply shortly.';
      status.classList.add('show');
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(() => status.classList.remove('show'), 5000);
    });
  }

  // ----------------------------------------------------------
  // Smooth scroll for in-page anchor links
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // ----------------------------------------------------------
  // Animate landmark dots on the hero preview
  // ----------------------------------------------------------
  const gestureBox = document.querySelector('.gesture-box');
  if (gestureBox) {
    const positions = [
      { x: 20, y: 30 }, { x: 50, y: 20 }, { x: 80, y: 35 },
      { x: 30, y: 55 }, { x: 70, y: 55 }, { x: 50, y: 75 }
    ];
    positions.forEach((pos, i) => {
      const dot = document.createElement('span');
      dot.className = 'landmark-dot';
      dot.style.left = pos.x + '%';
      dot.style.top = pos.y + '%';
      dot.style.animationDelay = (i * 0.3) + 's';
      gestureBox.appendChild(dot);
    });
  }

  // ----------------------------------------------------------
  // Force-download fallback for links with the [download] attr.
  // Fixes PDFs opening in the browser instead of downloading when
  // the server does not send Content-Disposition: attachment.
  // Falls back to default behaviour if fetch fails (e.g. file:// / CORS).
  // ----------------------------------------------------------
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', async (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      // Skip cross-origin URLs (e.g. Google Drive) — let them work natively.
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch (_) { return; }

      e.preventDefault();
      try {
        const res = await fetch(href);
        if (!res.ok) throw new Error('Fetch failed: ' + res.status);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = href.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
      } catch (err) {
        // Fall back to default link behavior (opens the file in the tab)
        window.location.href = href;
      }
    });
  });

  // ----------------------------------------------------------
  // Current year in footer
  // ----------------------------------------------------------
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
