import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p className="flex items-center gap-1">
          Smart Medicine Reminder & Health Tracker &bull; Built with{' '}
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" /> for FSD Internship
        </p>
        <p>Maintained by Vijayapandian T &bull; Task 1 Project Setup</p>
      </div>
    </footer>
  );
}
