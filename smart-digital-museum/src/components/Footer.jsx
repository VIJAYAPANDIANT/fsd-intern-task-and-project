import React from 'react';

export default function Footer() {
    return (
        <footer className="footer py-10 px-4 bg-neutral-950 text-white text-center border-t border-neutral-800">
            <div className="footer-content max-w-xl mx-auto space-y-2 mb-6">
                <h2 className="text-xl font-bold tracking-wide text-amber-400">🏛️ Smart Digital Museum</h2>
                <p className="text-xs text-neutral-400">
                    Discover history. Experience culture.
                    Explore the world.
                </p>
            </div>

            <p className="copyright text-xs text-neutral-500 pt-4 border-t border-neutral-900">
                © 2026 Smart Digital Museum. All rights reserved.
            </p>
        </footer>
    );
}
