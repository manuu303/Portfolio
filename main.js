/* ==========================================================================
   MUHAMMAD MUNEEB AWAN — 2026 FUTURISTIC CYBER LOGIC
    Particle Network, Text Decoders, 3D Card Tilt, HUD Diagnostics, Web3Forms
   ========================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =========================================================================
    // 1. Live Islamabad Telemetry Clock & Ping Simulator
    // =========================================================================
    function updateTelemetry() {
        const timeEl = document.getElementById('hudTime');
        const pingEl = document.getElementById('hudPing');

        if (timeEl) {
            const now = new Date();
            // Islamabad is UTC+5
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const isbDate = new Date(utc + (3600000 * 5));
            const hours = String(isbDate.getHours()).padStart(2, '0');
            const minutes = String(isbDate.getMinutes()).padStart(2, '0');
            const seconds = String(isbDate.getSeconds()).padStart(2, '0');
            timeEl.textContent = `${hours}:${minutes}:${seconds} PKT`;
        }

        if (pingEl && Math.random() < 0.15) {
            const ping = Math.floor(12 + Math.random() * 8);
            pingEl.textContent = `${ping}ms`;
        }
    }
    setInterval(updateTelemetry, 1000);
    updateTelemetry();

    // =========================================================================
    // 2. Custom Cyber Cursor (Desktop)
    // =========================================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.innerWidth > 1024 && !prefersReducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth trailing lerp for ring
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Hover expansions
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-tag, .stat-card');
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
        });
    }

    // =========================================================================
    // 3. Cyber Text Scramble / Decoder Animation
    // =========================================================================
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 20);
                const end = start + Math.floor(Math.random() * 20);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: var(--cyan); text-shadow: 0 0 10px var(--cyan);">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    const scrambleTarget = document.getElementById('scrambleHero');
    if (scrambleTarget && !prefersReducedMotion) {
        const originalText = scrambleTarget.getAttribute('data-text') || scrambleTarget.innerText;
        const fx = new TextScramble(scrambleTarget);
        setTimeout(() => {
            fx.setText(originalText);
        }, 300);
    }

    // =========================================================================
    // 4. Interactive Constellation & Cyber Particle Canvas
    // =========================================================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null, radius: 140 };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 16000), 75);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 1.6 + 0.8;
                this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(139, 92, 246,';
                this.baseAlpha = Math.random() * 0.45 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 1.5;
                        this.y -= (dy / dist) * force * 1.5;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} ${this.baseAlpha})`;
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                if (mouse.x !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // =========================================================================
    // 5. 3D Tilt & Mouse Spotlight on Cards
    // =========================================================================
    const tiltCards = document.querySelectorAll('.project-card, .stat-card, .skill-category, .about__detail');
    if (!prefersReducedMotion && window.innerWidth > 768) {
        tiltCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // =========================================================================
    // 6. Navigation: Scroll, Mobile Toggle, Active Tracking
    // =========================================================================
    const nav = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    function handleNavScroll() {
        if (!nav) return;
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('.section[id]');
    function highlightActiveNav() {
        const scrollY = window.scrollY + 140;
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav__link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightActiveNav, { passive: true });
    highlightActiveNav();

    // =========================================================================
    // 7. Scroll Reveal Animations (IntersectionObserver)
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('revealed'));
    }

    // =========================================================================
    // 8. Missions Conduit Energy Fill Animation
    // =========================================================================
    const progressFills = document.querySelectorAll('.mission-card__fill');
    if (progressFills.length && 'IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = `${width}%`;
                    }, prefersReducedMotion ? 0 : 250);
                    progressObserver.unobserve(fill);
                }
            });
        }, { threshold: 0.15 });

        progressFills.forEach((fill) => progressObserver.observe(fill));
    }

    // =========================================================================
    // 9. Contact Terminal Form Handling (Dispatches through Web3Forms)
    // =========================================================================
    const form = document.getElementById('contactForm');
    if (form) {
        const successMsg = document.getElementById('formSuccess');
        const successText = document.getElementById('formSuccessText');
        const errorMsg = document.getElementById('formError');
        const errorText = document.getElementById('formErrorText');
        const submitBtn = document.getElementById('formSubmitBtn') || form.querySelector('.form__submit');
        const submitBtnText = submitBtn ? submitBtn.querySelector('span') : null;
        const submitBtnIcon = submitBtn ? submitBtn.querySelector('i') : null;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Extract values
            const name = (document.getElementById('name')?.value || '').trim();
            const email = (document.getElementById('email')?.value || '').trim();
            const subject = (document.getElementById('subject')?.value || '').trim();
            const message = (document.getElementById('message')?.value || '').trim();

            if (!name || !email || !message) {
                return;
            }

            // Save original button state and trigger futuristic loading HUD
            const origText = submitBtnText ? submitBtnText.textContent : 'DISPATCH TRANSMISSION';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.75';
                submitBtn.style.cursor = 'not-allowed';
            }
            if (submitBtnText) submitBtnText.textContent = 'TRANSMITTING TO NODE...';
            if (submitBtnIcon) submitBtnIcon.className = 'fas fa-circle-notch fa-spin';

            if (successMsg) successMsg.classList.remove('show');
            if (errorMsg) errorMsg.classList.remove('show');

            try {
                const payload = {
                    access_key: 'e2727498-678f-42b2-b582-5a901d485934',
                    name: name,
                    email: email,
                    subject: subject || 'Portfolio Inquiry',
                    message: message,
                    from_name: name
                };

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok && (data.success === 'true' || data.success === true)) {
                    if (successText) {
                        successText.textContent = 'TRANSMISSION DELIVERED DIRECTLY TO ARTISTUNKNOWN0303@GMAIL.COM.';
                    }
                    if (successMsg) successMsg.classList.add('show');
                    form.reset();

                    setTimeout(() => {
                        if (successMsg) successMsg.classList.remove('show');
                    }, 6500);
                } else {
                    throw new Error(data.message || 'Server responded with an error.');
                }
            } catch (err) {
                console.error('Contact Form Transmission Error:', err);
                const mailtoFallback = `mailto:artistunknown0303@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Query')}&body=${encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                if (errorText) {
                    errorText.innerHTML = `TRANSMISSION INTERRUPTED. <a href="${mailtoFallback}">CLICK HERE TO TRANSMIT DIRECTLY VIA EMAIL CLIENT</a>.`;
                }
                if (errorMsg) errorMsg.classList.add('show');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                }
                if (submitBtnText) submitBtnText.textContent = origText;
                if (submitBtnIcon) submitBtnIcon.className = 'fas fa-satellite-dish';
            }
        });
    }

    // =========================================================================
    // 10. Smooth Anchor Scrolling
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
        });
    });

    // =========================================================================
    // 11. Footer Year
    // =========================================================================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    console.log('⚡ Muhammad Muneeb Awan // Futuristic 2026 Core Loaded');
})();
