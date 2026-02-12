# VISUAL AUDIT — VIKITAY GROUP Website

---

## 1. Project Overview

### Tech Stack
- **Framework:** React 19.2 (JSX)
- **Build Tool:** Vite 7.2
- **Routing:** react-router-dom 7.13
- **Styling:** Tailwind CSS 4.1 (via PostCSS plugin) + massive inline `<style>` blocks inside JSX components
- **Forms:** EmailJS (loaded via CDN script tag in `index.html`)
- **Deployment:** Cloudflare Workers (wrangler.jsonc present)
- **Font Loading:** Google Fonts CDN (`@import url()` inside `<style>` tags)

### Project Structure
```
src/
  main.jsx              — Entry point, renders <App />
  App.jsx               — Router: homepage + 7 service pages
  App.css               — Vite boilerplate CSS (mostly unused)
  index.css             — Single line: @import "tailwindcss"
  vikitay-website.jsx   — Main homepage (~990 lines, all CSS inline)
  vikitay-website_2.jsx — Near-identical copy (removed nav-phone)
  vikitay-website_3.jsx — Near-identical copy (missing callbackSent state)
  ServicePage.jsx       — Template for individual service detail pages
  servicesData.js       — Service content data (both transliterated + Russian)
  assets/react.svg      — Unused Vite default asset

public/images/
  final2-1.png          — Logo image
  founder-svetlana.png  — CTA banner photo
  founder-victoria.png  — Founder photo
  mama.png              — Founder photo (Svetlana)
  hero-banner.png       — Unused hero banner image
  hero-video.mp4        — Hero section background video
  niche-*.png (x4)      — Niche category images
  service-*.png (x7)    — Service card images
  port-scene.png        — Unused image
```

### Architecture Notes
- `vikitay-website.jsx` and `vikitay-website_2.jsx`/`_3.jsx` are near-duplicates. Only the base file is imported in `App.jsx`. The copies are dead code.
- Tailwind is installed but barely used — only the `@import "tailwindcss"` reset is active. All real styling is done through massive `<style>` blocks embedded directly inside JSX `return()`.
- No CSS custom properties (variables) are used anywhere. Every color value is hard-coded inline.
- No external animation library. All animations are CSS keyframes + inline transitions via the custom `Reveal` component.

---

## 2. Complete Visual Inventory

### 2.1 Colors

#### Backgrounds
| Value | Role | Location |
|-------|------|----------|
| `#0d0d0f` | Page base background | `.vikitay`, `.vikitay-service` |
| `#0a0a0c` | Section bg-graphite gradient edges | `.bg-graphite` |
| `#121215` | Section bg-graphite gradient center | `.bg-graphite` |
| `#1a0a2e` | Section bg-purple gradient edges | `.bg-purple` |
| `#2d1452` | Section bg-purple gradient mid | `.bg-purple` |
| `#3d1a6d` | Section bg-purple gradient center | `.bg-purple` |
| `#1a1a2e` | Modal background | `.modal-box` |
| `rgba(10, 10, 12, 0.95)` | Scrolled nav background | `.nav.scrolled` |
| `rgba(10, 10, 12, 0.98)` | Mobile menu overlay | `.mobile-menu` |
| `rgba(13, 13, 15, 0.97)` | Dropdown menu background | `.nav-dropdown-menu` |
| `rgba(255, 255, 255, 0.03)` | Card backgrounds (service, founder, case, form, bloggers, CTA banner) | Multiple |
| `rgba(255, 255, 255, 0.05)` | Modal input background | `.modal-input` |
| `rgba(139, 92, 246, 0.06)` | Form input background | `.form-input` |
| `rgba(139, 92, 246, 0.04)` | Process card hover | `.process-card:hover` |
| `rgba(139, 92, 246, 0.03)` | Why-us item hover | `.why-us-item:hover` |
| `rgba(10, 10, 12, 0.6)` | Bloggers list inner card | `.bloggers-list` |

#### Primary / Accent (Purple spectrum)
| Value | Role |
|-------|------|
| `#7c3aed` | Primary gradient start, button bg, logo icon, various accents |
| `#9333ea` | Primary gradient end |
| `#a855f7` | Secondary gradient end (icon, orb) |
| `#a78bfa` | Section labels, footer titles, radio accent, dots, cherry branch |
| `#c4b5fd` | Gradient text fill, hover states, secondary text, cherry branch |
| `rgba(139, 92, 246, *)` | Borders (0.08-0.2 alpha), shadows (0.5 alpha), orb fills (0.07-0.15 alpha), input bg (0.06-0.1) |
| `rgba(167, 139, 250, *)` | Button borders (0.25-0.5 alpha), hover bg (0.1 alpha), orb fills |
| `rgba(196, 181, 253, *)` | Orb fills (0.08-0.1), success text, consent text |

#### Text Colors
| Value | Role |
|-------|------|
| `#fff` | Headings, hero text, founder names, process titles |
| `rgba(255, 255, 255, 0.8)` | Mobile menu links |
| `rgba(255, 255, 255, 0.75)` | Why-us subtitle |
| `rgba(255, 255, 255, 0.7)` | Service page body text, algorithm text |
| `rgba(255, 255, 255, 0.65)` | Service page section-desc |
| `rgba(255, 255, 255, 0.6)` | Nav links, about intro, radio labels, dropdown links |
| `rgba(255, 255, 255, 0.55)` | Section desc, about outro, bloggers list items |
| `rgba(255, 255, 255, 0.5)` | Why-us text, niches intro, process text, footer links, founder desc, cases intro |
| `rgba(255, 255, 255, 0.45)` | Stat labels, service desc, footer links, niches outro |
| `rgba(255, 255, 255, 0.4)` | Footer about text, form labels, case titles |
| `rgba(255, 255, 255, 0.35)` | Footer bottom, legal links, phone status |
| `rgba(255, 255, 255, 0.3)` | Case desc, input placeholders, modal placeholders |
| `rgba(255, 255, 255, 0.25)` | Form input placeholders |

#### Other
| Value | Role |
|-------|------|
| `#22c55e` | Online status dot (nav phone) |
| `#888` | Unused `.read-the-docs` class in App.css |
| `#646cff` | Unused logo hover glow in App.css |
| `#61dafb` | Unused React logo hover glow in App.css |

### 2.2 Typography

**Font Family:** `'Jost', sans-serif` (single font, loaded via Google Fonts)
- Weights loaded: 200, 300, 400, 500
- Weight 700 used in CSS but NOT loaded (will fallback to 500 or browser faux-bold)

| Element | Size | Weight | Letter-spacing | Line-height | Notes |
|---------|------|--------|----------------|-------------|-------|
| Hero title | clamp(40px, 5.5vw, 72px) | 700 | -1.5px | 1.15 | **Weight not loaded** |
| Section title | clamp(36px, 4.5vw, 52px) | 700 | -1px | 1.2 | **Weight not loaded** |
| Section title (service page) | clamp(28px, 4vw, 40px) | 200 | -0.5px | 1.3 | |
| Service hero title | clamp(32px, 5vw, 56px) | 200 | -0.5px | 1.2 | |
| CTA banner title | clamp(32px, 4vw, 48px) | 700 | — | 1.15 | **Weight not loaded** |
| Modal title | 28px | 700 | — | — | **Weight not loaded** |
| Founder name | 22px | 600 | — | — | **Weight not loaded** |
| List title (service page) | 22px | 300 | 0.3px | — | |
| Why-us subtitle | 20px | 400 | — | 1.7 | |
| Case title | 20px | 500 | — | — | |
| CTA title (service page) | 28px | 200 | — | — | |
| Section desc (service page) | 18px / 17px | 300 | 0.3px | 1.9 | |
| Hero subtitle | 17px | 300 | 0.2px | 1.7 | |
| Niche name | 17px | 600 | 0.2px | — | **Weight not loaded** |
| Service card title | 17px | 600 | 0.2px | — | **Weight not loaded** |
| Process title | 17px | 600 | — | — | **Weight not loaded** |
| Bloggers list title | 16px | 600 | 0.2px | — | **Weight not loaded** |
| Section desc | 16px | 300 | 0.2px | 1.8 | |
| About intro/outro | 16px | 400 | — | 1.8 | |
| Niches intro/outro | 15px-16px | 400 | — | 1.7 | |
| Process text | 15px | 400 | — | 1.7 | |
| Why-us title | 15px | 600 | — | 1.5 | **Weight not loaded** |
| Why-us text | 14px | 400 | — | 1.7 | |
| Section label | 11px-14px | 400 | 3px-5px | — | Uppercase |
| Service card desc | 14px | 400 | 0.2px | 1.7 | |
| Founder desc | 14px | 400 | — | 1.7 | |
| Footer about | 14px | 400 | 0.2px | 1.7 | |
| Footer links | 14px | 400 | 0.2px | — | |
| Nav links | 13px | 300 | 2px | — | Uppercase |
| Founder tag | 13px | 500 | 0.5px | — | |
| Consent text | 13px | — | — | 1.4 | |
| Nav button | 12px | 400 | 2px | — | Uppercase |
| Footer title | 11px-12px | 400-600 | 2px-3px | — | Uppercase |
| Footer bottom | 12px | 300 | 0.3px | — | |
| Form label | 11px | 400 | 2px | — | Uppercase |
| Form input | 15px | 300 | 0.3px | — | |
| Service btn | 12px | 400 | 2px | — | Uppercase |
| Process num | 56px-96px | 300 | — | 1 | Gradient text |
| Stat value | 48px-64px | 700 | -2px | — | **Weight not loaded** |
| Why-us num | 36px-48px | 500 | — | 1 | |
| Stat label | 14px | 400 | 0.3px | 1.5 | |

### 2.3 Spacing Patterns

**Section padding:** `140px 48px` (desktop), `80px 24px` (mobile 640px)
**Section margins:** `0 40px 20px` (desktop), `0 12px 12px` (mobile 640px)
**Nav inner padding:** `0 48px` (desktop), `0 24px` (mobile)
**Max-width containers:** `1200px` (main), `1000px` (service page), `850px` (hero content), `800px` (about intro/outro, cases intro), `750px` (section-center), `700px` (niches intro), `580px` (CTA form), `440px` (modal), `300px` (footer about)
**Common gaps:** 12px, 16px, 20px, 24px, 28px, 32px, 36px, 44px, 60px, 70px

**Observation:** Spacing is NOT on a consistent scale. Values drift between 12/16/20/24/28/32/36/44/50/56/60/70/80/100/120/140px with no clear base unit or ratio.

### 2.4 Animations & Transitions

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| `floatOrb` keyframe | 20-28s | ease-in-out | Infinite loop |
| Reveal scroll-in | 1s | cubic-bezier(0.16, 1, 0.3, 1) | IntersectionObserver (once) |
| Nav scroll transition | 0.4s | ease | Scroll > 50px |
| All hover transitions | 0.2s-0.4s | ease / linear / cubic-bezier | Hover |
| Modal overlay fadeIn | 0.3s | ease | Mount |
| Modal box fadeInUp | 0.4s | ease | Mount |
| Counter animation | 2000ms | linear (rAF) | IntersectionObserver |
| Image zoom on hover | 0.6s | cubic-bezier(0.16, 1, 0.3, 1) | Hover (parent card) |
| Card lift on hover | 0.4s | cubic-bezier(0.16, 1, 0.3, 1) | Hover |
| Button lift on hover | 0.3s-0.4s | ease / cubic-bezier | Hover |
| Logo spin (unused) | 20s | linear | Infinite (App.css boilerplate) |
| Mouse glow follow | 0.3s | ease-out | Mouse move |

### 2.5 Hover / Focus / Active States

| Element | Hover Effect |
|---------|-------------|
| Nav links | Color: `rgba(255,255,255,0.6)` -> `#c4b5fd` |
| Nav button | `translateY(-2px)` + purple box-shadow |
| Nav dropdown | Dropdown menu appears (opacity 0->1, visibility) |
| Nav phone | opacity: 0.8 |
| Primary button | `translateY(-3px)` + `box-shadow: 0 15px 40px -10px rgba(139, 92, 246, 0.5)` |
| Secondary button | Background fill `rgba(167, 139, 250, 0.1)` + border brighten |
| Service cards | `translateY(-6px)` + border-color brighten + box-shadow + image `scale(1.05)` |
| Founder cards | `translateY(-6px)` + box-shadow + image `scale(1.03)` |
| Niche cards | `translateY(-6px)` + image `scale(1.06)` |
| Process cards | Background fill `rgba(139, 92, 246, 0.04)` |
| Why-us items | Background fill `rgba(139, 92, 246, 0.03)` + negative margin expansion |
| Algorithm steps | Background fill + border brighten |
| Footer links | Color -> `#c4b5fd` |
| Form inputs (focus) | Border brighten + bg darken |
| Modal inputs (focus) | `border-color: #7c3aed` |
| Modal close | Color brighten to white |
| Form submit | `translateY(-2px)` + box-shadow |

**Missing states:** No `:active` states defined anywhere. No `:focus-visible` for keyboard accessibility. Buttons have no visual pressed state.

### 2.6 Shadows

| Value | Location |
|-------|----------|
| `0 12px 30px -8px rgba(139, 92, 246, 0.5)` | Nav btn hover, form submit hover, CTA banner btn hover, modal submit hover |
| `0 15px 40px -10px rgba(139, 92, 246, 0.5)` | Primary btn hover |
| `0 25px 50px -15px rgba(0, 0, 0, 0.3)` | Service/founder card hover |
| `0 8px 20px -8px rgba(139, 92, 246, 0.5)` | Algorithm step number |
| `inset 0 50px 100px -50px rgba(139, 92, 246, 0.15)` | bg-purple top edge |
| `inset 0 -50px 100px -50px rgba(139, 92, 246, 0.1)` | bg-purple bottom edge |

### 2.7 Border Radii

| Value | Usage |
|-------|-------|
| `50%` (circle) | Logo icon, floating orbs, why-us icon, algorithm num, dots, online status dot |
| `100px` (pill) | All buttons (primary, secondary, nav, service btn) |
| `24px` | Section containers, hero, CTA banner, footer |
| `20px` | Modal box, bloggers card, service-desc-block |
| `16px` | Cards (service, founder, case, niche image, bloggers list), section containers on mobile |
| `12px` | Nav dropdown menu, niche image border-radius |
| `10px` | Form inputs, modal inputs, form submit, CTA banner buttons |
| `8px` | Founder tag badge |

### 2.8 Gradients

| Gradient | Usage |
|----------|-------|
| `linear-gradient(135deg, #7c3aed, #9333ea)` | Primary buttons, nav btn, logo icon, founder tag, CTA banner btn, form/modal submit |
| `linear-gradient(135deg, #7c3aed, #a855f7)` | Why-us icon |
| `linear-gradient(135deg, #c4b5fd, #a78bfa)` | Section title gradient text, logo text |
| `linear-gradient(135deg, #c4b5fd, #a78bfa, #8b5cf6)` | Service page hero title gradient text |
| `linear-gradient(180deg, #0a0a0c 0%, #121215 50%, #0a0a0c 100%)` | bg-graphite sections |
| `linear-gradient(180deg, #1a0a2e 0%, #2d1452 20%, #3d1a6d 50%, #2d1452 80%, #1a0a2e 100%)` | bg-purple sections |
| `linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.1))` | Process number gradient text |
| `linear-gradient(145deg, rgba(139,92,246,0.08), rgba(167,139,250,0.02))` | Service desc block |
| `linear-gradient(145deg, rgba(139,92,246,0.06), rgba(167,139,250,0.02))` | Algorithm step bg |
| `linear-gradient(145deg, rgba(139,92,246,0.12), rgba(167,139,250,0.04))` | Service page CTA block |
| `radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)` | Mouse glow effect |
| Hero overlay | Complex multi-stop vertical gradient to black |
| Service hero overlay | Multi-stop from purple-tint to black |

### 2.9 Layout Patterns

- **Section pattern:** Rounded rectangle cards with `margin: 0 40px 20px` creating a "stacked card" layout
- **Container:** `max-width: 1200px; margin: 0 auto;`
- **Grid usage:** Services (3-col), Niches (4-col), Founders (2-col), Process (6-col), Footer (2fr 1fr 1fr), Stats (4-col), Cases (3-col), Why-us items (4-col grid), Why-us header (2-col)
- **Flexbox:** Nav, hero content, buttons, list items, form radio, mobile menu
- **Responsive breakpoints:** 1024px (tablet), 768px (CTA banner), 640px (mobile)

### 2.10 Images & Media

- **Hero:** Background video (autoplay, muted, loop) with dark gradient overlay
- **Service images:** Cover-fit inside fixed aspect-ratio containers (16/10)
- **Niche images:** Square 1:1 aspect ratio, cover-fit
- **Founder photos:** 4:5 aspect ratio, cover-fit with zoom on hover
- **Logo:** PNG image loaded at 64px height (nav) / 54px (footer)
- **CTA banner:** 320x400px rounded image
- **All images:** `loading="lazy"` applied

### 2.11 Icons

- **System:** All inline SVG (no icon library)
- **Social icons:** VKontakte and Telegram SVG paths (20x20px, `fill: currentColor`)
- **Nav hamburger/close:** Inline SVG stroke icons
- **Decorative:** `CherryBranch` custom SVG component (branch + circles) used as floating decoration
- **Why-us icon:** Unicode `✦` character inside gradient circle
- **Nav phone:** Emoji `phone` character

### 2.12 Decorative Elements

- **FloatingOrb:** Absolutely-positioned blurred circles with infinite float animation (80px blur, 0.5 opacity)
- **CherryBranch:** Custom SVG decorative branches placed absolutely in sections
- **Mouse Glow:** 600px radial gradient circle following cursor (main page only)
- **bg-purple inset shadows:** Soft purple glow at section top/bottom edges

---

## 3. Strengths

### What's Working Well

1. **Dark theme foundation is solid.** The near-black base (`#0d0d0f`) with purple accents is appropriate for an international business consultancy that wants to feel premium rather than corporate-beige. The choice to go dark is the right call.

2. **Section "card" layout is distinctive.** The `margin: 0 40px` with `border-radius: 24px` creates a unique stacked-cards feel that breaks from the standard full-bleed section pattern. This is an intentional design choice worth preserving.

3. **Jost is a decent font choice.** It's geometric but not as overused as Inter/Roboto. At light weights (200-300) it has an elegant quality appropriate for this brand positioning.

4. **Scroll-reveal animations have good easing.** The `cubic-bezier(0.16, 1, 0.3, 1)` curve gives a satisfying deceleration that feels polished. This easing should be kept.

5. **Content structure is well-organized.** The page flow (Hero -> Why Us -> About -> Services -> CTA -> Niches -> Process -> Bloggers -> Cases -> Contact -> Footer) tells a logical story.

6. **Dropdown navigation is well-executed.** The hover-activated dropdowns with the invisible bridge element (`::before`) to prevent gap-hover-close is a smart UX pattern.

7. **Image treatments are clean.** The consistent use of `object-fit: cover` with hover zoom is simple and effective. Lazy loading is correctly applied.

8. **Two-tone section alternation (graphite/purple) creates rhythm.** The visual contrast between dark-gray and deep-purple sections helps with wayfinding.

9. **CTA banner section with founder photo adds personal trust.** The "let's get acquainted" section is strong for conversion.

10. **Modal implementation is functional.** Overlay with backdrop-blur, smooth entry animation, click-outside-to-close.

---

## 4. Weaknesses

### 4.1 CRITICAL: Font Weight 700 Not Loaded

**Where:** Every `font-weight: 700` usage — hero title, section titles, stat values, founder names, CTA banner title, modal titles, niche names, service titles, process titles, bloggers list title.
**Problem:** The Google Fonts import only loads weights `200, 300, 400, 500`. Weight 700 (bold) is used extensively but never loaded. The browser will synthesize faux-bold, which distorts the letterforms and looks cheap — especially on Jost where the optical weight progression is carefully designed.
**Impact:** This affects literally every heading on the site. The typography is fundamentally broken at the most visible level.
**Fix:** Either load weight 700 or redesign headings using the available weights with size/spacing to create hierarchy.

### 4.2 Massive Inline `<style>` Blocks = Unmaintainable Mess

**Where:** `vikitay-website.jsx` (~260 lines of CSS in a template literal), `ServicePage.jsx` (~100 lines of CSS). Both components contain 100% of their styles inside `<style>{``}` tags.
**Problem:** This is the worst of all worlds: no CSS variables for theming, no component isolation, no tree-shaking, styles re-parsed on every render, impossible to maintain at scale. Also, Tailwind is installed but entirely unused — wasted dependency weight.
**Impact:** Every color is copy-pasted dozens of times. Changing the brand purple requires find-and-replace across 3 files. The `@import url()` for Google Fonts inside `<style>` blocks triggers FOUC (flash of unstyled content) and blocks rendering.

### 4.3 Three Nearly-Identical 990-Line Component Files

**Where:** `vikitay-website.jsx`, `vikitay-website_2.jsx`, `vikitay-website_3.jsx`
**Problem:** These are copy-paste duplicates with trivial differences. `_3.jsx` has a bug (references `callbackSent` without declaring it in state). Dead code bloat.
**Impact:** Confusing codebase, risk of editing the wrong file.

### 4.4 No CSS Custom Properties

**Where:** Entire project.
**Problem:** The purple accent color `#7c3aed` / `rgba(139, 92, 246, x)` appears 50+ times with varying alpha values. Background colors, text colors, border colors — all hard-coded. No design tokens, no theming layer.
**Impact:** Impossible to maintain brand consistency. Any palette adjustment requires editing 100+ values.

### 4.5 Text Contrast Issues

**Where:** Multiple locations.
| Element | Color | Background | Approx. Contrast |
|---------|-------|------------|-------------------|
| `.section-desc` | `rgba(255,255,255, 0.55)` | Dark bg | ~7:1 (borderline for body text readability at 16px) |
| `.service-desc` | `rgba(255,255,255, 0.45)` | Dark bg | ~5.5:1 (fails for smaller 14px text) |
| `.footer-links a` | `rgba(255,255,255, 0.45)` | Dark bg | ~5.5:1 (marginal) |
| `.case-desc` | `rgba(255,255,255, 0.3)` | Dark bg | ~4:1 (fails WCAG AA) |
| `.footer-bottom` | `rgba(255,255,255, 0.35)` | Dark bg | ~4.5:1 (fails WCAG AA at 12px) |
| Form placeholders | `rgba(255,255,255, 0.25)` | Purple-tinted bg | ~3.5:1 (fails badly) |

**Problem:** Many text elements are too dim for comfortable reading, especially the service card descriptions (14px at 0.45 opacity), case descriptions, and footer text. The "muted elegance" aesthetic has been pushed past the point of legibility.

### 4.6 Every Section Looks the Same

**Where:** The 10+ sections on the homepage.
**Problem:** The pattern is: `section-label (small caps purple text)` -> `section-title (gradient span for emphasis)` -> `paragraph` -> `grid of cards`. Every single section follows this exact template. The `.section-label::before` dot + uppercase + purple color is repeated identically. There's no variation in how sections announce themselves.
**Impact:** Despite good content, the page feels monotonous. A premium consultancy site should surprise — at least some sections should break the pattern with asymmetric layouts, oversized typography, or editorial-style compositions.

### 4.7 The Cherry Branch SVGs Look Amateur

**Where:** Multiple sections — Why Us, About, Services, Niches, Process, Bloggers, Cases, Contact.
**Problem:** The `CherryBranch` SVG is a crude 6-path branch with 5 circles. It's positioned absolutely with low opacity (0.3-0.5) in nearly every section. It reads as "stock decoration" rather than intentional brand element. The illustration quality is below the standard the rest of the site is trying to achieve.
**Impact:** These decorations actively cheapen the design. A business consultancy dealing with international trade should not have cherry blossoms as decorative elements — it's a cultural cliche that feels reductive.

### 4.8 Process Section: 6-Column Grid Breaks at Every Viewport

**Where:** `.process-grid` with `grid-template-columns: repeat(6, 1fr)`
**Problem:** 6 equal columns at 1200px max-width means each card is ~190px wide with 32px padding — leaving only ~126px of content width. The 96px-tall numbers leave almost no room for text. At 1024px it drops to 3 columns (workable), at 640px to 2 columns, but the desktop layout is too cramped.
**Impact:** The large process numbers (96px) feel disconnected from the tiny text below them. The proportion is off.

### 4.9 Cases Section: Empty Placeholder Cards

**Where:** Cases grid — 3 cards all saying "Скоро / Здесь появится кейс"
**Problem:** Three identical empty gray boxes with "Coming soon" text make the section look unfinished. If there are no cases yet, the section should either not exist or be designed as a deliberate teaser with more visual treatment.
**Impact:** This is the most damaging credibility issue on the entire site. A business consultancy showing "we have nothing to show" undermines the expertise messaging.

### 4.10 Floating Orbs Are Overdone

**Where:** Every section (10+ instances across homepage + service pages)
**Problem:** Large blurred purple circles (250-400px, 80px blur) float in every section. The effect was novel 3 years ago but is now a cliche of AI-generated dark-mode sites. Having one or two would be atmospheric; having 10+ makes it feel like automated decoration.
**Impact:** Contributes to a "dark SaaS template" feel rather than a distinctive premium brand.

### 4.11 Why-Us Section: Hover Effect Breaks Layout

**Where:** `.why-us-item:hover` applies `margin: 0 -20px; padding-left: 20px; padding-right: 20px;`
**Problem:** Changing margins on hover causes layout shift. The item physically expands, pushing adjacent content. This is a jarring, janky interaction that feels like a bug rather than an intentional design choice.
**Impact:** Unprofessional micro-interaction that breaks the otherwise smooth hover patterns.

### 4.12 Hero Section: Subtitle Is Invisible

**Where:** `.hero-subtitle` with `color: #fff` over video with gradient overlay.
**Problem:** The subtitle "Vikitay Group - strategicheskiy partnyur..." is 17px, weight 300 (very thin), white on a semi-transparent dark overlay over a moving video. Depending on the video frame, this can become nearly invisible.
**Impact:** Key brand messaging gets lost.

### 4.13 No Page Load Animation Orchestration

**Where:** Page load on homepage.
**Problem:** The Reveal component triggers on scroll intersection, but there's no orchestrated entry animation for above-the-fold content. The hero section elements just pop in with the standard scroll reveal. Premium sites have a choreographed page-load sequence (logo -> title -> subtitle -> button, staggered).
**Impact:** The first impression feels ordinary.

### 4.14 Button Hierarchy Is Muddy

**Where:** Multiple button variants used inconsistently.
**Problem:** There are at least 5 different button implementations: `.btn-primary`, `.btn-secondary`, `.nav-btn`, `.service-btn`, `.cta-banner-btn-primary`/`secondary`, `.form-submit`, `.modal-submit`. Some have `border-radius: 100px` (pill), others `10px` (rounded rect). Padding varies: `18px 44px`, `16px 40px`, `14px 32px`, `12px 28px`, `12px 24px`. The CTA banner buttons (`10px` radius) look completely different from the hero buttons (`100px` pill).
**Impact:** Inconsistent button design suggests the site was assembled piecemeal.

### 4.15 Mobile Menu Has No Animation

**Where:** `.mobile-menu.open`
**Problem:** The mobile menu goes from `display: none` to `display: flex` instantly. No fade, no slide, no stagger of menu items. The nav hamburger also snaps between states with no transition.
**Impact:** Feels broken compared to the otherwise smooth animations elsewhere.

### 4.16 Service Page Navigation Links Use React Router Incorrectly

**Where:** `ServicePage.jsx` — nav links use `<Link to="/#about">` etc.
**Problem:** `react-router-dom`'s `<Link>` component handles client-side routing. Hash links like `/#about` will navigate to the home route `/` but won't scroll to the anchor because React Router doesn't handle hash scrolling natively.
**Impact:** Navigation from service pages back to homepage sections is likely broken.

### 4.17 Emoji in Nav Phone Icon

**Where:** `<span className="nav-phone-icon">phone_emoji</span>` in one version of the homepage.
**Problem:** Using an emoji character for the phone icon renders differently across operating systems and doesn't match the SVG icon style used elsewhere.
**Impact:** Visual inconsistency.

### 4.18 `App.css` Contains Unused Vite Boilerplate

**Where:** `src/App.css` — 43 lines of default Vite starter styles (`.logo`, `.card`, `.read-the-docs`, `logo-spin` animation).
**Problem:** These styles are imported but never used (the actual logo is styled inline). The `#root { max-width: 1280px; margin: 0 auto; padding: 2rem; text-align: center; }` rule may even conflict with the site layout, adding unwanted padding and centering.
**Impact:** The `#root` rule adds `2rem` padding and `1280px` max-width to the root element, which is then overridden by the inline styles, but could cause flash/shift on load.

### 4.19 Stats Section Is Defined in CSS but Not Rendered

**Where:** `.stats`, `.stats-grid`, `.stat-item`, `.stat-value`, `.stat-label` CSS rules exist, and the `Counter` component is defined, but neither are rendered in the JSX.
**Problem:** Dead CSS/JS code. The stats section was removed from the render (recent commit history: "remove stats section" x5) but the styles and Counter component remain.

### 4.20 No `font-display: swap` on Google Fonts

**Where:** `@import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&display=swap')`
**Problem:** The `display=swap` parameter IS in the URL, but the `@import` is inside a `<style>` tag in JSX which renders AFTER the initial HTML parse. This means:
1. HTML renders with system font
2. React mounts, injects `<style>` tag
3. Browser sees `@import`, starts loading font
4. Font loads, text reflows

This causes visible FOUT (Flash of Unstyled Text). The font should be loaded from `<link>` in `index.html` `<head>`.

---

## 5. Opportunities

### Typography Elevation
- Load Jost weight 700 (or switch headings to a different display weight strategy). Consider adding a secondary serif or display font for headings to create contrast. Candidate pairings: **Cormorant Garant** (elegant Russian-friendly serif) for display headlines with Jost for body, or **Playfair Display** for a more editorial feel.
- Introduce a proper type scale with consistent size ratios rather than ad-hoc pixel values.

### Color System Architecture
- Extract all colors into CSS custom properties on `:root`. Create a semantic token layer (`--color-surface-primary`, `--color-text-muted`, `--color-accent-primary`, etc.) to enable maintainability and potential theme variations.
- Introduce a warm neutral accent (muted gold, warm gray, or champagne) alongside the purple to break the monochromatic palette. A secondary accent color would add sophistication.

### Layout Variety
- Break the section-label + section-title + grid pattern. Alternate between centered and left-aligned compositions. Use an editorial-style layout for the About section (text wrapping around images). Add a full-width image break between sections.
- The process/steps section could use a horizontal timeline or a bento-grid layout instead of 6 cramped columns.

### Micro-Interaction Refinement
- Add page-load choreography for hero content (staggered fade-in from bottom with increasing delays).
- Add animated underline on nav link hover instead of just color change.
- Add smooth expand/collapse for mobile menu with staggered item reveals.
- Add cursor effects on interactive elements (subtle scale on card hover in addition to translateY).

### Background & Texture
- Replace overused floating orbs with subtler atmospheric elements: noise grain overlay, fine-line geometric patterns, or a single large gradient mesh.
- Add subtle grain texture (`filter: url(#noise)` SVG filter or CSS background image) to flat sections for depth.
- Consider a very subtle radial gradient at section centers instead of floating animated circles.

### Service Page Polish
- Service pages currently feel like documentation. They need visual hierarchy upgrades: larger hero imagery, icon sets for the "for whom" and "results" lists, timeline visualization for the algorithm steps.

### Cases Section Strategy
- Either hide the cases section entirely until real content exists, or design it as a "coming soon" teaser with a compelling visual treatment (blurred images with "NDA" overlay, a counter of completed projects, or testimonial quotes).

---

## 6. Recommended Visual Direction

VIKITAY GROUP positions itself as a sophisticated strategic partner for premium China-sourced business — not a budget logistics broker. The visual language must communicate **authority**, **precision**, and **cultural fluency** without slipping into either startup-playful territory or cold corporate austerity. The current dark-purple palette has the right instinct but has been executed with too many AI-template cliches (floating orbs, monotone gradients, identical section structures). The redesign should preserve the dark foundation while introducing **editorial sophistication**.

The typographic system should be rebuilt around a proper hierarchy: a distinctive serif or high-contrast display face for headlines (something with character — Cormorant Garant, Noto Serif Display, or similar Cyrillic-strong typeface) paired with Jost for body and UI text. This contrast immediately signals premium editorial quality versus the current "all-Jost, all-geometric" monotony. The color palette should evolve from pure monochrome purple into a richer system: the deep violet remains as the signature accent, but warm metallic tones (aged gold, warm bronze, or champagne) should enter as secondary accents for borders, dividers, and highlight moments. This warmth bridges the gap between "tech-dark" and "luxury consultancy" — think the visual language of a premium finance firm rather than a SaaS dashboard.

Compositionally, the page needs to break free from the repeating centered-heading-then-grid-cards pattern. The section-card layout with rounded corners is a genuine differentiator worth keeping, but within those cards, the layouts should vary dramatically: the About section should feel editorial with asymmetric photo/text composition; the Process section should use a horizontal journey visualization; the Why-Us section should use scale and whitespace to create drama with oversized numbers and staggered reveals. Decorative elements should be architectural rather than organic — replace cherry branches with fine geometric line work, hairline rules, or subtle grid patterns that echo precision and structure. The overall feeling should be: "These people are meticulous, sophisticated, and know exactly what they're doing." Every visual choice should reinforce that message.
