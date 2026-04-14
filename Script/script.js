// --- Navigation Scroll Effect ---
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('[data-reveal]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // If it has progress fills, trigger them
            const bars = entry.target.querySelectorAll('.progress-fill');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"], .nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- ScrollSpy: Permanent Active Link Glow ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active-link');
        if (current && (li.getAttribute('href') === `#${current}` || li.getAttribute('href') === `index.html#${current}`)) {
            li.classList.add('active-link');
        }
    });
});

// --- Interactive Hover Effects for Feature & Team Cards ---
const interactiveCards = document.querySelectorAll('.feature-card, .team-card');
interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    const mobileLinks = navLinks.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}
