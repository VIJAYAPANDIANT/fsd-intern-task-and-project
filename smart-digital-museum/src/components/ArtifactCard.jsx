import React from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80';

export default function ArtifactCard({
    artifact,
    onViewDetails,
    onFavorite,
    isFavorite = false,
    onCompare,
    isCompared = false
}) {
    if (!artifact) return null;

    const formattedYear = artifact.year < 0
        ? `${Math.abs(artifact.year)} BCE`
        : `${artifact.year} CE`;

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = FALLBACK_IMAGE;
    };

    return (
        <div className="artifact-card bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-700/60 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 flex flex-col h-full">
            <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                <img
                    src={artifact.image}
                    alt={artifact.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-amber-300 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md shadow-sm border border-amber-500/40">
                    📅 {formattedYear}
                </span>
            </div>
            <div className="artifact-card-content p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-base md:text-lg text-neutral-900 dark:text-neutral-100 mb-1 leading-snug line-clamp-1">{artifact.name}</h3>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">{artifact.category}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Period: {artifact.period} • Year: {formattedYear}</p>
                </div>

                <div className="artifact-card-buttons mt-4 space-y-2">
                    <button
                        className="btn-details w-full py-2 px-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs font-semibold rounded-lg transition-colors duration-200"
                        onClick={() => onViewDetails && onViewDetails(artifact)}
                    >
                        View Details
                    </button>
                    <div className="row-buttons flex gap-2">
                        <button
                            className={`btn-fav flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                                isFavorite
                                    ? 'active bg-red-500 text-white border-red-500 hover:bg-red-600'
                                    : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900'
                            }`}
                            onClick={() => onFavorite && onFavorite(artifact)}
                        >
                            {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
                        </button>
                        <button
                            className={`btn-compare flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                                isCompared
                                    ? 'active bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                    : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900'
                            }`}
                            onClick={() => onCompare && onCompare(artifact)}
                        >
                            {isCompared ? '⚖️ Compared' : '⚖️ Compare'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
