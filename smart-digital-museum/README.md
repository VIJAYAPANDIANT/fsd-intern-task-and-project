# Smart Digital Museum

An interactive, responsive React application built to explore historical artifacts, famous artworks, remarkable inventions, and cultural treasures from around the world, featuring an enriched collection of **Tamil Nadu, India cultural artifacts**. Built with a modern, accessible interface powered by **React 18**, **Vite**, **Tailwind CSS**, and **LocalStorage persistence**.

🌐 **Live Application Link**: [Smart Digital Museum](https://fsd-intern-task-and-project.vercel.app/)

---

## 🌟 Features

* **🌐 Live Deployment**: Hosted live on Vercel at [fsd-intern-task-and-project.vercel.app](https://fsd-intern-task-and-project.vercel.app/).
* **🔍 Real-time Search**: Search artifacts dynamically by title, creator, or description keywords.
* **🏷️ Category & Period Filtering**: Filter collections by category (*Ancient Artifacts*, *Famous Artworks*, *Great Inventions*, *Cultural Heritage*) and historical period (*Ancient*, *Renaissance*, *Medieval*, *Industrial*).
* **🇮🇳 Tamil Nadu Artifacts Collection**: Includes 8 authentic Tamil Nadu heritage items (Chola Nataraja Bronze, Brihadisvara Temple reliefs, Mahabalipuram Shore Temple, Tanjore Paintings, Madurai Musical Pillars, Kanchipuram Silk Loom, etc.).
* **📅 Formatted Year Badges**: Clear `CE` and `BCE` badges on artifact cards and modals (e.g., `📅 1200 CE`, `📅 196 BCE`).
* **🖼️ Fallback Image Handling**: Automatic fallback image recovery ensuring cards always render gracefully even if external image links fail.
* **📊 Multi-criteria Sorting**: Sort artifacts by creation year (*Oldest*, *Newest*) or alphabetically (*Name A-Z*).
* **🏛️ Virtual Museum Rooms**: Directly enter interactive virtual rooms (*Ancient World*, *Art Gallery*, *Inventions*, *Cultural Heritage*) with auto-scrolling room navigation.
* **📜 Artifact Details Modal**: View comprehensive artifact information, creator history, origin year, and rich descriptions in a centered accessible modal dialog.
* **⚖️ Artifact Comparison**: Select up to 2 artifacts side-by-side to compare their origins, periods, creators, and details in a dedicated comparison view.
* **❤️ Favorite Artifacts**: Save favorite artifacts with one-click toggle actions and view them in a dedicated favorites gallery.
* **🕐 Recently Viewed Gallery**: Automatically tracks viewed artifacts in chronological order (newest first).
* **🌙 Dark / Light Mode**: Seamless dark and light theme toggle with smooth CSS and Tailwind color transitions.
* **💾 LocalStorage Persistence**: Automatically persists Favorites, Recently Viewed items, and Theme preferences across browser sessions.
* **📱 Fully Responsive Design**: Built with Tailwind CSS for smooth layout adaptability across Desktop, Tablet, and Mobile viewports.

---

## 🏛️ Featured Artifact Catalog (12 Items)

| Artifact | Category | Period | Year | Origin / Creator |
| :--- | :--- | :--- | :--- | :--- |
| **Rosetta Stone** | Ancient Artifacts | Ancient | 196 BCE | Ancient Egyptians |
| **Mona Lisa** | Famous Artworks | Renaissance | 1503 CE | Leonardo da Vinci |
| **Steam Engine** | Great Inventions | Industrial | 1712 CE | Thomas Newcomen |
| **Indian Temple Sculpture** | Cultural Heritage | Medieval | 1200 CE | Indian Sculptors |
| **Chola Nataraja Bronze** | Cultural Heritage | Medieval | 950 CE | Chola Dynasty Artisans, Tamil Nadu |
| **Brihadisvara Temple Sculpture** | Cultural Heritage | Medieval | 1010 CE | King Raja Raja Chola I, Thanjavur |
| **Shore Temple Monolith** | Ancient Artifacts | Ancient | 700 CE | Pallava Dynasty, Mamallapuram |
| **Arjuna's Penance Relief** | Ancient Artifacts | Ancient | 650 CE | Pallava Sculptors, Mahabalipuram |
| **Panchaloha Parvati Bronze** | Cultural Heritage | Medieval | 1100 CE | Chola Metal Guilds, Swamimalai |
| **Tanjore Gold Leaf Painting** | Famous Artworks | Medieval | 1600 CE | Thanjavur Royal Court Painters |
| **Madurai Musical Pillars** | Great Inventions | Medieval | 1623 CE | Nayakar Artisans, Madurai |
| **Kanchipuram Silk Loom** | Great Inventions | Industrial | 1725 CE | Kanchi Master Weavers, Tamil Nadu |

---

## 🛠️ Tech Stack

* **Frontend Library**: React 18
* **Build Tool**: Vite 5
* **Language**: JavaScript (ES6+)
* **Styling**: Tailwind CSS 3 & PostCSS
* **State & Persistence**: React Hooks (`useState`, `useEffect`) & Browser `localStorage`
* **Deployment**: Vercel

---

## 📁 Project Structure

```text
smart-digital-museum/
├── .vscode/
│   └── settings.json       # Editor CSS linter config for Tailwind directives
├── public/                 # Static assets & favicon SVG
├── src/
│   ├── components/
│   │   ├── ArtifactCard.jsx    # Artifact card UI with year badges & image error handling
│   │   ├── ArtifactList.jsx    # Search, filter controls & artifact grid
│   │   ├── ArtifactModal.jsx   # Details modal view
│   │   ├── Categories.jsx      # Collection category cards
│   │   ├── CompareModal.jsx    # Side-by-side artifact comparison modal
│   │   ├── Favorites.jsx       # Saved favorites section
│   │   ├── Footer.jsx          # App footer
│   │   ├── Hero.jsx            # Hero banner section
│   │   ├── Museum.jsx          # Virtual museum room selection
│   │   ├── Navbar.jsx          # Top navigation & theme toggle
│   │   └── RecentlyViewed.jsx  # Recently viewed items gallery
│   ├── data/
│   │   └── artifacts.js        # Enriched artifact dataset (12 items)
│   ├── App.jsx             # Root App component & state management
│   ├── index.css           # Tailwind directives & global resets
│   └── main.jsx            # React DOM entry point
├── .gitignore              # Git ignored paths
├── index.html              # HTML entry template & SEO metadata
├── package.json            # Dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

---

## 💻 Installation & Setup

1. **Navigate to project directory**:
   ```bash
   cd smart-digital-museum
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your web browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🔗 Live Application

Visit the live app: [Smart Digital Museum](https://fsd-intern-task-and-project.vercel.app/)

---

## 👤 Author

**Vijayapandian T**  
FSD Intern
