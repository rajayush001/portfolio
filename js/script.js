function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        const isMatch = btn.dataset.category === category || (category === 'all' && btn.dataset.category === 'all');
        if (isMatch) btn.classList.add('active');
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-cat') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function initTheme() {
    const preferred = localStorage.getItem('portfolio-theme') || 'light';
    if (preferred === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    const icon = toggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateThemeToggleIcon();
}

function typewriterEffect() {
    const textElement = document.querySelector('.typewriter-text');
    const phrases = ['modern websites.', 'agile programs.', 'user-first experiences.', 'digital workflows.'];
    let currentPhrase = 0;
    let currentText = '';
    let adding = true;

    function update() {
        const phrase = phrases[currentPhrase];
        if (adding) {
            currentText = phrase.slice(0, currentText.length + 1);
            textElement.textContent = currentText;
            if (currentText === phrase) {
                adding = false;
                setTimeout(update, 1500);
                return;
            }
        } else {
            currentText = phrase.slice(0, currentText.length - 1);
            textElement.textContent = currentText;
            if (currentText === '') {
                adding = true;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }
        }
        setTimeout(update, adding ? 100 : 50);
    }

    if (textElement) update();
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
    });

    document.querySelectorAll('.scroll-item').forEach(item => observer.observe(item));
}

function initActiveNav() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = Array.from(document.querySelectorAll('section')).filter(section => section.id);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
            if (link) {
                if (entry.isIntersecting) {
                    navLinks.forEach(nav => nav.classList.remove('active-link'));
                    link.classList.add('active-link');
                }
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));
}

function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 400;
        button.classList.toggle('show', visible);
    });
}

function initAchievementCarousel() {
    const carousel = document.querySelector('.achievement-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.achievement-track');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 280;

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

function initTiltInteraction() {
    const tiltElements = document.querySelectorAll('.project-card, .skill-card, .education-card, .hero-visual');

    tiltElements.forEach((card) => {
        card.addEventListener('mousemove', (event) => {
            if (event.target.closest('a, button, .tech-tag, .tech-container')) {
                return;
            }

            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * -6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.classList.add('hovered');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.classList.remove('hovered');
        });
    });
}

function initApp() {
    initTheme();
    typewriterEffect();
    initScrollReveal();
    initActiveNav();
    initBackToTop();
    initAchievementCarousel();
    initTiltInteraction();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
}

window.addEventListener('DOMContentLoaded', initApp);