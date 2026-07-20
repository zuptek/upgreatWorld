/*
  Upgreat World Global Scripts
  - Dynamic component loading (fetch)
  - Active navigation state
  - Sticky navbar logic
  - Mobile menu interaction
  - FAQ Accordion
*/

function initializeFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq-item--open');
            // Close all other FAQs
            faqItems.forEach(otherItem => otherItem.classList.remove('faq-item--open'));
            // Toggle current if it wasn't open
            if (!isOpen) {
                item.classList.add('faq-item--open');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load Components
    loadComponent('header', './components/header.html', () => {
        initializeHeader();
        setActiveNav();
    });
    loadComponent('footer', './components/footer.html');

    // 2. Inject Floating Action Buttons (Global)
    injectFABs();

    // Page specific initializations
    setTimeout(() => {
        initializeFAQs();
    }, 500);

    // 3. Scroll Logic
    window.addEventListener('scroll', () => {
        // Navbar effect
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        }

        // FAB Top Visibility
        const topBtn = document.querySelector('.fab-button--top');
        if (topBtn) {
            if (window.scrollY > 200) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        }
    });
});

/**
 * Injects FAB markup before closing body
 */
function injectFABs() {
    const fabContainer = document.createElement('div');
    fabContainer.className = 'fab-container';
    fabContainer.innerHTML = `
        <a href="https://wa.me/919088655513" target="_blank" class="fab-button fab-button--whatsapp" data-tooltip="Chat on WhatsApp">
            <span class="material-symbols-outlined">chat</span>
        </a>
        <button class="fab-button fab-button--top" data-tooltip="Back to Top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <span class="material-symbols-outlined">arrow_upward</span>
        </button>
    `;
    document.body.appendChild(fabContainer);
}

/**
 * Loads a component HTML file into a placeholder element
 * @param {string} id - The ID of the element to load into
 * @param {string} url - The URL of the HTML component
 * @param {function} callback - Optional callback after load
 */
async function loadComponent(id, url, callback) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const html = await response.text();
            element.innerHTML = html;
            if (callback) callback();
            setActiveNav(); // Update active state after nav is loaded
        } else {
            console.error(`Failed to load component: ${url}`);
        }
    } catch (error) {
        console.error(`Error loading component: ${url}`, error);
    }
}

/**
 * Sets the active state on the navigation links based on current URL
 */
function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('nav__link--active');
        } else {
            link.classList.remove('nav__link--active');
        }
    });
}

/**
 * Initializes header specific interactions (e.g. Mobile Menu)
 */
function initializeHeader() {
    const mobileToggle = document.querySelector('.nav__mobile-toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav__menu--open');
            // Additional animation or styling for mobile menu can be added here
        });
    }
}
