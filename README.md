# Dhairya Tiwari — Personal Developer Portfolio

An original, responsive personal developer portfolio website for **Dhairya Tiwari**, B.Tech Computer Science Engineering student at **NST-ADYPU, Pune, India**.

This site is engineered to serve as a living technical dossier throughout three years of college. It combines an authentic, honest record of current skills with a distinctive, high-impact aesthetic inspired by classified research facilities (**Resident Evil**) and dynamic graphic novels (**Invincible**).

---

## ⚡ Design System & Aesthetic

- **70% Research Facility Dossier:** Classified document layout, technical telemetry indicators, tactical corner brackets, diagnostic status tags, and restrained dark charcoal surfaces (`#090C0B`, `#121814`) with biohazard-green (`#A8D98D`) and emergency-red (`#EA4242`) accents.
- **30% Graphic Novel Energy:** Bold condensed display typography, angled comic cuts (`clip-path`), subtle halftone pattern matrices, and energetic electric-yellow (`#FFD447`) and blue (`#397BEA`) accents.
- **Zero External Runtime Dependencies:** Pure semantic HTML5, modern CSS3 (Custom Properties, Flexbox, Grid), and vanilla JavaScript. 100% self-contained and fast.

---

## 📂 Project Structure

```text
portfolio/
├── index.html        # Semantic HTML5 markup, accessible section hierarchy
├── styles.css        # Modular CSS3 styling, design tokens, responsive breakpoints
├── script.js         # Mobile navigation toggle, scroll-spy observer, dynamic year
└── README.md         # Documentation, guide to updates, and deployment instructions
```

---

## 🚀 How to Run Locally

Because this is a pure static website with no complex build steps or package managers, running it is instant:

### Option A: Direct Browser Opening
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Firefox, Safari, Edge).

### Option B: Local Development Server (Recommended)
Open a terminal in the `portfolio` folder and run:

```bash
# Using Python 3 (pre-installed on most systems)
python3 -m http.server 8000
```

Then open your browser to [http://localhost:8000](http://localhost:8000).

---

## ✏️ How to Edit & Maintain Your Portfolio

The site is designed with clear section markers and predictable markup so you can easily update it as you gain experience throughout college.

### 1. Adding Real Social & Contact Links (GitHub, LinkedIn, Email)
Open `index.html` and scroll to **Section 05 (`#contact`)**. Locate the commented `<div class="direct-links-group">` block and replace the placeholder URLs with your genuine usernames:

```html
<div class="direct-links-group">
  <a href="https://github.com/your-username" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
    GITHUB PROFILE ↗
  </a>
  <a href="https://linkedin.com/in/your-username" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
    LINKEDIN PROFILE ↗
  </a>
  <a href="mailto:your.name@example.com" class="btn btn-secondary">
    SEND EMAIL ✉
  </a>
</div>
```

### 2. Adding a GitHub Repository or Live Demo to Your Project
In `index.html` under **Section 03 (`#projects`)**, locate the `project-showcase-card`. You can add action buttons directly beneath the tech stack badges:

```html
<div class="project-actions" style="display: flex; gap: 0.75rem; margin-top: 1rem;">
  <a href="https://github.com/your-username/scheme-navigator" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
    VIEW REPOSITORY ↗
  </a>
  <a href="https://your-demo-url.com" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
    LAUNCH PROTOTYPE ↗
  </a>
</div>
```

### 3. Adding a New Project
To add a second or third project, duplicate the `<article class="project-showcase-card">...</article>` block inside `#projects` in `index.html` and update the title, tags, description, and technical details.

### 4. Updating Skills & Learning Stages
In `index.html` under **Section 02 (`#skills`)**, each category card contains skill items. To adjust a skill status or add a new one:

```html
<li class="skill-item">
  <div class="skill-info">
    <span class="skill-name">C++</span>
    <span class="skill-meta">Object-oriented programming, memory management</span>
  </div>
  <span class="stage-badge badge-green">Learning / Basic</span>
</li>
```
Available status badge classes:
- `badge-green`: Research green border & fill
- `badge-yellow`: Impact yellow border & fill
- `badge-blue`: Electric blue border & fill
- `badge-red`: Tactical red border & fill

### 5. Modifying Theme Colors
All colors are centralized at the top of `styles.css` under `:root`. You can tweak the hex values (such as `--accent-green`, `--accent-yellow`, or `--bg-base`) to adjust the site's atmosphere.

---

## 🌐 Publishing on GitHub Pages (Step-by-Step)

Publishing your portfolio online is completely free using **GitHub Pages**:

1. **Create a GitHub Repository:**
   - Log into [GitHub](https://github.com).
   - Click **New Repository**.
   - Name it `portfolio` (or `dhairyatiwari.github.io` for a root domain).
   - Set visibility to **Public**.
   - Do not initialize with a README (you already have this one).

2. **Initialize Git & Push from your computer:**
   In your terminal inside the `portfolio` directory:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Dhairya Tiwari developer portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - In your repository on GitHub, click **Settings** (top tab).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`. Click **Save**.
   - In 1–2 minutes, your website will be live at:
     `https://YOUR_USERNAME.github.io/portfolio/`

---

## ♿ Accessibility & Standards Compliance

- **Semantic Landmark Hierarchy:** Proper `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` elements.
- **Keyboard Navigation:** Includes a visible `:focus` indicator and an accessible `Skip to main content` anchor.
- **Mobile Menu ARIA:** Compliant `aria-expanded`, `aria-controls`, and `aria-label` states with `Escape` key close and outside click detection.
- **Motion Accessibility:** Automatically respects the user's `prefers-reduced-motion` operating system preference, turning off CSS animations and smoothing transitions.
- **High Contrast:** All body text meets WCAG AA contrast standards (> 4.5:1) against dark backgrounds.

---

## 🛡️ License

Created by **Dhairya Tiwari**. Free for personal use, portfolio customization, and academic presentation.

