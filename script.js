// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Toggle experience description
function toggleDescription(button) {
    const card = button.closest('.pcb-card');
    const shortDesc = card.querySelector('.description-short');
    const fullDesc = card.querySelector('.description-full');
    const experienceSection = document.getElementById('experience');
    
    if (fullDesc.style.display === 'none') {
        shortDesc.style.display = 'none';
        fullDesc.style.display = 'block';
        button.textContent = 'read less';
    } else {
        shortDesc.style.display = 'block';
        fullDesc.style.display = 'none';
        button.textContent = 'read more';
        // Calculate the target scroll position to show the experience section with extra space
        const experienceSectionTop = experienceSection.offsetTop;
        const targetScrollPosition = experienceSectionTop - 150;
        
        // Single smooth scroll to the target position
        window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth'
        });
    }
}

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

function initSkillAnimations() {
    const rows = document.querySelectorAll('.skills-row');
    if (!rows.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(rows).indexOf(entry.target);
                setTimeout(() => entry.target.classList.add('visible'), idx * 55);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    rows.forEach(r => observer.observe(r));
}

function initExpChip() {
    const canvas = document.getElementById('exp-chip-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const EXP_DATA = {
        see: {
            ref: 'U1', role: 'undergraduate research assistant',
            company: 'system energy efficiency (see) lab, uc san diego',
            companyUrl: 'https://seelab.ucsd.edu/index.html',
            duration: 'april 2026 — present',
            logos: [{ src: 'see-logo.png', alt: 'SEE Lab', lg: false }, { src: 'ucsd.png', alt: 'UC San Diego', lg: false }],
            highlights: ['82× clustering speedup', '10,000× energy reduction', 'vs. GPU baseline'],
            shortDesc: 'building hardware-software systems that push analog in-memory computing past the limits of traditional digital accelerators, achieving energy and throughput gains that GPU baselines can\'t touch. research conducted under Prof. Tajana Šimunić Rosing.',
            bullets: [
                'researching analog in-memory computing accelerators for mass spectrometry clustering pipelines',
                'implementing HDC pipelines mapping binary hypervectors into PCM cells for ultra-low-energy inference',
                'developing RTL modules for 3D-stacked memory architectures under Prof. Tajana Šimunić Rosing',
            ],
            tags: ['in-memory computing', 'hdc', 'rtl', 'phase change memory', 'hardware-software co-design', 'cycle-accurate simulation']
        },
        kyte: {
            ref: 'U2', role: 'co-founder & ceo',
            company: 'kyte', companyUrl: null,
            duration: 'january 2025 — may 2025',
            logos: [{ src: 'kyte.png', alt: 'Kyte', lg: true }],
            highlights: ['40,000+ students reached', '3,000+ weekly orders', 'sub-40 min delivery SLA'],
            shortDesc: 'co-founded a campus delivery startup at UC San Diego, built the full platform from scratch, scaled to thousands of weekly orders, and kept delivery under 40 minutes end to end.',
            bullets: [
                'founded and scaled a college delivery marketplace serving UC San Diego',
                'architected a multi-sided platform with Next.js, TypeScript, PostgreSQL, and Redis/BullMQ',
                'engineered a fault-tolerant order engine with payment idempotency and real-time dispatch routing',
            ],
            tags: ['next.js', 'typescript', 'postgresql', 'redis', 'bullmq', 'api design', 'ci/cd']
        },
        health: {
            ref: 'U3', role: 'software engineering intern',
            company: 'health1st.ai', companyUrl: null,
            duration: 'june 2025 — december 2025',
            logos: [{ src: 'health1st.png', alt: 'Health1st', lg: false }],
            highlights: ['sub-100ms p99 latency', 'HL7 v2.1–2.7 + FHIR R3–R5', 'multi-tenant isolation'],
            shortDesc: 'built the core data interoperability layer for a healthcare AI platform, covering HL7/FHIR parsing, intelligent field mapping with LLMs, and a distributed backend held to enterprise security standards.',
            bullets: [
                'built a FastAPI service for healthcare interoperability across HL7, FHIR, CCDA, and X12 formats',
                'integrated LangChain with OpenAI and Anthropic for intelligent field mapping and vector search',
                'architected distributed microservices with OWASP-compliant security and Prometheus observability',
            ],
            tags: ['fastapi', 'postgresql', 'redis', 'hl7/fhir', 'langchain', 'docker', 'google cloud', 'prometheus', 'owasp']
        }
    };

    // 3 experience die zones: SEE Lab (left), Kyte (center), Health1st (right)
    const ZONE_LAYOUT = [
        { cat: 'see',    xc: -1.375, zc: 0, w: 1.65, d: 3.10 },
        { cat: 'kyte',   xc:  0.0,   zc: 0, w: 0.98, d: 3.10 },
        { cat: 'health', xc:  1.375, zc: 0, w: 1.65, d: 3.10 },
    ];

    // Left pins → SEE Lab (U1), right pins → Health1st (U3)
    const PIN_CAT = { left: 'see', right: 'health' };

    let activeExp = 'see';
    let isOnCanvas = false;

    const wrapper = canvas.parentElement;
    const H = wrapper.clientHeight || 380;
    const W = wrapper.clientWidth  || 700;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 5.5, 7.5);
    camera.lookAt(0, -0.2, 0);

    const chipGroup = new THREE.Group();
    scene.add(chipGroup);

    const bodyMat  = new THREE.MeshPhysicalMaterial({ color: 0x0e0e10, roughness: 0.82, metalness: 0.04, clearcoat: 0.4, clearcoatRoughness: 0.6 });
    const traceMat = new THREE.MeshStandardMaterial({ color: 0x00f260, emissive: 0x00f260, emissiveIntensity: 0.5, roughness: 0.38, metalness: 0.18 });
    const dotMat   = new THREE.MeshStandardMaterial({ color: 0x00f260, emissive: 0x00f260, emissiveIntensity: 1.2 });
    const padMat   = new THREE.MeshPhysicalMaterial({ color: 0xb89c14, roughness: 0.12, metalness: 0.96, emissive: 0x332200, emissiveIntensity: 0.25 });
    const dieMat   = new THREE.MeshStandardMaterial({ color: 0x0b0d14, roughness: 0.52, metalness: 0.14 });

    const CHIP_W = 5, CHIP_H = 0.28, CHIP_D = 3.5;
    const TOP_Y = CHIP_H / 2;

    // Chip body
    chipGroup.add(new THREE.Mesh(new THREE.BoxGeometry(CHIP_W, CHIP_H, CHIP_D), bodyMat));
    // Chamfer base ring (slightly larger, lower, darker — gives the IC a stepped edge look)
    const brd = new THREE.Mesh(
        new THREE.BoxGeometry(CHIP_W + 0.14, CHIP_H * 0.46, CHIP_D + 0.14),
        new THREE.MeshPhysicalMaterial({ color: 0x1a1a1e, roughness: 0.92, metalness: 0.02 })
    );
    brd.position.y = -CHIP_H * 0.28;
    chipGroup.add(brd);

    // Silicon die passivation layer (dark blue-gray, covers full die area)
    const dieSurface = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.008, 3.1), dieMat);
    dieSurface.position.y = TOP_Y + 0.005;
    chipGroup.add(dieSurface);

    // Perimeter trace ring around die area + 2 column dividers
    function addTrace(x1, z1, x2, z2, w) {
        w = w || 0.03;
        const len = Math.hypot(x2 - x1, z2 - z1);
        const m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.007, w), traceMat);
        m.position.set((x1 + x2) / 2, TOP_Y + 0.016, (z1 + z2) / 2);
        m.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
        chipGroup.add(m);
    }
    // Outer perimeter
    addTrace(-2.2, -1.55,  2.2, -1.55, 0.04);
    addTrace(-2.2,  1.55,  2.2,  1.55, 0.04);
    addTrace(-2.2, -1.55, -2.2,  1.55, 0.04);
    addTrace( 2.2, -1.55,  2.2,  1.55, 0.04);
    // Column dividers only (no row dividers — 3 side-by-side zones)
    addTrace(-0.51, -1.55, -0.51, 1.55, 0.025);
    addTrace( 0.51, -1.55,  0.51, 1.55, 0.025);
    // Pin stub traces for all 8 left pins (SEE Lab) and 8 right pins (Health1st)
    const PIN_COUNT = 8, PIN_SPACING = 0.38;
    const PIN_START_Z = -(PIN_COUNT / 2 - 0.5) * PIN_SPACING;
    for (let i = 0; i < PIN_COUNT; i++) {
        const z = PIN_START_Z + i * PIN_SPACING;
        addTrace(-2.2, z, -2.5, z);
        addTrace( 2.2, z,  2.5, z);
    }

    // Vias at column divider intersections
    function addVia(x, z, r) {
        r = r || 0.055;
        const inner = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.5, r * 0.5, 0.014, 12), traceMat);
        inner.position.set(x, TOP_Y + 0.015, z);
        chipGroup.add(inner);
        const ring = new THREE.Mesh(new THREE.RingGeometry(r, r * 1.7, 16), traceMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(x, TOP_Y + 0.018, z);
        chipGroup.add(ring);
    }
    addVia(-0.51, -1.55); addVia( 0.51, -1.55);
    addVia(-0.51,  1.55); addVia( 0.51,  1.55);
    addVia(-2.2,  -1.55); addVia( 2.2,  -1.55);
    addVia(-2.2,   1.55); addVia( 2.2,   1.55);

    // Gold bond pads — where wire bonds connect die to package leads
    function addBondPad(x, z) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.015, 0.1), padMat);
        pad.position.set(x, TOP_Y + 0.015, z);
        chipGroup.add(pad);
    }
    for (let i = 0; i < PIN_COUNT; i++) {
        const z = PIN_START_Z + i * PIN_SPACING;
        addBondPad(-2.06, z);
        addBondPad( 2.06, z);
    }

    // Canvas-texture labels burned onto die surface ("U1 · see lab", etc.)
    function makeZoneLabel(ref, name, zoneW, zoneD) {
        const c = document.createElement('canvas');
        c.width = 256; c.height = 96;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 256, 96);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0,242,96,0.65)';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(ref, 128, 34);
        ctx.fillStyle = 'rgba(0,242,96,0.38)';
        ctx.font = '15px monospace';
        ctx.fillText(name, 128, 62);
        const tex = new THREE.CanvasTexture(c);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(zoneW * 0.72, zoneD * 0.28), mat);
        plane.rotation.x = -Math.PI / 2;
        return plane;
    }

    // Per-zone base colors: SEE=hardware navy, Kyte=logic green, Health=data teal
    const ZONE_STYLES = {
        see:    { color: 0x08091a },
        kyte:   { color: 0x060f09 },
        health: { color: 0x060f0d },
    };

    // Shared thin-trace material for internal circuit detail
    const detailMat = new THREE.MeshStandardMaterial({ color: 0x00f260, emissive: 0x00f260, emissiveIntensity: 0.2, roughness: 0.52 });

    // Die zone meshes — the interactive regions on the chip top
    const zoneMeshes = {};
    const allZoneMeshes = [];

    ZONE_LAYOUT.forEach(({ cat, xc, zc, w, d }) => {
        const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(ZONE_STYLES[cat].color),
            emissive: new THREE.Color(0x00f260),
            emissiveIntensity: 0.06,
            roughness: 0.78,
            metalness: 0.1,
            transparent: true,
            opacity: 0.92,
        });
        const zone = new THREE.Mesh(new THREE.BoxGeometry(w - 0.06, 0.022, d - 0.06), mat);
        zone.position.set(xc, TOP_Y + 0.012, zc);
        zone.userData.category = cat;
        chipGroup.add(zone);
        zoneMeshes[cat] = zone;
        allZoneMeshes.push(zone);

        // Internal circuit detail — each zone has a distinct pattern
        if (cat === 'see') {
            // Memory grid: regular array of vertical + horizontal traces
            for (let col = 0; col < 4; col++) {
                const x = xc - w * 0.33 + col * (w * 0.22);
                const t = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.004, d * 0.65), detailMat);
                t.position.set(x, TOP_Y + 0.026, zc);
                chipGroup.add(t);
            }
            for (let row = 0; row < 3; row++) {
                const z2 = zc - d * 0.26 + row * (d * 0.26);
                const t = new THREE.Mesh(new THREE.BoxGeometry(w * 0.66, 0.004, 0.013), detailMat);
                t.position.set(xc, TOP_Y + 0.026, z2);
                chipGroup.add(t);
            }
        } else if (cat === 'kyte') {
            // Logic routing: L-shaped traces like gate interconnect
            [[xc-0.12, zc-0.52, 0.27], [xc+0.16, zc+0.35, 0.22], [xc-0.05, zc+0.08, 0.31]].forEach(([rx, rz, len]) => {
                const v = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.004, len), detailMat);
                v.position.set(rx, TOP_Y + 0.026, rz);
                chipGroup.add(v);
                const h = new THREE.Mesh(new THREE.BoxGeometry(len * 0.55, 0.004, 0.013), detailMat);
                h.position.set(rx, TOP_Y + 0.026, rz - len * 0.3);
                chipGroup.add(h);
            });
        } else {
            // Health: vertical data channels of varying length
            for (let col = 0; col < 5; col++) {
                const x = xc - w * 0.33 + col * (w * 0.165);
                const len = d * (0.4 + (col % 2) * 0.22);
                const t = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.004, len), detailMat);
                t.position.set(x, TOP_Y + 0.026, zc + (col % 2) * 0.1);
                chipGroup.add(t);
            }
        }

        const label = makeZoneLabel(EXP_DATA[cat].ref, cat, w, d);
        label.position.set(xc, TOP_Y + 0.04, zc);
        chipGroup.add(label);
    });

    // Gull-wing IC leads — 3 segments per pin (shoulder → drop → foot)
    const expPinMeshes = { see: [], kyte: [], health: [] };
    const SIDE_X = CHIP_W / 2;
    const PIN_W  = 0.1;
    const GULL_DROP = CHIP_H * 0.52;

    for (let i = 0; i < PIN_COUNT; i++) {
        const z = PIN_START_Z + i * PIN_SPACING;
        ['left', 'right'].forEach(side => {
            const expKey = PIN_CAT[side];
            const xs = side === 'left' ? -1 : 1;
            const mat = new THREE.MeshPhysicalMaterial({
                color: 0xc0c0c0, roughness: 0.16, metalness: 0.96,
                emissive: new THREE.Color(0x00f260), emissiveIntensity: 0
            });
            // Shoulder: exits chip side horizontally
            const sh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.048, PIN_W), mat);
            sh.position.set(xs * (SIDE_X + 0.11), 0, z);
            chipGroup.add(sh);
            expPinMeshes[expKey].push(sh);
            // Drop: vertical section going down
            const dr = new THREE.Mesh(new THREE.BoxGeometry(0.048, GULL_DROP, PIN_W), mat);
            dr.position.set(xs * (SIDE_X + 0.22), -(CHIP_H * 0.24 + GULL_DROP * 0.5), z);
            chipGroup.add(dr);
            expPinMeshes[expKey].push(dr);
            // Foot: horizontal base extending outward
            const ft = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, PIN_W), mat);
            ft.position.set(xs * (SIDE_X + 0.36), -(CHIP_H * 0.24 + GULL_DROP - 0.02), z);
            chipGroup.add(ft);
            expPinMeshes[expKey].push(ft);
        });
    }

    // Pin-1 indicator dot (top-left corner of die)
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), dotMat);
    dot.rotation.x = -Math.PI / 2;
    dot.position.set(-2.05, TOP_Y + 0.007, -1.35);
    chipGroup.add(dot);

    // Lighting
    scene.add(new THREE.AmbientLight(0x111111, 1.4));
    const keyLight = new THREE.DirectionalLight(0x00f260, 2.0);
    keyLight.position.set(-4, 8, 3);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x88ffcc, 0.8);
    rimLight.position.set(4, 6, -4);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0x003311, 0.5);
    fillLight.position.set(0, -3, 6);
    scene.add(fillLight);

    // Raycaster for die zone interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Compact view — right-side panel beside the chip
    function renderCallout(expKey) {
        const callout = document.getElementById('exp-callout');
        if (!callout) return;
        const data = EXP_DATA[expKey];
        if (!data) return;

        const logoHtml = data.logos.map(l =>
            `<img src="${l.src}" alt="${l.alt}" class="exp-logo${l.lg ? ' exp-logo-lg' : ''}">`
        ).join('');
        const companyHtml = data.companyUrl
            ? `<a href="${data.companyUrl}" target="_blank" rel="noopener noreferrer" class="co-company">${data.company}</a>`
            : `<span class="co-company">${data.company}</span>`;
        const highlightsHtml = data.highlights.map(h => `<span>${h}</span>`).join('');

        callout.style.opacity = '0';
        setTimeout(() => {
            callout.innerHTML = `
                <div class="co-ref">${data.ref}</div>
                <div class="co-logos">${logoHtml}</div>
                <div class="co-role">${data.role}</div>
                ${companyHtml}
                <div class="co-duration">${data.duration}</div>
                <div class="co-highlights">${highlightsHtml}</div>
                <p class="co-short-desc">${data.shortDesc}</p>
            `;
            callout.style.opacity = '1';
        }, 300);
    }

    function renderBreakdown(expKey) {
        const panel = document.getElementById('exp-breakdown');
        if (!panel) return;
        const data = EXP_DATA[expKey];
        if (!data) return;

        const logoHtml = data.logos.map(l =>
            `<img src="${l.src}" alt="${l.alt}" class="exp-logo${l.lg ? ' exp-logo-lg' : ''}">`
        ).join('');
        const companyHtml = data.companyUrl
            ? `<a href="${data.companyUrl}" target="_blank" rel="noopener noreferrer" class="exp-panel-company">${data.company}</a>`
            : `<span class="exp-panel-company">${data.company}</span>`;
        const highlightsHtml = data.highlights.map(h => `<span>${h}</span>`).join('');
        const bulletsHtml    = data.bullets.map(b => `<li>${b}</li>`).join('');
        const tagsHtml       = data.tags.map(t => `<span>${t}</span>`).join('');

        panel.style.opacity = '0';
        setTimeout(() => {
            panel.innerHTML = `
                <div class="exp-panel">
                    <div class="exp-panel-header">
                        <div class="exp-logos">${logoHtml}</div>
                        <div class="exp-panel-meta">
                            <div class="exp-panel-role">${data.role}</div>
                            ${companyHtml}
                            <div class="exp-panel-duration">${data.duration}</div>
                        </div>
                    </div>
                    <div class="exp-highlights">${highlightsHtml}</div>
                    <ul class="exp-bullets">${bulletsHtml}</ul>
                    <div class="exp-panel-tags">${tagsHtml}</div>
                </div>
            `;
            panel.style.opacity = '1';
        }, 300);
    }

    function setActiveExp(expKey) {
        if (expKey === activeExp) return;
        activeExp = expKey;
        document.querySelectorAll('.exp-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.exp === expKey);
        });
        renderCallout(expKey);
        renderBreakdown(expKey);
    }

    // Nav button clicks
    document.querySelectorAll('.exp-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            stopAutoCycle();
            setActiveExp(btn.dataset.exp);
            setTimeout(startAutoCycle, 5000);
        });
    });

    // Auto-cycle through 3 experiences
    const expOrder = ['see', 'kyte', 'health'];
    let autoCycleIdx = 0;
    let autoCycleTimer = null;

    function startAutoCycle() {
        autoCycleTimer = setInterval(() => {
            autoCycleIdx = (autoCycleIdx + 1) % expOrder.length;
            setActiveExp(expOrder[autoCycleIdx]);
        }, 6000);
    }

    function stopAutoCycle() {
        clearInterval(autoCycleTimer);
        autoCycleTimer = null;
    }

    const hintEl = document.getElementById('exp-chip-hint');

    // Invisible pick plane covering full chip top — reliably hittable at any rotation
    const pickPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(CHIP_W, CHIP_D),
        new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    );
    pickPlane.rotation.x = -Math.PI / 2;
    pickPlane.position.y = TOP_Y + 0.06;
    chipGroup.add(pickPlane);

    canvas.addEventListener('mouseenter', () => {
        isOnCanvas = true;
        stopAutoCycle();
        if (hintEl) hintEl.classList.remove('hidden');
    });

    canvas.addEventListener('mouseleave', () => {
        isOnCanvas = false;
        if (hintEl) hintEl.classList.add('hidden');
        startAutoCycle();
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(pickPlane);
        if (hits.length > 0) {
            chipGroup.updateMatrixWorld();
            const localX = chipGroup.worldToLocal(hits[0].point.clone()).x;
            let hitCat = null;
            if (localX < -0.51) hitCat = 'see';
            else if (localX > 0.51) hitCat = 'health';
            else hitCat = 'kyte';
            if (hitCat && hitCat !== activeExp) {
                setActiveExp(hitCat);
                autoCycleIdx = expOrder.indexOf(hitCat);
            }
        }
    });

    let t = 0;
    function animateChip() {
        requestAnimationFrame(animateChip);

        t += 0.008;
        chipGroup.rotation.y += (t - chipGroup.rotation.y) * 0.08;
        chipGroup.rotation.x += (Math.sin(t * 0.35) * 0.05 - 0.38 - chipGroup.rotation.x) * 0.08;

        Object.entries(zoneMeshes).forEach(([cat, mesh]) => {
            const target = cat === activeExp ? 0.72 : 0.035;
            mesh.material.emissiveIntensity += (target - mesh.material.emissiveIntensity) * 0.1;
        });

        Object.entries(expPinMeshes).forEach(([cat, meshes]) => {
            const target = cat === activeExp ? 1.4 : 0.0;
            meshes.forEach(m => {
                m.material.emissiveIntensity += (target - m.material.emissiveIntensity) * 0.08;
            });
        });

        renderer.render(scene, camera);
    }
    animateChip();

    new ResizeObserver(() => {
        const w = wrapper.clientWidth;
        camera.aspect = w / H;
        camera.updateProjectionMatrix();
        renderer.setSize(w, H);
    }).observe(wrapper);

    renderCallout('see');
    renderBreakdown('see');
    startAutoCycle();
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initExpChip();
    initSkillAnimations();

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