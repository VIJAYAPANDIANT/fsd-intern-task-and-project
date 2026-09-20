import React from 'react';

export default function Navbar({ darkMode, setDarkMode }) {
    return (
        <header className="navbar">
            <div className="logo">
                🏛️ Smart Museum
            </div>

            <nav className="nav-links">
                <a href="#home">Home</a>
                <a href="#explore">Explore</a>
                <a href="#museum">Museum</a>
                <a href="#favorites">Favorites</a>
                <a href="#recent">Recently Viewed</a>
            </nav>

            <button
                id="theme-toggle"
                aria-label="Toggle theme"
                title="Toggle theme"
                onClick={() => setDarkMode && setDarkMode(!darkMode)}
            >
                {darkMode ? "☀️" : "🌙"}
            </button>
        </header>
    );
}
