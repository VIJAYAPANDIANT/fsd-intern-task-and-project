import React from 'react';

export default function CompareModal({ isOpen, artifacts = [], onClose, onRemoveItem, onClear }) {
    if (!isOpen || artifacts.length === 0) return null;

    return (
        <div id="compare-modal" className="modal active" onClick={onClose}>
            <div className="modal-content compare-modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    id="close-compare-modal"
                    className="close-button"
                    aria-label="Close comparison modal"
                    title="Close modal"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2>⚖️ Compare Artifacts</h2>

                <div className="compare-grid">
                    {artifacts.map((item) => (
                        <div key={item.id} className="compare-card">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <div className="compare-detail"><strong>Category:</strong> {item.category}</div>
                            <div className="compare-detail"><strong>Period:</strong> {item.period}</div>
                            <div className="compare-detail"><strong>Year:</strong> {item.year}</div>
                            <div className="compare-detail"><strong>Creator:</strong> {item.creator}</div>
                            <div className="compare-detail"><strong>Description:</strong> {item.description}</div>
                            <button
                                className="btn-fav"
                                style={{ marginTop: '12px', width: '100%' }}
                                onClick={() => onRemoveItem && onRemoveItem(item.id)}
                            >
                                ❌ Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button className="clear-btn" onClick={onClear}>
                        Clear Comparison
                    </button>
                </div>
            </div>
        </div>
    );
}
