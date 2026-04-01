/* ============================================
   J.N.S.D. Education Centre — Premium Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2200);
  });
  // Fallback
  setTimeout(() => preloader.classList.add('hidden'), 4000);

  // --- Navbar ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll handler
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 60);
    lastScrollY = scrollY;

    // Active section detection
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('visible', scrollY > 600);
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // --- Back to top ---
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Hero Particles ---
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(212, 168, 67, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 40 + 10}px, -${Math.random() * 30 + 10}px) scale(1.2); opacity: 0.6; }
        50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 20}px, ${Math.random() * 20}px) scale(0.8); opacity: 0.4; }
        75% { transform: translate(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 30}px, -${Math.random() * 15}px) scale(1.1); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }

  // --- Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Trigger counters when hero stats are visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // --- Scroll Animations (AOS-like) ---
  const animatedElements = document.querySelectorAll('[data-aos]');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(el => scrollObserver.observe(el));

  // --- Form Handling ---
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const parentName = document.getElementById('parentName').value;
      const phone = document.getElementById('phoneNumber').value;
      const childName = document.getElementById('childName').value;
      const classSelected = document.getElementById('classSelect').value;

      // Compose WhatsApp message
      const message = encodeURIComponent(
        `Hello J.N.S.D. Education Centre!\n\n` +
        `I am interested in admission for my child.\n\n` +
        `Parent's Name: ${parentName}\n` +
        `Phone: ${phone}\n` +
        `Child's Name: ${childName}\n` +
        `Class: ${classSelected}\n\n` +
        `Please share the admission details. Thank you!`
      );

      const whatsappURL = `https://wa.me/916392891970?text=${message}`;

      // Show success feedback
      const btn = admissionForm.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
      btn.style.background = 'linear-gradient(135deg, #2e7d32, #4caf50)';
      btn.style.color = '#fff';

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.color = '';
        admissionForm.reset();
      }, 1000);
    });
  }

  // --- Smooth Scroll for Anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Parallax on Hero (subtle) ---
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.15;
      hero.style.transform = `translateY(${offset}px)`;
      hero.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
    }
  });

});
