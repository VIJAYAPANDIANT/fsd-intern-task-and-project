import React from 'react';

export default function Museum({ onRoomSelect }) {
    return (
        <section id="museum" className="museum">
            <div className="section-heading">
                <p>VIRTUAL EXPERIENCE</p>
                <h2>Enter the Virtual Museum</h2>
                <p>
                    Explore different rooms and discover collections from different periods.
                </p>
            </div>

            <div className="museum-rooms">
                <article className="museum-room">
                    <span>🏺</span>
                    <h3>Ancient World</h3>
                    <p>Ancient civilizations and artifacts</p>
                    <button onClick={() => onRoomSelect && onRoomSelect('Ancient Artifacts')}>
                        Enter Room
                    </button>
                </article>

                <article className="museum-room">
                    <span>🎨</span>
                    <h3>Art Gallery</h3>
                    <p>Famous paintings and artworks</p>
                    <button onClick={() => onRoomSelect && onRoomSelect('Famous Artworks')}>
                        Enter Room
                    </button>
                </article>

                <article className="museum-room">
                    <span>⚙️</span>
                    <h3>Inventions</h3>
                    <p>Discover inventions that changed humanity</p>
                    <button onClick={() => onRoomSelect && onRoomSelect('Great Inventions')}>
                        Enter Room
                    </button>
                </article>

                <article className="museum-room">
                    <span>🇮🇳</span>
                    <h3>Cultural Heritage</h3>
                    <p>Explore cultural treasures</p>
                    <button onClick={() => onRoomSelect && onRoomSelect('Cultural Heritage')}>
                        Enter Room
                    </button>
                </article>
            </div>
        </section>
    );
}
