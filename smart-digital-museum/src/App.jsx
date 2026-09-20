import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ArtifactList from './components/ArtifactList';
import Museum from './components/Museum';
import Favorites from './components/Favorites';
import RecentlyViewed from './components/RecentlyViewed';
import ArtifactModal from './components/ArtifactModal';
import CompareModal from './components/CompareModal';
import Footer from './components/Footer';
import { artifacts } from './data/artifacts';

// Helper functions to load initial persistent state from LocalStorage
const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('museum-favorites');
  if (savedFavorites) {
    try {
      return JSON.parse(savedFavorites);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const loadRecentlyViewed = () => {
  const savedRecent = localStorage.getItem('museum-recent');
  if (savedRecent) {
    try {
      return JSON.parse(savedRecent);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('museum-theme');
  return savedTheme === 'dark';
};

export default function App() {
  const [darkMode, setDarkMode] = useState(loadTheme);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState(loadRecentlyViewed);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleRoomSelect = (categoryName) => {
    setSelectedCategory(categoryName);
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Persist Favorites
  useEffect(() => {
    localStorage.setItem('museum-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 2. Persist Recently Viewed
  useEffect(() => {
    localStorage.setItem('museum-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // 3. Persist Theme & apply body class
  useEffect(() => {
    localStorage.setItem('museum-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const handleToggleFavorite = (artifact) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((item) => item.id === artifact.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter((item) => item.id !== artifact.id);
      } else {
        return [...prevFavorites, artifact];
      }
    });
  };

  const handleToggleCompare = (artifact) => {
    const isAlreadyCompared = compareList.some((item) => item.id === artifact.id);

    if (isAlreadyCompared) {
      const updatedList = compareList.filter((item) => item.id !== artifact.id);
      setCompareList(updatedList);
      if (updatedList.length < 2) {
        setIsCompareOpen(false);
      }
    } else {
      if (compareList.length >= 2) {
        alert('You can compare only 2 artifacts.');
        return;
      }
      setCompareList([...compareList, artifact]);
    }
  };

  const handleRemoveFromCompare = (artifactId) => {
    const updatedList = compareList.filter((item) => item.id !== artifactId);
    setCompareList(updatedList);
    if (updatedList.length < 2) {
      setIsCompareOpen(false);
    }
  };

  const handleClearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  const handleViewDetails = (artifact) => {
    setSelectedArtifact(artifact);

    setRecentlyViewed((prev) => [
      artifact,
      ...prev.filter((item) => item.id !== artifact.id)
    ]);
  };

  const handleCloseModal = () => {
    setSelectedArtifact(null);
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <Categories />
        <ArtifactList
          artifacts={artifacts}
          favorites={favorites}
          onFavorite={handleToggleFavorite}
          compareList={compareList}
          onCompare={handleToggleCompare}
          onViewDetails={handleViewDetails}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <Museum onRoomSelect={handleRoomSelect} />
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleToggleFavorite}
          compareList={compareList}
          onCompare={handleToggleCompare}
          onViewDetails={handleViewDetails}
        />
        <RecentlyViewed
          recentlyViewed={recentlyViewed}
          favorites={favorites}
          onFavorite={handleToggleFavorite}
          compareList={compareList}
          onCompare={handleToggleCompare}
          onViewDetails={handleViewDetails}
        />
      </main>

      {/* FLOATING COMPARE BAR */}
      {compareList.length > 0 && (
        <div id="compare-bar" className="compare-bar active">
          <span id="compare-count">⚖️ Selected {compareList.length}/2 items to compare</span>
          <div className="compare-actions">
            {compareList.length === 2 && (
              <button
                id="open-compare-btn"
                className="compare-btn"
                onClick={() => setIsCompareOpen(true)}
              >
                Compare Now
              </button>
            )}
            <button
              id="clear-compare-btn"
              className="clear-btn"
              onClick={handleClearCompare}
            >
              Clear Comparison
            </button>
          </div>
        </div>
      )}

      <ArtifactModal artifact={selectedArtifact} onClose={handleCloseModal} />
      <CompareModal
        isOpen={isCompareOpen}
        artifacts={compareList}
        onClose={() => setIsCompareOpen(false)}
        onRemoveItem={handleRemoveFromCompare}
        onClear={handleClearCompare}
      />
      <Footer />
    </div>
  );
}
