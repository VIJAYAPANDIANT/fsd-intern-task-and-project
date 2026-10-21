import React from 'react';

/**
 * Reusable StatusBadge component
 * Displays status badge with color coding for Taken, Missed, Pending, or Active
 */
export default function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase();

  const getStyle = () => {
    switch (normalized) {
      case 'taken':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'missed':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-70"></span>
      {status || 'Unknown'}
    </span>
  );
}
