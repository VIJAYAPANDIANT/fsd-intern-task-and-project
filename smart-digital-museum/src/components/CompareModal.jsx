import React from 'react';

export default function CompareModal({ isOpen, artifacts = [], onClose, onRemoveItem, onClear }) {
    if (!isOpen || artifacts.length === 0) return null;

    return (
        <div id="compare-modal" className="modal active fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex justify-center items-center p-4 overflow-y-auto" onClick={onClose}>
            <div className="modal-content compare-modal-content relative bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-6 md:p-8 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 dark:border-neutral-700" onClick={(e) => e.stopPropagation()}>
                <button
                    id="close-compare-modal"
                    className="close-button absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-white text-xl font-bold p-1 leading-none focus:outline-none"
                    aria-label="Close comparison modal"
                    title="Close modal"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl md:text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-2">⚖️ Compare Artifacts</h2>

                <div className="compare-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {artifacts.map((item) => (
                        <div key={item.id} className="compare-card border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl p-4 flex flex-col justify-between">
                            <div>
                                <img src={item.image} alt={item.name} className="w-full h-44 object-cover rounded-lg mb-3 shadow-sm" />
                                <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 mb-2">{item.name}</h3>
                                <div className="compare-detail text-xs md:text-sm my-1 text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Category:</strong> {item.category}</div>
                                <div className="compare-detail text-xs md:text-sm my-1 text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Period:</strong> {item.period}</div>
                                <div className="compare-detail text-xs md:text-sm my-1 text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Year:</strong> {item.year}</div>
                                <div className="compare-detail text-xs md:text-sm my-1 text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Creator:</strong> {item.creator}</div>
                                <div className="compare-detail text-xs md:text-sm my-1 text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Description:</strong> {item.description}</div>
                            </div>
                            <button
                                className="mt-4 w-full py-2 px-3 bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-semibold rounded-lg text-xs transition-colors duration-200"
                                onClick={() => onRemoveItem && onRemoveItem(item.id)}
                            >
                                ❌ Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
                    <button className="clear-btn px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-sm font-semibold transition-colors duration-200" onClick={onClear}>
                        Clear Comparison
                    </button>
                </div>
            </div>
        </div>
    );
}
