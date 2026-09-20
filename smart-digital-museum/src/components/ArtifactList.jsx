import React from 'react';
import ArtifactCard from './ArtifactCard';

export default function ArtifactList({ artifacts = [] }) {
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
                    aria-label="Search artifacts"
                    title="Search artifacts"
                />
                <button id="search-button" aria-label="Search button">
                    🔍 Search
                </button>
            </div>

            {/* FILTERS */}
            <div className="filters">
                <select id="category-filter" aria-label="Filter by category" title="Filter by category">
                    <option value="all">All Categories</option>
                    <option value="Ancient Artifacts">Ancient Artifacts</option>
                    <option value="Famous Artworks">Famous Artworks</option>
                    <option value="Great Inventions">Great Inventions</option>
                    <option value="Cultural Heritage">Cultural Heritage</option>
                </select>

                <select id="period-filter" aria-label="Filter by period" title="Filter by period">
                    <option value="all">All Periods</option>
                    <option value="Ancient">Ancient</option>
                    <option value="Medieval">Medieval</option>
                    <option value="Renaissance">Renaissance</option>
                    <option value="Industrial">Industrial</option>
                </select>

                <select id="sort-select" aria-label="Sort artifacts" title="Sort artifacts">
                    <option value="default">Sort By</option>
                    <option value="year-asc">Oldest</option>
                    <option value="year-desc">Newest</option>
                    <option value="popularity">Most Popular</option>
                    <option value="name">Name A-Z</option>
                </select>

                <button id="clear-filters" className="clear-filters-btn" aria-label="Clear all search filters and sorting" title="Clear filters">
                    🔄 Clear Filters
                </button>
            </div>

            {/* ARTIFACT CARDS CONTAINER */}
            <div id="artifact-container" className="artifact-container">
                {artifacts.map((artifact) => (
                    <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
            </div>
        </section>
    );
}
