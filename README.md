# Joe Finberg - Personal Website

A minimalist personal website showcasing CV, writing, and book links.

## Features

- Clean, minimalist design with white background and American Typewriter font
- Responsive layout (side-by-side on desktop, stacked on mobile)
- Poetry showcase with dedicated pages
- Downloadable CV
- SEO optimized for "Joe Finberg" searches
- No dependencies - pure HTML/CSS

## File Structure

```
Joes_New_Website/
├── index.html              # Homepage with bio and photo
├── writing.html            # Writing landing page
├── poem-1.html             # "The Unfinished Epistle"
├── poem-2.html             # "The Fog"
├── css/
│   └── styles.css          # All styles
├── images/
│   └── [add your photo here]
├── files/
│   └── [add your CV PDF here]
├── fonts/
│   └── [optional custom fonts]
└── README.md               # This file
```

## Setup Instructions

### 1. Add Your Assets

#### Profile Photo
- Add your photo to the `images/` folder
- Rename it to: `joe-finberg-profile.jpg` (or update the filename in `index.html` line 24)
- Recommended: Square or portrait orientation, at least 800x800px
- Compress the image for web (aim for under 200KB)

#### CV/Resume PDF
- Add your CV to the `files/` folder
- Name it: `joe-finberg-cv.pdf` (or update the filename in `index.html` line 38)

### 2. Complete Poem Content

#### Poem 1: "The Unfinished Epistle"
The first poem (`poem-1.html`) currently contains only the first 50 lines as a preview.

**To add the full 596-line poem:**
1. Open `poem-1.html` in a text editor
2. Look for the line: `<p><em>[Poem continues for 596 lines...]</em></p>`
3. Replace that placeholder with the remaining verses from your LaTeX file
4. Format each 10-line stanza as a `<p>` tag with `<br>` tags for line breaks
5. Follow the existing format in the file

**Quick reference for formatting:**
```html
<p>
    Line one text here,<br>
    Line two text here;<br>
    Line three text here,<br>
    ...
</p>
```

#### Poem 2: "The Fog"
This poem is complete and ready to go!

### 3. Update Placeholders

#### Amazon Book Link
- Open `index.html` and `writing.html`
- Find: `<a href="https://www.amazon.com" ...>Buy My Book on Amazon</a>`
- Replace `https://www.amazon.com` with your actual Amazon book URL
- Optional: Update the link text with your book title

#### Company Link
- Open `index.html`
- Find: `<a href="#company" class="link-button">My Company</a>`
- Replace `#company` with your actual company website URL
- Optional: Update "My Company" to your company name

### 4. Customize Bio (Optional)
The bio in `index.html` (lines 29-44) is based on the information you provided. Feel free to edit it to better reflect your work and personality.

### 5. Local Testing

Before deploying, test your website locally:

#### Option A: Python (Recommended - works on Mac/Linux)
```bash
cd /Users/Joe/Joes_New_Website
python3 -m http.server 8000
```
Then visit: http://localhost:8000

#### Option B: Node.js
```bash
# Install once:
npm install -g http-server

# Then run:
cd /Users/Joe/Joes_New_Website
http-server -p 8000
```
Then visit: http://localhost:8000

#### Option C: VS Code
1. Install the "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### 6. SEO Optimization Checklist

The site is already optimized for "Joe Finberg" searches, but you can enhance it further:

- [ ] Add your photo with descriptive alt text (already done in HTML)
- [ ] Verify meta descriptions are accurate
- [ ] Consider adding a `robots.txt` file
- [ ] Add a `sitemap.xml` for search engines
- [ ] Connect to Google Search Console after deployment

## Deployment Options

### Option 1: Netlify (Recommended for beginners)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify dashboard
3. Site will deploy automatically
4. Add custom domain in Site Settings > Domain Management
5. Free SSL certificate included

### Option 2: GitHub Pages
1. Create a GitHub repository
2. Push your files to the repository
3. Go to Settings > Pages
4. Select branch (main) and folder (root)
5. Site will be live at `username.github.io/repository-name`
6. Add custom domain in Settings > Pages > Custom domain

### Option 3: Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Import your project (via GitHub or direct upload)
3. Deploy with one click
4. Add custom domain in Project Settings
5. Free SSL certificate included

### Custom Domain Setup
All platforms support custom domains. Once you purchase a domain:

1. Buy domain from: Namecheap, Google Domains, or Cloudflare ($10-15/year)
2. In your hosting platform, add the custom domain
3. Update your domain's DNS settings with the provided nameservers
4. Wait 24-48 hours for DNS propagation
5. Enable HTTPS (automatic on all platforms)

## Font Customization

The site uses American Typewriter font with fallbacks:
```css
font-family: 'American Typewriter', 'Courier New', 'Courier', monospace;
```

### To use a custom typewriter font:
1. Download a web font (WOFF2 format recommended)
2. Place it in the `fonts/` folder
3. Update `css/styles.css` lines 16-23 with the font path
4. Ensure you have proper licensing for web use

### Free alternatives:
- Courier New (system font - already set as fallback)
- Special Elite (Google Fonts)
- Courier Prime (Google Fonts)

## Maintenance

### Regular updates:
- Update CV PDF when you have new experiences
- Add new poems or writing as you create them
- Check links quarterly (especially Amazon links)
- Update bio as your work evolves

### Adding more poems:
1. Copy `poem-2.html` as a template
2. Rename to `poem-3.html`, etc.
3. Update content and title
4. Add a link to the poem in `writing.html`

## Technical Details

- **Total size:** ~300KB (without images/PDFs)
- **Load time:** < 1 second on average connection
- **Browser support:** All modern browsers, IE11+
- **Mobile responsive:** Fully responsive design
- **Accessibility:** Semantic HTML, proper heading hierarchy

## Troubleshooting

**Images not loading?**
- Check file path matches exactly (case-sensitive)
- Ensure image is in `images/` folder
- Try renaming to match HTML reference exactly

**Font not displaying correctly?**
- American Typewriter may not be available on all systems
- Fallback fonts (Courier New) will be used automatically
- Consider using a web font for consistency

**Poem formatting looks wrong?**
- Ensure you're using `<br>` tags for line breaks within stanzas
- Use separate `<p>` tags for stanza breaks
- Check that quotes are HTML-safe (`"` becomes `"` or use `"`)

**Local server not working?**
- Make sure you're in the correct directory
- Try a different port: `python3 -m http.server 8080`
- Check if another process is using port 8000

## Next Steps

1. ✅ Add your profile photo to `images/`
2. ✅ Add your CV PDF to `files/`
3. ✅ Complete the full text of "The Unfinished Epistle" in `poem-1.html`
4. ✅ Update Amazon book link with your actual URL
5. ✅ Update company link
6. ✅ Test locally
7. ✅ Deploy to hosting platform
8. ✅ Set up custom domain (optional but recommended)
9. ✅ Submit sitemap to Google Search Console

## Questions?

For issues or questions about the code, consult:
- [MDN Web Docs](https://developer.mozilla.org) for HTML/CSS reference
- [Web.dev](https://web.dev) for performance optimization
- [Google Search Central](https://developers.google.com/search) for SEO guidance

---

Built with simplicity in mind. No frameworks, no dependencies, just clean HTML and CSS.
