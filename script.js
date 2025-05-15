document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize AOS (Animate On Scroll Library) ---
    AOS.init({
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out-quad', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight; // Get actual height
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight * 0.5) { // Adjust threshold as needed
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');
    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = primaryNav.classList.contains('nav-open');
            primaryNav.classList.toggle('nav-open', !isVisible);
            mobileNavToggle.setAttribute('aria-expanded', !isVisible);
            // Optional: Prevent body scroll when nav is open
            // document.body.style.overflow = !isVisible ? 'hidden' : ''; 
        });
    }
    // Close mobile nav when a link is clicked
    const navLinksForMobileClose = primaryNav.querySelectorAll('.nav-link');
    navLinksForMobileClose.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNav.classList.contains('nav-open')) {
                primaryNav.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                // document.body.style.overflow = '';
            }
        });
    });


    // --- Smooth Scrolling & Active Nav Link Highlighting ---
    const navLinks = document.querySelectorAll('#primary-navigation .nav-link');
    const sections = document.querySelectorAll('main section[id]');

    function updateActiveNavLink() {
        let currentSectionId = 'hero'; // Default to hero
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust threshold for when a section is considered "active"
            // It should be active when its top is near or past the header bottom
            if (pageYOffset >= sectionTop - header.offsetHeight - 50) { // Added 50px buffer
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            // Ensure href exists and matches section id
            if (href && href.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call on load

    document.querySelectorAll('a.scroll-link, #primary-navigation a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) { // Only process hash links
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    let targetPosition = targetElement.offsetTop - header.offsetHeight + 1;
                    // Special case for hero section to scroll all the way to top
                    if (href === '#hero') {
                        targetPosition = 0;
                    }
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Dynamic Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});