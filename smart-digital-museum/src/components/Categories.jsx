import React from 'react';

export default function Categories() {
    return (
        <section className="categories py-12 md:py-16 px-4 md:px-[5%] max-w-7xl mx-auto">
            <div className="section-heading text-center mb-8 md:mb-10">
                <p className="text-xs md:text-sm font-semibold tracking-wider text-amber-500 uppercase">EXPLORE COLLECTIONS</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 text-neutral-900 dark:text-neutral-100">Discover Different Worlds</h2>
            </div>

            <div className="category-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="category-card bg-white dark:bg-neutral-800 p-6 text-center rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer">
                    <div className="category-icon text-4xl mb-3">🏺</div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Ancient Artifacts</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Explore objects from ancient civilizations.</p>
                </article>

                <article className="category-card bg-white dark:bg-neutral-800 p-6 text-center rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer">
                    <div className="category-icon text-4xl mb-3">🎨</div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Famous Artworks</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Discover paintings and artistic masterpieces.</p>
                </article>

                <article className="category-card bg-white dark:bg-neutral-800 p-6 text-center rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer">
                    <div className="category-icon text-4xl mb-3">⚙️</div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Great Inventions</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Explore inventions that changed the world.</p>
                </article>

                <article className="category-card bg-white dark:bg-neutral-800 p-6 text-center rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer">
                    <div className="category-icon text-4xl mb-3">🏛️</div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Cultural Heritage</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Discover traditions and cultural treasures.</p>
                </article>
            </div>
        </section>
    );
}
