# Dhairya Tiwari — Invincible 3D Superhero Developer Portfolio

An immersive, interactive superhero comic-book developer portfolio for **Dhairya Tiwari**, B.Tech Computer Science Engineering student at **NST-ADYPU, Pune, India**. The cover uses Three.js; the other scenes use CSS 3D transforms and local SVG illustrations.

Inspired by the dynamic visual language, high-energy compositions, and universe of **INVINCIBLE**.

---

## ⚡ The 7 Character-Driven Comic Scenes

Every main section of the portfolio is art-directed and animated as an individual comic-book scene with its own dedicated character entrance, visual aura, and motion pattern:

| Scene | Section | Character Identity | Motion & Entrance Pattern | Thematic Narrative & Visual Treatment |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Cover** (`#hero`) | **Original DT Emblem** | 3D comic cover with camera parallax, masked name reveal, and speed lines. | The origin story. Introductory copy, confirmed student details, and quick actions. |
| **02** | **About** (`#about`) | **Invincible-inspired** | **Flying Entrance:** Diagonal swoop with 3D perspective shift and yellow/blue speed trail. | Multi-chapter interactive hub with 5 tabs (Introduction, Education, Interests, Dev Journey, Current Focus). |
| **03** | **Academics** (`#academics`) | **Thragg-inspired** | **Descending Impact:** Forward drop from upper background, crimson impact ring expansion, and 3D information-card unfold. | Confirmed study details: B.Tech Computer Science Engineering at NST-ADYPU, Pune, India. |
| **04** | **Abilities** (`#skills`) | **Omni-Man-inspired** | **Power Stride:** Side-profile forward stride, crimson power sweep, and 3D card flip. | Honest ability grid (HTML, CSS, JavaScript, Python, Git/GitHub, Unity & C#, AI-assisted coding tools), all at **Learning / Basic**. |
| **05** | **Missions** (`#projects`) | **Battle Beast-inspired** | **Impact Scene:** Impact entrance, radial crimson burst, and 3D card lift on hover. | **Scheme Eligibility Navigator** team hackathon prototype with an SVG data-flow diagram. No public repo or demo link is configured. |
| **06** | **Journey** (`#journey`) | **Atom Eve-inspired** | **Radiant Expansion:** Smooth glide forward with pink energy ribbons. | Four panels summarize current learning in programming, web development, project collaboration, and game development. |
| **07** | **Finale** (`#contact`) | **Allen-inspired** | **Cosmic Arrival:** Colorful entrance with cyan/yellow rings and a thumbs-up pose. | Closing splash panel: *“THE NEXT CHAPTER STARTS HERE.”* Public contact links are not configured. |

---

## 📂 Asset Registry & Attribution

Character illustrations are stored locally in `assets/characters/` in resolution-independent SVG format:
- `assets/characters/invincible.svg`
- `assets/characters/thragg.svg`
- `assets/characters/omniman.svg`
- `assets/characters/battlebeast.svg`
- `assets/characters/atomeve.svg`
- `assets/characters/allenthealien.svg`

Asset provenance notes and instructions for replacing an illustration with a transparent PNG are in [assets/ATTRIBUTION.md](assets/ATTRIBUTION.md). No third-party source or license record is included for the character depictions; see the attribution note before publishing.

---

## 🚀 How to Run Locally

Because this project uses standard browser technologies (HTML5, modern CSS3, vanilla JavaScript with Three.js via CDN), running it is instant:

### Run a Local Server
From this directory, run:
   ```bash
   python3 -m http.server 8001
   ```
Open **[http://localhost:8001](http://localhost:8001)**. If port 8001 is already in use, run `python3 -m http.server 8002` and open port 8002 instead.

Serving the files locally keeps the Three.js CDN and relative asset paths working consistently.

---

## ♿ Accessibility & Motion Standards

- **Semantic Landmarks:** Proper `header`, `nav`, `main`, `section`, `article`, and `footer` hierarchy.
- **Keyboard Navigation:** Full tab order, `Enter`/`Space` activation on interactive cards, and visible `:focus-visible` rings.
- **Reduced Motion Support:** Honors `prefers-reduced-motion` by presenting a static Three.js scene and reducing CSS motion while keeping the portfolio readable.
