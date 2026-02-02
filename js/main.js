// Main JavaScript for AltekFlo Website

document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // NAVIGATION MENU TOGGLE
    // =========================
    
    // Desktop menu toggle
    const desktopMenuToggle = document.getElementById('desktopMenuToggle');
    const desktopNav = document.getElementById('desktopNav');
    
    if (desktopMenuToggle) {
        desktopMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            desktopNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update button text
            const span = this.querySelector('span');
            if (desktopNav.classList.contains('active')) {
                span.textContent = 'Close';
            } else {
                span.textContent = 'Menu';
            }
        });
    }
    
    // Close desktop menu when clicking outside
    document.addEventListener('click', function(e) {
        if (desktopNav && desktopNav.classList.contains('active') && 
            !desktopNav.contains(e.target) && 
            e.target !== desktopMenuToggle && 
            !desktopMenuToggle.contains(e.target)) {
            desktopNav.classList.remove('active');
            if (desktopMenuToggle) {
                desktopMenuToggle.classList.remove('active');
                const span = desktopMenuToggle.querySelector('span');
                if (span) span.textContent = 'Menu';
            }
        }
    });
    
    // Close desktop menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && desktopNav && desktopNav.classList.contains('active')) {
            desktopNav.classList.remove('active');
            if (desktopMenuToggle) {
                desktopMenuToggle.classList.remove('active');
                const span = desktopMenuToggle.querySelector('span');
                if (span) span.textContent = 'Menu';
            }
        }
    });
    
    // =========================
// =========================
    // MOBILE MENU TOGGLE
    // =========================
    const hamburgerButton = document.getElementById('hamburgerButton');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburgerButton && mobileNav) {
        hamburgerButton.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    if (closeMenuButton && mobileNav && hamburgerButton) {
        closeMenuButton.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            hamburgerButton.classList.remove('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            hamburgerButton.classList.remove('active');
        });
    });

    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            if (hamburgerButton) {
                hamburgerButton.classList.remove('active');
            }
        });
    });
    
    // =========================
    // POPUP FORM HANDLING
    // =========================
    const formPopup = document.getElementById('formPopup');
    const popupClose = document.querySelector('.popup-close');
    const popupOverlay = document.querySelector('.popup-overlay');
    const openPopupButtons = document.querySelectorAll('.open-popup');
    const popupForm = document.getElementById('popup-form');
    
    // Open popup
    openPopupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            formPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Close menus if open
            if (desktopNav && desktopNav.classList.contains('active')) {
                desktopNav.classList.remove('active');
                if (desktopMenuToggle) {
                    desktopMenuToggle.classList.remove('active');
                    const span = desktopMenuToggle.querySelector('span');
                    if (span) span.textContent = 'Menu';
                }
            }
            
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                if (hamburgerButton) {
                    hamburgerButton.classList.remove('active');
                }
            }
        });
    });
    
    // Close popup
    function closePopup() {
        formPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', closePopup);
    }
    
    // Close popup on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && formPopup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Form submission
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message (in a real app, you'd want to handle this properly)
            alert('Thank you for your request! We\'ll contact you within 24 hours.');
            
            // Reset form and close popup
            this.reset();
            closePopup();
        });
    }
    
    // =========================
    // SMOOTH SCROLLING
    // =========================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // =========================
    // HEADER SCROLL EFFECT
    // =========================
    const siteHeader = document.querySelector('.site-header');
    const logoImage = document.getElementById('logoImage');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
            // Switch to white logo on dark sections
            updateLogoColor();
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }
    
    function updateLogoColor() {
        // Check if we're in a dark section
        const sections = document.querySelectorAll('.dark-section');
        let inDarkSection = false;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                inDarkSection = true;
            }
        });
        
        if (inDarkSection || window.scrollY > 50) {
            // Switch to white logo
            if (logoImage && logoImage.src.includes('logo-black.svg')) {
                logoImage.src = logoImage.src.replace('logo-black.svg', 'logo-white.svg');
            }
        } else {
            // Switch to black logo
            if (logoImage && logoImage.src.includes('logo-white.svg')) {
                logoImage.src = logoImage.src.replace('logo-white.svg', 'logo-black.svg');
            }
        }
    }
    
    // Initial call
    updateHeaderOnScroll();
    updateLogoColor();
    
    // Update on scroll
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // =========================
    // IMAGE LAZY LOADING (for background images)
    // =========================
    const backgroundImages = document.querySelectorAll('[style*="background-image"]');
    
    // Create Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Force background image to load
                img.style.backgroundImage = img.style.backgroundImage;
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all background images
    backgroundImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // =========================
    // HOVER EFFECTS FOR FEATURE CARDS
    // =========================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // =========================
    // CONTACT FORM VALIDATION (if added later)
    // =========================
    const contactForm = document.querySelector('form:not(#popup-form)');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
        });
    }
    
    // =========================
    // ANIMATE ELEMENTS ON SCROLL
    // =========================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .contact-item, .flow-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .contact-item, .flow-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // =========================
    // CURRENT YEAR IN FOOTER
    // =========================
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
    }
});