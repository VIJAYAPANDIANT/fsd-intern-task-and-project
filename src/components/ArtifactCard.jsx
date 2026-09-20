import React from 'react';

export default function ArtifactCard({ artifact, onViewDetails, onFavorite, isFavorite = false }) {
    if (!artifact) return null;

    return (
        <div className="artifact-card">
            <img src={artifact.image} alt={artifact.name} />
            <div className="artifact-card-content">
                <div>
                    <h3>{artifact.name}</h3>
                    <p>{artifact.category}</p>
                    <p>{artifact.year}</p>
                </div>

                <div className="artifact-card-buttons">
                    <button className="btn-details" onClick={() => onViewDetails && onViewDetails(artifact)}>
                        View Details
                    </button>
                    <div className="row-buttons">
                        <button
                            className={`btn-fav ${isFavorite ? 'active' : ''}`}
                            onClick={() => onFavorite && onFavorite(artifact)}
                        >
                            {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
