const body = document.body;
const themeIcon = document.getElementById('theme-icon');

// Function to toggle the theme and save the preference in localStorage
function toggleTheme() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.src = 'moon.png';
        themeIcon.alt = 'Dark Mode';
        localStorage.setItem('theme', 'dark'); // Save theme preference
    } else {
        themeIcon.src = 'sun.png';
        themeIcon.alt = 'Light Mode';
        localStorage.setItem('theme', 'light'); // Save theme preference
    }
}

// Check the saved theme on page load and apply it
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.src = 'moon.png';
        themeIcon.alt = 'Dark Mode';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.src = 'sun.png';
        themeIcon.alt = 'Light Mode';
    }
};
