# Smart Digital Museum

An interactive, responsive React application built to explore historical artifacts, famous artworks, remarkable inventions, and cultural treasures from around the world. Built with a modern, accessible interface powered by **React 18**, **Vite**, **Tailwind CSS**, and **LocalStorage persistence**.

---

## 🌟 Features

* **🔍 Real-time Search**: Search artifacts dynamically by title, creator, or description keywords.
* **🏷️ Category & Period Filtering**: Filter collections by category (*Ancient Artifacts*, *Famous Artworks*, *Great Inventions*, *Cultural Heritage*) and historical period (*Ancient*, *Renaissance*, *Medieval*, *Industrial*).
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

## 🛠️ Tech Stack

* **Frontend Library**: React 18
* **Build Tool**: Vite 5
* **Language**: JavaScript (ES6+)
* **Styling**: Tailwind CSS 3 & PostCSS
* **State & Persistence**: React Hooks (`useState`, `useEffect`) & Browser `localStorage`

---

## 📁 Project Structure

```text
smart-digital-museum/
├── .vscode/
│   └── settings.json       # Editor CSS linter config for Tailwind directives
├── public/                 # Static assets & favicon
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

## 👤 Author

**Vijayapandian T**  
FSD Intern
