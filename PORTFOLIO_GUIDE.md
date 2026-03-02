# Portfolio Update Guide

This guide explains how to update your portfolio content by editing the `public/portfolio-data.json` file. No coding knowledge required!

## Quick Start

1. Open `public/portfolio-data.json` in any text editor
2. Update the information in quotes after the colons
3. Save the file
4. Refresh your browser to see changes

## JSON File Structure

### Personal Information

```json
{
  "personalInfo": {
    "name": "Dr. Your Name",
    "title": "Your Academic Title",
    "affiliation": "Your Institution",
    "profileImage": "/images/profile.jpg",
    "tagline": "Your professional tagline",
    "bio": "Your biography paragraph"
  }
}
```

**Fields to Update:**
- `name`: Your full name with title
- `title`: Your current position
- `affiliation`: Your university/institution
- `profileImage`: Path to your profile photo
- `tagline`: Brief professional statement
- `bio`: Longer biography (2-3 sentences)

### Home Section

```json
{
  "sections": {
    "home": {
      "elements": [{
        "welcomeMessage": "Your welcome message",
        "highlights": [
          "Achievement 1",
          "Achievement 2", 
          "Achievement 3",
          "Achievement 4"
        ],
        "ctaButtons": [
          {
            "text": "Download CV",
            "link": "/cv.pdf",
            "type": "primary"
          }
        ]
      }]
    }
  }
}
```

**How to Update:**
- Change `welcomeMessage` to your personal welcome
- Update `highlights` array with your key achievements
- Modify button text and links as needed

### Research Section

```json
{
  "research": {
    "elements": [
      {
        "title": "Your Research Project Title",
        "description": "Brief description of the research",
        "link": "https://link-to-paper.com",
        "tags": ["Tag1", "Tag2", "Tag3"],
        "image": "/images/research/project1.jpg",
        "year": "2024",
        "status": "published",
        "venue": "Conference/Journal Name",
        "funding": "Grant Information"
      }
    ]
  }
}
```

**Status Options:**
- `published` - Published work
- `ongoing` - Current research
- `under-review` - Submitted but not yet published

**Adding New Research:**
1. Copy an existing research object
2. Paste it after the last one (don't forget the comma)
3. Update all the fields with your information

### Professional Service Section

```json
{
  "professionalService": {
    "elements": [
      {
        "role": "Your Role",
        "organization": "Organization Name",
        "period": "2020-Present",
        "description": "Description of your responsibilities",
        "type": "editorial"
      }
    ]
  }
}
```

**Type Options:**
- `editorial` - Editorial positions (blue dot)
- `conference` - Conference committees (green dot)
- `advisory` - Advisory roles (purple dot)
- `funding` - Funding panels (orange dot)

### Teaching Section

```json
{
  "teaching": {
    "elements": [
      {
        "courseCode": "CS 101",
        "courseName": "Course Full Name",
        "semester": "Fall 2024",
        "level": "Undergraduate",
        "description": "Course description",
        "enrollment": "50 students",
        "materials": ["Syllabus", "Lecture Notes", "Assignments"],
        "evaluations": "4.8/5.0"
      }
    ],
    "philosophy": "Your teaching philosophy statement",
    "supervision": {
      "currentPhD": 8,
      "graduatedPhD": 12,
      "currentMasters": 6,
      "graduatedMasters": 25,
      "postdocs": 2
    }
  }
}
```

**Level Options:**
- `Undergraduate`
- `Graduate`
- `Both`

### Team Section

```json
{
  "team": {
    "elements": [
      {
        "name": "Team Member Name",
        "role": "PhD Student",
        "image": "/images/team/member1.jpg",
        "researchArea": "Machine Learning",
        "startYear": "2023",
        "status": "current",
        "expectedGraduation": "2026",
        "bio": "Brief biography",
        "publications": 5,
        "awards": ["Award Name"],
        "website": "https://personal-website.com"
      }
    ]
  }
}
```

**Status Options:**
- `current` - Current team member
- `graduated` - Alumni

**Role Examples:**
- `Postdoctoral Researcher`
- `PhD Student`
- `Master's Student`
- `Visiting Scholar`

### Contact Section

```json
{
  "contact": {
    "email": "your.email@university.edu",
    "office": "Building Name, Room 123",
    "address": "Department\nUniversity\nAddress\nCity, State ZIP",
    "phone": "+1 (555) 123-4567",
    "officeHours": "Tuesdays & Thursdays, 2:00-4:00 PM",
    "social": {
      "linkedin": "https://linkedin.com/in/yourprofile",
      "googleScholar": "https://scholar.google.com/citations?user=...",
      "researchGate": "https://www.researchgate.net/profile/...",
      "orcid": "https://orcid.org/0000-0000-0000-0000",
      "twitter": "https://twitter.com/yourusername",
      "github": "https://github.com/yourusername"
    }
  }
}
```

## Adding Images

### Profile Photo
1. Add your photo as `profile.jpg` in the `public/images/` folder
2. Make sure it's square (1:1 aspect ratio) and at least 400x400 pixels

### Research Images
1. Add images to `public/images/research/`
2. Use descriptive filenames like `ai-ethics-project.jpg`
3. Recommended size: 800x600 pixels
4. Update the `image` field in your research objects

### Team Photos
1. Add photos to `public/images/team/`
2. Use format: `firstname-lastname.jpg`
3. Square format recommended
4. Update the `image` field in team member objects

## Common Mistakes to Avoid

1. **Missing Commas**: Every item in a list needs a comma except the last one
2. **Wrong Quotes**: Use straight quotes `"` not curly quotes `"`
3. **Broken Links**: Make sure all URLs start with `http://` or `https://`
4. **Image Paths**: Always start image paths with `/images/`
5. **JSON Syntax**: Use a JSON validator if you're getting errors

## Testing Your Changes

1. Save the `portfolio-data.json` file
2. Refresh your browser
3. If the page is blank, check the browser console for errors
4. Most errors are due to missing commas or quotes

## Tips for Success

- **Backup First**: Make a copy of the working JSON file before making changes
- **Small Changes**: Update one section at a time
- **Test Often**: Save and refresh frequently to catch errors early
- **Use JSON Validator**: Paste your JSON into an online validator if needed
- **Copy Examples**: Use the existing entries as templates for new ones

## Getting Help

If you run into issues:

1. **JSON Validator**: Use jsonlint.com to check for syntax errors
2. **Browser Console**: Press F12 to see error messages
3. **Restore Backup**: If stuck, restore your backup and try again
4. **Start Small**: Make minimal changes first to ensure everything works

Remember: The portfolio will automatically update when you save changes to the JSON file!