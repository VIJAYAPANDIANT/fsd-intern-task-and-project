import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ArtifactList from './components/ArtifactList';
import Museum from './components/Museum';
import Favorites from './components/Favorites';
import RecentlyViewed from './components/RecentlyViewed';
import ArtifactModal from './components/ArtifactModal';
import Footer from './components/Footer';
import { artifacts } from './data/artifacts';

export default function App() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
    <div>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <ArtifactList
          artifacts={artifacts}
          favorites={favorites}
          onFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
        />
        <Museum />
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
        />
        <RecentlyViewed
          recentlyViewed={recentlyViewed}
          favorites={favorites}
          onFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
        />
      </main>
      <ArtifactModal artifact={selectedArtifact} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
}
