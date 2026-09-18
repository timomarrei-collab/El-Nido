// Enhanced Beach Vibes - Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  // Mobile navigation toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Dynamic header shadow on scroll
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    if (scrolled > 50) {
      header.style.boxShadow = '0 10px 30px rgba(14, 165, 164, 0.25)';
    } else {
      header.style.boxShadow = '0 4px 6px rgba(14, 165, 164, 0.1)';
    }
    
    // Parallax effect on hero
    if (hero && scrolled < 1000) {
      hero.style.backgroundPosition = 'center ' + (scrolled * 0.5) + 'px';
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 50);
      }
    });
  }, observerOptions);

  // Observe elements for animations
  document.querySelectorAll('.gallery-item, .activity-card, .fact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
  });

  // Button hover ripple effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Lazy load images with fallback
  const images = document.querySelectorAll('img[src*="svg"]');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.backgroundColor = '#dce9e8';
    });
  });
});

// CSS animations injected
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
