# Smart Digital Museum

An interactive, responsive React application built to explore historical artifacts, famous artworks, remarkable inventions, and cultural treasures from around the world. Designed with a modern, accessible interface powered by **React**, **Vite**, **Tailwind CSS**, and **LocalStorage persistence**.

---

## 🌟 Features

* **🔍 Real-time Search**: Search artifacts dynamically by name, creator, or category keyword.
* **🏷️ Category & Period Filtering**: Filter collections by category (*Ancient Artifacts*, *Famous Artworks*, *Great Inventions*, *Cultural Heritage*) and historical period (*Ancient*, *Renaissance*, *Medieval*, *Industrial*).
* **📊 Multi-criteria Sorting**: Sort artifacts by creation year (*Oldest*, *Newest*) or alphabetically (*Name A-Z*).
* **🏛️ Virtual Museum Rooms**: Directly enter interactive virtual rooms (*Ancient World*, *Art Gallery*, *Inventions*, *Cultural Heritage*) with automatic scroll-to-explore navigation.
* **📜 Artifact Details Modal**: View comprehensive artifact information, creator history, origin year, and rich descriptions in a centered modal dialog.
* **⚖️ Artifact Comparison**: Select up to 2 artifacts side-by-side to compare their origins, periods, creators, and details in a dedicated comparison view.
* **❤️ Favorite Artifacts**: Save favorite artifacts with one-click toggle actions and view them in a dedicated favorites gallery.
* **🕐 Recently Viewed Gallery**: Automatically tracks viewed artifacts in chronological order (newest first).
* **🌙 Dark / Light Mode**: Seamless dark and light theme toggle with smooth CSS and Tailwind color transitions.
* **💾 LocalStorage Persistence**: Automatically persists Favorites, Recently Viewed items, and Theme preferences across browser sessions.
* **📱 Fully Responsive Design**: Built with Tailwind CSS for high performance across Desktop (1920px, 1024px), Tablet (768px), and Mobile (480px, 360px) viewports.

---

## 🛠️ Tech Stack

* **Frontend Library**: React 18
* **Build Tool**: Vite 5
* **Language**: JavaScript (ES6+)
* **Styling**: Tailwind CSS 3 & PostCSS
* **State & Persistence**: React Hooks (`useState`, `useEffect`) & Browser `localStorage`
* **Icons & Assets**: Custom Web / SVG Icons

---

## 📁 Project Structure

```text
smart-digital-museum/
├── public/                  # Static assets & icons
├── src/
│   ├── components/
│   │   ├── ArtifactCard.jsx    # Artifact card UI & action buttons
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
│   │   └── artifacts.js        # Artifact dataset
│   ├── App.jsx             # Root App component & state management
│   ├── index.css           # Tailwind directives & global resets
│   └── main.jsx            # React DOM entry point
├── .gitignore               # Git ignored paths
├── index.html              # HTML entry template & SEO metadata
├── package.json            # Dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

---

## 💻 Installation

Clone the repository and install the project dependencies:

```bash
cd smart-digital-museum
npm install
```

---

## 🚀 Run Locally

To launch the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build

To test and build the production bundle:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

---

## 📸 Screenshots

*(Placeholder section for application screenshots)*
* **Explore Gallery & Search**: `[Add screenshot here]`
* **Dark Theme View**: `[Add screenshot here]`
* **Artifact Comparison Modal**: `[Add screenshot here]`

---

## 🔮 Future Improvements

* **Audio Guide Integration**: Add interactive audio narrations for each artifact.
* **3D Virtual Room Tours**: Integrate Three.js / WebGL for 360-degree 3D artifact rendering.
* **REST API Integration**: Connect to live external museum API endpoints (e.g., Metropolitan Museum of Art API or Harvard Art Museums API).
* **Multi-Language Support**: i18n localization support for global visitors.

---

## 👤 Author

**Vijayapandian T**  
FSD Intern
