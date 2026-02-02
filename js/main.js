// Safe Main JavaScript for AltekFlo Website
document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // HELPERS
  // =========================
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  // =========================
  // DESKTOP MENU
  // =========================
  const desktopMenuToggle = $('desktopMenuToggle');
  const desktopNav = $('desktopNav');

  if (desktopMenuToggle && desktopNav) {
    desktopMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      desktopNav.classList.toggle('active');
      desktopMenuToggle.classList.toggle('active');
      const span = desktopMenuToggle.querySelector('span');
      if (span) span.textContent = desktopNav.classList.contains('active') ? 'Close' : 'Menu';
    });

    document.addEventListener('click', (e) => {
      if (
        desktopNav.classList.contains('active') &&
        !desktopNav.contains(e.target) &&
        !desktopMenuToggle.contains(e.target)
      ) {
        desktopNav.classList.remove('active');
        desktopMenuToggle.classList.remove('active');
        const span = desktopMenuToggle.querySelector('span');
        if (span) span.textContent = 'Menu';
      }
    });
  }

  // =========================
  // MOBILE MENU
  // =========================
  const hamburgerButton = $('hamburgerButton');
  const closeMenuButton = $('closeMenuButton');
  const mobileNav = $('mobileNav');

  if (hamburgerButton && mobileNav) {
    hamburgerButton.addEventListener('click', () => {
      hamburgerButton.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  }

  if (closeMenuButton && mobileNav && hamburgerButton) {
    closeMenuButton.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      hamburgerButton.classList.remove('active');
    });
  }

  $$('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.remove('active');
      if (hamburgerButton) hamburgerButton.classList.remove('active');
    });
  });

  // =========================
  // POPUP FORM
  // =========================
  const formPopup = $('formPopup');
  const popupClose = document.querySelector('.popup-close');
  const popupOverlay = document.querySelector('.popup-overlay');
  const openPopupButtons = $$('.open-popup');

  function closePopup() {
    if (!formPopup) return;
    formPopup.classList.remove('active');
    document.body.style.overflow = '';
  }

  openPopupButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!formPopup) return;
      formPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (desktopNav) desktopNav.classList.remove('active');
      if (mobileNav) mobileNav.classList.remove('active');
    });
  });

  if (popupClose) popupClose.addEventListener('click', closePopup);
  if (popupOverlay) popupOverlay.addEventListener('click', closePopup);

  // =========================
  // HEADER SCROLL
  // =========================
  const siteHeader = document.querySelector('.site-header');
  const logoImage = $('logoImage');

  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  if (logoImage) {
    window.addEventListener('scroll', () => {
      const useWhite = window.scrollY > 50;
      logoImage.src = logoImage.src.replace(
        useWhite ? 'logo-black.svg' : 'logo-white.svg',
        useWhite ? 'logo-white.svg' : 'logo-black.svg'
      );
    });
  }

  // =========================
  // SAFE INTERSECTION OBSERVER
  // =========================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    $$('.feature-card, .contact-item, .flow-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = '0.4s ease';
      observer.observe(el);
    });
  }

  // =========================
  // FOOTER YEAR
  // =========================
  const copyright = document.querySelector('.copyright');
  if (copyright) {
    copyright.innerHTML = copyright.innerHTML.replace(
      '2026',
      new Date().getFullYear()
    );
  }

});
