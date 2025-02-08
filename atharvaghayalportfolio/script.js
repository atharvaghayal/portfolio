/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;
    const navLinks = document.querySelectorAll(".nav-link");

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });

    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY;
        navLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (
                section.offsetTop <= fromTop + 100 &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
});
