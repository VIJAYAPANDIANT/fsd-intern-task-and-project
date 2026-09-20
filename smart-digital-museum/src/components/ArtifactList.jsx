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
        <section id="explore" className="explore">
            <div className="section-heading">
                <p>OUR COLLECTION</p>
                <h2>Explore Artifacts</h2>
            </div>

            {/* SEARCH */}
            <div className="search-container">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search artifacts, creators or keywords..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    aria-label="Search artifacts"
                    title="Search artifacts"
                />
                <button id="search-button" aria-label="Search button">
                    🔍 Search
                </button>
            </div>

            {/* FILTERS */}
            <div className="filters">
                <select
                    id="category-filter"
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
                    className="clear-filters-btn"
                    onClick={handleClearFilters}
                    aria-label="Clear all search filters and sorting"
                    title="Clear filters"
                >
                    🔄 Clear Filters
                </button>
            </div>

            {/* ARTIFACT CARDS CONTAINER */}
            <div id="artifact-container" className="artifact-container">
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
                    <div className="empty-message">
                        <p>No artifacts found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
