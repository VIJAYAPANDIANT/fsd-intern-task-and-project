import React from 'react';

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <p className="hero-subtitle">
                    WELCOME TO THE DIGITAL MUSEUM
                </p>

                <h1>
                    Discover History.<br />
                    Experience Culture.
                </h1>

                <p>
                    Explore historical artifacts, famous artworks,
                    remarkable inventions and cultural treasures
                    from around the world.
                </p>

                <a href="#explore" className="hero-button">
                    Explore Museum
                </a>
            </div>
        </section>
    );
}
