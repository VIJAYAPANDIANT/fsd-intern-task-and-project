import React from 'react';
import ArtifactCard from './ArtifactCard';

export default function Favorites({ favorites = [], onRemoveFavorite, compareList = [], onCompare, onViewDetails }) {
    return (
        <section id="favorites" className="favorites">
            <div className="section-heading">
                <p>YOUR COLLECTION</p>
                <h2>❤️ Favorite Artifacts</h2>
            </div>

            <div id="favorites-container" className={favorites.length > 0 ? 'artifact-grid-layout' : ''}>
                {favorites.length === 0 ? (
                    <p className="empty-message">No favorite artifacts yet.</p>
                ) : (
                    favorites.map((artifact) => {
                        const isCompared = compareList.some((comp) => comp.id === artifact.id);
                        return (
                            <ArtifactCard
                                key={artifact.id}
                                artifact={artifact}
                                isFavorite={true}
                                onFavorite={onRemoveFavorite}
                                isCompared={isCompared}
                                onCompare={onCompare}
                                onViewDetails={onViewDetails}
                            />
                        );
                    })
                )}
            </div>
        </section>
    );
}
