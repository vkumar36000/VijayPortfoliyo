// ==========================================
// MAIN PORTFOLIO FUNCTIONALITY
// ==========================================

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initNavigation();
        this.initMobileMenu();
        this.initContactForm();
        this.initSmoothScrolling();
        this.initUtilities();
        this.initPerformanceOptimizations();
    }

    // Navigation functionality
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.setActiveNavLink(link);
                    this.closeMobileMenu();
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavOnScroll();
        });
    }

    scrollToSection(section) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    this.setActiveNavLink(activeLink);
                }
            }
        });
    }

    // Mobile menu functionality
    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Contact form functionality
    initContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            // Initialize EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.init("CCtjhyR8vAwcMfONJ"); // Replace with your EmailJS public key
            }

            contactForm.addEventListener('submit', (e) => {
                this.handleContactFormSubmit(e);
            });

            // Form validation and animations
            this.initFormValidation();
        }
    }

    async handleContactFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        this.setSubmitButtonLoading(submitBtn, true);

        try {
            // Get form data
            const formData = new FormData(form);
            const data = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validate form data
            if (!this.validateFormData(data)) {
                throw new Error('Please fill in all required fields.');
            }

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                await emailjs.send("service_7tpicbq", "template_wsy3bqa", data);
                this.showNotification('Message sent successfully! 🎉', 'success');
                form.reset();
                this.resetFormLabels();
            } else {
                // Fallback: simulate sending
                await this.simulateFormSubmission(data);
                this.showNotification('Thank you for your message! I\'ll get back to you soon. 📧', 'success');
                form.reset();
                this.resetFormLabels();
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification(error.message || 'Failed to send message. Please try again. ❌', 'error');
        } finally {
            this.setSubmitButtonLoading(submitBtn, false, originalText);
        }
    }

    validateFormData(data) {
        return data.from_name && 
               data.from_email && 
               data.subject && 
               data.message &&
               this.isValidEmail(data.from_email);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setSubmitButtonLoading(button, isLoading, originalText = '') {
        if (isLoading) {
            button.innerHTML = `
                <span class="btn-text">Sending...</span>
                <span class="btn-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </span>
            `;
            button.disabled = true;
        } else {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Simulated form submission:', data);
                resolve();
            }, 2000);
        });
    }

    resetFormLabels() {
        // Reset floating labels
        document.querySelectorAll('.form-input').forEach(input => {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('form-label')) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(label, {
                        y: 0,
                        scale: 1,
                        color: '#7f8c8d',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            }
        });
    }

    initFormValidation() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });

            input.addEventListener('input', () => {
                this.clearInputError(input);
            });
        });
    }

    validateInput(input) {
        const value = input.value.trim();
        const inputType = input.type;
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (inputType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Name validation
        if (input.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }

        // Subject validation
        if (input.name === 'subject' && value && value.length < 5) {
            isValid = false;
            errorMessage = 'Subject must be at least 5 characters long';
        }

        // Message validation
        if (input.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        if (!isValid) {
            this.showInputError(input, errorMessage);
        } else {
            this.clearInputError(input);
        }

        return isValid;
    }

    showInputError(input, message) {
        input.classList.add('error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff6b6b;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeIn 0.3s ease-out;
        `;

        input.parentNode.appendChild(errorElement);
    }

    clearInputError(input) {
        input.classList.remove('error');
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Smooth scrolling for browsers that don't support CSS scroll-behavior
    initSmoothScrolling() {
        // Check if browser supports smooth scrolling
        if (!CSS.supports('scroll-behavior', 'smooth')) {
            this.polyfillSmoothScrolling();
        }
    }

    polyfillSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement.offsetTop - 80, 600);
                }
            });
        });
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Utility functions
    initUtilities() {
        this.initNotificationSystem();
        this.initKeyboardNavigation();
        this.initImageLazyLoading();
        this.initExternalLinks();
        this.initCopyToClipboard();
    }

    initNotificationSystem() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        
        const typeColors = {
            success: '#4ecdc4',
            error: '#ff6b6b',
            info: '#00d4ff',
            warning: '#ffe66d'
        };

        notification.className = 'notification';
        notification.innerHTML = message;
        notification.style.cssText = `
            background: ${typeColors[type] || typeColors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            pointer-events: auto;
            cursor: pointer;
            max-width: 300px;
            word-wrap: break-word;
        `;

        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Click to dismiss
        notification.addEventListener('click', () => {
            this.dismissNotification(notification);
        });

        // Auto dismiss
        setTimeout(() => {
            this.dismissNotification(notification);
        }, duration);
    }

    dismissNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'Home':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('home'));
                    break;
                case 'End':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('contact'));
                    break;
                case '1':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('home'));
                    break;
                case '2':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('about'));
                    break;
                case '3':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('skills'));
                    break;
                case '4':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('projects'));
                    break;
                case '5':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('contact'));
                    break;
            }
        });
    }

    initImageLazyLoading() {
        // Simple lazy loading implementation
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    initExternalLinks() {
        // Add target="_blank" and security attributes to external links
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(link => {
            if (!link.hostname.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    initCopyToClipboard() {
        // Add copy functionality to email addresses
        const emailElements = document.querySelectorAll('.method-value');
        
        emailElements.forEach(element => {
            if (element.textContent.includes('@')) {
                element.style.cursor = 'pointer';
                element.title = 'Click to copy email address';
                
                element.addEventListener('click', () => {
                    this.copyToClipboard(element.textContent.trim());
                    this.showNotification('Email copied to clipboard! 📋', 'success');
                });
            }
        });
    }

    async copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
                this.fallbackCopyToClipboard(text);
            }
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Debounce scroll events
        this.debouncedScrollHandler = this.debounce(() => {
            this.updateActiveNavOnScroll();
        }, 16); // ~60fps

        window.addEventListener('scroll', this.debouncedScrollHandler);

        // Preload critical resources
        this.preloadCriticalResources();

        // Optimize images
        this.optimizeImages();

        // Service worker registration
        this.registerServiceWorker();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    preloadCriticalResources() {
        // Preload important fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    optimizeImages() {
        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img');
        const firstImage = images[0];

        images.forEach((img, index) => {
            if (index > 0) { // Skip hero image
                img.loading = 'lazy';
            }
        });
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Public API methods
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    refreshPage() {
        if (window.animationManager) {
            window.animationManager.refreshScrollTriggers();
        }
    }

    // Error handling
    handleError(error) {
        console.error('Portfolio error:', error);
        this.showNotification('Something went wrong. Please refresh the page.', 'error');
    }
}

// Initialize the portfolio app
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.portfolioApp = new PortfolioApp();
    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Export for testing/external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}

