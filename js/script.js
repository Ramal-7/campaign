// ACCORDION TOGGLE
function toggleAccordion(header) {
    const item = header.closest('.accordion-item');
    const isActive = item.classList.contains('active');

    // Close all siblings in the same accordion group
    const parent = item.parentElement;
    parent.querySelectorAll('.accordion-item').forEach(sibling => {
        sibling.classList.remove('active');
    });

    // Toggle clicked item
    if (!isActive) {
        item.classList.add('active');
    }
}

// SCROLL ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Accordion item animations
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Stepper items stagger
    const stepperItems = document.querySelectorAll('.stepper-item');
    stepperItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.08}s`;
    });

    const stepperObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.stepper-item');
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }
        });
    }, observerOptions);

    const stepper = document.querySelector('.stepper');
    if (stepper) {
        stepperObserver.observe(stepper);
    }
});

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FORM SUBMISSION
const feedbackForm = document.getElementById('feedback-form');
const feedbackInput = document.getElementById('feedback-input');
const formResponse = document.getElementById('form-response');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = feedbackInput.value.trim();

        if (feedback.length > 0) {
            formResponse.textContent = 'Thank you for your input. Your voice has been heard.';
            formResponse.className = 'form-response success';
            feedbackInput.value = '';

            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 5000);
        }
    });
}

// TIMELINE PHASE ANIMATION
const timelinePhases = document.querySelectorAll('.timeline-phase');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

timelinePhases.forEach((phase, index) => {
    phase.style.opacity = '0';
    phase.style.transform = 'translateX(-30px)';
    phase.style.transition = `all 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(phase);
});

// PARALLAX EFFECT ON HERO (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = Array.from(document.querySelectorAll('.section'));
        const currentScroll = window.scrollY;

        let targetSection = null;

        if (e.key === 'ArrowDown') {
            targetSection = sections.find(section =>
                section.offsetTop > currentScroll + 100
            );
        } else {
            targetSection = sections.reverse().find(section =>
                section.offsetTop < currentScroll - 100
            );
        }

        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// VOTE DATE COUNTDOWN
const updateCountdown = () => {
    const voteDate = new Date('2026-09-24T09:00:00');
    const now = new Date();
    const diff = voteDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        console.log(`${days} days and ${hours} hours until voting`);
    }
};

updateCountdown();
setInterval(updateCountdown, 3600000);

console.log('Ramal Pervaiz for HITS President 2026-2027');
console.log('Built to Last. Leave With Proof.');
console.log('Vote: September 24, 2026');
