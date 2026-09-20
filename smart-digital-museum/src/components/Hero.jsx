import React from 'react';

export default function Hero() {
    return (
        <section id="home" className="hero min-h-[420px] md:min-h-[500px] flex items-center justify-center text-center p-8 md:p-16 bg-neutral-800 text-white dark:bg-neutral-900 border-b border-neutral-700/50">
            <div className="hero-content max-w-2xl mx-auto space-y-4">
                <p className="hero-subtitle text-amber-400 font-semibold tracking-widest text-xs md:text-sm uppercase">
                    WELCOME TO THE DIGITAL MUSEUM
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                    Discover History.<br />
                    Experience Culture.
                </h1>

                <p className="max-w-xl mx-auto text-neutral-300 text-sm md:text-base">
                    Explore historical artifacts, famous artworks,
                    remarkable inventions and cultural treasures
                    from around the world.
                </p>

                <a href="#explore" className="hero-button inline-block mt-4 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold rounded-lg transition-all duration-200 shadow-lg hover:-translate-y-0.5">
                    Explore Museum
                </a>
            </div>
        </section>
    );
}
