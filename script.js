// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button');
    const message = e.target.querySelector('.form-message');
    submitBtn.classList.add('submitting');
    fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        submitBtn.classList.remove('submitting');
        if (response.ok) {
            message.textContent = 'Message sent successfully!';
            message.classList.add('success');
            e.target.reset();
        } else {
            message.textContent = 'Error sending message. Please try again.';
            message.classList.add('error');
        }
        setTimeout(() => {
            message.textContent = '';
            message.classList.remove('success', 'error');
        }, 3000);
    })
    .catch(() => {
        submitBtn.classList.remove('submitting');
        message.textContent = 'Error sending message. Please try again.';
        message.classList.add('error');
        setTimeout(() => {
            message.textContent = '';
            message.classList.remove('error');
        }, 3000);
    });
});

// Back-to-top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section transitions
const sections = document.querySelectorAll('#about, #services, #portfolio, #contact');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));
