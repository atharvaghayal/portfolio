# Personal Analytics Dashboard

A responsive personal analytics dashboard built with vanilla HTML, CSS, and JavaScript to showcase technical expertise and learning progress.

## Features

- **Overview Section**: Displays total skills, average proficiency, high proficiency skills count (above 50%), and last update date.
- **Skill Proficiency**: Individual circular progress charts for each skill showing proficiency levels with smooth animations.
- **Responsive Design**: Uses CSS Grid and Flexbox for mobile-friendly layout.
- **Animations**: Smooth 2-second animations for circular chart progress filling with color-coded proficiency levels.
- **Editable Data**: Skills data stored in `js/data.js` for easy modification.

## Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+, Canvas API for charts)

## Project Structure

```
analytics-dashboard/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
└── js/
    ├── data.js         # Skills proficiency data
    └── script.js       # Main application logic and chart rendering
```

## How to Run

1. Ensure you have Node.js installed.
2. Install http-server globally: `npm install -g http-server`
3. Navigate to the project directory: `cd analytics-dashboard`
4. Start the server: `http-server -p 8080`
5. Open your browser and go to `http://localhost:8080`

## Customization

### Adding New Skills

To add a new skill:

1. Open `js/data.js`
2. Add a new entry to the `skills` object:

```javascript
"New Skill": 75  // Proficiency level (0-100)
```

3. The dashboard will automatically update to include the new skill's circular chart.

### Updating Proficiency Levels

- Edit the percentage values in `js/data.js` to update skill proficiencies.
- The circular charts will animate to the new values on page load.

### Styling

Modify `css/styles.css` to change colors, fonts, or layout. The design uses CSS custom properties for easy theming.

## Browser Support

- Modern browsers with Canvas API support (Chrome, Firefox, Safari, Edge)
- Responsive design works on desktop, tablet, and mobile devices

## Future Enhancements

- Add hover tooltips for detailed information
- Implement data export/import functionality
- Add filtering and sorting options
- Integrate with external data sources
- Add user authentication for personalized dashboards