import React from 'react';

export default function Categories() {
    return (
        <section className="categories">
            <div className="section-heading">
                <p>EXPLORE COLLECTIONS</p>
                <h2>Discover Different Worlds</h2>
            </div>

            <div className="category-container">
                <article className="category-card">
                    <div className="category-icon">🏺</div>
                    <h3>Ancient Artifacts</h3>
                    <p>Explore objects from ancient civilizations.</p>
                </article>

                <article className="category-card">
                    <div className="category-icon">🎨</div>
                    <h3>Famous Artworks</h3>
                    <p>Discover paintings and artistic masterpieces.</p>
                </article>

                <article className="category-card">
                    <div className="category-icon">⚙️</div>
                    <h3>Great Inventions</h3>
                    <p>Explore inventions that changed the world.</p>
                </article>

                <article className="category-card">
                    <div className="category-icon">🏛️</div>
                    <h3>Cultural Heritage</h3>
                    <p>Discover traditions and cultural treasures.</p>
                </article>
            </div>
        </section>
    );
}
