// Personal Analytics Dashboard Data
// This file contains the data structure for skills proficiency levels.
// Edit this data to update the dashboard. Percentages are 0-100.

const skillsData = {
    // Last updated date for the dashboard
    lastUpdated: "2026-01-03",

    // Skills with current proficiency (0-100)
    skills: {
        "Stacks": 15,
        "Queues": 15,
        "Linkedlists": 15,
        "Arrays": 15,
        "HashTables": 15,
        "Trees": 15,
        "Sorting": 15,
        "Graphs": 15,
        "HTML/CSS": 80,
        "JS": 80,
        "ReactJS framework": 65,
        "Python Flask": 75,
        "Python Django": 40,
        "Java": 15,
        "R": 15,
        "C": 15,
        "Excel": 60,
        "PowerBi": 70
    }
};

// Helper function to get skill names
function getSkillNames() {
    return Object.keys(skillsData.skills);
}

// Helper function to get current levels
function getCurrentLevels() {
    return Object.values(skillsData.skills);
}

// Helper function to calculate average proficiency
function getAverageProficiency() {
    const levels = getCurrentLevels();
    return Math.round(levels.reduce((sum, level) => sum + level, 0) / levels.length);
}

// Helper function to count skills above a certain threshold (e.g., improving or high proficiency)
function getHighProficiencySkillsCount(threshold = 50) {
    const levels = getCurrentLevels();
    return levels.filter(level => level >= threshold).length;
}