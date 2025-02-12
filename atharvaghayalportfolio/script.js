document.addEventListener("DOMContentLoaded", () => {
    /* 1️⃣ Theme Toggle with Local Storage */
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    // Apply saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });

    /* 2️⃣ Navbar Scroll Effect */
    const navLinks = document.querySelectorAll(".nav-link");

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

    /* 3️⃣ Typing Animation with Blinking Cursor */
    const greetingText = document.getElementById("greeting");
    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning, I’m Atharva!";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon, I’m Atharva!";
    } else {
        greeting = "Good Evening, I’m Atharva!";
    }

    function typeEffect(text, element, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + "<span class='cursor'>|</span>";
                i++;
                setTimeout(type, speed);
            } else {
                document.querySelector(".cursor").classList.add("blink");
            }
        }
        type();
    }

    typeEffect(greeting, greetingText, 100);

    /* 4️⃣ Save Profile Photo & Icons in Local Storage */
    const profilePhoto = document.getElementById("profile-photo");
    const githubIcon = document.getElementById("github-icon");
    const mailIcon = document.getElementById("mail-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");

    // Function to load stored images
    function loadImage(element, key, defaultSrc) {
        const storedImage = localStorage.getItem(key);
        element.src = storedImage ? storedImage : defaultSrc;
    }

    loadImage(profilePhoto, "profilePhoto", "default-profile.png");
    loadImage(githubIcon, "githubIcon", "default-github.png");
    loadImage(mailIcon, "mailIcon", "default-mail.png");
    loadImage(linkedinIcon, "linkedinIcon", "default-linkedin.png");
});
// Get elements
const profileImg = document.getElementById("profile-photo");
const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");
const icon3 = document.getElementById("icon3");
const uploadInput = document.getElementById("upload-profile");

// Function to load stored images from local storage
function loadStoredImages() {
    const storedProfile = localStorage.getItem("profilePhoto");
    const storedIcon1 = localStorage.getItem("icon1");
    const storedIcon2 = localStorage.getItem("icon2");
    const storedIcon3 = localStorage.getItem("icon3");

    if (storedProfile) profileImg.src = storedProfile;
    if (storedIcon1) icon1.src = storedIcon1;
    if (storedIcon2) icon2.src = storedIcon2;
    if (storedIcon3) icon3.src = storedIcon3;
}

// Function to store images in local storage
function storeImage(input, key) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem(key, e.target.result);
            document.getElementById(key).src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Event listener for profile photo upload
uploadInput.addEventListener("change", function () {
    storeImage(uploadInput, "profilePhoto");
});

// Load images on page load
window.addEventListener("load", loadStoredImages);

// Theme Toggle - Update Icons Based on Theme
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    updateIconTheme();
});

// Function to update icons based on theme
function updateIconTheme() {
    const isDark = document.body.classList.contains("dark-mode");
    if (isDark) {
        icon1.style.filter = "invert(1)";
        icon2.style.filter = "invert(1)";
        icon3.style.filter = "invert(1)";
    } else {
        icon1.style.filter = "none";
        icon2.style.filter = "none";
        icon3.style.filter = "none";
    }
}

// Apply correct icon theme on page load
window.addEventListener("load", updateIconTheme);
