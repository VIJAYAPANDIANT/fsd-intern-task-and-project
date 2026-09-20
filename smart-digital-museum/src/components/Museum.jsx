import React from 'react';

export default function Museum() {
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
                    <button>Enter Room</button>
                </article>

                <article className="museum-room">
                    <span>🎨</span>
                    <h3>Art Gallery</h3>
                    <p>Famous paintings and artworks</p>
                    <button>Enter Room</button>
                </article>

                <article className="museum-room">
                    <span>⚙️</span>
                    <h3>Inventions</h3>
                    <p>Discover inventions that changed humanity</p>
                    <button>Enter Room</button>
                </article>

                <article className="museum-room">
                    <span>🇮🇳</span>
                    <h3>Cultural Heritage</h3>
                    <p>Explore cultural treasures</p>
                    <button>Enter Room</button>
                </article>
            </div>
        </section>
    );
}
