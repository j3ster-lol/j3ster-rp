"use strict";

/* =========================================
   J3STER // ROLEPLAY
   Main Website Script
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
       ========================= */

    const pages = document.querySelectorAll(".site-page");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileNavigation = document.getElementById("mobileNavigation");

    const header = document.querySelector(".header");

    /* =========================
       PAGE NAVIGATION
       ========================= */

    function showPage(pageName, updateHash = true) {

        if (!pageName) {
            pageName = "home";
        }

        let pageExists = false;

        pages.forEach(page => {

            const pageId = page.getAttribute("data-page");

            if (pageId === pageName) {
                page.classList.add("active");
                pageExists = true;
            } else {
                page.classList.remove("active");
            }

        });

        // Pokud stránka neexistuje, otevře Home
        if (!pageExists) {
            pageName = "home";

            pages.forEach(page => {
                page.classList.toggle(
                    "active",
                    page.getAttribute("data-page") === "home"
                );
            });
        }

        /* Aktivní navigace */
        navLinks.forEach(link => {

            const linkPage = link.getAttribute("data-page");

            link.classList.toggle(
                "active",
                linkPage === pageName
            );

        });

        mobileNavLinks.forEach(link => {

            const linkPage = link.getAttribute("data-page");

            link.classList.toggle(
                "active",
                linkPage === pageName
            );

        });

        /* URL hash */
        if (updateHash) {
            history.pushState(
                null,
                "",
                "#" + pageName
            );
        }

        /* Zavření mobilního menu */
        closeMobileMenu();

        /* Scroll nahoru */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        /* Změna titulku stránky */
        updatePageTitle(pageName);
    }


    /* =========================
       DESKTOP NAVIGATION
       ========================= */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const pageName = link.getAttribute("data-page");

            showPage(pageName);

        });

    });


    /* =========================
       MOBILE NAVIGATION
       ========================= */

    mobileNavLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const pageName = link.getAttribute("data-page");

            showPage(pageName);

        });

    });


    /* =========================
       MOBILE MENU
       ========================= */

    function openMobileMenu() {

        if (!mobileNavigation || !mobileMenuButton) {
            return;
        }

        mobileNavigation.classList.add("open");
        mobileMenuButton.classList.add("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!mobileNavigation || !mobileMenuButton) {
            return;
        }

        mobileNavigation.classList.remove("open");
        mobileMenuButton.classList.remove("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleMobileMenu() {

        if (!mobileNavigation) {
            return;
        }

        if (mobileNavigation.classList.contains("open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =========================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================= */

    document.addEventListener("click", event => {

        if (!mobileNavigation || !mobileMenuButton) {
            return;
        }

        const clickedInsideMenu =
            mobileNavigation.contains(event.target);

        const clickedButton =
            mobileMenuButton.contains(event.target);

        if (
            mobileNavigation.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {
            closeMobileMenu();
        }

    });


    /* =========================
       ESCAPE KEY
       ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =========================
       HASH NAVIGATION
       ========================= */

    function loadHashPage() {

        let hash = window.location.hash.replace("#", "");

        if (!hash) {
            hash = "home";
        }

        showPage(hash, false);

    }


    window.addEventListener("hashchange", () => {

        const hash =
            window.location.hash.replace("#", "");

        showPage(hash || "home", false);

    });


    /* =========================
       BROWSER BACK / FORWARD
       ========================= */

    window.addEventListener("popstate", () => {

        const hash =
            window.location.hash.replace("#", "");

        showPage(hash || "home", false);

    });


    /* =========================
       HEADER SCROLL EFFECT
       ========================= */

    function handleHeaderScroll() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
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


    /* =========================
       EXTERNAL LINKS
       ========================= */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );

    externalLinks.forEach(link => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =========================
       RECRUITMENT LINKS
       ========================= */

    const recruitmentLinks =
        document.querySelectorAll(
            ".recruitment-link"
        );

    recruitmentLinks.forEach(link => {

        link.addEventListener("click", () => {

            link.classList.add("clicked");

            setTimeout(() => {
                link.classList.remove("clicked");
            }, 300);

        });

    });


    /* =========================
       DISCORD LINKS
       ========================= */

    const discordLinks =
        document.querySelectorAll(
            ".discord-link"
        );

    discordLinks.forEach(link => {

        link.addEventListener("click", () => {

            link.classList.add("clicked");

            setTimeout(() => {
                link.classList.remove("clicked");
            }, 300);

        });

    });


    /* =========================
       CARD ANIMATIONS
       ========================= */

    const animatedElements =
        document.querySelectorAll(
            ".feature-card, " +
            ".about-card, " +
            ".team-card, " +
            ".recruitment-card, " +
            ".rule-card, " +
            ".community-card, " +
            ".step, " +
            ".mini-stat"
        );


    /* =========================
       INTERSECTION OBSERVER
       ========================= */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            element.classList.add(
                "animate-on-scroll"
            );

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =========================
       PAGE TITLE
       ========================= */

    function updatePageTitle(pageName) {

        const titles = {

            home:
                "J3STER // ROLEPLAY",

            about:
                "O nás | J3STER // ROLEPLAY",

            team:
                "Tým | J3STER // ROLEPLAY",

            recruitment:
                "Nábor | J3STER // ROLEPLAY",

            rules:
                "Pravidla | J3STER // ROLEPLAY",

            community:
                "Komunita | J3STER // ROLEPLAY"

        };

        document.title =
            titles[pageName] ||
            "J3STER // ROLEPLAY";

    }


    /* =========================
       RESPONSIVE MENU
       ========================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMobileMenu();
        }

    });


    /* =========================
       CURRENT YEAR
       ========================= */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================
       ACCESSIBILITY
       ========================= */

    if (mobileMenuButton) {

        if (
            !mobileMenuButton.hasAttribute(
                "aria-expanded"
            )
        ) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (
            !mobileMenuButton.hasAttribute(
                "aria-label"
            )
        ) {

            mobileMenuButton.setAttribute(
                "aria-label",
                "Otevřít menu"
            );

        }

    }


    /* =========================
       INITIALIZATION
       ========================= */

    handleHeaderScroll();

    loadHashPage();

    console.log(
        "J3STER // ROLEPLAY website loaded successfully."
    );

});