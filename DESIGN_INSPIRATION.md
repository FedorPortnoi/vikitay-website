# DESIGN INSPIRATION — VIKITAY GROUP Website Rebuild

---

## 1. Color Palette — Full Token System

### Design Rationale
The current site uses a monochromatic purple palette that reads "SaaS dashboard" rather than "premium business consultancy." The refined palette preserves the violet signature (brand recognition) while introducing a warm champagne-gold secondary accent. This pairing — deep violet + aged gold — is a classic luxury signifier (think Asprey, Rolls-Royce interiors, Versace). The key principle from 2026 luxury design research: **restraint and intention** over saturation.

Inspired by: "Midnight Opulence" palette (#1a1a2e, #16213e, #0f3460, #efc07b) from Design Work Life, and Palette #4 from HigoCreative (#632148, #1D2C43, #23112F, #040B14). Evolved significantly for this specific brand.

### Background Tokens
| Token | Hex | RGB | Purpose | WCAG Notes |
|-------|-----|-----|---------|------------|
| `--bg-primary` | `#08080c` | 8, 8, 12 | Page base, deepest background | — |
| `--bg-secondary` | `#0e0e16` | 14, 14, 22 | Section background (graphite equivalent) | — |
| `--bg-tertiary` | `#141422` | 20, 20, 34 | Section background (purple equivalent) | — |
| `--bg-card` | `#1a1a2a` | 26, 26, 42 | Card surfaces, form backgrounds | — |
| `--bg-card-hover` | `#1f1f32` | 31, 31, 50 | Card hover state | — |
| `--bg-modal` | `#12121e` | 18, 18, 30 | Modal / overlay panel background | — |
| `--bg-input` | `#161624` | 22, 22, 36 | Form input backgrounds | — |
| `--bg-nav` | `rgba(8, 8, 12, 0.92)` | — | Scrolled nav (with backdrop-blur) | — |
| `--bg-overlay` | `rgba(4, 4, 8, 0.75)` | — | Modal backdrop | — |

### Text Tokens
| Token | Hex | Contrast vs `#08080c` | Purpose |
|-------|-----|----------------------|---------|
| `--text-heading` | `#f0eef5` | ~19:1 | H1, H2, hero text, founder names |
| `--text-body` | `#c0bdc8` | ~12.5:1 | Body paragraphs, descriptions |
| `--text-secondary` | `#9592a0` | ~7.4:1 | Secondary descriptions, nav links |
| `--text-muted` | `#706d7a` | ~4.6:1 | Captions, footer text, timestamps (large text only) |
| `--text-inverse` | `#ffffff` | — | Text on accent-colored backgrounds |
| `--text-on-card` | `#d0cdd8` | ~11:1 vs `#1a1a2a` | Body text on card surfaces |
| `--text-placeholder` | `#5a576a` | ~3.6:1 vs `#161624` | Form placeholders (decorative, not informational) |

### Accent Tokens
| Token | Hex | RGB | Purpose |
|-------|-----|-----|---------|
| `--accent-primary` | `#8b5cf6` | 139, 92, 246 | Primary brand violet — buttons, links, active states |
| `--accent-primary-hover` | `#a78bfa` | 167, 139, 250 | Violet hover state |
| `--accent-primary-active` | `#7c3aed` | 124, 58, 237 | Violet pressed/active state |
| `--accent-secondary` | `#c4a870` | 196, 168, 112 | Champagne gold — highlights, decorative accents, secondary CTAs |
| `--accent-secondary-hover` | `#d4ba88` | 212, 186, 136 | Gold hover state |
| `--accent-secondary-muted` | `rgba(196, 168, 112, 0.15)` | — | Gold tint for subtle backgrounds |
| `--accent-label` | `#a78bfa` | 167, 139, 250 | Section labels, breadcrumbs |
| `--accent-glow` | `rgba(139, 92, 246, 0.12)` | — | Ambient glow effects |

### Gradient Definitions
| Token | Definition | Purpose |
|-------|-----------|---------|
| `--gradient-hero` | `linear-gradient(135deg, #7c3aed 0%, #8b5cf6 40%, #6d28d9 100%)` | Hero section overlay accent, primary button backgrounds |
| `--gradient-card` | `linear-gradient(145deg, rgba(139, 92, 246, 0.06) 0%, rgba(196, 168, 112, 0.03) 100%)` | Card background tint — violet to gold shimmer |
| `--gradient-text` | `linear-gradient(135deg, #c4b5fd 0%, #c4a870 100%)` | Gradient text fills — violet-to-gold transition for premium feel |
| `--gradient-text-violet` | `linear-gradient(135deg, #e0d4ff, #a78bfa)` | Violet-only text gradient for section titles |
| `--gradient-section-dark` | `linear-gradient(180deg, #08080c 0%, #0e0e16 50%, #08080c 100%)` | Dark section backgrounds |
| `--gradient-section-accent` | `linear-gradient(180deg, #12101e 0%, #1a1530 50%, #12101e 100%)` | Accent section backgrounds (replaces bg-purple) |
| `--gradient-overlay-hero` | `linear-gradient(to bottom, rgba(8,8,12,0.6) 0%, rgba(8,8,12,0.5) 50%, rgba(8,8,12,0.85) 85%, #08080c 100%)` | Hero video overlay |
| `--gradient-border` | `linear-gradient(135deg, rgba(139,92,246,0.3), rgba(196,168,112,0.2))` | Premium border gradient for featured cards |

### Border Tokens
| Token | Value | Purpose |
|-------|-------|---------|
| `--border-default` | `1px solid rgba(139, 92, 246, 0.10)` | Standard card/section borders |
| `--border-subtle` | `1px solid rgba(139, 92, 246, 0.05)` | Dividers, separators |
| `--border-hover` | `1px solid rgba(139, 92, 246, 0.20)` | Card hover, focused elements |
| `--border-focus` | `2px solid rgba(139, 92, 246, 0.50)` | Focus-visible ring for accessibility |
| `--border-gold` | `1px solid rgba(196, 168, 112, 0.15)` | Premium/featured card borders |
| `--border-input` | `1px solid rgba(139, 92, 246, 0.12)` | Form inputs default |
| `--border-input-focus` | `1px solid rgba(167, 139, 250, 0.40)` | Form inputs focused |

### Shadow Tokens (Tinted)
| Token | Value | Purpose |
|-------|-------|---------|
| `--shadow-sm` | `0 4px 12px -2px rgba(8, 4, 24, 0.4)` | Subtle elevation (buttons, small cards) |
| `--shadow-md` | `0 12px 32px -8px rgba(8, 4, 24, 0.5)` | Medium elevation (cards, dropdowns) |
| `--shadow-lg` | `0 24px 56px -12px rgba(8, 4, 24, 0.6)` | Large elevation (modals, hero cards) |
| `--shadow-glow-violet` | `0 0 40px rgba(139, 92, 246, 0.15)` | Ambient violet glow |
| `--shadow-glow-gold` | `0 0 40px rgba(196, 168, 112, 0.08)` | Subtle gold glow |
| `--shadow-button-hover` | `0 14px 36px -8px rgba(124, 58, 237, 0.45)` | Button hover glow |

### State Tokens
| Token | Hex | Purpose |
|-------|-----|---------|
| `--state-success` | `#34d399` | Form success, confirmation states |
| `--state-error` | `#f87171` | Form errors, validation failures |
| `--state-warning` | `#fbbf24` | Caution indicators |
| `--state-success-bg` | `rgba(52, 211, 153, 0.10)` | Success background tint |
| `--state-error-bg` | `rgba(248, 113, 113, 0.10)` | Error background tint |

### Contrast Verification Summary
| Pair | Ratio | WCAG AA | WCAG AAA |
|------|-------|---------|----------|
| `--text-heading` on `--bg-primary` | 19:1 | Pass | Pass |
| `--text-body` on `--bg-primary` | 12.5:1 | Pass | Pass |
| `--text-secondary` on `--bg-primary` | 7.4:1 | Pass | Pass (large) |
| `--text-muted` on `--bg-primary` | 4.6:1 | Pass (large text) | Fail |
| `--text-on-card` on `--bg-card` | 11:1 | Pass | Pass |
| `--accent-primary` on `--bg-primary` | 4.8:1 | Pass (large text) | Fail |
| `--text-inverse` on `--accent-primary` | 4.6:1 | Pass (large text) | Fail |

---

## 2. Inspiration Board — By Section

### 2.1 Navigation
**Inspiration:** Linear.app's header — dark, restrained, with backdrop-blur that subtly reveals content behind it. Nav items are spaced generously, use fine weight typography, and the active state uses a subtle glow pill.

**Adaptation plan:**
- Keep the sticky nav with scroll-triggered background (existing pattern works)
- Replace dropdown hover menus with smoother transitions (opacity + translateY)
- Remove emoji phone icon; replace with a proper SVG phone icon in the accent color
- Add a thin hairline gold accent along the bottom border on scroll
- Nav CTA button should use the violet-to-purple gradient with the refined shadow system
- Dropdown menus get the `--bg-card` background with `--shadow-md`

### 2.2 Hero Section
**Inspiration:** Vercel's hero — dramatic, confident headline that fills the viewport. Stripe's flowing gradient animation for background atmosphere. The concept of "kinetic lettering" (Figma's 2026 trends) where large, expressive fonts instantly capture attention.

**Adaptation plan:**
- Replace the current centered-everything layout with a bolder, larger headline that commands attention
- Add a staggered page-load animation: title words reveal one by one with BlurText or SplitText (from ReactBits)
- The hero background keeps the video but with a more sophisticated overlay gradient (violet tint, not just black)
- Introduce a Silk or Aurora background effect (from ReactBits) layered subtly behind the overlay
- The single CTA button gets more presence — larger, with a subtle glow pulse animation on idle
- Add a scroll indicator at the bottom (thin animated line or chevron)

### 2.3 Why Us / Advantages Section
**Inspiration:** Editorial long-form design where each advantage gets visual weight. Think large serif numbers (oversized "01", "02") paired with horizontal rules and generous whitespace. Agency sites like Resn.co.nz use numbered lists with dramatic scale contrast.

**Adaptation plan:**
- Keep the vertical list layout but fix the janky hover effect (no margin changes)
- The numbers ("01"-"05") should be much larger, set in the serif display font, using the gold accent
- Each item gets a hover state that uses GlareHover (ReactBits) — a subtle light sweep across the row
- The section header uses a split layout (title left, description right) which already works — keep it
- Remove the CherryBranch SVG decoration, replace with a single thin geometric line accent

### 2.4 About / Founders Section
**Inspiration:** Editorial magazine layouts where founder photos have generous space. Agencies like Locomotive.ca and Buck.co show team members with large photos, minimal surrounding chrome, and short, punchy bios.

**Adaptation plan:**
- Founder cards should feel more editorial — perhaps full-bleed photos within the card with text overlaid at the bottom (gradient overlay up from bottom)
- The "Основатель" tag could use the gold accent background instead of purple
- Add subtle parallax on the founder photos on scroll (CSS-only, no library needed)
- The about intro/outro text should use slightly larger font size for more gravitas
- Replace CherryBranch with negative space — let the section breathe

### 2.5 Services Section
**Inspiration:** Stripe's product pages use cards with generous padding, subtle border gradients, and icons that float above the card surface. Linear uses monochromatic card layouts where hover state introduces color.

**Adaptation plan:**
- Service cards should use SpotlightCard (ReactBits) — a cursor-following spotlight effect on hover
- Add the `--gradient-card` (violet-to-gold tint) as the card background
- The "Подробнее" button should use an animated arrow on hover (arrow slides right)
- The 3x3 grid (with 7 items, leaving one slot open) should be intentional — use the empty slot for a "Не нашли нужное? Свяжитесь с нами" card with different styling
- Image zoom on hover remains (working well), but add a subtle gradient overlay that lightens on hover

### 2.6 CTA Banner ("Давайте знакомиться")
**Inspiration:** Premium e-commerce "personal shopper" sections — a large photo paired with warm, inviting copy. The Prodigar Travel redesign (referenced in search results) uses immersive sections for personalized experiences.

**Adaptation plan:**
- This section is strong — keep the structure
- Upgrade the photo treatment: add a gold-tinted border or a subtle gradient border using `--gradient-border`
- The headline could use the GradientText (ReactBits) with violet-to-gold for "знакомиться"
- Buttons should use the consistent button system (primary gradient pill + ghost secondary)

### 2.7 Niches Section
**Inspiration:** Premium fashion brand category pages — square images with minimal text, letting the photography speak. SSENSE or Mr Porter category grids.

**Adaptation plan:**
- Keep the 4-column grid with square images
- Add TiltedCard (ReactBits) for a subtle 3D perspective shift on hover
- Category names could get a hover underline animation (thin line expanding from center)
- Consider adding a subtle `--accent-secondary-muted` background wash to make the section feel warmer

### 2.8 Process / Steps Section
**Inspiration:** Horizontal timeline visualizations from consultancy sites. McKinsey Digital uses numbered steps with connecting lines. Linear's roadmap uses a clean step-through with subtle motion.

**Adaptation plan:**
- Redesign from 6 cramped columns to a 3x2 grid or a horizontal scroll on mobile
- Large numbers should use the serif display font with `--gradient-text` (violet-to-gold)
- Add connecting lines between steps (thin SVG paths or CSS borders)
- Each step card gets AnimatedContent (ReactBits) for staggered entrance on scroll
- Process cards hover: subtle border glow using `--shadow-glow-violet`

### 2.9 Bloggers Section
**Inspiration:** Feature announcement cards from product sites — a split-panel with rich text on one side and a visual checklist on the other. Notion's feature blocks.

**Adaptation plan:**
- Keep the split-panel layout
- The checklist bullets should use the gold accent dot instead of violet
- Add a subtle StarBorder (ReactBits) animation around the card border
- The "Обсудить проект" button should match the primary button system

### 2.10 Cases Section
**Inspiration:** Since cases are placeholder ("Скоро"), this needs a strategic redesign. Premium "coming soon" patterns use blurred imagery with lock icons, or counter displays ("20+ проектов выполнено").

**Adaptation plan:**
- Replace 3 empty gray cards with a single full-width section that says something like "Наши решения" with a compelling visual treatment
- Use a blurred/abstract background with the text "Кейсы в разработке" rendered large
- Add a counter element: "20+ проектов" or similar using CountUp (ReactBits)
- Or: completely hide this section until real content exists (recommended)

### 2.11 Contact / CTA Form Section
**Inspiration:** Stripe's contact forms — clean, spacious, with clear labels and subtle focus animations. Premium SaaS signup flows.

**Adaptation plan:**
- Form inputs get a more visible focus state: left border highlight with `--accent-primary`
- The consent checkbox should be custom-styled (not native browser)
- Form success state could use a more polished animation (confetti particles or a simple checkmark animation)
- Section background should use the accent section gradient for distinction

### 2.12 Footer
**Inspiration:** Linear's footer — minimal, well-organized, generous whitespace. Vercel's footer uses a simple grid with muted text.

**Adaptation plan:**
- Keep the 3-column grid layout
- Add a gold hairline divider between the logo section and the link columns
- Social icons should have hover states with background circles (ghost button style)
- The bottom copyright bar should be more visually separated with a subtle gradient divider

### 2.13 Modals
**Inspiration:** Craft.do and Raycast modal designs — centered, with backdrop blur, smooth spring animation on open/close.

**Adaptation plan:**
- Modal entry: scale from 0.95 → 1.0 + opacity 0 → 1 with spring easing
- Modal exit: scale 1.0 → 0.95 + opacity 1 → 0
- Input focus should show a left-side accent bar (2px violet)
- Success state inside modal should use the CountUp or a simple animated checkmark

---

## 3. ReactBits Integration Plan

### Text Animation Components
| Component | ReactBits Path | Target Section | Customization Notes | Dependencies |
|-----------|---------------|----------------|---------------------|--------------|
| **SplitText** | `text-animations/split-text` | Hero title | Word-by-word reveal on page load. `splitType: "words"`, custom from/to with opacity+translateY. Stagger 80ms. | GSAP + SplitText + ScrollTrigger plugins |
| **BlurText** | `text-animations/blur-text` | Section titles (all) | Replace current Reveal component for titles. `animateBy: "words"`, `direction: "bottom"`, delay 150ms. Blur-to-focus creates premium feel. | Framer Motion |
| **GradientText** | `text-animations/gradient-text` | Hero subtitle, CTA "знакомиться", service page titles | Use `--gradient-text` (violet-to-gold). Animate gradient position on hover for shimmer. | None (CSS-based) |
| **CountUp** | `text-animations/count-up` | Cases section redesign, process step numbers | Animate numbers on scroll entry. Custom font, easing. | None |
| **ScrollFloat** | `text-animations/scroll-float` | Section labels ("Преимущества", "О компании", etc.) | Subtle float effect on the small uppercase labels as they enter view. Adds micro-motion without being distracting. | None |
| **DecryptedText** | `text-animations/decrypted-text` | Hero subtitle or nav brand name on load | Character-by-character decrypt reveal. Use sparingly — only once on page for hero subtitle. Speed ~50ms. | None |
| **ShinyText** | `text-animations/shiny-text` | CTA buttons text, "Консультация" nav button | Subtle shine sweep across button text on hover. Gold-tinted shine. | None (CSS-based) |

### Background Components
| Component | ReactBits Path | Target Section | Customization Notes | Dependencies |
|-----------|---------------|----------------|---------------------|--------------|
| **Silk** | `backgrounds/silk` | Hero section (behind video overlay) | Speed: 3, Scale: 1.5, colors: deep violet + indigo. Low opacity (0.15) to complement video, not overpower. Used as a fallback when video hasn't loaded. | None |
| **Aurora** | `backgrounds/aurora` | Contact/CTA section background | colorStops: [`#7c3aed`, `#4c1d95`, `#c4a870`]. Speed: low. Replace the current flat bg-purple gradient. | None |
| **Noise** (animation) | `animations/noise` | Global overlay | Extremely subtle grain texture applied to the entire page as a `::after` pseudo-element. Opacity 0.03-0.05. Adds film-like depth. | None |
| **Particles** | `backgrounds/particles` | Cases "coming soon" section | Sparse, slow-moving particle field as ambient background. Violet + gold particles on dark bg. | None |

### Animation Components
| Component | ReactBits Path | Target Section | Customization Notes | Dependencies |
|-----------|---------------|----------------|---------------------|--------------|
| **AnimatedContent** | `animations/animated-content` | All sections (replaces custom Reveal) | Standardized scroll-triggered entrance. translateY 30px, opacity 0→1, stagger for lists. Replaces the ad-hoc Reveal component. | Framer Motion |
| **GlareHover** | `animations/glare-hover` | Why Us items, service cards | Subtle light glare that follows cursor across the card surface. Low intensity for sophistication. | None |
| **FadeContent** | `animations/fade-content` | Service page sections, modal content | Simple fade-in for page transitions and content blocks. | Framer Motion |
| **StarBorder** | `animations/star-border` | Bloggers section card, CTA banner | Animated gradient border that flows around the card perimeter. Use violet-to-gold gradient. Subtle speed. | None |
| **ClickSpark** | `animations/click-spark` | CTA buttons (form submit, callback) | Small particle burst on button click for satisfying feedback. Gold-colored sparks. | None |

### UI Components
| Component | ReactBits Path | Target Section | Customization Notes | Dependencies |
|-----------|---------------|----------------|---------------------|--------------|
| **SpotlightCard** | `components/spotlight-card` | Service cards grid | Cursor-following spotlight effect. Spotlight color: `rgba(139, 92, 246, 0.08)`. Replaces current flat card hover. | None |
| **TiltedCard** | `components/tilted-card` | Niche category cards | Subtle 3D tilt on hover (~5deg max). Adds depth to the square image grid. | None |
| **Stepper** | `components/stepper` | Process/Steps section | Could replace the current grid with a proper step-through component. Would need heavy customization to match design. | None |
| **Counter** | `components/counter` | Stats (if re-added), Cases section | Animated number counter with scroll trigger. Replace current custom Counter component. | None |

### Components NOT to use (considered and rejected)
| Component | Reason for Rejection |
|-----------|---------------------|
| BlobCursor / SplashCursor / GhostCursor | Too playful for a business consultancy. Cursor effects should be absent or minimal. |
| FallingText / FuzzyText / GlitchText | Too chaotic/experimental for professional brand. |
| Hyperspeed / Galaxy / Lightning | Too dramatic/sci-fi for a business site. |
| LiquidChrome / Plasma / Balatro | Visually impressive but wrong aesthetic for consultancy. |
| LetterGlitch / PixelBlast | Destructive/chaotic animations don't fit premium positioning. |
| MetaBalls / Ribbons | Too playful, more suited for creative agency or gaming. |
| FlowingMenu / GooeyNav / BubbleMenu | Too experimental for a consultancy nav that needs to be clear and fast. |
| Lanyard / FlyingPosters | Novel but wrong context for B2B consultancy. |

---

## 4. Mockup Templates

**Assessment:** After reviewing mockups-design.com, no templates are directly applicable. The site provides device mockups (phone, laptop, tablet frames) and scene mockups (business card, stationery). While these could theoretically showcase service results, the VIKITAY site doesn't currently feature any digital product screenshots or physical collateral that would benefit from mockup framing.

**If/when cases content is added**, consider:
- Laptop mockup frames to show client brand guidelines or websites
- Business card mockups to showcase STM branding work
- Packaging mockups for product line visualization

**Current verdict:** None applicable for this phase.

---

## 5. Visual Direction Refinement

### The Refined Vision: "Architectural Luxury"

The VIKITAY GROUP redesign will pursue what I'm calling **"Architectural Luxury"** — a visual language drawn from high-end architecture studios and investment firms rather than from tech startups or creative agencies. Every element should communicate: *precision, worldliness, and controlled sophistication.*

### Typography Strategy
The site will use a **dual-font system**:
- **Display/Headlines:** A high-contrast serif with strong Cyrillic support — **Cormorant Garant** (weights 400, 500, 600) for all H1/H2 headings. This font has excellent Russian typographic character, with tall ascenders and elegant curves that feel both classic and contemporary. It's *not* commonly used in web projects, which prevents the "template" feel.
- **Body/UI:** **Jost** (retained from current site, but with weights 300, 400, 500, 700 properly loaded). Jost's geometric clarity provides perfect contrast against Cormorant's organic serifs.

The type scale will follow a modular ratio (1.333 — perfect fourth) to create consistent, harmonious sizing:
- Hero H1: `clamp(48px, 6vw, 80px)` — Cormorant, weight 500
- Section H2: `clamp(36px, 4.5vw, 56px)` — Cormorant, weight 500
- Section label: 13px, Jost 500, uppercase, letter-spacing 4px
- Body: 16px, Jost 300, line-height 1.8
- Small/caption: 13px, Jost 400

### Hero Experience
The hero will feel **cinematic and confident.** The background video remains but with a more controlled overlay — dark with a subtle violet tint, not pure black. The headline will be large, serif, left-aligned (breaking the current centered monotony) with a SplitText animation that reveals word-by-word in 600ms total. Below the headline, the subtitle will use DecryptedText for a single, memorable entrance effect. A single CTA button sits below with generous padding and a ShinyText gold shimmer on idle. The scroll indicator at the bottom is a thin, animated gold line. The entire above-the-fold loads in a choreographed sequence: nav (instant) → title (200ms delay, word stagger) → subtitle (800ms delay, decrypt) → button (1200ms delay, fade up).

### Card & Surface System
All cards will share a consistent surface treatment:
- Base: `--bg-card` with `--border-default`
- Hover: `--bg-card-hover` with `--border-hover` + `--shadow-md` + SpotlightCard cursor glow
- The gradient-border treatment (`--gradient-border`) is reserved for "featured" or "premium" elements only (the CTA banner, featured service)
- Card corners: 16px radius (consistent, no variation)
- Card padding: 32px (consistent)

### Scroll Experience
The page scroll will feel **smooth and intentional**, not a barrage of pop-in animations:
- **AnimatedContent** (ReactBits) replaces the custom Reveal for all elements, with consistent easing and timing
- Sections enter with a subtle 20px translateY + opacity fade (not 40px — the current value is too dramatic)
- Stagger timing: 80ms between items in lists/grids
- Section labels use ScrollFloat for a gentle floating entrance
- Titles use BlurText for a premium blur-to-focus reveal
- No more than ONE special animation per section (prevents overwhelm)
- Between-section transitions feel natural because the rounded-card layout (40px margin) creates visual breathing room

### Decorative Philosophy
**Out:** Cherry branch SVGs, floating orbs in every section, mouse-glow cursor follower (gimmicky).
**In:**
- A single, ultra-subtle Noise grain overlay across the entire page (ReactBits Noise, opacity 0.03)
- Thin geometric line accents — horizontal hairlines with a gold-to-violet gradient, placed sparingly (1-2 per page)
- The Aurora background ONLY in the contact section (creating a visual climax at the form)
- Silk background in the hero ONLY (as video fallback/complement)
- All other sections: clean, relying on typography, spacing, and content for visual interest

### Color Application Rules
1. **Violet is the primary action color** — buttons, links, interactive states, focus rings
2. **Gold is the prestige accent** — section label dots, decorative borders, gradient text accents, the shine on CTA buttons
3. **Gold is NEVER used for entire backgrounds** — only as accents and highlights
4. **Section alternation** uses `--gradient-section-dark` and `--gradient-section-accent` (not purple — more indigo/navy tinted)
5. **Tinted shadows** always — never pure `rgba(0,0,0,x)`. Shadows should be tinted with deep violet (`rgba(8, 4, 24, x)`)

### Interaction Model
- **Hover states** are always subtle and fast (200-300ms, ease-out)
- **Cards:** translateY(-4px) + shadow elevation + SpotlightCard glow (not the current -6px which feels jumpy)
- **Buttons:** translateY(-2px) + glow shadow + ShinyText shimmer
- **Links:** color transition + underline slide-in from left
- **No layout-shifting hover effects** (the current Why-Us margin change is eliminated)
- **Focus states:** visible 2px violet ring for keyboard navigation (currently missing entirely)
- **Active/pressed states:** scale(0.98) + deeper shadow for tactile feedback

### Mobile Considerations
- The stacked-card layout with margins collapses gracefully (12px margins on mobile, 16px radius)
- Mobile menu gets a staggered fade-in animation for each link (currently missing)
- Touch targets minimum 44px
- Serif headlines scale down gracefully via clamp() but maintain impact
- The Aurora background in contact section simplifies to a static gradient on mobile (performance)

### What Success Looks Like
When a potential VIKITAY client lands on this site, within 3 seconds they should feel:
1. **"These people are serious"** — the serif typography and restrained color palette signal expertise, not a side hustle
2. **"This feels expensive"** — the gold accents, tinted shadows, and grain texture create tactile richness
3. **"I can trust them with my business"** — clean layouts, readable text, professional photography, and no visual chaos
4. **"They understand premium"** — every hover state, every animation, every spacing decision reflects care and intentionality

The site should feel like walking into a well-designed consulting firm's office: dark wood, warm lighting, clean surfaces, and the quiet confidence that comes from knowing exactly what you're doing.
