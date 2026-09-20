import React from 'react';
import ArtifactCard from './ArtifactCard';

export default function Favorites({ favorites = [], onRemoveFavorite, compareList = [], onCompare, onViewDetails }) {
    return (
        <section id="favorites" className="favorites py-12 md:py-16 px-4 md:px-[5%] max-w-7xl mx-auto">
            <div className="section-heading text-center mb-8 md:mb-10">
                <p className="text-xs md:text-sm font-semibold tracking-wider text-amber-500 uppercase">YOUR COLLECTION</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 text-neutral-900 dark:text-neutral-100">❤️ Favorite Artifacts</h2>
            </div>

            <div id="favorites-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favorites.length === 0 ? (
                    <p className="empty-message col-span-full text-center py-12 text-neutral-500 dark:text-neutral-400 text-base">No favorite artifacts yet.</p>
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
