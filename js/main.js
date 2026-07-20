/* ============================================
   framed@ — Main JavaScript
   Navigation, mobile menu, scroll animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollAnimations();
    initContactForm();
    initSignupForm();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('nav__toggle--open');
        links.classList.toggle('nav__links--open');
        document.body.style.overflow = links.classList.contains('nav__links--open') ? 'hidden' : '';
    });

    links.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('nav__toggle--open');
            links.classList.remove('nav__links--open');
            document.body.style.overflow = '';
        });
    });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in--visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* --- Contact Form (visual only) --- */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'MESSAGE SENT';
        btn.style.background = '#000000';
        btn.style.color = '#FFFFFF';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            form.reset();
        }, 2000);
    });
}

/* --- Signup Form (visual only) --- */
function initSignupForm() {
    const form = document.querySelector('.signup__form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.signup__btn');
        const input = form.querySelector('.signup__input');
        const originalText = btn.textContent;
        btn.textContent = 'SUBSCRIBED';

        setTimeout(() => {
            btn.textContent = originalText;
            input.value = '';
        }, 2000);
    });
}
