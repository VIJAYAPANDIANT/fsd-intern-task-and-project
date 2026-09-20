import React from 'react';
import ArtifactCard from './ArtifactCard';

export default function RecentlyViewed({ recentlyViewed = [], favorites = [], onFavorite, compareList = [], onCompare, onViewDetails }) {
    return (
        <section id="recent" className="recent">
            <div className="section-heading">
                <p>YOUR JOURNEY</p>
                <h2>🕐 Recently Viewed</h2>
            </div>

            <div id="recent-container" className={recentlyViewed.length > 0 ? 'artifact-grid-layout' : ''}>
                {recentlyViewed.length === 0 ? (
                    <p className="empty-message">You haven't viewed any artifacts yet.</p>
                ) : (
                    recentlyViewed.map((artifact) => {
                        const isFavorite = favorites.some((fav) => fav.id === artifact.id);
                        const isCompared = compareList.some((comp) => comp.id === artifact.id);
                        return (
                            <ArtifactCard
                                key={artifact.id}
                                artifact={artifact}
                                isFavorite={isFavorite}
                                onFavorite={onFavorite}
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
