# Plan: framed@ Preview Site

## File Structure

```
framedat.uk/
├── index.html          # Home page
├── pages/
│   ├── events.html     # Events listing
│   ├── archive.html    # Photo/video archive
│   ├── about.html      # About framed@
│   └── contact.html    # Contact form
├── css/
│   └── styles.css      # All styles (single file)
├── js/
│   └── main.js         # Navigation, mobile menu, interactions
├── .nojekyll           # Prevent Jekyll processing on GitHub Pages
├── .gitignore
├── README.md
└── specs/              # Speckit artifacts (gitignored from deploy)
```

## Design System

### Typography
- **Display**: Bebas Neue (Google Fonts) — uppercase, oversized headings
- **Body**: Inter (Google Fonts) — clean sans-serif
- **Scale**: 6rem hero → 3rem section → 1.6rem subhead → 1rem body

### Colour Palette
- **Primary**: #000000 (black)
- **Background**: #FFFFFF (white)
- **Accent** (sparingly): #E63946 (muted red for CTAs only)
- **Grey** (subtle separators): #F0F0F0

### Layout Principles
- Max-width 1200px centred container
- Generous whitespace (padding: 6rem 2rem sections)
- Mobile-first breakpoints: 768px (tablet), 1024px (desktop)
- No shadows, no rounded corners, no gradients — flat and bold

### Navigation
- Fixed top nav, black text on white
- Logo/brand text left, nav links right
- Hamburger menu below 768px
- Active page indicator (underline)

## Page Designs

### Home (index.html)
- Full-viewport hero with brand name "framed@" in massive Bebas Neue
- Tagline: "Northern arts. Live music. Culture documented."
- Upcoming event highlight card
- Email sign-up CTA section (visual placeholder)
- Footer with links and copyright

### Events (pages/events.html)
- Page title "UPCOMING"
- Card grid: 3 placeholder events (Manchester, Leeds, Liverpool)
- Each card: date, event name, venue, city, ticket button
- Past events section (collapsed/minimal)

### Archive (pages/archive.html)
- Page title "ARCHIVE"
- Photo grid (CSS grid, placeholder blocks with event labels)
- Video section with placeholder embed areas
- Chronological grouping by event

### About (pages/about.html)
- Page title "ABOUT"
- Brand story in large type
- Mission statement
- Team/founders section

### Contact (pages/contact.html)
- Page title "CONTACT"
- Form: name, email, message (visual only)
- Direct email link: luke@framedat.uk
- Social media placeholder links

## Deployment
- GitHub Pages from main branch (root)
- Repository: diamSystems/framedat.uk
- URL: adam-scholey.github.io/framedat.uk

---

*Plan created 2026-07-20*
