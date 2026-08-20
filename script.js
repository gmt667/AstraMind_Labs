/**
 * AstraMind Labs - Multi-Page Enterprise Controller
 * Handles Theme Management (Dark/Light), Navigation Active State, Service Filters,
 * Delivery Lifecycle Stepper, Career Application Modal, FAQ Accordion, Back-to-Top,
 * URL Parameter Pre-selection, and Form Toast Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initMultiPageNavActive();
  initDeliveryLifecycleStepper();
  initServiceFilter();
  initFAQAccordion();
  initBackToTop();
  initCareerApplicationModal();
  initEnterpriseForms();
  initContactUrlPreselection();
  initScrollAnimations();
});

/* =========================================================
   1. Multi-Theme Management (Light & Executive Obsidian Dark)
   ========================================================= */
function initThemeManager() {
  const desktopToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-theme-toggle');
  const root = document.documentElement;

  // Retrieve saved theme or default to light
  const savedTheme = localStorage.getItem('astramind_theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('astramind_theme', theme);
  }

  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  }

  if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);
}

/* =========================================================
   2. Multi-Page Navigation Active Link Highlighting
   ========================================================= */
function initMultiPageNavActive() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  // Track sticky navbar on scroll
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
  }, { passive: true });

  // Determine current page filename
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.setAttribute('aria-controls', 'mobile-drawer');
    mobileToggle.setAttribute('aria-expanded', 'false');

    const setMobileMenuState = (isOpen) => {
      mobileDrawer.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => {
      setMobileMenuState(!mobileDrawer.classList.contains('open'));
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMobileMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMobileMenuState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) setMobileMenuState(false);
    }, { passive: true });
  }
}

/* =========================================================
   3. Service Practice Areas Filter (on services.html)
   ========================================================= */
function initServiceFilter() {
  const filterButtons = document.querySelectorAll('.svc-filter-btn');
  const serviceCards = document.querySelectorAll('.services-catalog .service-box');
  if (!filterButtons.length || !serviceCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =========================================================
   4. Delivery Lifecycle 6-Stage Stepper (on methodology.html)
   ========================================================= */
const STAGE_DATA = {
  1: {
    indicator: 'Stage 01',
    headline: 'Research the Problem',
    action: 'Understand the end-users, operating environment, infrastructure constraints, and economic opportunity.',
    purpose: 'Establish a validated baseline of operational realities before writing any code or committing infrastructure resources.'
  },
  2: {
    indicator: 'Stage 02',
    headline: 'Design the Solution',
    action: 'Define the architectural blueprint, security perimeter, data models, and intuitive user experience.',
    purpose: 'Align client leadership on technical roadmaps, performance milestones, and modular specifications.'
  },
  3: {
    indicator: 'Stage 03',
    headline: 'Build the Intelligence',
    action: 'Develop the core software, training custom AI models, API layers, and automated workflows.',
    purpose: 'Engineer robust, scalable algorithms and application code according to rigorous testing standards.'
  },
  4: {
    indicator: 'Stage 04',
    headline: 'Deploy Securely',
    action: 'Launch onto tier-3 cloud infrastructure with automated backups, SSL encryption, and telemetry monitoring.',
    purpose: 'Ensure uninterrupted uptime, rapid failover, and comprehensive operational documentation for staff.'
  },
  5: {
    indicator: 'Stage 05',
    headline: 'Learn and Improve',
    action: 'Monitor telemetry data, analyze system throughput, collect stakeholder feedback, and perform upgrades.',
    purpose: 'Continuously strengthen algorithm accuracy, UX responsiveness, and security resilience.'
  },
  6: {
    indicator: 'Stage 06',
    headline: 'Scale the Impact',
    action: 'Extend proven architectures to additional regional markets, departments, and integrated products.',
    purpose: 'Maximize commercial returns, achieve economies of scale, and build lasting technological assets.'
  }
};

function initDeliveryLifecycleStepper() {
  const stepButtons = document.querySelectorAll('.cycle-step-btn');
  const panelContent = document.getElementById('lifecycle-panel-content');
  if (!stepButtons.length || !panelContent) return;

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stepNum = btn.getAttribute('data-step');
      const data = STAGE_DATA[stepNum];
      if (!data) return;

      panelContent.style.opacity = '0';
      panelContent.style.transform = 'translateY(8px)';

      setTimeout(() => {
        panelContent.innerHTML = `
          <span class="panel-step-indicator">${data.indicator}</span>
          <h3 class="panel-step-headline">${data.headline}</h3>
          <div class="panel-section-label">Core Action</div>
          <p class="panel-action-text">${data.action}</p>
          <div class="panel-section-label">Strategic Purpose</div>
          <p class="panel-purpose-text">${data.purpose}</p>
        `;
        panelContent.style.opacity = '1';
        panelContent.style.transform = 'translateY(0)';
      }, 160);
    });
  });
}

/* =========================================================
   5. FAQ Accordion Manager
   ========================================================= */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* =========================================================
   6. Floating Back to Top Button
   ========================================================= */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =========================================================
   7. Career Application Modal Handlers
   ========================================================= */
function initCareerApplicationModal() {
  const modal = document.getElementById('career-app-modal');
  const dismissBtn = document.getElementById('modal-dismiss-btn');
  const targetRoleTitle = document.getElementById('selected-role-name');
  const applyButtons = document.querySelectorAll('.btn-job-apply');

  if (!modal) return;

  applyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-job') || 'Position at AstraMind Labs';
      if (targetRoleTitle) targetRoleTitle.textContent = role;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* =========================================================
   8. Enterprise Form Submissions & Toast Alerts
   ========================================================= */
function initEnterpriseForms() {
  const contactForm = document.getElementById('enterprise-contact-form');
  const careerForm = document.getElementById('career-application-form');
  const modal = document.getElementById('career-app-modal');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim() || 'Valued Client';
      const org = document.getElementById('contact-org').value.trim() || 'your organisation';
      
      showToastNotice(`Thank you, ${name}! Your consultation request for ${org} has been received. Our executive team will respond within 24 business hours.`);
      contactForm.reset();
    });
  }

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const applicant = document.getElementById('applicant-name').value.trim() || 'Applicant';
      const role = document.getElementById('selected-role-name') ? document.getElementById('selected-role-name').textContent : 'Role';
      const cvInput = document.getElementById('applicant-cv');
      const cvFile = cvInput && cvInput.files ? cvInput.files[0] : null;

      if (!cvFile) {
        if (cvInput) cvInput.reportValidity();
        return;
      }

      if (cvFile.size > 5 * 1024 * 1024) {
        cvInput.setCustomValidity('Please upload a CV smaller than 5 MB.');
        cvInput.reportValidity();
        return;
      }

      cvInput.setCustomValidity('');
      
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }

      showToastNotice(`Application received for ${applicant} (${role}). Our talent team will review your submission.`);
      careerForm.reset();
    });

    const cvInput = document.getElementById('applicant-cv');
    if (cvInput) {
      cvInput.addEventListener('change', () => cvInput.setCustomValidity(''));
    }
  }
}

function showToastNotice(message) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5500);
}

/* =========================================================
   9. URL Query Parameter Pre-selection (on contact.html)
   ========================================================= */
function initContactUrlPreselection() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const serviceSelect = document.getElementById('contact-service');

  if (serviceParam && serviceSelect) {
    const validValues = ['ai', 'software', 'cloud', 'enterprise', 'consulting', 'research', 'other'];
    if (validValues.includes(serviceParam)) {
      serviceSelect.value = serviceParam;
    }
  }
}

/* =========================================================
   10. Scroll Reveal Animations
   ========================================================= */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.service-box, .product-item-card, .industry-sector-box, .executive-card, .adv-box, .insight-post-card');
  
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}
