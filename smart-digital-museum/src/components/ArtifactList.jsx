import React, { useState } from 'react';
import ArtifactCard from './ArtifactCard';

export default function ArtifactList({
    artifacts = [],
    favorites = [],
    onFavorite,
    compareList = [],
    onCompare,
    onViewDetails,
    selectedCategory: propCategory,
    onCategoryChange
}) {
    const [searchText, setSearchText] = useState('');
    const [internalCategory, setInternalCategory] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [selectedSort, setSelectedSort] = useState('default');

    const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;

    const handleCategoryChange = (category) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        } else {
            setInternalCategory(category);
        }
    };

    // 1. Filter artifacts based on Search, Category, and Period
    const filteredArtifacts = artifacts.filter((artifact) => {
        const query = searchText.trim().toLowerCase();

        const matchesSearch =
            !query ||
            artifact.name.toLowerCase().includes(query) ||
            artifact.creator.toLowerCase().includes(query) ||
            artifact.category.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === 'all' || artifact.category === selectedCategory;

        const matchesPeriod =
            selectedPeriod === 'all' || artifact.period === selectedPeriod;

        return matchesSearch && matchesCategory && matchesPeriod;
    });

    // 2. Sort the filtered artifacts
    const sortedArtifacts = [...filteredArtifacts].sort((a, b) => {
        if (selectedSort === 'year-asc') {
            return a.year - b.year;
        }
        if (selectedSort === 'year-desc') {
            return b.year - a.year;
        }
        if (selectedSort === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const handleClearFilters = () => {
        setSearchText('');
        handleCategoryChange('all');
        setSelectedPeriod('all');
        setSelectedSort('default');
    };

    return (
        <section id="explore" className="explore py-12 md:py-16 px-4 md:px-[5%] max-w-7xl mx-auto">
            <div className="section-heading text-center mb-8">
                <p className="text-xs md:text-sm font-semibold tracking-wider text-amber-500 uppercase">OUR COLLECTION</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 text-neutral-900 dark:text-neutral-100">Explore Artifacts</h2>
            </div>

            {/* SEARCH */}
            <div className="search-container flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 max-w-2xl mx-auto">
                <input
                    type="text"
                    id="search-input"
                    className="w-full sm:w-[70%] p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Search artifacts, creators or keywords..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    aria-label="Search artifacts"
                    title="Search artifacts"
                />
                <button
                    id="search-button"
                    className="w-full sm:w-auto px-5 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-400 dark:hover:bg-amber-500 text-white dark:text-neutral-900 font-bold rounded-lg text-sm transition-colors duration-200"
                    aria-label="Search button"
                >
                    🔍 Search
                </button>
            </div>

            {/* FILTERS */}
            <div className="filters flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch sm:items-center gap-3 mb-10">
                <select
                    id="category-filter"
                    className="p-2.5 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    aria-label="Filter by category"
                    title="Filter by category"
                >
                    <option value="all">All Categories</option>
                    <option value="Ancient Artifacts">Ancient Artifacts</option>
                    <option value="Famous Artworks">Famous Artworks</option>
                    <option value="Great Inventions">Great Inventions</option>
                    <option value="Cultural Heritage">Cultural Heritage</option>
                </select>

                <select
                    id="period-filter"
                    className="p-2.5 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    aria-label="Filter by period"
                    title="Filter by period"
                >
                    <option value="all">All Periods</option>
                    <option value="Ancient">Ancient</option>
                    <option value="Renaissance">Renaissance</option>
                    <option value="Medieval">Medieval</option>
                    <option value="Industrial">Industrial</option>
                </select>

                <select
                    id="sort-select"
                    className="p-2.5 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    aria-label="Sort artifacts"
                    title="Sort artifacts"
                >
                    <option value="default">Default</option>
                    <option value="year-asc">Oldest</option>
                    <option value="year-desc">Newest</option>
                    <option value="name">Name A-Z</option>
                </select>

                <button
                    id="clear-filters"
                    className="clear-filters-btn px-4 py-2.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm font-semibold transition-colors duration-200"
                    onClick={handleClearFilters}
                    aria-label="Clear all search filters and sorting"
                    title="Clear filters"
                >
                    🔄 Clear Filters
                </button>
            </div>

            {/* ARTIFACT CARDS CONTAINER */}
            <div id="artifact-container" className="artifact-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedArtifacts.length > 0 ? (
                    sortedArtifacts.map((artifact) => {
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
                ) : (
                    <div className="empty-message col-span-full text-center py-12 text-neutral-500 dark:text-neutral-400 text-base">
                        <p>No artifacts found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
