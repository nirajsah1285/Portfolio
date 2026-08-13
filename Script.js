/* =========================================================
   NIRAJ PRASAD SAH — MODERN PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. AOS ANIMATIONS
       ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =====================================================
       3. TYPING ANIMATION
       ===================================================== */

    const typingElement = document.getElementById("typing");

    if (
        typingElement &&
        typeof Typed !== "undefined"
    ) {

        new Typed("#typing", {

            strings: [
                "Full Stack Developer",
                "Software Developer",
                "CSE Student",
                "Web Developer",
                "Problem Solver",
                "IoT Enthusiast"
            ],

            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1600,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: "|"

        });

    }


    /* =====================================================
       4. SKILL PROGRESS BARS
       ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar");

    const skillSection =
        document.getElementById("Skills");

    if (
        progressBars.length > 0 &&
        skillSection &&
        "IntersectionObserver" in window
    ) {

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            progressBars.forEach(bar => {

                                const width =
                                    bar.getAttribute("data-width");

                                if (width) {
                                    bar.style.width = width;
                                }

                            });

                            skillObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );

        skillObserver.observe(skillSection);

    }


    /* =====================================================
       5. ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll("#nav-menu a");


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 200;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       6. HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector("header");


    function handleHeaderScroll() {

        if (!header) {
            return;
        }


        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       7. SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       8. CURSOR PARTICLE EFFECT
       ===================================================== */

    const fireContainer =
        document.getElementById(
            "fire-container"
        );


    if (fireContainer) {

        let lastParticleTime = 0;


        document.addEventListener(
            "mousemove",
            event => {

                const now = Date.now();


                if (
                    now - lastParticleTime < 35
                ) {
                    return;
                }


                lastParticleTime = now;


                createParticle(
                    event.clientX,
                    event.clientY
                );

            }
        );


        function createParticle(x, y) {

            const particle =
                document.createElement("span");


            particle.className =
                "cursor-particle";


            const size =
                Math.random() * 5 + 2;


            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;


            particle.style.left =
                `${x}px`;

            particle.style.top =
                `${y}px`;


            particle.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 80}px`
            );


            particle.style.setProperty(
                "--y",
                `${(Math.random() - 0.5) * 80}px`
            );


            fireContainer.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 800);

        }

    }


    /* =====================================================
       9. EMAILJS CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );


    const sendButton =
        document.getElementById(
            "send-btn"
        );


    /*
       IMPORTANT:
       Replace these three values with your
       actual EmailJS credentials.
    */

    const EMAILJS_PUBLIC_KEY =
        "YOUR_PUBLIC_KEY";

    const EMAILJS_SERVICE_ID =
        "Service_cjvhohb";

    const EMAILJS_TEMPLATE_ID =
        "YOUR_TEMPLATE_ID";


    /*
       Initialize EmailJS
    */

    if (
        typeof emailjs !== "undefined" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
    ) {

        emailjs.init({

            publicKey:
                EMAILJS_PUBLIC_KEY

        });

    }


    /*
       Contact form submission
    */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                /* Prevent double click */

                if (
                    sendButton &&
                    sendButton.disabled
                ) {
                    return;
                }


                /* Check EmailJS */

                if (
                    typeof emailjs === "undefined"
                ) {

                    showNotification(
                        "EmailJS is not loaded.",
                        "error"
                    );

                    return;

                }


                /* Check credentials */

                if (
                    EMAILJS_PUBLIC_KEY ===
                    "YOUR_PUBLIC_KEY" ||

                    EMAILJS_SERVICE_ID ===
                    "YOUR_SERVICE_ID" ||

                    EMAILJS_TEMPLATE_ID ===
                    "YOUR_TEMPLATE_ID"
                ) {

                    showNotification(
                        "Please add your EmailJS credentials in script.js.",
                        "error"
                    );

                    return;

                }


                /* Save original button */

                const originalButtonHTML =
                    sendButton
                        ? sendButton.innerHTML
                        : "";


                /* Loading */

                if (sendButton) {

                    sendButton.disabled = true;

                    sendButton.innerHTML = `
                        <i class="fa-solid fa-spinner fa-spin"></i>
                        Sending...
                    `;

                }


                try {

                    /*
                       Send form using EmailJS
                    */

                    await emailjs.sendForm(

                        EMAILJS_SERVICE_ID,

                        EMAILJS_TEMPLATE_ID,

                        contactForm

                    );


                    /* Success */

                    showNotification(
                        "Message sent successfully!",
                        "success"
                    );


                    /* Clear form */

                    contactForm.reset();


                    /* Update button */

                    if (sendButton) {

                        sendButton.innerHTML = `
                            <i class="fa-solid fa-check"></i>
                            Message Sent
                        `;


                        setTimeout(() => {

                            sendButton.innerHTML =
                                originalButtonHTML;

                            sendButton.disabled =
                                false;

                        }, 2500);

                    }


                } catch (error) {

                    console.error(
                        "EmailJS Error:",
                        error
                    );


                    showNotification(
                        "Message could not be sent. Please try again.",
                        "error"
                    );


                    if (sendButton) {

                        sendButton.innerHTML =
                            originalButtonHTML;

                        sendButton.disabled =
                            false;

                    }

                }

            }
        );

    }


    /* =====================================================
       10. NOTIFICATION SYSTEM
       ===================================================== */

    function showNotification(
        message,
        type = "success"
    ) {

        const oldNotification =
            document.querySelector(
                ".portfolio-notification"
            );


        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");


        notification.className =
            `portfolio-notification ${type}`;


        const icon =
            type === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation";


        notification.innerHTML = `

            <i class="fa-solid ${icon}"></i>

            <span>
                ${escapeHTML(message)}
            </span>

            <button
                type="button"
                aria-label="Close notification"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

        `;


        document.body.appendChild(
            notification
        );


        const closeButton =
            notification.querySelector(
                "button"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    notification.remove();

                }
            );

        }


        setTimeout(() => {

            if (
                notification &&
                notification.parentElement
            ) {

                notification.remove();

            }

        }, 5000);

    }


    /* =====================================================
       11. HTML ESCAPE
       ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            String(value);

        return div.innerHTML;

    }


    /* =====================================================
       12. CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       13. PROJECT CARD 3D TILT
       ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 768
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -4;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;


                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       14. HERO IMAGE PARALLAX
       ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image-area"
        );


    if (heroImage) {

        window.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const x =
                    (window.innerWidth / 2 -
                        event.clientX) / 40;


                const y =
                    (window.innerHeight / 2 -
                        event.clientY) / 40;


                heroImage.style.transform = `
                    translate(${x}px, ${y}px)
                `;

            },
            { passive: true }
        );

    }


    /* =====================================================
       15. FORM FOCUS EFFECT
       ===================================================== */

    const formInputs =
        document.querySelectorAll(
            ".field input, .field textarea"
        );


    formInputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                const field =
                    input.closest(".field");

                if (field) {
                    field.classList.add("focused");
                }

            }
        );


        input.addEventListener(
            "blur",
            () => {

                const field =
                    input.closest(".field");

                if (field) {
                    field.classList.remove("focused");
                }

            }
        );

    });


    /* =====================================================
       16. INTERSECTION OBSERVER
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service, .stat, .contact-item"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.15
                }

            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       17. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});



/* =========================================================
   18. BACK TO TOP BUTTON
   ========================================================= */

const backToTop =
    document.createElement("button");


backToTop.id =
    "back-to-top";


backToTop.setAttribute(
    "aria-label",
    "Back to top"
);


backToTop.innerHTML = `
    <i class="fa-solid fa-arrow-up"></i>
`;


document.body.appendChild(
    backToTop
);


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    },
    {
        passive: true
    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================================================
   19. ESCAPE KEY — CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        const nav =
            document.getElementById(
                "nav-menu"
            );


        const menuButton =
            document.getElementById(
                "menu-toggle"
            );


        if (
            nav &&
            nav.classList.contains("active")
        ) {

            nav.classList.remove(
                "active"
            );


            const icon =
                menuButton?.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);
const cursorBubble = document.querySelector(".cursor-bubble");

document.addEventListener("mousemove", (e) => {
    cursorBubble.style.left = `${e.clientX}px`;
    cursorBubble.style.top = `${e.clientY}px`;
});