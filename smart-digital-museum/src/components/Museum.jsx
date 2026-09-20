import React from 'react';

export default function Museum({ onRoomSelect }) {
    return (
        <section id="museum" className="museum py-12 md:py-16 px-4 md:px-[5%] bg-neutral-900 text-white dark:bg-neutral-950 border-y border-neutral-800">
            <div className="section-heading text-center mb-10 max-w-2xl mx-auto">
                <p className="text-xs md:text-sm font-semibold tracking-wider text-amber-400 uppercase">VIRTUAL EXPERIENCE</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 mb-2">Enter the Virtual Museum</h2>
                <p className="text-neutral-400 text-sm">
                    Explore different rooms and discover collections from different periods.
                </p>
            </div>

            <div className="museum-rooms grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <article className="museum-room bg-neutral-800 p-6 text-center rounded-xl border border-neutral-700/60 hover:-translate-y-1 hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between items-center h-full">
                    <div>
                        <span className="text-4xl mb-3 block">🏺</span>
                        <h3 className="text-lg font-bold text-white mb-1">Ancient World</h3>
                        <p className="text-xs text-neutral-400 mb-4">Ancient civilizations and artifacts</p>
                    </div>
                    <button
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold rounded-lg text-xs uppercase tracking-wide transition-transform duration-200 hover:scale-105"
                        onClick={() => onRoomSelect && onRoomSelect('Ancient Artifacts')}
                    >
                        Enter Room
                    </button>
                </article>

                <article className="museum-room bg-neutral-800 p-6 text-center rounded-xl border border-neutral-700/60 hover:-translate-y-1 hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between items-center h-full">
                    <div>
                        <span className="text-4xl mb-3 block">🎨</span>
                        <h3 className="text-lg font-bold text-white mb-1">Art Gallery</h3>
                        <p className="text-xs text-neutral-400 mb-4">Famous paintings and artworks</p>
                    </div>
                    <button
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold rounded-lg text-xs uppercase tracking-wide transition-transform duration-200 hover:scale-105"
                        onClick={() => onRoomSelect && onRoomSelect('Famous Artworks')}
                    >
                        Enter Room
                    </button>
                </article>

                <article className="museum-room bg-neutral-800 p-6 text-center rounded-xl border border-neutral-700/60 hover:-translate-y-1 hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between items-center h-full">
                    <div>
                        <span className="text-4xl mb-3 block">⚙️</span>
                        <h3 className="text-lg font-bold text-white mb-1">Inventions</h3>
                        <p className="text-xs text-neutral-400 mb-4">Discover inventions that changed humanity</p>
                    </div>
                    <button
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold rounded-lg text-xs uppercase tracking-wide transition-transform duration-200 hover:scale-105"
                        onClick={() => onRoomSelect && onRoomSelect('Great Inventions')}
                    >
                        Enter Room
                    </button>
                </article>

                <article className="museum-room bg-neutral-800 p-6 text-center rounded-xl border border-neutral-700/60 hover:-translate-y-1 hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between items-center h-full">
                    <div>
                        <span className="text-4xl mb-3 block">🇮🇳</span>
                        <h3 className="text-lg font-bold text-white mb-1">Cultural Heritage</h3>
                        <p className="text-xs text-neutral-400 mb-4">Explore cultural treasures</p>
                    </div>
                    <button
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold rounded-lg text-xs uppercase tracking-wide transition-transform duration-200 hover:scale-105"
                        onClick={() => onRoomSelect && onRoomSelect('Cultural Heritage')}
                    >
                        Enter Room
                    </button>
                </article>
            </div>
        </section>
    );
}
