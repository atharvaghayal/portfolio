// Personal Analytics Dashboard Script
// This script handles data processing, chart rendering, and UI updates

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    updateOverviewStats();
    renderCircularCharts();
}

// Update overview statistics
function updateOverviewStats() {
    const totalSkills = document.getElementById('total-skills');
    const avgProficiency = document.getElementById('avg-proficiency');
    const improvingSkills = document.getElementById('improving-skills');
    const latestUpdate = document.getElementById('latest-update');

    totalSkills.textContent = getSkillNames().length;
    avgProficiency.textContent = getAverageProficiency() + '%';
    improvingSkills.textContent = getHighProficiencySkillsCount(50); // Skills above 50%
    const date = new Date(skillsData.lastUpdated);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    latestUpdate.textContent = `${month}/${year}`;
}

// Render Circular Progress Charts for each skill
function renderCircularCharts() {
    const container = document.getElementById('circular-charts');
    container.innerHTML = ''; // Clear existing charts

    const skillNames = getSkillNames();
    const levels = getCurrentLevels();

    skillNames.forEach((skill, index) => {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'circular-chart-container';

        const skillName = document.createElement('div');
        skillName.className = 'skill-name';
        skillName.textContent = skill;

        const chartDiv = document.createElement('div');
        chartDiv.className = 'circular-chart';

        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        chartDiv.appendChild(canvas);

        const percentage = document.createElement('div');
        percentage.className = 'percentage';
        percentage.textContent = levels[index] + '%';
        chartDiv.appendChild(percentage);

        chartContainer.appendChild(skillName);
        chartContainer.appendChild(chartDiv);
        container.appendChild(chartContainer);

        // Animate the circular chart
        animateCircularChart(canvas, levels[index]);
    });
}

function animateCircularChart(canvas, percentage) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    const lineWidth = 8;

    let currentPercentage = 0;
    const targetPercentage = percentage;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        currentPercentage = targetPercentage * progress;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#ecf0f1';
        ctx.stroke();

        // Draw progress arc
        const endAngle = (currentPercentage / 100) * 2 * Math.PI - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = getColorForPercentage(currentPercentage);
        ctx.lineCap = 'round';
        ctx.stroke();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function getColorForPercentage(percentage) {
    if (percentage >= 80) return '#27ae60'; // Green for high proficiency
    if (percentage >= 60) return '#f39c12'; // Orange for medium
    if (percentage >= 40) return '#e74c3c'; // Red for low
    return '#95a5a6'; // Gray for very low
}

// Make charts responsive
window.addEventListener('resize', function() {
    // Re-render charts on resize
    renderCircularCharts();
});