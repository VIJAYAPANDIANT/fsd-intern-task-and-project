/* Artifact Data */

const artifacts = [
    {
        id: 1,
        name: "Rosetta Stone",
        category: "Ancient Artifacts",
        period: "Ancient",
        year: 196,
        creator: "Ancient Egyptians",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65",
        description: "An ancient stone containing inscriptions in three scripts."
    },
    {
        id: 2,
        name: "Mona Lisa",
        category: "Famous Artworks",
        period: "Renaissance",
        year: 1503,
        creator: "Leonardo da Vinci",
        image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08",
        description: "One of the most famous paintings in the history of art."
    },
    {
        id: 3,
        name: "Steam Engine",
        category: "Great Inventions",
        period: "Industrial",
        year: 1712,
        creator: "Thomas Newcomen",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
        description: "An important invention that helped drive the Industrial Revolution."
    },
    {
        id: 4,
        name: "Indian Temple Sculpture",
        category: "Cultural Heritage",
        period: "Medieval",
        year: 1200,
        creator: "Indian Artists",
        image: "https://images.unsplash.com/photo-1600100397608-f010ad5e8e3b",
        description: "A traditional sculpture representing Indian cultural heritage."
    }
];

/* Theme Toggle & LocalStorage */

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme preference on page load
const savedTheme = localStorage.getItem("museum_theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeToggle) themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("museum_theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("museum_theme", "light");
    }
});

/* 2. Compare Artifacts State */

let compareList = [];

function toggleCompare(id) {
    const index = compareList.indexOf(id);
    if (index > -1) {
        compareList.splice(index, 1);
    } else {
        if (compareList.length >= 2) {
            alert("You can only compare up to 2 artifacts at a time. Clear or remove one to compare another.");
            return;
        }
        compareList.push(id);
    }
    updateCompareUI();
    filterAndSortArtifacts();
    displayFavorites();
    displayRecentlyViewed();
}

function clearCompare() {
    compareList = [];
    updateCompareUI();
    filterAndSortArtifacts();
    displayFavorites();
    displayRecentlyViewed();
}

function updateCompareUI() {
    const compareBar = document.getElementById("compare-bar");
    const compareCount = document.getElementById("compare-count");

    if (!compareBar || !compareCount) return;

    if (compareList.length > 0) {
        compareBar.classList.add("active");
        compareCount.textContent = `⚖️ Selected ${compareList.length}/2 items to compare`;
    } else {
        compareBar.classList.remove("active");
    }
}

const compareModal = document.getElementById("compare-modal");
const closeCompareModal = document.getElementById("close-compare-modal");
const compareContainer = document.getElementById("compare-container");

function openCompareModal() {
    if (compareList.length < 2) {
        alert("Please select 2 artifacts to compare side-by-side.");
        return;
    }

    const item1 = artifacts.find(a => a.id === compareList[0]);
    const item2 = artifacts.find(a => a.id === compareList[1]);

    if (!item1 || !item2) return;

    compareContainer.innerHTML = `
        <div class="compare-card">
            <img src="${item1.image}" alt="${item1.name}">
            <h3>${item1.name}</h3>
            <div class="compare-detail"><strong>Category:</strong> ${item1.category}</div>
            <div class="compare-detail"><strong>Period:</strong> ${item1.period}</div>
            <div class="compare-detail"><strong>Year:</strong> ${item1.year}</div>
            <div class="compare-detail"><strong>Creator:</strong> ${item1.creator}</div>
            <div class="compare-detail"><strong>Description:</strong> ${item1.description}</div>
        </div>
        <div class="compare-card">
            <img src="${item2.image}" alt="${item2.name}">
            <h3>${item2.name}</h3>
            <div class="compare-detail"><strong>Category:</strong> ${item2.category}</div>
            <div class="compare-detail"><strong>Period:</strong> ${item2.period}</div>
            <div class="compare-detail"><strong>Year:</strong> ${item2.year}</div>
            <div class="compare-detail"><strong>Creator:</strong> ${item2.creator}</div>
            <div class="compare-detail"><strong>Description:</strong> ${item2.description}</div>
        </div>
    `;

    if (compareModal) compareModal.classList.add("active");
}

if (closeCompareModal) {
    closeCompareModal.addEventListener("click", () => {
        compareModal.classList.remove("active");
    });
}

if (compareModal) {
    compareModal.addEventListener("click", (e) => {
        if (e.target === compareModal) {
            compareModal.classList.remove("active");
        }
    });
}

/* 3. Display Artifacts Helper */

const artifactContainer = document.getElementById("artifact-container");

function createCardHTML(artifact) {
    const isFav = favorites.some(item => item.id === artifact.id);
    const isComp = compareList.includes(artifact.id);

    return `
        <div class="artifact-card">
            <img src="${artifact.image}" alt="${artifact.name}">
            <div class="artifact-card-content">
                <div>
                    <h3>${artifact.name}</h3>
                    <p>${artifact.category}</p>
                    <p>${artifact.year}</p>
                </div>
                <div class="artifact-card-buttons">
                    <button class="btn-details" onclick="openArtifact(${artifact.id})">
                        View Details
                    </button>
                    <div class="row-buttons">
                        <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(${artifact.id})">
                            ${isFav ? '❤️ Saved' : '🤍 Favorite'}
                        </button>
                        <button class="btn-compare ${isComp ? 'active' : ''}" onclick="toggleCompare(${artifact.id})">
                            ${isComp ? '⚖️ Added' : '⚖️ Compare'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayArtifacts(data) {
    if (!artifactContainer) return;

    if (!data || data.length === 0) {
        artifactContainer.innerHTML = `
            <div class="empty-message">
                <p>🔍 No artifacts found matching your search or filters.</p>
            </div>
        `;
        return;
    }

    artifactContainer.innerHTML = "";
    data.forEach(artifact => {
        const cardWrapper = document.createElement("div");
        cardWrapper.innerHTML = createCardHTML(artifact);
        artifactContainer.appendChild(cardWrapper.firstElementChild);
    });
}

/* 4. Favorites State & LocalStorage */

let favorites = JSON.parse(localStorage.getItem("museum_favorites")) || [];
const favoritesContainer = document.getElementById("favorites-container");

function saveFavorites() {
    localStorage.setItem("museum_favorites", JSON.stringify(favorites));
}

function addToFavorites(id) {
    const artifact = artifacts.find(item => item.id === id);
    if (artifact && !favorites.some(item => item.id === id)) {
        favorites.push(artifact);
        saveFavorites();
    }
    displayFavorites();
    filterAndSortArtifacts();
}

function removeFromFavorites(id) {
    favorites = favorites.filter(item => item.id !== id);
    saveFavorites();
    displayFavorites();
    filterAndSortArtifacts();
}

function toggleFavorite(id) {
    if (favorites.some(item => item.id === id)) {
        removeFromFavorites(id);
    } else {
        addToFavorites(id);
    }
}

function displayFavorites() {
    if (!favoritesContainer) return;

    if (favorites.length === 0) {
        favoritesContainer.className = "";
        favoritesContainer.innerHTML = `
            <p class="empty-message">No favorite artifacts yet.</p>
        `;
        return;
    }

    favoritesContainer.className = "artifact-grid-layout";
    favoritesContainer.innerHTML = "";

    favorites.forEach(artifact => {
        const isComp = compareList.includes(artifact.id);
        const card = document.createElement("div");
        card.className = "artifact-card";
        card.innerHTML = `
            <img src="${artifact.image}" alt="${artifact.name}">
            <div class="artifact-card-content">
                <div>
                    <h3>${artifact.name}</h3>
                    <p>${artifact.category}</p>
                    <p>${artifact.year}</p>
                </div>
                <div class="artifact-card-buttons">
                    <button class="btn-details" onclick="openArtifact(${artifact.id})">
                        View Details
                    </button>
                    <div class="row-buttons">
                        <button class="btn-fav active" onclick="removeFromFavorites(${artifact.id})">
                            ❌ Remove
                        </button>
                        <button class="btn-compare ${isComp ? 'active' : ''}" onclick="toggleCompare(${artifact.id})">
                            ${isComp ? '⚖️ Added' : '⚖️ Compare'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        favoritesContainer.appendChild(card);
    });
}

/* 5. Recently Viewed State & LocalStorage */

let recentlyViewed = JSON.parse(localStorage.getItem("museum_recent")) || [];
const recentContainer = document.getElementById("recent-container");

function saveRecentlyViewed() {
    localStorage.setItem("museum_recent", JSON.stringify(recentlyViewed));
}

function displayRecentlyViewed() {
    if (!recentContainer) return;

    if (recentlyViewed.length === 0) {
        recentContainer.className = "";
        recentContainer.innerHTML = `
            <p class="empty-message">You haven't viewed any artifacts yet.</p>
        `;
        return;
    }

    recentContainer.className = "artifact-grid-layout";
    recentContainer.innerHTML = "";

    recentlyViewed.forEach(artifact => {
        const isFav = favorites.some(item => item.id === artifact.id);
        const isComp = compareList.includes(artifact.id);

        const card = document.createElement("div");
        card.className = "artifact-card";
        card.innerHTML = `
            <img src="${artifact.image}" alt="${artifact.name}">
            <div class="artifact-card-content">
                <div>
                    <h3>${artifact.name}</h3>
                    <p>${artifact.category}</p>
                    <p>${artifact.year}</p>
                </div>
                <div class="artifact-card-buttons">
                    <button class="btn-details" onclick="openArtifact(${artifact.id})">
                        View Details
                    </button>
                    <div class="row-buttons">
                        <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(${artifact.id})">
                            ${isFav ? '❤️ Saved' : '🤍 Favorite'}
                        </button>
                        <button class="btn-compare ${isComp ? 'active' : ''}" onclick="toggleCompare(${artifact.id})">
                            ${isComp ? '⚖️ Added' : '⚖️ Compare'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        recentContainer.appendChild(card);
    });
}

/* 6. Combined Search + Category + Period + Sorting */

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categoryFilter = document.getElementById("category-filter");
const periodFilter = document.getElementById("period-filter");
const sortSelect = document.getElementById("sort-select");

const clearFiltersBtn = document.getElementById("clear-filters");

function filterAndSortArtifacts() {
    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";
    const selectedPeriod = periodFilter ? periodFilter.value : "all";
    const selectedSort = sortSelect ? sortSelect.value : "default";

    let filtered = artifacts.filter(artifact => {
        const matchesSearch = !searchText ||
            artifact.name.toLowerCase().includes(searchText) ||
            artifact.creator.toLowerCase().includes(searchText) ||
            artifact.category.toLowerCase().includes(searchText) ||
            artifact.period.toLowerCase().includes(searchText);

        const matchesCategory = selectedCategory === "all" || artifact.category === selectedCategory;
        const matchesPeriod = selectedPeriod === "all" || artifact.period === selectedPeriod;

        return matchesSearch && matchesCategory && matchesPeriod;
    });

    if (selectedSort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "year-asc") {
        filtered.sort((a, b) => a.year - b.year);
    } else if (selectedSort === "year-desc") {
        filtered.sort((a, b) => b.year - a.year);
    } else if (selectedSort === "popularity") {
        filtered.sort((a, b) => b.id - a.id);
    }

    displayArtifacts(filtered);
}

function clearFilters() {
    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "all";
    if (periodFilter) periodFilter.value = "all";
    if (sortSelect) sortSelect.value = "default";
    filterAndSortArtifacts();
}

if (searchInput) {
    searchInput.addEventListener("input", filterAndSortArtifacts);
}
if (searchButton) {
    searchButton.addEventListener("click", filterAndSortArtifacts);
}
if (categoryFilter) {
    categoryFilter.addEventListener("change", filterAndSortArtifacts);
}
if (periodFilter) {
    periodFilter.addEventListener("change", filterAndSortArtifacts);
}
if (sortSelect) {
    sortSelect.addEventListener("change", filterAndSortArtifacts);
}
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearFilters);
}

/* 7. Virtual Museum Room Filtering */

function enterRoom(categoryName) {
    if (categoryFilter) {
        categoryFilter.value = categoryName;
    }
    if (periodFilter) {
        periodFilter.value = "all";
    }
    filterAndSortArtifacts();

    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
    }
}

/* 8. Artifact Details Modal & Open Handler */

const modal = document.getElementById("artifact-modal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

function openArtifact(id) {
    const artifact = artifacts.find(item => item.id === id);
    if (!artifact) return;

    recentlyViewed = recentlyViewed.filter(item => item.id !== id);
    recentlyViewed.unshift(artifact);
    saveRecentlyViewed();
    displayRecentlyViewed();

    modalContent.innerHTML = `
        <img src="${artifact.image}" alt="${artifact.name}">
        <h2>${artifact.name}</h2>
        <p><strong>Category:</strong> ${artifact.category}</p>
        <p><strong>Period:</strong> ${artifact.period}</p>
        <p><strong>Year:</strong> ${artifact.year}</p>
        <p><strong>Creator:</strong> ${artifact.creator}</p>
        <p>${artifact.description}</p>
    `;

    if (modal) modal.classList.add("active");
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        if (modal) modal.classList.remove("active");
    });
}

if (modal) {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
}

/* Initial Load Initialization */

filterAndSortArtifacts();
displayFavorites();
displayRecentlyViewed();
