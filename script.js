/**
 * DHAIRYA TIWARI // INVINCIBLE 3D COMIC-BOOK DEVELOPER PORTFOLIO
 * Character-Led Scene Animation Engine:
 * 1. Three.js 3D Superhero Hero Scene (Cover)
 * 2. 7 Distinct Character-Led Scene Entrance Animations:
 *    - Scene 01: Hero / Cover 3D Depth & Title Reveal
 *    - Scene 02: About — Invincible Flying Entrance & Multi-Chapter Hub
 *    - Scene 03: Academics — Thragg Descending Impact Reveal & 3D Unfold
 *    - Scene 04: Skills — Omni-Man Power Stride & 3D Ability Grid
 *    - Scene 05: Projects — Battle Beast Bone-Crushing Impact
 *    - Scene 06: Journey — Atom Eve Radiant Expansion
 *    - Scene 07: Finale — Allen the Alien Cosmic Arrival
 * 3. Theme Cycling Engine (Invincible, Omni-Man, Thragg)
 * 4. Synthesized Web Audio Comic SFX (Zero external files, Muted by default)
 * 5. Debounced Navigation & IntersectionObserver Scene Spy
 * 6. Mobile Drawer & Dynamic Copyright Year
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  var state = {
    sfxEnabled: false,
    audioCtx: null,
    currentThemeIndex: 0,
    themes: ['invincible', 'omniman', 'thragg'],
    themeLabels: ['INVINCIBLE', 'OMNI-MAN', 'THRAGG'],
    isThreeJsRunning: false,
    threeAnimFrameId: null,
    activeSceneId: 'hero',
    isTransitioning: false
  };

  // --------------------------------------------------------------------------
  // 1. WEB AUDIO COMIC SOUND SYNTHESIZER (Muted by Default)
  // --------------------------------------------------------------------------
  function initAudio() {
    if (!state.audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.audioCtx = new AudioContextClass();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playComicSound(type) {
    if (!state.sfxEnabled || !state.audioCtx) return;
    try {
      var ctx = state.audioCtx;
      var now = ctx.currentTime;

      if (type === 'click') {
        // High-energy comic click / snap
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);

      } else if (type === 'whoosh') {
        // Comic page-flip whoosh
        var bufferSize = ctx.sampleRate * 0.18;
        var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        var output = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        var whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        var filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + 0.09);
        filter.frequency.exponentialRampToValueAtTime(350, now + 0.18);
        filter.Q.value = 3.5;

        var noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.15, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        whiteNoise.start(now);

      } else if (type === 'impact') {
        // Bone-crushing impact thump
        var oscImpact = ctx.createOscillator();
        var gainImpact = ctx.createGain();
        oscImpact.type = 'sine';
        oscImpact.frequency.setValueAtTime(220, now);
        oscImpact.frequency.exponentialRampToValueAtTime(45, now + 0.22);
        gainImpact.gain.setValueAtTime(0.28, now);
        gainImpact.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        oscImpact.connect(gainImpact);
        gainImpact.connect(ctx.destination);
        oscImpact.start(now);
        oscImpact.stop(now + 0.22);

      } else if (type === 'power') {
        // Energy charge / power burst
        var oscPower = ctx.createOscillator();
        var gainPower = ctx.createGain();
        oscPower.type = 'sawtooth';
        oscPower.frequency.setValueAtTime(150, now);
        oscPower.frequency.exponentialRampToValueAtTime(520, now + 0.15);
        oscPower.frequency.exponentialRampToValueAtTime(90, now + 0.3);
        gainPower.gain.setValueAtTime(0.15, now);
        gainPower.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        oscPower.connect(gainPower);
        gainPower.connect(ctx.destination);
        oscPower.start(now);
        oscPower.stop(now + 0.3);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  function initSoundToggle() {
    var toggleBtn = document.getElementById('sfx-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      initAudio();
      state.sfxEnabled = !state.sfxEnabled;
      toggleBtn.classList.toggle('is-active', state.sfxEnabled);
      var statusSpan = toggleBtn.querySelector('.sfx-status');
      if (statusSpan) {
        statusSpan.textContent = state.sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
      }
      if (state.sfxEnabled) {
        playComicSound('power');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. THEME CYCLING ENGINE
  // --------------------------------------------------------------------------
  function initThemeCycling() {
    var cycleBtn = document.getElementById('theme-cycle-btn');
    var labelEl = document.getElementById('current-theme-label');
    if (!cycleBtn) return;

    cycleBtn.addEventListener('click', function () {
      initAudio();
      state.currentThemeIndex = (state.currentThemeIndex + 1) % state.themes.length;
      var nextTheme = state.themes[state.currentThemeIndex];
      var nextLabel = state.themeLabels[state.currentThemeIndex];

      document.body.setAttribute('data-theme', nextTheme);
      if (labelEl) labelEl.textContent = nextLabel;

      triggerImpactFlash();
      playComicSound('power');
    });
  }

  function triggerImpactFlash() {
    var flash = document.getElementById('impact-flash');
    if (!flash) return;
    flash.classList.add('is-flashing');
    setTimeout(function () {
      flash.classList.remove('is-flashing');
    }, 120);
  }

  // --------------------------------------------------------------------------
  // 3. THREE.JS 3D HERO SCENE & WEBGL FALLBACK
  // --------------------------------------------------------------------------
  function isWebGLAvailable() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  function initHeroThreeScene() {
    var canvas = document.getElementById('hero-three-canvas');
    var fallback = document.getElementById('webgl-fallback');
    if (!canvas) return;

    if (typeof THREE === 'undefined' || !isWebGLAvailable()) {
      if (fallback) fallback.classList.add('active');
      return;
    }

    var container = canvas.parentElement;
    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (e) {
      if (fallback) fallback.classList.add('active');
      return;
    }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    var keyLight = new THREE.DirectionalLight(0xffe500, 1.8);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    var rimLight = new THREE.DirectionalLight(0x1769ff, 2.2);
    rimLight.position.set(-16, -10, -8);
    scene.add(rimLight);

    var sphereGeo = new THREE.SphereGeometry(4.5, 24, 24);
    var sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0c1322,
      emissive: 0x1769ff,
      emissiveIntensity: 0.15,
      specular: 0xffe500,
      shininess: 40
    });
    var celestialSphere = new THREE.Mesh(sphereGeo, sphereMat);
    celestialSphere.position.set(5.5, 0.5, -4);
    scene.add(celestialSphere);

    var wireMat = new THREE.MeshBasicMaterial({
      color: 0xffe500,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    var wireSphere = new THREE.Mesh(new THREE.SphereGeometry(4.65, 12, 12), wireMat);
    celestialSphere.add(wireSphere);

    var ringGroup = new THREE.Group();
    ringGroup.position.copy(celestialSphere.position);
    scene.add(ringGroup);

    var ring1Geo = new THREE.TorusGeometry(6.8, 0.08, 8, 48);
    var ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffe500, transparent: true, opacity: 0.85 });
    var ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    var ring2Geo = new THREE.TorusGeometry(8.2, 0.06, 8, 48);
    var ring2Mat = new THREE.MeshBasicMaterial({ color: 0x1769ff, transparent: true, opacity: 0.7 });
    var ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.2;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    var particleCount = 120;
    var particleGeo = new THREE.BufferGeometry();
    var posArray = new Float32Array(particleCount * 3);
    for (var p = 0; p < particleCount * 3; p += 3) {
      posArray[p] = (Math.random() - 0.5) * 35;
      posArray[p + 1] = (Math.random() - 0.5) * 25;
      posArray[p + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    var particleMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0xffe500,
      transparent: true,
      opacity: 0.75
    });
    var particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    var mouseX = 0, mouseY = 0;
    var targetCameraX = 0, targetCameraY = 0;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', function (e) {
        var nx = (e.clientX / window.innerWidth) * 2 - 1;
        var ny = -(e.clientY / window.innerHeight) * 2 + 1;
        targetCameraX = nx * 1.5;
        targetCameraY = ny * 1.0;
      }, { passive: true });
    }

    function onResize() {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize, { passive: true });

    state.isThreeJsRunning = true;
    var clock = new THREE.Clock();

    function renderScene() {
      if (!state.isThreeJsRunning) return;
      var elapsed = 0;

      if (!prefersReducedMotion) {
        state.threeAnimFrameId = requestAnimationFrame(renderScene);
        elapsed = clock.getElapsedTime();
        camera.position.x += (targetCameraX - camera.position.x) * 0.04;
        camera.position.y += (targetCameraY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        celestialSphere.rotation.y = elapsed * 0.15;
        celestialSphere.rotation.x = Math.sin(elapsed * 0.2) * 0.1;

        ringGroup.rotation.y = elapsed * 0.25;
        ring1.rotation.z = elapsed * 0.3;
        ring2.rotation.z = -elapsed * 0.2;

        particleField.rotation.y = elapsed * 0.05;
      }

      renderer.render(scene, camera);
    }

    renderScene();

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        state.isThreeJsRunning = false;
        if (state.threeAnimFrameId) cancelAnimationFrame(state.threeAnimFrameId);
      } else {
        if (!state.isThreeJsRunning) {
          state.isThreeJsRunning = true;
          renderScene();
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. 3D HERO COVER PARALLAX TILT
  // --------------------------------------------------------------------------
  function initHeroCoverTilt() {
    var coverCard = document.getElementById('hero-cover-card');
    var coverStage = document.getElementById('hero-cover-stage');
    if (!coverCard || !coverStage) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    coverStage.addEventListener('mousemove', function (e) {
      var rect = coverStage.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;

      var rotY = (x / (rect.width / 2)) * 14 - 12;
      var rotX = -(y / (rect.height / 2)) * 14 + 6;

      coverCard.style.transform = 'rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg)';
    });

    coverStage.addEventListener('mouseleave', function () {
      coverCard.style.transform = 'rotateY(-12deg) rotateX(6deg)';
    });
  }

  // --------------------------------------------------------------------------
  // 5. CHARACTER SCENE ENTRANCE DISPATCHER
  // --------------------------------------------------------------------------
  function triggerCharacterEntrance(sceneId) {
    var section = document.getElementById(sceneId);
    if (!section) return;

    section.classList.remove('is-entering');
    void section.offsetHeight;
    section.classList.add('is-entering');

    var motionWrap = section.querySelector('.char-motion-wrap');
    if (!motionWrap) return;

    // Reset and trigger animation cleanly without stacking
    motionWrap.style.animation = 'none';
    motionWrap.offsetHeight; // Force reflow
    motionWrap.style.animation = '';

    // Play appropriate comic sound
    if (sceneId === 'academics' || sceneId === 'projects') {
      playComicSound('impact');
    } else {
      playComicSound('whoosh');
    }
  }

  // --------------------------------------------------------------------------
  // 6. ABOUT HUB MULTI-SECTION TABS WITH 3D FLIP
  // --------------------------------------------------------------------------
  function initAboutHub() {
    var tabs = document.querySelectorAll('.comic-tab');
    var panels = document.querySelectorAll('.about-subpanel');
    if (!tabs.length || !panels.length) return;

    function switchTab(targetName) {
      tabs.forEach(function (tab) {
        var isMatch = tab.getAttribute('data-target') === targetName;
        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var id = panel.getAttribute('id');
        var isTarget = id === 'subpanel-' + targetName;
        if (isTarget) {
          panel.removeAttribute('hidden');
          panel.classList.add('active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('active');
        }
      });

      playComicSound('whoosh');
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-target');
        switchTab(target);
      });

      tab.addEventListener('keydown', function (e) {
        var index = Array.prototype.indexOf.call(tabs, tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          var nextIndex = (index + 1) % tabs.length;
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          var prevIndex = (index - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].focus();
          tabs[prevIndex].click();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. ACADEMICS DISTINCT 3D UNFOLDING ANIMATION
  // --------------------------------------------------------------------------
  function initAcademicsUnfold() {
    var stage = document.getElementById('academics-unfold-stage');
    if (!stage) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stage.classList.add('is-unfolded');
            var primary = stage.querySelector('.primary-fold');
            var secondary = stage.querySelector('.secondary-fold');
            if (primary) {
              primary.style.transform = 'translateY(0) rotateX(0deg)';
            }
            if (secondary) {
              secondary.style.transform = 'translateY(0) rotateX(0deg)';
            }
          }
        });
      }, { threshold: 0.15 });

      observer.observe(stage);
    }
  }

  // --------------------------------------------------------------------------
  // 8. SKILLS 3D ABILITY CARDS INTERACTION
  // --------------------------------------------------------------------------
  function initSkillsInteraction() {
    var cards = document.querySelectorAll('.ability-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
        playComicSound('click');
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var isFlipped = card.classList.toggle('is-flipped');
          card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
          playComicSound('click');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. 7-SCENE NAVIGATION & SCROLL SPY
  // --------------------------------------------------------------------------
  function initNavigation() {
    var navLinks = document.querySelectorAll('.nav-link');
    var trackerText = document.getElementById('issue-tracker');
    var sections = document.querySelectorAll('section[id]');

    var sectionNames = {
      hero: '01. COVER',
      about: '02. ABOUT',
      academics: '03. ACADEMICS',
      skills: '04. ABILITIES',
      projects: '05. MISSIONS',
      journey: '06. JOURNEY',
      contact: '07. FINALE'
    };

    function setActiveNav(id) {
      navLinks.forEach(function (link) {
        var match = link.getAttribute('data-nav') === id;
        link.classList.toggle('active', match);
      });
      if (trackerText && sectionNames[id]) {
        trackerText.textContent = sectionNames[id];
      }
      if (state.activeSceneId !== id) {
        state.activeSceneId = id;
        triggerCharacterEntrance(id);
      }
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          var targetId = href.substring(1);
          var targetEl = document.getElementById(targetId);
          if (targetEl) {
            triggerImpactFlash();
            setActiveNav(targetId);

            var headerOffset = 70;
            var elementPosition = targetEl.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // CTA buttons in hero
    var btnExplore = document.getElementById('btn-explore');
    if (btnExplore) {
      btnExplore.addEventListener('click', function () {
        triggerImpactFlash();
        playComicSound('click');
      });
    }
    var btnAbout = document.getElementById('btn-about');
    if (btnAbout) {
      btnAbout.addEventListener('click', function () {
        triggerImpactFlash();
        playComicSound('click');
      });
    }

    // IntersectionObserver for Scene Transitions
    if ('IntersectionObserver' in window) {
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            setActiveNav(id);
          }
        });
      }, {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0
      });

      sections.forEach(function (sec) {
        spyObserver.observe(sec);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 10. ACCESSIBLE MOBILE MENU
  // --------------------------------------------------------------------------
  function initMobileMenu() {
    var toggleBtn = document.getElementById('mobile-toggle');
    var navMenu = document.getElementById('site-nav');
    var navLinks = document.querySelectorAll('.nav-link');
    if (!toggleBtn || !navMenu) return;

    function openMenu() {
      toggleBtn.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      if (navLinks.length) navLinks[0].focus();
    }

    function closeMenu(restoreFocus) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      if (restoreFocus) toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
        playComicSound('whoosh');
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(true);
      });
    });

    document.addEventListener('click', function (e) {
      if (toggleBtn.getAttribute('aria-expanded') === 'true') {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
          closeMenu();
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  function initDynamicYear() {
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
      try {
        var y = new Date().getFullYear();
        if (y && !isNaN(y)) yearEl.textContent = y;
      } catch (e) {
        // Fallback in markup
      }
    }
  }

  // --------------------------------------------------------------------------
  // 12. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function initAll() {
    initDynamicYear();
    initSoundToggle();
    initThemeCycling();
    initHeroThreeScene();
    initHeroCoverTilt();
    initAboutHub();
    initAcademicsUnfold();
    initSkillsInteraction();
    initNavigation();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
