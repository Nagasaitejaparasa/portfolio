// Loading animations
document.addEventListener('DOMContentLoaded', function() {
    // Profile image loading animation
    const profileImages = document.querySelectorAll('.profile-image-container img');
    profileImages.forEach(img => {
        if (img.complete) {
            setTimeout(() => img.classList.add('loaded'), 100);
        } else {
            img.onload = () => setTimeout(() => img.classList.add('loaded'), 100);
        }
    });

    // Add loading class to other images and cards
    const images = document.querySelectorAll('img:not(.profile-image-container img)');
    images.forEach(img => {
        img.classList.add('loading');
        img.onload = () => img.classList.remove('loading');
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('fade-in');
    });

    // Initialize active nav items
    updateActiveNavItem();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with enhanced feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'alert mt-3';
        this.appendChild(feedbackDiv);

        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.reset();
                feedbackDiv.className = 'alert alert-success mt-3';
                feedbackDiv.textContent = 'Message sent successfully! I will get back to you soon.';
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            feedbackDiv.className = 'alert alert-danger mt-3';
            feedbackDiv.textContent = 'Error sending message. Please try again or contact me directly via email.';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
            setTimeout(() => feedbackDiv.remove(), 5000);
        }
    });
}

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active state to nav items based on current section
function updateActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentPath.split('/').pop()) {
            item.classList.add('active');
        }
    });
}