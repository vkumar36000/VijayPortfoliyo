// ==========================================
// GSAP ANIMATIONS MANAGER
// ==========================================

class AnimationManager {
    constructor() {
        this.isGSAPLoaded = typeof gsap !== 'undefined';
        this.scrollTriggers = [];
        this.timelines = new Map();
        this.init();
    }

    init() {
        if (!this.isGSAPLoaded) {
            console.warn('GSAP not loaded, using CSS fallbacks');
            this.initCSSFallbacks();
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        this.initScrollAnimations();
        this.initTimelineAnimations();
        this.initInteractiveAnimations();
        this.initPageLoadAnimations();
        this.setupGlobalSettings();
    }

    setupGlobalSettings() {
        // Smoother scrolling
        gsap.config({
            force3D: true,
            nullTargetWarn: false
        });

        // Set default ease
        gsap.defaults({
            duration: 1,
            ease: "power2.out"
        });
    }

    initPageLoadAnimations() {
        const tl = gsap.timeline();

        // Loading screen animation
        tl.to("#loading-screen", {
            opacity: 0,
            duration: 0.5,
            delay: 2,
            onComplete: () => {
                document.getElementById('loading-screen').classList.add('hidden');
            }
        });

        // Hero section entrance
        tl.from(".hero-greeting", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3")
        .from(".hero-title .title-line", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5")
        .from(".hero-description", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .from(".hero-buttons .btn", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".hero-social .social-link", {
            x: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.6")
        .from(".scroll-indicator", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");

        this.timelines.set('pageLoad', tl);
    }

    initScrollAnimations() {
        // Section headers animation
        gsap.utils.toArray('.section-header').forEach(header => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(header.querySelector('.section-number'), {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            })
            .from(header.querySelector('.section-title'), {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.3")
            .from(header.querySelector('.section-line'), {
                scaleX: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");
        });

        // About section animations
        this.animateAboutSection();

        // Skills section animations
        this.animateSkillsSection();

        // Projects section animations
        this.animateProjectsSection();

        // Contact section animations
        this.animateContactSection();

        // Stats counter animation
        this.animateStatsCounters();

        // Floating elements parallax
        this.initParallaxAnimations();
    }

    animateAboutSection() {
        const aboutContainer = document.querySelector('.about-container');
        if (!aboutContainer) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutContainer,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from('.about-text', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from('.about-image', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.7")
        .from('.stat-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5");
    }

    animateSkillsSection() {
        const skillsContainer = document.querySelector('.skills-container');
        if (!skillsContainer) return;

        // Animate skill bars
        gsap.utils.toArray('.skill-item').forEach((skillItem, index) => {
            const skillProgress = skillItem.querySelector('.skill-progress');
            const skillPercentage = skillItem.getAttribute('data-skill');

            ScrollTrigger.create({
                trigger: skillItem,
                start: "top 90%",
                onEnter: () => {
                    // Animate skill item appearance
                    gsap.to(skillItem, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power3.out"
                    });

                    // Animate progress bar
                    gsap.to(skillProgress, {
                        width: skillPercentage + '%',
                        duration: 1.5,
                        delay: index * 0.1 + 0.3,
                        ease: "power3.out"
                    });
                }
            });
        });

        // Animate skills visual
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.skills-visual',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from('.tech-orbit', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        })
        .from('.orbit-item', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.5");
    }

    animateProjectsSection() {
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(card, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out"
            });

            // Hover animations
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    animateContactSection() {
        const contactContainer = document.querySelector('.contact-container');
        if (!contactContainer) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contactContainer,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from('.contact-info', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from('.contact-form', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.7")
        .from('.contact-method', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.5");
    }

    animateStatsCounters() {
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const finalValue = parseInt(stat.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: stat,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(stat, {
                        innerText: finalValue,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        stagger: 0.2
                    });
                }
            });
        });
    }

    initParallaxAnimations() {
        // Floating elements parallax
        gsap.utils.toArray('.floating-element').forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            
            gsap.to(element, {
                y: -100 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // Background parallax
        gsap.to('.hero-particles', {
            y: -200,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    initTimelineAnimations() {
        // Subtitle text rotation
        const subtitleTexts = document.querySelectorAll('.subtitle-text');
        if (subtitleTexts.length > 0) {
            const subtitleTl = gsap.timeline({ repeat: -1 });
            
            subtitleTexts.forEach((text, index) => {
                subtitleTl.to(text, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, index * 3)
                .to(text, {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: "none"
                })
                .to(text, {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: "power2.in"
                });
            });

            this.timelines.set('subtitle', subtitleTl);
        }
    }

    initInteractiveAnimations() {
        // Button hover animations
        gsap.utils.toArray('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(btn.querySelector('.btn-icon'), {
                    x: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(btn.querySelector('.btn-icon'), {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Social links hover
        gsap.utils.toArray('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    y: -5,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
        });

        // Form input focus animations
        gsap.utils.toArray('.form-input').forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input.nextElementSibling, {
                    y: -20,
                    scale: 0.8,
                    color: '#00d4ff',
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(input.parentNode.querySelector('.form-line'), {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    gsap.to(input.nextElementSibling, {
                        y: 0,
                        scale: 1,
                        color: '#7f8c8d',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
                gsap.to(input.parentNode.querySelector('.form-line'), {
                    scaleX: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Navbar scroll effect
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: {
                className: "scrolled",
                targets: ".navbar"
            }
        });

        // Active navigation link
        gsap.utils.toArray('.nav-link').forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 30%",
                    end: "bottom 30%",
                    onEnter: () => this.setActiveNavLink(link),
                    onEnterBack: () => this.setActiveNavLink(link)
                });
            }
        });
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all links
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        activeLink.classList.add('active');
    }

    // CSS Fallbacks for browsers without GSAP
    initCSSFallbacks() {
        // Simple reveal on scroll using Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        // Observe elements for reveal animation
        document.querySelectorAll('.section-header, .skill-item, .project-card, .stat-item').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Simple loading screen removal
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 2000);
    }

    // Page transition animations
    animatePageTransition(direction = 'in') {
        if (!this.isGSAPLoaded) return;

        const tl = gsap.timeline();
        
        if (direction === 'out') {
            tl.to('main', {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.in"
            });
        } else {
            tl.from('main', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        return tl;
    }

    // Utility methods
    pauseAllAnimations() {
        if (this.isGSAPLoaded) {
            gsap.globalTimeline.pause();
        }
    }

    resumeAllAnimations() {
        if (this.isGSAPLoaded) {
            gsap.globalTimeline.resume();
        }
    }

    killAllAnimations() {
        if (this.isGSAPLoaded) {
            gsap.killTweensOf("*");
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }

    // Responsive animations
    refreshScrollTriggers() {
        if (this.isGSAPLoaded && ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    // Performance optimizations
    optimizeForPerformance() {
        if (this.isGSAPLoaded) {
            // Reduce animation quality on slower devices
            const isSlowDevice = navigator.hardwareConcurrency <= 2;
            
            if (isSlowDevice) {
                gsap.defaults({
                    duration: 0.5,
                    ease: "power1.out"
                });
            }

            // Pause animations when page is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseAllAnimations();
                } else {
                    this.resumeAllAnimations();
                }
            });
        }
    }
}

// Cursor animation
class CursorAnimation {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorInner = document.querySelector('.cursor-inner');
        this.cursorOuter = document.querySelector('.cursor-outer');
        
        if (!this.cursor) return;
        
        this.init();
    }

    init() {
        // Hide cursor on touch devices
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
            return;
        }

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            gsap.to(this.cursorInner, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            
            gsap.to(this.cursorOuter, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Hover effects
        document.querySelectorAll('a, button, .btn, .project-card, .social-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// Theme animation
class ThemeAnimation {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        
        if (typeof gsap !== 'undefined') {
            // Animate theme transition
            gsap.to('body', {
                opacity: 0.8,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    document.documentElement.setAttribute('data-theme', newTheme);
                    this.currentTheme = newTheme;
                    localStorage.setItem('theme', newTheme);
                    
                    gsap.to('body', {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        } else {
            // Fallback without animation
            document.documentElement.setAttribute('data-theme', newTheme);
            this.currentTheme = newTheme;
            localStorage.setItem('theme', newTheme);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation manager
    window.animationManager = new AnimationManager();
    
    // Initialize cursor animation
    window.cursorAnimation = new CursorAnimation();
    
    // Initialize theme animation
    window.themeAnimation = new ThemeAnimation();
    
    // Optimize for performance
    window.animationManager.optimizeForPerformance();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            window.animationManager.refreshScrollTriggers();
        }, 300);
    });
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationManager, CursorAnimation, ThemeAnimation };
}