/**
 * ROYAL RAJASTHANI WEDDING INVITATION
 * "Aakarsh weds Pragya"
 * Frontend Interactive Controller & Animations
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. HERO PARTICLES & CINEMATIC OPENING
     ========================================================================== */
  function initHeroCinematics() {
    const backdrop = document.querySelector('.hero-backdrop');
    const moon = document.querySelector('.hero-moon');
    const topBadge = document.querySelector('.hero-top-badge');
    const heroCenter = document.querySelector('.hero-center');
    const heroBottom = document.querySelector('.hero-bottom');

    // Staggered cinematic sequence on load
    setTimeout(() => {
      if (backdrop) backdrop.classList.add('loaded');
      if (moon) moon.classList.add('visible');
    }, 200);

    setTimeout(() => {
      if (topBadge) topBadge.classList.add('visible');
    }, 600);

    setTimeout(() => {
      if (heroCenter) heroCenter.classList.add('visible');
    }, 1100);

    setTimeout(() => {
      if (heroBottom) heroBottom.classList.add('visible');
    }, 1800);

    initGoldenParticles();
  }

  function initGoldenParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = -(Math.random() * 0.4 + 0.15); // gentle upward drift
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.isFadingOut = Math.random() > 0.5;
        this.hue = Math.random() > 0.3 ? 43 : 48; // Royal gold tone
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Twinkle effect
        if (this.isFadingOut) {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.1) this.isFadingOut = false;
        } else {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.85) this.isFadingOut = true;
        }

        // Wrap around bounds
        if (this.y < -10) {
          this.y = canvas.height + 5;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10) this.x = canvas.width + 5;
        if (this.x > canvas.width + 10) this.x = -5;
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 85%, 70%, ${this.opacity})`);
        gradient.addColorStop(0.6, `hsla(${this.hue}, 80%, 55%, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.min(window.innerWidth > 768 ? 65 : 35, 75);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
  }

  /* ==========================================================================
     2. REVEAL THE DATE INTERACTION
     ========================================================================== */
  function initDateReveal() {
    const revealBtn = document.getElementById('btn-reveal-date');
    const revealedDateCard = document.getElementById('revealed-date-card');

    if (!revealBtn || !revealedDateCard) return;

    revealBtn.addEventListener('click', function () {
      revealBtn.style.pointerEvents = 'none';
      revealBtn.style.transform = 'scale(0.95)';
      revealBtn.style.opacity = '0.5';

      setTimeout(() => {
        revealBtn.style.display = 'none';
        revealedDateCard.classList.add('active');

        // Trigger celebratory mini sparkle sound or vibration if on mobile
        if (navigator.vibrate) {
          navigator.vibrate([40, 60, 40]);
        }
      }, 350);
    });
  }

  /* ==========================================================================
     3. LUXURY LIVE COUNTDOWN TIMER
     ========================================================================== */
  function initCountdownTimer() {
    // Wedding Date: February 16, 2027 10:00:00 IST
    const targetDate = new Date('2027-02-16T10:00:00+05:30').getTime();

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = days < 10 ? '0' + days : days;
      hoursEl.textContent = hours < 10 ? '0' + hours : hours;
      minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
      secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ==========================================================================
     4. CINEMATIC STORY CAROUSEL
     ========================================================================== */
  function initCarousel() {
    const viewport = document.getElementById('story-carousel-viewport');
    const track = document.getElementById('story-carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!viewport || !track) return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Create pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlidePosition() {
      const slideWidth = slides[0].offsetWidth + 32; // width + gap
      currentTranslate = -currentIndex * slideWidth;
      prevTranslate = currentTranslate;
      track.style.transform = `translateX(${currentTranslate}px)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));
      updateSlidePosition();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
        else goToSlide(slides.length - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
        else goToSlide(0);
      });
    }

    // Touch & Mouse Drag Support
    function touchStart(index) {
      return function (event) {
        isDragging = true;
        startPos = getPositionX(event);
        track.style.transition = 'none';
      };
    }

    function touchMove(event) {
      if (!isDragging) return;
      const currentPosition = getPositionX(event);
      const diff = currentPosition - startPos;
      currentTranslate = prevTranslate + diff;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;
      track.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

      if (movedBy < -50 && currentIndex < slides.length - 1) {
        currentIndex += 1;
      } else if (movedBy > 50 && currentIndex > 0) {
        currentIndex -= 1;
      }
      updateSlidePosition();
    }

    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    viewport.addEventListener('touchstart', touchStart(currentIndex), { passive: true });
    viewport.addEventListener('touchmove', touchMove, { passive: true });
    viewport.addEventListener('touchend', touchEnd);

    viewport.addEventListener('mousedown', touchStart(currentIndex));
    viewport.addEventListener('mousemove', touchMove);
    viewport.addEventListener('mouseup', touchEnd);
    viewport.addEventListener('mouseleave', () => {
      if (isDragging) touchEnd();
    });

    window.addEventListener('resize', updateSlidePosition);
  }

  /* ==========================================================================
     5. INSTAGRAM HASHTAG COPY
     ========================================================================== */
  function initHashtagCopy() {
    const copyBtn = document.getElementById('btn-copy-hashtag');
    const toast = document.getElementById('hashtag-copy-toast');
    const hashtagText = '#AakarshWedsPragya';

    if (!copyBtn || !toast) return;

    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(hashtagText);
        } else {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = hashtagText;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 3000);
      } catch (err) {
        console.error('Failed to copy hashtag: ', err);
      }
    });
  }

  /* ==========================================================================
     6. RSVP SERVICE & STORAGE ADAPTER
     ========================================================================== */
  class RSVPService {
    static STORAGE_KEY = 'royal_wedding_rsvps_aakarsh_pragya';

    static async submitRSVP(rsvpData) {
      // Clean async abstraction - easily connect to Firebase/Supabase in production
      try {
        const currentList = this.getAllRSVPs();
        const newRecord = {
          id: 'rsvp_' + Date.now(),
          createdAt: new Date().toISOString(),
          ...rsvpData
        };
        currentList.push(newRecord);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentList));
        return { success: true, record: newRecord };
      } catch (error) {
        console.error('Error saving RSVP:', error);
        return { success: false, error };
      }
    }

    static getAllRSVPs() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }
  }

  function initRSVPForm() {
    const form = document.getElementById('royal-rsvp-form');
    const modalOverlay = document.getElementById('rsvp-modal-overlay');
    const closeModalBtn = document.getElementById('btn-close-modal');

    if (!form || !modalOverlay) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const phone = document.getElementById('rsvp-phone').value.trim();
      const email = document.getElementById('rsvp-email').value.trim();
      const guests = document.getElementById('rsvp-guests').value;
      const meal = document.getElementById('rsvp-meal').value;
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name) {
        alert('Please provide your name so we can reserve your royal seating.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Confirming Royal Presence...';

      const result = await RSVPService.submitRSVP({
        name,
        phone,
        email,
        guests,
        meal,
        message
      });

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (result.success) {
        form.reset();
        modalOverlay.classList.add('active');
      }
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     7. SCROLL INTERSECTION OBSERVER
     ========================================================================== */
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up-element');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     8. AMBIENT ROYAL MUSIC / AUDIO PLAYER
     ========================================================================== */
  function initAmbientAudio() {
    const audioBtn = document.getElementById('btn-audio-toggle');
    if (!audioBtn) return;

    let isPlaying = false;
    let audioCtx = null;
    let oscillatorNodes = [];
    let gainNode = null;
    let timerId = null;

    // Synthesized Traditional Indian Raag Drone & Gentle Chimes using Web Audio API
    // This allows immediate ambient royalty-free royal sitar/tanpura tone without requiring external mp3 files!
    function startWebAudioDrone() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 3);
        gainNode.connect(audioCtx.destination);

        // Sa-Pa-Sa Tanpura harmonics (D3 root ~ 146.83 Hz, A3 fifth ~ 220 Hz, D4 octave ~ 293.66 Hz)
        const freqs = [146.83, 220.00, 293.66, 440.00, 587.33];
        freqs.forEach(freq => {
          const osc = audioCtx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          // Subtle detune for shimmer
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, audioCtx.currentTime);

          const localGain = audioCtx.createGain();
          localGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
          osc.connect(localGain);
          localGain.connect(gainNode);

          osc.start();
          oscillatorNodes.push(osc);
        });

        // Periodic gentle sitar chime notes
        const ragaNotes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25];
        timerId = setInterval(() => {
          if (!isPlaying || !audioCtx) return;
          const noteFreq = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];
          const chimeOsc = audioCtx.createOscillator();
          const chimeGain = audioCtx.createGain();

          chimeOsc.type = 'sine';
          chimeOsc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);

          chimeGain.gain.setValueAtTime(0, audioCtx.currentTime);
          chimeGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(audioCtx.destination);

          chimeOsc.start();
          chimeOsc.stop(audioCtx.currentTime + 2.6);
        }, 1800);

      } catch (err) {
        console.warn('Web Audio playback error:', err);
      }
    }

    function stopWebAudioDrone() {
      if (timerId) clearInterval(timerId);
      if (gainNode && audioCtx) {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
        setTimeout(() => {
          oscillatorNodes.forEach(osc => {
            try { osc.stop(); } catch(e){}
          });
          oscillatorNodes = [];
          if (audioCtx && audioCtx.state !== 'closed') {
            audioCtx.close();
          }
          audioCtx = null;
        }, 1050);
      }
    }

    audioBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      audioBtn.classList.toggle('playing', isPlaying);

      const tooltip = audioBtn.querySelector('.audio-tooltip');

      if (isPlaying) {
        if (tooltip) tooltip.textContent = 'Mute Royal Melody';
        startWebAudioDrone();
      } else {
        if (tooltip) tooltip.textContent = 'Play Royal Melody';
        stopWebAudioDrone();
      }
    });
  }

  /* ==========================================================================
     DOCUMENT INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCinematics();
    initDateReveal();
    initCountdownTimer();
    initCarousel();
    initHashtagCopy();
    initRSVPForm();
    initScrollAnimations();
    initAmbientAudio();
  });

})();
