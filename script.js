// ===== Scroll & Navbar Show Animation =====
document.addEventListener("DOMContentLoaded", () => {
  let lastScroll = window.scrollY;
  const navbar = document.querySelector("nav"); // Make sure your <nav> exists

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    // Check if user scrolled up and reached top
    if (currentScroll === 0 && lastScroll > 100) {
      navbar.classList.remove("navbar-hide");
      navbar.classList.add("navbar-reveal");
    }

    if (currentScroll > 100) {
      navbar.classList.remove("navbar-reveal");
    }    

    lastScroll = currentScroll;
  });
});

// ========== Typing Animation ==========
const texts = ["Engineering Student", "Aspiring Data Analyst", "Developer", "Chess Player"];
let count = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function typeEffect() {
  if (count === texts.length) count = 0;
  currentText = texts[count];

  let displayed = isDeleting
    ? currentText.substring(0, charIndex--)
    : currentText.substring(0, charIndex++);

  document.getElementById("dynamic-text").textContent = displayed;

  if (!isDeleting && charIndex === currentText.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    count++;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 120);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// ===== THEME TOGGLE + LOCAL STORAGE =====

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌞";
  } else {
    body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";
  }

  // Toggle theme on click
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "🌞" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

// Show and hide contact form

document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.getElementById("contact-btn");
  const contactFormContainer = document.getElementById("contact-form-container");
  const closeBtn = document.getElementById("close-form");

  contactBtn.addEventListener("click", () => {
    contactFormContainer.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    contactFormContainer.style.display = "none";
  });

  // Close form when clicking outside the form
  contactFormContainer.addEventListener("click", (e) => {
    if (e.target === contactFormContainer) {
      contactFormContainer.style.display = "none";
    }
  });
});
// ========Contact form functionality========
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbx5jm3KOWOzkqg0Sxc8G5ywTfntMJVab-qHcO9hBG59KiI_GHLJNAMMy2FoRddE4dk/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        alert("Submitted successfully!");
        form.reset();
      })
      .catch(error => {
        alert("Something went wrong.");
        console.error(error);
      });
  });
});

// ===== WhatsApp Popup Functionality =====
document.addEventListener("DOMContentLoaded", () => {
  const messageBtn = document.getElementById("message-btn");
  const popup = document.getElementById("whatsapp-popup");
  const closePopup = document.getElementById("close-popup");

  messageBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close when clicked outside
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
