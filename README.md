# Academic Portfolio

A modern, professional academic portfolio website built with React, Tailwind CSS, and Framer Motion. This portfolio is fully data-driven, allowing easy updates through a JSON configuration file.

## Features

- 🌙 **Dark/Light Theme Toggle** - Automatic system preference detection with manual override
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🎨 **Modern Design** - Clean, professional aesthetic suitable for academia
- 📄 **JSON-Driven Content** - Update your portfolio without touching code
- ⚡ **Smooth Animations** - Subtle Framer Motion animations for enhanced UX
- 🔍 **Interactive Filtering** - Filter research projects and team members
- 📧 **Contact Form** - Built-in contact form for inquiries
- 🎯 **Smooth Scrolling** - Single-page app with smooth navigation

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx          # Main navigation with theme toggle
│   ├── sections/              # Individual page sections
│   │   ├── Home.jsx          # Hero section
│   │   ├── Research.jsx      # Research projects with filtering
│   │   ├── ProfessionalService.jsx  # Service timeline
│   │   ├── Teaching.jsx      # Course accordion
│   │   ├── Team.jsx          # Team member profiles
│   │   └── Contact.jsx       # Contact information
│   └── ui/                   # Reusable UI components
│       ├── Card.jsx
│       ├── Timeline.jsx
│       ├── Accordion.jsx
│       └── ProfileCard.jsx
├── hooks/                    # Custom React hooks
│   ├── useTheme.js          # Theme management
│   ├── usePortfolioData.js  # Data fetching
│   └── useScrollSpy.js      # Scroll position tracking
├── utils/
│   └── scrollUtils.js       # Smooth scrolling utilities
└── App.jsx                  # Main application component

public/
├── portfolio-data.json      # All portfolio content (EDIT THIS!)
└── images/                 # Portfolio images
    ├── profile.jpg         # Your profile photo
    ├── research/          # Research project images
    └── team/              # Team member photos
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Customization Guide

### Updating Portfolio Content

All content is managed through `public/portfolio-data.json`. This file contains:

- **Personal Information** - Name, title, bio, profile image
- **Research Projects** - Publications, ongoing work, project details
- **Professional Service** - Editorial positions, conference roles
- **Teaching** - Courses, supervision statistics
- **Team Members** - Current team and alumni
- **Contact Information** - Email, office, social links

### Adding Images

1. **Profile Photo:** Add `profile.jpg` to `public/images/`
2. **Research Images:** Add to `public/images/research/`
3. **Team Photos:** Add to `public/images/team/`
4. **Update JSON:** Reference images using `/images/filename.jpg`

### Customizing Colors

The color scheme can be customized in two ways:

1. **Through JSON:** Update the `theme` section in `portfolio-data.json`
2. **Through Tailwind:** Modify `tailwind.config.js` for more advanced changes

### Section Types

The portfolio supports different component types for each section:

- **hero** - Home page with profile and highlights
- **card_grid** - Research projects with filtering
- **timeline** - Professional service chronology  
- **accordion** - Expandable teaching courses
- **profile_grid** - Team member cards with filtering

## Content Guidelines

### Research Section
- Use descriptive titles and clear abstracts
- Include publication venues and years
- Add relevant tags for filtering
- Provide links to papers/projects

### Professional Service
- List roles chronologically
- Include organization names and time periods
- Categorize by type (editorial, conference, advisory, funding)

### Teaching Section
- Provide course codes and full names
- Include semester/year information
- Add student evaluation scores if available
- List relevant course materials

### Team Section
- Include current status (current/graduated)
- Add research areas and start years
- Include publication counts and awards
- Provide links to personal websites

## Technical Details

### Built With
- **React 18** - Modern React with hooks
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Performance Features
- Lazy loading for images
- Optimized bundle splitting
- CSS purging for smaller builds
- Smooth scrolling with minimal reflow

### Browser Support
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers

## Deployment

### Netlify/Vercel
1. Connect your GitHub repository
2. Set build command to `npm run build`
3. Set publish directory to `dist`
4. Deploy!

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to your GitHub Pages repository
```

### Custom Server
```bash
npm run build
# Serve the dist/ folder with your web server
```

## Common Customizations

### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Add the section to `App.jsx`
3. Update the navigation array
4. Add corresponding data structure to JSON

### Changing Layout
- Modify grid classes in section components
- Update responsive breakpoints in Tailwind config
- Adjust spacing using section-padding utility class

### Adding New Component Types
1. Create component in `src/components/ui/`
2. Add to section component
3. Document usage in JSON structure

## Support

For questions or issues:
1. Check the JSON structure matches the examples
2. Verify all image paths are correct
3. Ensure proper component imports
4. Review browser console for errors

## License

This template is open source and available under the MIT License.