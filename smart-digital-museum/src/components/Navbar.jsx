import React from 'react';

export default function Navbar({ darkMode, setDarkMode }) {
    return (
        <header className="navbar flex justify-between items-center px-4 md:px-[5%] py-4 bg-neutral-900 text-white transition-colors duration-300 dark:bg-neutral-950 border-b border-neutral-800">
            <div className="logo text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2">
                🏛️ Smart Museum
            </div>

            <nav className="nav-links hidden sm:flex items-center space-x-6 text-sm md:text-base">
                <a href="#home" className="hover:text-amber-400 transition-colors duration-200">Home</a>
                <a href="#explore" className="hover:text-amber-400 transition-colors duration-200">Explore</a>
                <a href="#museum" className="hover:text-amber-400 transition-colors duration-200">Museum</a>
                <a href="#favorites" className="hover:text-amber-400 transition-colors duration-200">Favorites</a>
                <a href="#recent" className="hover:text-amber-400 transition-colors duration-200">Recently Viewed</a>
            </nav>

            <button
                id="theme-toggle"
                className="p-2 text-xl hover:scale-110 transition-transform duration-200 focus:outline-none"
                aria-label="Toggle theme"
                title="Toggle theme"
                onClick={() => setDarkMode && setDarkMode(!darkMode)}
            >
                {darkMode ? "☀️" : "🌙"}
            </button>
        </header>
    );
}
