import React from 'react';

export default function ArtifactModal({ artifact, onClose }) {
    if (!artifact) return null;

    return (
        <div id="artifact-modal" className="modal active fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex justify-center items-center p-4 overflow-y-auto" onClick={onClose}>
            <div className="modal-content relative bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-6 md:p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 dark:border-neutral-700" onClick={(e) => e.stopPropagation()}>
                <button
                    id="close-modal"
                    className="close-button absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-white text-xl font-bold p-1 leading-none focus:outline-none"
                    aria-label="Close details modal"
                    title="Close modal"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div id="modal-content" className="space-y-2">
                    <img src={artifact.image} alt={artifact.name} className="w-full h-64 md:h-72 object-cover rounded-xl mb-5 shadow-md" />
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">{artifact.name}</h2>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Category:</strong> {artifact.category}</p>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Period:</strong> {artifact.period}</p>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Year:</strong> {artifact.year}</p>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300"><strong className="text-neutral-900 dark:text-neutral-100">Creator:</strong> {artifact.creator}</p>
                    <p className="text-sm md:text-base mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 leading-relaxed">{artifact.description}</p>
                </div>
            </div>
        </div>
    );
}
