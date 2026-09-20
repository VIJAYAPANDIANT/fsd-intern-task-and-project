import React from 'react';
import ArtifactCard from './ArtifactCard';

export default function RecentlyViewed({ recentlyViewed = [], favorites = [], onFavorite, compareList = [], onCompare, onViewDetails }) {
    return (
        <section id="recent" className="recent py-12 md:py-16 px-4 md:px-[5%] max-w-7xl mx-auto">
            <div className="section-heading text-center mb-8 md:mb-10">
                <p className="text-xs md:text-sm font-semibold tracking-wider text-amber-500 uppercase">YOUR JOURNEY</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 text-neutral-900 dark:text-neutral-100">🕐 Recently Viewed</h2>
            </div>

            <div id="recent-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyViewed.length === 0 ? (
                    <p className="empty-message col-span-full text-center py-12 text-neutral-500 dark:text-neutral-400 text-base">You haven't viewed any artifacts yet.</p>
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
