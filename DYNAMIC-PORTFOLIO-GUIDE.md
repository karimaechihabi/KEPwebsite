# Dynamic Portfolio System

This portfolio is fully dynamic and supports three different portfolio types: Professor, Research Engineer, and PhD Student.

## How It Works

The entire website is driven by JSON configuration files. Simply edit the JSON file to customize content, and the site automatically adapts.

## For Production Use

### Step 1: Choose Your Portfolio Type
The main portfolio data file is `public/portfolio-data.json`. This file contains:
- `portfolioConfig`: Defines which sections to enable
- `personalInfo`: Your personal details
- `sections`: Content for each section
- `contact`: Contact information

### Step 2: Edit the Configuration

Edit `portfolioConfig` at the top of the JSON to enable/disable sections:

```json
{
  "portfolioConfig": {
    "type": "professor",
    "enabledSections": ["home", "research", "professionalservice", "teaching", "team", "contact"]
  }
}
```

### Step 3: Update Your Information

Replace the content in:
- `personalInfo`: Your name, title, affiliation, profile image
- `sections`: Content for each enabled section
- `contact`: Your contact details and social links

### Step 4: Deploy

Run `npm run build` and deploy the `dist` folder. The site will automatically show only the sections you enabled.

## Available Sections

The system supports these sections:
- **home**: Hero section with welcome message and highlights
- **research**: Research projects and publications
- **professionalservice**: Professional experience/service timeline
- **teaching**: Courses and teaching experience
- **team**: Team members (for professors)
- **contact**: Contact information
- **projects**: Project showcase (uses Research component)
- **experience**: Work experience (uses ProfessionalService component)
- **skills**: Skills and expertise (uses Teaching component)
- **publications**: Publication list (uses Research component)
- **education**: Educational background (uses Teaching component)

## Portfolio Type Examples

### Professor
Typical sections:
```json
"enabledSections": ["home", "research", "professionalservice", "teaching", "team", "contact"]
```

### Research Engineer
Typical sections:
```json
"enabledSections": ["home", "research", "professionalservice", "contact"]
```
(Research shows projects, ProfessionalService shows work experience)

### PhD Student
Typical sections:
```json
"enabledSections": ["home", "research", "teaching", "contact"]
```
(Research shows publications, Teaching shows TA experience)

## Dev Mode Switcher

When running `npm run dev`, a portfolio switcher appears in the bottom-right corner. This allows you to preview different portfolio types:

- **Professor**: Loads `portfolio-data.json`
- **Research Engineer**: Loads `research-engineer.json`
- **PhD Student**: Loads `phd-student.json`

This switcher only appears in development mode and is automatically hidden in production builds.

## Customizing the Design

All components follow the same minimalist, academic design:
- Light font weights (`font-light`)
- Gray color palette with midnight accents
- Clean spacing and minimal borders
- Subtle animations

The styling is consistent across all portfolio types, so no design changes are needed when switching types.

## Adding New Sections

To add a new section:

1. Add the section ID to `enabledSections` in your JSON
2. Add the section data to the `sections` object
3. If needed, create a new component or reuse existing ones
4. Add the section mapping in `App.jsx` `renderSection()` function

## File Structure

```
public/
├── portfolio-data.json        # Professor portfolio (main)
├── research-engineer.json     # Research Engineer example
├── phd-student.json          # PhD Student example
└── images/                   # Your images

src/
├── components/
│   └── sections/             # Section components
├── hooks/
│   └── usePortfolioData.js   # Data fetching hook
└── App.jsx                   # Main app with dynamic rendering
```

## Tips

- Keep JSON structure consistent with examples
- Test with the dev mode switcher before deploying
- Use descriptive section names in the JSON
- Ensure all required fields are present in each section
- Optimize images for web before adding them

## Need Help?

Check the example JSON files:
- `portfolio-data.json` - Professor example
- `research-engineer.json` - Research Engineer example
- `phd-student.json` - PhD Student example

These show the complete structure for each portfolio type.
