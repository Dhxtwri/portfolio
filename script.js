/**
 * DHAIRYA TIWARI // DEVELOPER PORTFOLIO
 * Vanilla JavaScript interactions: Mobile Menu, Active Scroll Spy, Dynamic Year
 * Zero external runtime dependencies.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  function initCopyrightYear() {
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
      try {
        var currentYear = new Date().getFullYear();
        if (currentYear && !isNaN(currentYear)) {
          yearEl.textContent = currentYear;
        }
      } catch (err) {
        // Fallback already in HTML
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Accessible Keyboard Support
  // --------------------------------------------------------------------------
  function initMobileNav() {
    var toggleBtn = document.getElementById('mobile-toggle');
    var navMenu = document.getElementById('site-nav');
    var navLinks = document.querySelectorAll('.nav-link');

    if (!toggleBtn || !navMenu) return;

    function openMenu() {
      toggleBtn.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
    }

    function closeMenu() {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    }

    function toggleMenu() {
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav anchor link
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (toggleBtn.getAttribute('aria-expanded') === 'true') {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Close menu when Escape key is pressed
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (toggleBtn.getAttribute('aria-expanded') === 'true') {
          closeMenu();
          toggleBtn.focus();
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Active Section Scroll Spy via IntersectionObserver
  // --------------------------------------------------------------------------
  function initScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.site-nav .nav-link');

    if (!sections.length || !navLinks.length) return;

    // Build link lookup map
    var linkMap = {};
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        linkMap[href.substring(1)] = link;
      }
    });

    if ('IntersectionObserver' in window) {
      var observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            // Remove active from all
            navLinks.forEach(function (link) {
              link.classList.remove('active');
            });
            // Add active to current
            if (linkMap[id]) {
              linkMap[id].classList.add('active');
            }
          }
        });
      }, observerOptions);

      sections.forEach(function (sec) {
        observer.observe(sec);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. Initialize on DOMContentLoaded
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCopyrightYear();
      initMobileNav();
      initScrollSpy();
    });
  } else {
    initCopyrightYear();
    initMobileNav();
    initScrollSpy();
  }
})();

