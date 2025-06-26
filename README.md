# Personal Website

A modern, minimal, and responsive personal website built with HTML, CSS, and JavaScript. Perfect for showcasing your portfolio, skills, and projects.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimal design with smooth animations
- **Smooth Navigation**: Fixed navigation bar with smooth scrolling
- **Interactive Elements**: Hover effects, animations, and form validation
- **Contact Form**: Functional contact form with validation
- **Mobile-Friendly**: Hamburger menu for mobile devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized for performance

## 📁 File Structure

```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Setup Instructions

1. **Download/Clone** the files to your local machine
2. **Open** `index.html` in your web browser
3. **Customize** the content as needed (see customization guide below)
4. **Deploy** to your preferred hosting service

## 🎨 Customization Guide

### 1. Personal Information

Edit the following in `index.html`:

- **Name**: Replace "Your Name" throughout the file
- **Title**: Update the `<title>` tag
- **Hero Section**: Modify the introduction text
- **About Section**: Update your personal description and stats
- **Contact Information**: Update email, phone, and location

### 2. Projects Section

Replace the sample projects with your own:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-laptop-code"></i>
        </div>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
        <div class="project-links">
            <a href="your-github-link" class="project-link"><i class="fab fa-github"></i> Code</a>
            <a href="your-live-link" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
        </div>
    </div>
</div>
```

### 3. Skills Section

Update the skills in each category:

```html
<div class="skill-category">
    <h3>Frontend</h3>
    <div class="skill-items">
        <span class="skill-item">Your Skill 1</span>
        <span class="skill-item">Your Skill 2</span>
    </div>
</div>
```

### 4. Social Links

Update the social media links in the contact section:

```html
<div class="social-links">
    <a href="your-github" class="social-link"><i class="fab fa-github"></i></a>
    <a href="your-linkedin" class="social-link"><i class="fab fa-linkedin"></i></a>
    <a href="your-twitter" class="social-link"><i class="fab fa-twitter"></i></a>
    <a href="your-instagram" class="social-link"><i class="fab fa-instagram"></i></a>
</div>
```

### 5. Colors and Styling

Modify the color scheme in `styles.css`:

```css
/* Primary color */
.btn-primary {
    background: #007bff; /* Change this to your preferred color */
}

/* Hero gradient */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Customize gradient */
}
```

### 6. Profile Image

Replace the placeholder icons with your actual images:

```html
<!-- For hero section -->
<div class="hero-image">
    <img src="path/to/your/image.jpg" alt="Your Name" class="profile-image">
</div>

<!-- Add this CSS for the image -->
.profile-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎯 Sections Included

1. **Hero Section**: Introduction and call-to-action
2. **About Section**: Personal information and statistics
3. **Projects Section**: Portfolio showcase
4. **Skills Section**: Technical skills and technologies
5. **Contact Section**: Contact form and information
6. **Footer**: Copyright and additional links

## 🔧 JavaScript Features

- Mobile navigation toggle
- Smooth scrolling navigation
- Form validation and submission
- Scroll animations
- Typing animation for hero title
- Hover effects and interactions
- Active navigation highlighting
- Notification system

## 🌐 Deployment Options

### GitHub Pages
1. Create a new repository on GitHub
2. Upload your files
3. Go to Settings > Pages
4. Select source branch and save

### Netlify
1. Drag and drop your folder to Netlify
2. Your site will be live instantly

### Vercel
1. Connect your GitHub repository
2. Deploy automatically on push

### Traditional Hosting
Upload files to your web server via FTP/SFTP

## 📧 Contact Form Setup

The contact form currently shows a success message. To make it functional:

1. **Formspree** (Free):
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

2. **Netlify Forms**:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

3. **Custom Backend**: Implement your own form handling

## 🎨 Customization Tips

- **Fonts**: Change the Google Fonts import in the HTML head
- **Icons**: Replace Font Awesome icons with your own
- **Animations**: Modify CSS animations in `styles.css`
- **Layout**: Adjust grid layouts and spacing
- **Content**: Add or remove sections as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. If you make improvements, consider sharing them with the community!

## 📞 Support

If you need help customizing your website, feel free to:
- Check the code comments for guidance
- Modify the CSS variables for easy theming
- Use browser developer tools to experiment with changes

---

**Happy coding! 🚀** 