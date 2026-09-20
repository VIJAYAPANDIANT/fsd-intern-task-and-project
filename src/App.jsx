import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ArtifactList from './components/ArtifactList';
import Museum from './components/Museum';
import Favorites from './components/Favorites';
import RecentlyViewed from './components/RecentlyViewed';
import Footer from './components/Footer';
import { artifacts } from './data/artifacts';

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <ArtifactList artifacts={artifacts} />
        <Museum />
        <Favorites favorites={[]} />
        <RecentlyViewed recentlyViewed={[]} />
      </main>
      <Footer />
    </div>
  );
}
