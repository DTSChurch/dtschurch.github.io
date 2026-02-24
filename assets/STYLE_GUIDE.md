# DTS Church — Design System & Style Guide

Extracted from the DTS Church marketing site (`DTSStyle.html`).
Use this as the canonical reference when building new pages and projects.

---

## 1. Color Palette

### Brand Colors (CSS Custom Properties)

```css
:root {
  --pixis-blue:        #2C4A6E;   /* Primary brand blue */
  --pixis-blue-hover:  #3a5a80;   /* Hover state */
  --pixis-blue-light:  #d4e4f4;   /* Tinted backgrounds */
  --cream:             #f5f5f0;   /* Warm neutral background */
}
```

### Neutral Scale

```css
:root {
  --gray-50:  #fafafa;
  --gray-100: #f4f4f5;
  --gray-200: #e4e4e7;
  --gray-300: #d4d4d8;
  --gray-600: #52525b;
  --gray-700: #3f3f46;
  --gray-800: #27272a;
  --gray-900: #18181b;
}
```

### Accent Colors (used in badges, trends, floating cards)

| Token              | Value      | Usage                              |
|--------------------|------------|------------------------------------|
| Emerald bg         | `#d1fae5`  | Success/positive icon backgrounds  |
| Emerald text       | `#059669`  | Success icon strokes               |
| Blue bg            | `#dbeafe`  | Info badges, survey buttons        |
| Blue text          | `#2563eb`  | Info text, CTA accents             |
| Rose bg            | `#fecdd3`  | Coral accent icon backgrounds      |
| Rose text          | `#E11D48`  | Coral icon strokes                 |
| Lavender bg        | `#e9d5ff`  | Purple accent backgrounds          |
| Lavender text      | `#9333EA`  | Purple icon strokes                |
| Error bg           | `#fee2e2`  | Negative trend background          |
| Error text         | `#991b1b`  | Negative trend text                |
| Deep green text    | `#065f46`  | Positive trend text                |

### Gradients

```css
/* Services block */
background: linear-gradient(135deg, var(--pixis-blue) 0%, #3a5a80 100%);

/* Hero section */
background: linear-gradient(180deg, var(--cream) 0%, rgba(245,245,240,0.3) 50%, white 100%);

/* Decorative gradients (SVG / card accents) */
/* Rose → Lavender */  linear-gradient(135deg, #FECDD3 0%, #E9D5FF 100%);
/* Emerald → Blue */   linear-gradient(135deg, #D1FAE5 0%, #DBEAFE 100%);
/* Blue → Emerald */   linear-gradient(135deg, #2563eb 0%, #D1FAE5 100%);
/* Blue → Lavender → Rose */ linear-gradient(135deg, #DBEAFE 0%, #E9D5FF 50%, #FECDD3 100%);
```

---

## 2. Typography

### Font Stack

| Role       | Family                                                                     | Fallbacks                              |
|------------|---------------------------------------------------------------------------|----------------------------------------|
| **Display** | `PP Agrandir`                                                             | Outfit, Montserrat, sans-serif         |
| **Body**    | `Work Sans`                                                               | -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif |
| **UI/Data** | `Inter`                                                                   | sans-serif                             |

> **Google Fonts import:** `Work Sans:wght@400;500;600;700` and `Inter:wght@400;500;600;700`
> **PP Agrandir** is a licensed font — requires self-hosted woff2/woff files in `/fonts/`.

### Font-face declarations (PP Agrandir)

```css
@font-face { font-family: 'PP Agrandir'; src: url('/fonts/PPAgrandir-Light.woff2')   format('woff2'); font-weight: 300; font-display: swap; }
@font-face { font-family: 'PP Agrandir'; src: url('/fonts/PPAgrandir-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'PP Agrandir'; src: url('/fonts/PPAgrandir-Bold.woff2')    format('woff2'); font-weight: 700; font-display: swap; }
@font-face { font-family: 'PP Agrandir'; src: url('/fonts/PPAgrandir-Heavy.woff2')   format('woff2'); font-weight: 800; font-display: swap; }
```

### Type Scale

| Element                | Font            | Size        | Weight | Line-height | Letter-spacing | Notes                   |
|------------------------|-----------------|-------------|--------|-------------|----------------|-------------------------|
| **h1 (hero)**          | PP Agrandir     | 4.5rem      | 800    | 1.05        | 0.01em         | Max heading             |
| **Section title**      | PP Agrandir     | 3.5rem      | 800    | 1.1         | 0.01em         | e.g. services block     |
| **h2 (feature)**       | PP Agrandir     | 2.75rem     | 800    | 1.2         | 0.01em         |                         |
| **h2 (why cards)**     | PP Agrandir     | 3rem        | 800    | 1.2         | 0.01em         | Centered headings       |
| **Card title**         | PP Agrandir     | 1.75rem     | 800    | —           | 0.01em         |                         |
| **Service item title** | PP Agrandir     | 1.25rem     | 700    | —           | 0.01em         |                         |
| **Stat value (large)** | PP Agrandir     | 4rem        | 800    | 1           | -0.02em        |                         |
| **Stat value**         | PP Agrandir     | 2.25rem     | 800    | 1           | 0.01em         |                         |
| **Metric value**       | PP Agrandir     | 2rem        | 800    | 1           | 0.01em         |                         |
| **Logo**               | PP Agrandir     | 1.625rem    | 800    | —           | 0.02em         |                         |
| **Subhead**            | Work Sans       | 1.375rem    | 400    | 1.7         | —              |                         |
| **Body (large)**       | Work Sans       | 1.125rem    | 400    | 1.7         | —              |                         |
| **Body**               | Work Sans       | 1rem        | 400    | 1.7         | —              |                         |
| **Nav link**           | Work Sans       | 0.9375rem   | 500    | —           | —              |                         |
| **Button**             | Work Sans       | 0.9375rem   | 500–600| —           | —              |                         |
| **Small label**        | Work Sans       | 0.875rem    | 500–600| —           | —              |                         |
| **Caption / kicker**   | Work Sans       | 0.75rem     | 700    | —           | 0.05–0.1em     | uppercase               |
| **Micro label**        | Work Sans       | 0.625rem    | 700    | —           | 0.05em         | uppercase               |
| **Notification body**  | Inter           | 0.875rem    | 400    | 1.5         | —              |                         |
| **Notification title** | Inter           | 0.9375rem   | 700    | —           | —              |                         |

---

## 3. Spacing & Layout

### Container

```css
max-width: 1400px;
margin: 0 auto;
padding: 0 3rem;
```

### Section Padding

| Section type       | Padding          |
|--------------------|------------------|
| Standard section   | `6rem 0`         |
| Large section      | `8rem 2rem`      |
| CTA banner         | `2rem 2rem`      |
| Footer             | `4rem 0 0`       |

### Grid Gaps

| Context          | Gap         |
|------------------|-------------|
| Hero columns     | `5rem`      |
| Feature blocks   | `6rem`      |
| Services block   | `4rem`      |
| Card grids       | `2rem`      |
| Metric grids     | `1rem`      |
| Button groups    | `1rem`      |

### Border Radius

| Element          | Radius      |
|------------------|-------------|
| Large cards      | `24px`      |
| Services block   | `32px`      |
| Dashboard card   | `20px`      |
| Floating cards   | `16–20px`   |
| Metric boxes     | `12px`      |
| Buttons          | `8–10px`    |
| Icon badges      | `8–12px`    |
| Pill buttons     | `50px`      |
| Avatar / dots    | `50%`       |

---

## 4. Components

### 4a. Buttons

```css
/* Base */
.btn {
  font-family: 'Work Sans', sans-serif;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Large */
.btn-lg { padding: 1rem 2.5rem; font-size: 1.0625rem; border-radius: 10px; }
```

| Variant        | Background           | Text color       | Border                    | Shadow                                  | Hover                          |
|----------------|----------------------|------------------|---------------------------|------------------------------------------|---------------------------------|
| **Primary**    | `--pixis-blue`       | `white`          | none                      | `0 2px 8px rgba(44,74,110,0.15)`        | bg → hover, translateY(-2px)   |
| **Secondary**  | `white`              | `--gray-700`     | `1.5px solid --gray-300`  | none                                     | bg → gray-50, translateY(-1px) |
| **Survey/Info**| `#dbeafe`            | `#2563eb`        | none                      | `0 2px 8px rgba(37,99,235,0.15)`        | bg → `#bfdbfe`, translateY(-2px)|
| **Footer**     | `#dbeafe`            | `--pixis-blue`   | none                      | none                                     | bg → `#bfdbfe`, translateY(-1px)|
| **Pill**       | `#dbeafe`            | `#2563eb`        | none                      | none                                     | bg → `#bfdbfe`, translateY(-1px)|

### 4b. Navigation

```
Fixed top bar (72px height)
Background: rgba(255, 255, 255, 0.95) + backdrop-filter: blur(10px)
Border-bottom: 1px solid var(--gray-100)
```

- **Logo:** PP Agrandir, 1.625rem, weight 800, color `--pixis-blue`
- **Nav links:** Work Sans, 0.9375rem, weight 500, color `--gray-700`
- **Nav hover:** color → `--pixis-blue`, underline animates from 0% to 100% width (2px, brand color)
- **CTA button** in nav: `.btn-primary`

### 4c. Cards

**Dashboard Card**
```css
background: white;
border-radius: 20px;
box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.08), 0 40px 80px rgba(0,0,0,0.06);
transform: perspective(1000px) rotateY(-5deg);  /* hover removes rotation */
```

**Floating Card**
```css
background: white;
border-radius: 20px;
padding: 1.5rem;
box-shadow: 0 10px 40px rgba(0,0,0,0.1);
```

**Glass Card**
```css
background: rgba(255,255,255,0.85);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.3);
box-shadow: 0 8px 32px rgba(0,0,0,0.12);
```

**Why Card**
```css
background: white;
border-radius: 24px;
box-shadow: 0 2px 8px rgba(0,0,0,0.06);
/* hover: */ box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-4px);
```

**Metric Box**
```css
padding: 1.25rem;
border-radius: 12px;
background: var(--gray-50);
border: 1px solid var(--gray-100);
/* hover: */ border-color: var(--gray-200); box-shadow: 0 2px 8px rgba(0,0,0,0.04);
```

### 4d. Icon Badges

```css
width: 36–48px;
height: 36–48px;
border-radius: 10–12px;
display: flex; align-items: center; justify-content: center;
```

| Color variant | Background | Stroke color |
|---------------|------------|-------------|
| Emerald       | `#d1fae5`  | `#059669`   |
| Blue          | `#dbeafe`  | `#2563eb`   |
| Lavender      | `#e9d5ff`  | `#9333EA`   |
| Coral         | `#fecdd3`  | `#E11D48`   |

### 4e. Trend Badges

```css
font-size: 0.6875rem; font-weight: 600;
padding: 0.25rem 0.5rem; border-radius: 6px;

/* Positive */ background: #d1fae5; color: #065f46;
/* Negative */ background: #fee2e2; color: #991b1b;
```

### 4f. Hero Badge (pill)

```css
display: inline-flex; align-items: center; gap: 0.5rem;
padding: 0.5rem 1rem;
background: white;
border: 1px solid var(--gray-200);
border-radius: 50px;
font-size: 0.875rem; font-weight: 500; color: var(--gray-700);
```

Includes an 8px pulsing dot (brand color, `animation: pulse 2s infinite`).

---

## 5. Shadows

| Usage               | Value                                                                 |
|---------------------|-----------------------------------------------------------------------|
| Dashboard card      | `0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.08), 0 40px 80px rgba(0,0,0,0.06)` |
| Floating card       | `0 10px 40px rgba(0,0,0,0.1)`                                        |
| Glass card          | `0 8px 32px rgba(0,0,0,0.12)`                                        |
| Floating notification | `0 0 0 1px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.12)`        |
| Why card            | `0 2px 8px rgba(0,0,0,0.06)` → hover: `0 8px 24px rgba(0,0,0,0.12)` |
| Satisfaction card   | `0 8px 24px rgba(44,74,110,0.15)`                                     |
| Primary button      | `0 2px 8px rgba(44,74,110,0.15)` → hover: `0 4px 12px rgba(44,74,110,0.25)` |

---

## 6. Animations

### Fade In Up (page load)

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeInUp 0.8s ease-out backwards; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }
```

### Slide In Up (floating elements)

```css
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Used with delay, e.g. 0.8s */
```

### Pulse (badge dot)

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}
```

### Marquee scroll

```css
@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
/* 30s linear infinite, pause on hover */
```

### Hover Transitions

- **Buttons:** `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`, translateY(-1px to -2px)
- **Cards:** `all 0.3s`, translateY(-4px), shadow lift
- **Nav links:** `color 0.2s`, underline `width 0.3s`
- **Service items:** `all 0.3s`, padding-left shift on hover
- **Metric boxes:** `all 0.2s`, subtle border + shadow

---

## 7. Responsive Breakpoints

| Breakpoint   | Behavior                                                  |
|--------------|-----------------------------------------------------------|
| `≤ 1024px`   | Hero → single column; services block → single column; features → single column; floating cards → static; satisfaction → single column |
| `≤ 768px`    | Nav links hidden; h1 → 2.5rem; stats → vertical stack; metrics → single column |

---

## 8. Section Patterns

### Hero (full viewport)
- Min-height: 100vh, padded for nav (72px)
- 2-column grid: text left, visual right
- Contains: badge, h1, subhead, CTA group, stat row
- Visual side: perspective-tilted dashboard card + floating notification

### Services Block
- Full-width blue gradient container with 32px radius
- 2-column: left = badge + title + description + CTA; right = stacked service items
- Decorative vertical divider line at 50%

### Satisfaction Section
- Cream background (`#f5f5f0`)
- 2-column: left = rating card + title + CTAs; right = blue data card + floating quote card

### Why It Works
- White background, centered title
- 3-column card grid
- Each card: blue graphic area (SVG) + text content area

### Feature Blocks
- Alternating left/right layouts (`.feature-block` / `.feature-block-reverse`)
- Image placeholder + 1–2 floating cards per feature
- 6rem gap between columns

### CTA Banner
- Centered container, `#dbeafe` background, 24px radius
- Flex row: title + button

### Footer
- Brand blue background
- 3-column grid: logo left, tagline center, links right
- Bottom bar with border-top divider

---

## 9. Iconography

- **Style:** Lucide/Feather-style outline icons
- **Size:** 16px (small), 24px (standard)
- **Stroke:** 2px (standard), 2.5px (emphasis)
- **Properties:** `stroke-linecap: round; stroke-linejoin: round; fill: none`
- **Delivery:** Inline SVG (not icon font)

---

## 10. Mapping to Docs Site

When applying this style guide to the documentation site:

| Docs site element   | Maps to DTS style                                           |
|---------------------|-------------------------------------------------------------|
| `--brand`           | → `--pixis-blue` (#2C4A6E)                                 |
| `--brand-deep`      | → `--pixis-blue` (#2C4A6E)                                 |
| `--brand-warm`      | → `#dbeafe` (blue accent) or keep for docs accent           |
| `--bg`              | → `white` or `--cream` (#f5f5f0)                           |
| `--ink`             | → `--gray-900` (#18181b)                                   |
| `--ink-soft`        | → `--gray-600` (#52525b)                                   |
| `--surface`         | → `white`                                                   |
| Heading font        | → `PP Agrandir` (with fallbacks to Outfit, Montserrat)     |
| Body font           | → `Work Sans` (already matching)                            |
| `.topbar`           | → Fixed nav with blur backdrop, 72px height                 |
| `.btn-primary`      | → Pixis blue with shadow lift                               |
| `.panel` / `.card`  | → White, 16–24px radius, subtle shadow                     |
