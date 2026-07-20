# framed@ — Website Build Plan

**Client:** framed@ Limited (Co. No. 16987092)  
**Contact:** luke@framedat.uk  
**Domain:** framedat.uk  
**Prepared for:** Internal / Client Reference

---

## 1. Project Overview

framed@ is a Northern arts and music platform — part event promoter, part digital archive, part tastemaker brand. The website is their primary owned channel: the thing that outlasts any algorithm, converts attendees into email subscribers, and documents the scene as it grows. It needs to do that job cleanly, without looking like any other music promoter's site.

**Aesthetic direction:** Pure black on white. No gradients. No clutter. Bold, oversized type in the style of the brand documents — this is the visual identity, carry it through exactly.

**Approach:** One build, everything Luke needs. Low initial cost paired with a small monthly retainer that covers hosting, upkeep, and small changes — so the economics make sense for both sides.

---

## 2. Pages & Features

### Pages

| Page | Purpose |
|---|---|
| **Home** | Brand statement, upcoming event hero, email sign-up CTA |
| **Events** | List of upcoming shows with dates, cities, ticket links |
| **Archive** | Photo essays and video docs from past events — the historical record |
| **About** | What framed@ is, who's behind it, the mission |
| **Contact** | Email form (routes to luke@framedat.uk) |

### Core Features

**Events & Ticketing**
- Events listed with date, venue, city (Manchester / Leeds / Liverpool)
- Each event has a ticket link — either an external platform (Skiddle / DICE) or a Stripe Checkout URL if Luke wants to sell direct
- Stripe integration ready from day one; Luke can switch individual events between external and on-site as he wants

**User Accounts** *(lightweight)*
- Optional register / login so buyers can see their order history
- On registration → user auto-subscribed to MailerLite `all-subscribers` group
- Kept simple — no social profiles, no complex dashboards

**Email List (MailerLite)**
- Standalone sign-up form on homepage (no account required)
- API integration: registration and ticket purchase both trigger list subscription
- Luke manages all broadcasts directly in MailerLite dashboard

**Archive / Media**
- Photo galleries per event (grid layout, images stored on Fly volumes with Cloudflare CDN in front)
- Video embeds (Vimeo — cleaner than YouTube, fits the aesthetic)
- Photos and video embed URLs added via Django admin panel

**Admin Panel**
- Django's built-in admin, lightly customised
- Luke / team can add events, upload photos, paste video embeds, and view orders without touching code

**Transactional Email**
- Contact form + order confirmations sent via Resend (free tier — 3,000 emails/month)

---

## 3. Tech Stack

### Backend: Django (Python)

Django is the right call. The project needs auth, a database of events and orders, an admin interface, and Stripe webhooks — Django provides all of this out of the box.

| Component | Choice | Reason |
|---|---|---|
| Framework | Django 5.x | Auth, ORM, admin panel included |
| Database | PostgreSQL (Fly managed) | Relational, handles orders/users cleanly |
| Payments | Stripe Checkout | Well-documented, handles cards / Apple Pay / Google Pay, no PCI burden |
| Email list | MailerLite API | Client's preference, free up to 1k subs |
| Transactional email | Resend | Free 3,000 emails/month — covers contact form and order confirmations |
| Media storage | Fly Volumes + Cloudflare CDN | No extra service, no extra bill |
| Video | Vimeo embeds | Will's footage embedded via Vimeo, not self-hosted |

### Frontend

Django templates with vanilla JS. No React needed — the site is content-heavy, not interactive. Keeps things fast, maintainable, and true to the stripped-back aesthetic.

Typography: Bebas Neue or Space Grotesk for display headers (matching brand docs' bold uppercase identity). Body in Inter or similar clean sans. Black `#000000` / White `#FFFFFF` only — the brand documents use no other colours except a single red accent; that red can be used sparingly for CTAs if Luke confirms.

---

## 4. Hosting

**Fly.io** (fly.io)

- Modern Django hosting with London region (LHR) — good latency for a Northern UK audience
- Managed PostgreSQL on the same platform
- Persistent volumes for photo storage (3 GB free, £0.12/GB/month above that)
- Deploys via `flyctl deploy` from Git
- **Estimated cost: £0–5/month for year 1**, scaling to ~£10/month only when traffic warrants it

**Cloudflare** (already needed for DNS)

- Free CDN in front of the site → photos served fast without paying for object storage
- Free SSL, DDoS protection, DNS

**Domain:** Already at framedat.uk — DNS points to Cloudflare, Cloudflare proxies to Fly.io.

**Email:** MailerLite free up to 1,000 subscribers (~£9/month after). Resend free up to 3,000 emails/month.

### Total Running Cost, Year 1

| Service | Monthly | Notes |
|---|---|---|
| Fly.io | £0–5 | Free tier likely covers year-1 traffic |
| MailerLite | £0 | Free up to 1k subs |
| Resend | £0 | Free 3k emails/mo |
| Cloudflare | £0 | Free tier |
| Vimeo | £0 | Free tier |
| Stripe | £0 | Transaction fees only (~1.5% + 20p per card) |
| **Total** | **£0–5/month** | ~£0–60 across the whole first year |

---

## 5. MailerLite Integration

MailerLite is the right choice and straightforward to integrate.

**How it works:**
1. User signs up via homepage form or creates an account → Django calls MailerLite API → adds to `all-subscribers` group
2. User buys a ticket → also added to a `ticket-buyers` group in MailerLite
3. Luke logs into MailerLite to write and send newsletters, event announcements, Artist Spotlight emails
4. No custom email builder needed on the website — MailerLite handles all of that

**Groups to set up in MailerLite:**
- `all-subscribers` (everyone)
- `ticket-buyers` (purchased at least one ticket)
- `mcr` / `lds` / `liv` (optional city tags, based on which events they've bought for)

---

## 6. Project Timeline

Given the launch programme targets July 2026 for the Digital Hub:

| Week | Milestone |
|---|---|
| 1 | Django project setup, PostgreSQL, Fly.io deploy, domain live via Cloudflare |
| 2 | User auth (register, login, account dashboard) |
| 3 | Events model + admin, event listing pages |
| 4 | Stripe Checkout integration — ticket purchase, webhooks, order confirmations via Resend |
| 5 | MailerLite API integration — sign-up form, post-purchase subscription |
| 6 | Archive / media page — photo gallery, Vimeo embed system |
| 7 | About + Contact pages, homepage hero, admin polish |
| 8 | QA, mobile testing, client review, handover + admin training |

**Total: ~8 weeks** from kick-off to handover.

---

## 7. What to Charge

Fair market price for this scope is **£1,500–2,500**. framed@ is a small creative business chasing an ACE grant, so this build is priced as a portfolio / relationship project — the economics only work with a small ongoing retainer alongside the initial fee.

### Recommended Structure

| Item | Cost | Notes |
|---|---|---|
| **Initial build fee** | **£150–200** | One-off, paid on completion |
| **Monthly retainer** | **£30–50/month** | Covers hosting oversight, minor changes, MailerLite/admin questions, uptime monitoring — 12-month minimum recommended |
| **Year 1 total to Luke** | £510–800 | Still well below market, but sustainable |

### Why the retainer matters

- The initial £150–200 alone doesn't cover the ~50 hours of build work. The retainer is what makes the deal fair rather than a favour.
- Framed@ get a live human on-call for a year, not a "we're done, goodbye" delivery.
- Small monthly cost is easier for a startup to absorb than a bigger upfront fee.
- Gives them a predictable relationship — the thing small businesses actually want.

### Walking back the £50 conversation

If you've already floated £50 to Luke, that's fine — reframe it as a **deposit**, not the total price:

> "Thinking it through properly — £50 was me undercharging myself. Full plan sensibly comes out at £150–200 up front plus £30–50/month covering hosting and support, which is still miles below the £1,500+ market rate. The £50 goes toward the initial fee. Happy to walk you through what's included."

Honest, professional, doesn't backtrack on trust. Luke will respect it — anyone quoting a serious client website at £50 wouldn't be worth working with anyway.

### What's Included

- All 5 pages (Home, Events, Archive, About, Contact)
- User auth + account dashboard + Stripe ticketing
- MailerLite integration (sign-up form + post-purchase auto-add)
- Django admin panel set up and documented
- Fly.io deployment + domain + Cloudflare setup
- Transactional email via Resend (order confirmations + contact form)
- 2 weeks of post-launch bug fixes (in addition to the retainer)

### Extras (Quoted Separately)

| Extra | Suggested Price |
|---|---|
| Merch store (if apparel line launches) | £300–500 |
| Artist profile pages | £200–400 |
| Future festival ticketing (2030 scale) | Requote at that time |

---

## 8. Notes for Luke

- **Graphic assets:** Site will hold placeholder layout until Will / the graphic designer delivers assets. Build is not blocked — drop them in once received.
- **Ticketing:** Each event can either link out to Skiddle / DICE or sell directly via Stripe — Luke chooses per event, no code change needed.
- **Videos:** Upload Will's footage to Vimeo (free tier fine to start), paste embed URL into Django admin — no need to upload raw video files to the server.
- **Merch:** No physical product sales in scope for this build. If the apparel line (Plan B) launches, quote separately.
- **ACE Grant:** The July 2026 Digital Hub launch target is achievable on this timeline. If the grant comes through and budget increases, the natural upgrade is a proper CMS (Wagtail, which sits on top of Django) for Luke to manage content more independently long-term.
- **GDPR:** User accounts and email list mean a Privacy Policy and Cookie notice are legally required before launch. Luke should get these drafted — template services like Iubenda are £30/yr and handle this.

---

*Plan prepared July 2026. Contact luke@framedat.uk for queries.*
