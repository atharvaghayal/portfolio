function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const textElement = document.getElementById("dynamic-text");
const cursorElement = document.querySelector(".cursor");

const texts = [
    "Engineering student",
    "Aspiring Data Analyst",
    "Developer",
    "Chess Player"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentText = texts[textIndex];
    
    if (!isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    } else {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500); // Wait before typing next text
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing & deleting speed
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000); // Start effect after 1s
});
// contact form js code.
// Open Modal
document.getElementById("openForm").onclick = function() {
    document.getElementById("contactModal").style.display = "block";
};

// Close Modal
document.querySelector(".close").onclick = function() {
    document.getElementById("contactModal").style.display = "none";
};

// Form Submission
document.getElementById("contactForm").onsubmit = function(event) {
    // contact form js code.
// Open Modal
document.getElementById("openForm").onclick = function() {
    document.getElementById("contactModal").style.display = "block";
};

// Close Modal
document.querySelector(".close").onclick = function() {
    document.getElementById("contactModal").style.display = "none";
};

// Form Submission (No File Download, Direct Email)
document.getElementById("contactForm").onsubmit = function() {
    alert("Thank you! Your message has been sent successfully.");
};
};

// Function to Save Data as a File
function saveToFile(data) {
    let blob = new Blob([data], { type: "text/plain" });
    let anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "contact_data.txt";
    anchor.click();
}

/* MOBILE RESPONSIVENESS */
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    function updateBackground() {
        let hour = new Date().getHours();
        let gradient;

        if (hour >= 5 && hour < 12) { 
            gradient = "linear-gradient(to right, #FFD700, #FFA500)"; // Morning (Gold-Orange)
        } else if (hour >= 12 && hour < 17) { 
            gradient = "linear-gradient(to right, #FF8C00, #FF4500)"; // Afternoon (Orange-Red)
        } else if (hour >= 17 && hour < 20) { 
            gradient = "linear-gradient(to right, #FF6347, #8B0000)"; // Evening (Tomato-DarkRed)
        } else { 
            gradient = "linear-gradient(to right, #2C3E50, #000000)"; // Night (Dark Blue-Black)
        }

        if (!document.body.classList.contains("dark-mode")) {
            document.body.style.background = gradient;
        }
    }

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        let isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        
        // Ensure dark mode background applies
        if (isDark) {
            document.body.style.background = "linear-gradient(to right, #001F3F, #000000)";
        } else {
            updateBackground();
        }
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.body.style.background = "linear-gradient(to right, #001F3F, #000000)";
    } else {
        updateBackground();
    }

    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
});

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    let isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update all necessary sections and containers
    document.querySelectorAll(".details-container, .experience-container, .experience-card, .color-container").forEach(box => {
        box.style.background = isDark ? "rgba(255, 255, 255, 0.1)" : "white";
        box.style.border = isDark ? "1px solid #555" : "1px solid rgb(163, 163, 163)";
        box.style.boxShadow = isDark ? "0px 0px 10px rgba(255, 255, 255, 0.2)" : "black 0.1rem 0.1rem 0.5rem";
    });

    // Ensure dark mode background applies
    if (isDark) {
        document.body.style.background = "linear-gradient(to right, #001F3F, #000000)";
    } else {
        updateBackground();
    }
}
