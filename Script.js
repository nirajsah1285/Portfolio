/* =========================================================
   NIRAJ PRASAD SAH — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE MENU TOGGLE
    ===================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    /* =====================================================
       02. TYPED.JS INITIALIZATION
    ===================================================== */
    if (typeof Typed !== 'undefined') {
        new Typed('#typing', {
            strings: [
                "Computer Science Engineering Student",
                "Full Stack Developer",
                "Software Developer",
                "Problem Solver"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    /* =====================================================
       03. AOS (ANIMATE ON SCROLL) INITIALIZATION
    ===================================================== */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    /* =====================================================
       04. DYNAMIC SKILL PROGRESS BAR ANIMATION
    ===================================================== */
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.width = targetWidth;
            }
        });
    };

    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Run on load in case they are in view

    /* =====================================================
       05. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
    ===================================================== */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* =====================================================
       06. CURSOR BUBBLE & FIRE TRAIL EFFECT
    ===================================================== */
    const cursorBubble = document.querySelector('.cursor-bubble');
    const fireContainer = document.getElementById('fire-container');

    window.addEventListener('mousemove', (e) => {
        if (cursorBubble) {
            cursorBubble.style.left = `${e.clientX}px`;
            cursorBubble.style.top = `${e.clientY}px`;
        }

        if (fireContainer) {
            createFireParticle(e.clientX, e.clientY);
        }
    });

    function createFireParticle(x, y) {
        const fire = document.createElement('div');
        fire.classList.add('fire');
        
        const size = Math.random() * 10 + 6;
        fire.style.width = `${size}px`;
        fire.style.height = `${size}px`;
        
        const offsetX = (Math.random() - 0.5) * 15;
        const offsetY = (Math.random() - 0.5) * 15;
        
        fire.style.left = `${x + offsetX}px`;
        fire.style.top = `${y + offsetY}px`;
        
        fireContainer.appendChild(fire);

        let opacity = 1;
        let scale = 1;
        
        const animateFire = () => {
            opacity -= 0.04;
            scale += 0.04;
            fire.style.opacity = opacity;
            fire.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animateFire);
            } else {
                fire.remove();
            }
        };
        
        requestAnimationFrame(animateFire);
    }

    /* =====================================================
       07. EMAILJS CONTACT FORM INTEGRATION
    ===================================================== */
    // Initialize EmailJS with your Public Key
    emailjs.init({
        publicKey: "D2N7oKkGWi-R0eBkl" // Replace with your actual EmailJS Public Key from Account settings
    });

    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('send-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
            submitBtn.disabled = true;

            emailjs.sendForm('service_cjvhohb', 'template_o41flkq', this)
                .then(() => {
                    alert('Message sent successfully! Thank you for reaching out.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, (error) => {
                    console.error('FAILED...', error);
                    alert('Failed to send message. Please try sending an email directly to nirajsah093@gmail.com.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    /* =====================================================
       08. DYNAMIC FOOTER YEAR
    ===================================================== */
    const yearSpan = document.querySelector('[data-current-year]');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});