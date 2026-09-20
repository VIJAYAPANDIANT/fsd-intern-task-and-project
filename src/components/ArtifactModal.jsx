import React from 'react';

export default function ArtifactModal({ artifact, isOpen = false, onClose }) {
    if (!isOpen || !artifact) return null;

    return (
        <div id="artifact-modal" className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    id="close-modal"
                    className="close-button"
                    aria-label="Close details modal"
                    title="Close modal"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div id="modal-content">
                    <img src={artifact.image} alt={artifact.name} />
                    <h2>{artifact.name}</h2>
                    <p><strong>Category:</strong> {artifact.category}</p>
                    <p><strong>Period:</strong> {artifact.period}</p>
                    <p><strong>Year:</strong> {artifact.year}</p>
                    <p><strong>Creator:</strong> {artifact.creator}</p>
                    <p>{artifact.description}</p>
                </div>
            </div>
        </div>
    );
}
