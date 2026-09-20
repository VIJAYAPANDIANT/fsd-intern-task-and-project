import React from 'react';
import ArtifactCard from './ArtifactCard';

export default function RecentlyViewed({ recentlyViewed = [], onViewDetails }) {
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
                    recentlyViewed.map((artifact) => (
                        <ArtifactCard
                            key={artifact.id}
                            artifact={artifact}
                            onViewDetails={onViewDetails}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
