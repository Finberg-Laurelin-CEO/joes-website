# Quick Start Guide

Get your website up and running in 5 steps!

## Step 1: Add Your Assets (5 minutes)

### Profile Photo
```bash
# Copy your photo to the images folder
cp /path/to/your/photo.jpg images/joe-finberg-profile.jpg
```

### CV/Resume PDF
```bash
# Copy your CV to the files folder
cp /path/to/your/cv.pdf files/joe-finberg-cv.pdf
```

## Step 2: Update Links (2 minutes)

Open `index.html` in a text editor and update:

1. **Line 38:** Amazon book link
   ```html
   <a href="YOUR_AMAZON_LINK_HERE" target="_blank" ...>
   ```

2. **Line 39:** Company website link
   ```html
   <a href="YOUR_COMPANY_URL_HERE" class="link-button">My Company</a>
   ```

## Step 3: Complete "The Unfinished Epistle" Poem (10-15 minutes)

Your first poem currently shows only the first 50 lines as a preview.

**To add the complete 596-line version:**

1. Open `poem-1.html` in your text editor
2. Find this line:
   ```html
   <p><em>[Poem continues for 596 lines total...]</em></p>
   ```
3. Replace it with the remaining verses from your LaTeX file
4. Format each 10-line stanza as shown in the existing examples

**Formatting template:**
```html
<p>
    Line one text,<br>
    Line two text;<br>
    Line three text,<br>
    Line four text.<br>
    ...10 lines total...
</p>
```

**Tip:** You can extract the full text from `/Users/Joe/Library/CloudStorage/GoogleDrive-jsfinberg@gmail.com/My Drive/jsf2178@columbia.edu 2024-10-18 20:00/Grad School and Jobs/Writing/Poetry/E2J/E2J.tex`

## Step 4: Test Locally (1 minute)

```bash
# Navigate to your website folder
cd /Users/Joe/Joes_New_Website

# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

**What to check:**
- [ ] Homepage loads with your photo
- [ ] Bio text reads correctly
- [ ] CV downloads when clicked
- [ ] Writing page shows both poems
- [ ] Poems display correctly
- [ ] All links work
- [ ] Site looks good on mobile (resize browser window)

## Step 5: Deploy (10 minutes)

### Option A: Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" > "Deploy manually"
3. Drag your `Joes_New_Website` folder onto the upload area
4. Wait 30 seconds - done!
5. Your site will be live at `random-name.netlify.app`

### Option B: GitHub Pages
1. Create a GitHub account if you don't have one
2. Create a new repository called `your-username.github.io`
3. Upload all your files to the repository
4. Go to Settings > Pages
5. Set source to "main" branch
6. Your site will be live at `your-username.github.io`

## Optional: Custom Domain

After deployment, you can add a custom domain like `jefinberg.com`:

1. **Buy domain:** Namecheap, Google Domains (~$12/year)
2. **In your hosting platform:** Add custom domain in settings
3. **In your domain registrar:** Update DNS to point to hosting platform
4. **Wait:** 24-48 hours for DNS propagation

## Checklist

Before going live, make sure:

- [ ] Profile photo added and displays correctly
- [ ] CV PDF added and downloads successfully
- [ ] Full "Unfinished Epistle" poem added
- [ ] Amazon book link updated
- [ ] Company link updated
- [ ] Bio text reviewed and edited (if needed)
- [ ] All pages tested locally
- [ ] Mobile view tested
- [ ] All links verified

## Need Help?

- **Can't start local server?** Make sure you're in the right directory
- **Images not showing?** Check filename matches exactly (case-sensitive)
- **Poems formatting wrong?** Make sure you use `<br>` for line breaks
- **Deployment issues?** Check the platform's documentation

## What's Next?

Once live:
1. Share the link!
2. Submit to Google Search Console for SEO
3. Add more writing as you create it
4. Update CV periodically
5. Consider adding a blog or project showcase

---

**Estimated total time:** 30-40 minutes to have a fully functional website!
