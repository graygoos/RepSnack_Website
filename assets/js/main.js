/**
 * RepSnack Website Main Interactivity
 * - Navigation & Header Scroll State
 * - Interactive Glucose Curve Simulation (Gao et al. 2024)
 * - Light / Dark Mode Toggle with safe localStorage
 * - Exercise Media Selector & Newsletter Waitlist
 */

// Global Toggle Function with debounce guard to prevent duplicate rapid triggers
let _repSnackLastToggle = 0;
window.toggleRepSnackTheme = function() {
  const now = Date.now();
  if (now - _repSnackLastToggle < 250) {
    return; // Guard against rapid duplicate firing (e.g. inline onclick + listener or double tap)
  }
  _repSnackLastToggle = now;

  try {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
                   document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';

    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      if (document.body) {
        document.body.classList.add('dark');
        document.body.setAttribute('data-theme', 'dark');
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      if (document.body) {
        document.body.classList.remove('dark');
        document.body.setAttribute('data-theme', 'light');
      }
    }

    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {
      // Ignore security errors in restricted/file environments
    }

    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      btn.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  } catch (err) {
    console.error('RepSnack: Theme toggle error', err);
  }
};

const initRepSnack = () => {
  // 1. Header scroll state
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Drawer
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navOverlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  const toggleMobileNav = (open) => {
    if (navOverlay) {
      navOverlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  };

  mobileBtn?.addEventListener('click', () => toggleMobileNav(true));
  closeBtn?.addEventListener('click', () => toggleMobileNav(false));
  navOverlay?.addEventListener('click', (e) => {
    if (e.target === navOverlay) toggleMobileNav(false);
  });
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // 3. Interactive Glucose Response Curve Toggle
  const chartButtons = document.querySelectorAll('.chart-toggle-btn');
  const curveUncontrolled = document.querySelector('.curve-uncontrolled');
  const curveControlled = document.querySelector('.curve-controlled');
  const fillUncontrolled = document.querySelector('.fill-uncontrolled');
  const fillControlled = document.querySelector('.fill-controlled');
  const statReduction = document.querySelector('.stat-glucose-reduction');
  const statStatus = document.querySelector('.stat-curve-status');

  if (chartButtons.length > 0) {
    chartButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        chartButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-mode');

        if (mode === 'sitting') {
          if (curveUncontrolled) curveUncontrolled.style.opacity = '1';
          if (fillUncontrolled) fillUncontrolled.style.opacity = '0.35';
          if (curveControlled) curveControlled.style.opacity = '0.15';
          if (fillControlled) fillControlled.style.opacity = '0.05';
          if (statReduction) statReduction.textContent = '0%';
          if (statStatus) statStatus.textContent = 'Severe post-meal glycemic spike (+48 mg/dL above baseline)';
        } else if (mode === 'repsnack') {
          if (curveUncontrolled) curveUncontrolled.style.opacity = '0.15';
          if (fillUncontrolled) fillUncontrolled.style.opacity = '0.05';
          if (curveControlled) curveControlled.style.opacity = '1';
          if (fillControlled) fillControlled.style.opacity = '0.4';
          if (statReduction) statReduction.textContent = '~21%';
          if (statStatus) statStatus.textContent = 'Flattened glycemic excursion via hourly GLUT4 muscle activation';
        } else {
          // Both / Compare
          if (curveUncontrolled) curveUncontrolled.style.opacity = '1';
          if (fillUncontrolled) fillUncontrolled.style.opacity = '0.25';
          if (curveControlled) curveControlled.style.opacity = '1';
          if (fillControlled) fillControlled.style.opacity = '0.35';
          if (statReduction) statReduction.textContent = '~21%';
          if (statStatus) statStatus.textContent = 'Direct comparison: Sitting vs. 10 Hourly Squats (Gao et al., 2024)';
        }
      });
    });
  }

  // 4. Newsletter / Waitlist Form Handling
  const newsletterForm = document.querySelector('.newsletter-form');
  const newsletterMsg = document.querySelector('.newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        if (newsletterMsg) {
          newsletterMsg.innerHTML = '🎉 Thank you! You’re on the priority launch list for RepSnack.';
          newsletterMsg.style.color = 'var(--primary-teal)';
          newsletterMsg.style.marginTop = '0.75rem';
          newsletterMsg.style.fontWeight = '600';
          newsletterMsg.style.display = 'block';
        }
        emailInput.value = '';
      }
    });
  }

  // 5. Light / Dark Mode Toggle Event Listeners (fallback for buttons without inline onclick)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    if (!btn.hasAttribute('onclick')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleRepSnackTheme();
      });
    }
  });

  // Listen for OS scheme changes if user has not manually set a preference
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('theme')) {
          if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
            if (document.body) document.body.classList.add('dark');
          } else {
            document.documentElement.removeAttribute('data-theme');
            document.documentElement.classList.remove('dark');
            if (document.body) document.body.classList.remove('dark');
          }
        }
      } catch (err) {}
    });
  } catch (err) {}
};

// Execute immediately if DOM is already parsed, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRepSnack);
} else {
  initRepSnack();
}
