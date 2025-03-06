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
    "Data Analyst learner",
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
document.getElementById("logo").addEventListener("dblclick", function() {
    window.location.href = "riddlegame/riddle.html"; // Redirects to the riddle page
});

window.addEventListener("load", function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 0);
  });
