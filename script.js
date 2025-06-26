// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Custom validation with styled error messages
function showValidationError(element, message) {
    // Remove any existing error
    hideValidationError(element);
    
    // Create error tooltip
    const errorTooltip = document.createElement('div');
    errorTooltip.className = 'validation-error-tooltip';
    errorTooltip.textContent = message;
    
    // Position relative to input
    element.parentNode.style.position = 'relative';
    element.parentNode.appendChild(errorTooltip);
    
    // Add error styling to input
    element.classList.add('validation-error');
    
    // Auto-hide after 5 seconds
    setTimeout(() => hideValidationError(element), 5000);
}

function hideValidationError(element) {
    const tooltip = element.parentNode.querySelector('.validation-error-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
    element.classList.remove('validation-error');
}

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('input[type="email"]');
    const nameInput = document.querySelector('input[name="name"]');
    const messageInput = document.querySelector('textarea[name="message"]');
    
    if (emailInput) {
        emailInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            let message;
            if (this.validity.valueMissing) {
                message = '// ERROR: email field cannot be empty';
            } else if (this.validity.typeMismatch) {
                message = '// SYNTAX ERROR: invalid email format';
            } else {
                message = '// VALIDATION ERROR: check email format';
            }
            showValidationError(this, message);
        });
        
        emailInput.addEventListener('input', function() {
            this.setCustomValidity('');
            hideValidationError(this);
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            showValidationError(this, '// ERROR: name field required');
        });
        
        nameInput.addEventListener('input', function() {
            this.setCustomValidity('');
            hideValidationError(this);
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            showValidationError(this, '// ERROR: message cannot be empty');
        });
        
        messageInput.addEventListener('input', function() {
            this.setCustomValidity('');
            hideValidationError(this);
        });
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const data = new FormData(form);
        
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showNotification('Thank you! Your message has been sent.', 'success');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMessage = data["errors"].map(error => error["message"]).join(", ");
                        showNotification(`// ERROR: ${errorMessage} - check your input and try again`, 'error');
                    } else {
                        showNotification('// FATAL ERROR: form submission failed - please debug and retry', 'error');
                    }
                })
            }
        }).catch(error => {
            showNotification('// CONNECTION ERROR: network timeout - check your connection and try again', 'error');
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00f260' : type === 'error' ? '#ff4757' : '#00f260'};
        color: ${type === 'success' || type === 'info' ? '#0a0a0a' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        border: 1px solid ${type === 'success' || type === 'info' ? '#00c950' : '#ff3742'};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function typeText(element, text, callback, speed = 90) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);
    
    function typeChar() {
        if (i < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(typeChar, speed);
        } else {
            cursor.remove();
            if (callback) callback();
        }
    }
    typeChar();
}

function initHeroAnimation() {
    const titleEl = document.getElementById('hero-title');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const hero1 = document.getElementById('hero-1');
    const hero2 = document.getElementById('hero-2');
    const initialText = "hi, my name is nicholas le";

    if (!titleEl || !scrollIndicator || !hero1 || !hero2) return;
    
    // Hide scroll indicator initially
    scrollIndicator.style.opacity = '0';

    // 1. Start the typing animation
    typeText(titleEl, initialText, () => {
        // 2. When typing is done, show the scroll indicator
        scrollIndicator.style.opacity = '1';
        
        // 3. Add click handler to scroll indicator
        scrollIndicator.addEventListener('click', () => {
            // Scroll to center the hero-2 content on screen
            const hero2Rect = hero2.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const hero2Height = hero2.offsetHeight;
            const scrollTo = hero2.offsetTop - (windowHeight - hero2Height) / 2;
            
            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        });
    });

    // 3. Handle scroll to create smooth transition effect
    let isTransitioning = false;
    
    window.addEventListener('scroll', () => {
        const hero1Rect = hero1.getBoundingClientRect();
        const hero2Rect = hero2.getBoundingClientRect();
        
        // If we're scrolling away from hero-1 and haven't transitioned yet
        if (hero1Rect.top < -100 && hero2Rect.top > 0 && !isTransitioning) {
            isTransitioning = true;
            
            // Create smooth transition effect - fade out and move up
            titleEl.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            titleEl.style.transform = 'translateY(-50px)';
            titleEl.style.opacity = '0.3';
            
            // Hide scroll indicator
            scrollIndicator.style.opacity = '0';
            
            // Allow natural scrolling; reset transition flag after animation
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }
        
        // When scrolling back to hero-1 - smoothly fade back to full opacity
        if (hero1Rect.top > -50 && !isTransitioning) {
            isTransitioning = true;

            // Smoothly fade back in and slide down
            titleEl.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            titleEl.style.transform = 'translateY(0)';
            titleEl.style.opacity = '1';

            // Show scroll indicator again
            if (titleEl.textContent.length > 0) {
                scrollIndicator.style.opacity = '1';
            }

            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
    });

    // Wheel-based snap scrolling between hero1 and hero2
    let isSnapping = false;
    let onHero2 = false; // track whether we are currently snapped to hero-2
    window.addEventListener('wheel', (e) => {
        if (isSnapping) return;

        const directionDown = e.deltaY > 0;
        const hero1Rect = hero1.getBoundingClientRect();
        const hero2Rect = hero2.getBoundingClientRect();

        // Snap from hero1 to hero2 when scrolling down past half of hero1
        if (!onHero2 && directionDown && hero1Rect.bottom <= window.innerHeight * 0.6 && hero1Rect.bottom > 0) {
            e.preventDefault();
            isSnapping = true;
            hero2.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { 
                isSnapping = false; 
                onHero2 = true;
            }, 800);
        }

        // Snap back to hero1 when scrolling up is DISABLED to allow free scroll
        /*
        if (onHero2 && !directionDown && hero2Rect.top >= 0 && hero2Rect.top < window.innerHeight * 0.6) {
            e.preventDefault();
            isSnapping = true;
            hero1.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Animate text fade-in when snapping back
            titleEl.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            titleEl.style.transform = 'translateY(0)';
            titleEl.style.opacity = '1';
            setTimeout(() => { 
                isSnapping = false; 
                onHero2 = false;
            }, 800);
        }
        */
    }, { passive: false });

    // Observer to ensure opacity resets when hero1 is in view (even if scrolling stops)
    const hero1Observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                titleEl.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
                titleEl.style.transform = 'translateY(0)';
                titleEl.style.opacity = '1';
                if (titleEl.textContent.length > 0) {
                    scrollIndicator.style.opacity = '1';
                }
                onHero2 = false; // allow future auto-scrolls
            }
        });
    }, { threshold: 0.6 }); // 60% of hero1 visible

    hero1Observer.observe(hero1);
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();

    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00ff7f"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.7,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 1.5,
                    random: true
                },
                move: {
                    enable: true,
                    speed: 0.4,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false,
                    },
                    onclick: {
                        enable: false,
                    }
                }
            },
            retina_detect: true
        });
    }

    // Show loading animation
    showLoadingAnimation();
    
    // Initialize scroll animations
    initializeScrollAnimations();

    // Set initial active nav link
    updateActiveNavLink();
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="terminal">
            <pre class="code-lines"></pre>
        </div>
    `;
    document.body.appendChild(loader);

    const lines = [
        'initializing...',
        'loading'
    ];

    const codeEl = loader.querySelector('.code-lines');

    // configuration for fade duration (loader stays until dot sequence is complete)
    const FADE_DURATION = 2000;   // fade-out duration in ms (faster fade)

    // Fixed character delay calculation is no longer tied to total duration
    const CHAR_DELAY_DEFAULT = 50;

    let pageLoaded = false;
    let typingFinished = false; // becomes true AFTER dot animation completes
    let currentLine = 0;
    let charIndex = 0;
    let dotInterval = null;

    // Apply fade transition style duration to loader
    loader.style.transition = `opacity ${FADE_DURATION}ms ease`;

    function startDotAnimation() {
        const firstLine = lines[0];
        const dotSequence = ['.', '..', '...', '.', '..', '...'];
        let idx = 0;

        const updateDots = () => {
            const dots = dotSequence[idx];
            codeEl.textContent = `${firstLine}\nloading${dots}`;
            idx++;

            if (idx >= dotSequence.length) {
                clearInterval(dotInterval);
                typingFinished = true; // dot animation completed
                maybeHideLoader();
            }
        };
        
        // Show first dot instantly so there's no delay
        updateDots(); 
        
        // Set a slightly slower interval for the rest of the dots
        dotInterval = setInterval(updateDots, 350);
    }

    // Helper that hides the loader when both conditions are met
    function maybeHideLoader() {
        if (pageLoaded && typingFinished) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), FADE_DURATION);
        }
    }

    // Typing effect for the terminal lines
    function typeNextChar() {
        if (currentLine >= lines.length) {
            // Typing done, start dot animation
            startDotAnimation();
            return;
        }

        const line = lines[currentLine];
        if (charIndex < line.length) {
            codeEl.textContent += line.charAt(charIndex);
            charIndex++;
        } else {
            codeEl.textContent += '\n';
            currentLine++;
            charIndex = 0;
        }
        const delay = currentLine === 0 ? 15 : 40; // very fast for first line, faster for second
        setTimeout(typeNextChar, delay);
    }
    typeNextChar();

    // Listen for the window load event
    window.addEventListener('load', () => {
        pageLoaded = true;
        maybeHideLoader();
    });
}

// Enhanced scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
        '.project-card, .skill-card, .detail-item, .contact-card, .timeline-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #00d4ff !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    showLoadingAnimation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
}); 