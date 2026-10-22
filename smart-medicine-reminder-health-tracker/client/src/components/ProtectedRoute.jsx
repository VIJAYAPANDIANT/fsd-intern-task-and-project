import React from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

/**
 * ProtectedRoute Component
 * Prevents unauthenticated users from accessing protected views.
 * Shows loading spinner during token verification and redirects to Login if unauthorized.
 */
export default function ProtectedRoute({ isAuthenticated, isLoading, onRedirectToLogin, children }) {
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">Verifying session...</p>
          <p className="text-xs text-slate-400">Validating token with server</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Authentication Required</h3>
        <p className="text-xs text-slate-500">
          You must be logged in to access this page. Please sign in to view your medication reminders and health vitals.
        </p>
        <button
          onClick={onRedirectToLogin}
          className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return children;
}
