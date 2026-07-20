# Specification: framed@ Preview Site

**Feature**: Static HTML/CSS/JS preview site for framed@ Limited
**Created**: 2026-07-20
**Status**: Draft

---

## 1. Overview

framed@ is a Northern arts and music platform. This preview site serves as a static representation of the full planned website, built with HTML, CSS, and vanilla JavaScript. It showcases the brand identity, page structure, and content layout ahead of the full Django build.

The site will be deployed to GitHub Pages at `adam-scholey.github.io/framedat.uk`.

## 2. Problem Statement

The client (framed@ Limited) needs a live, shareable preview of their website to:
- Validate the visual direction and brand identity before the full build begins
- Share the concept with stakeholders and potential collaborators
- Establish the domain presence with a professional placeholder

## 3. Target Users

- **Luke** (framed@ founder): Reviews the design direction and shares with collaborators
- **Stakeholders / ACE Grant reviewers**: See a professional web presence demonstrating the Digital Hub concept
- **Potential attendees**: Discover framed@ and understand the brand

## 4. Functional Requirements

### FR-1: Home Page
- Brand statement hero section with oversized typography
- Upcoming event highlight (placeholder)
- Email sign-up CTA (visual only — no backend)
- Navigation to all other pages

### FR-2: Events Page
- List of upcoming shows with date, venue, city
- Placeholder events for Manchester, Leeds, Liverpool
- Ticket link buttons (styled, linking to `#` or placeholder)
- Clean card-based or list layout

### FR-3: Archive Page
- Photo gallery grid layout (placeholder images)
- Video embed section (placeholder Vimeo-style embed area)
- Past event documentation structure

### FR-4: About Page
- Brand story and mission statement
- Who's behind framed@
- The Northern arts scene context

### FR-5: Contact Page
- Contact form (visual only — no backend submission)
- Routes visually to luke@framedat.uk
- Social media links section (placeholder)

### FR-6: Brand Identity
- Pure black (#000000) on white (#FFFFFF) palette
- Bold, oversized display typography (Bebas Neue or Space Grotesk)
- Clean sans-serif body text (Inter)
- No gradients, no clutter
- Single red accent colour used sparingly for CTAs only if appropriate
- Consistent with framed@ brand documents

### FR-7: Responsive Design
- Mobile-first approach
- Works on mobile, tablet, and desktop
- Hamburger menu on mobile

### FR-8: GitHub Pages Deployment
- Static files only (HTML, CSS, JS)
- Deployed to `adam-scholey.github.io/framedat.uk`
- No server-side dependencies

## 5. User Scenarios

### Scenario 1: Luke reviews the preview
1. Luke receives the GitHub Pages URL
2. Opens the site on desktop and mobile
3. Navigates through all 5 pages
4. Evaluates the visual direction against brand documents
5. Shares link with collaborators for feedback

### Scenario 2: Visitor discovers framed@
1. Visitor lands on the home page
2. Reads the brand statement
3. Checks upcoming events
4. Browses the archive for past event imagery
5. Uses the contact page to reach out

## 6. Success Criteria

- All 5 pages (Home, Events, Archive, About, Contact) are accessible and navigable
- Site loads in under 2 seconds on standard broadband
- Brand identity is accurately represented (black/white, bold type, minimal aesthetic)
- Site is fully responsive across mobile, tablet, and desktop viewports
- Site is live and accessible at the GitHub Pages URL
- No broken links or missing assets

## 7. Assumptions

- Placeholder content will be used for events, photos, and text until the client provides real assets
- No backend functionality — forms and sign-ups are visual placeholders only
- Google Fonts (or similar CDN) will be used for typography
- Placeholder images will use CSS-generated blocks or royalty-free placeholders
- The framed@ logo will use a text-based treatment until graphic assets are provided

## 8. Out of Scope

- Backend functionality (Django, database, Stripe, MailerLite)
- User authentication
- Actual email sending from the contact form
- E-commerce / ticket purchasing
- CMS or admin panel
- Custom domain configuration (Cloudflare/DNS)

## 9. Dependencies

- GitHub account (`adam-scholey`) for Pages deployment
- Google Fonts CDN for typography
- No external API dependencies

---

*Specification prepared 2026-07-20*
