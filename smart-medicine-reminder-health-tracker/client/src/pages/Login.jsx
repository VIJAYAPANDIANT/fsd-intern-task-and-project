import React from 'react';
import Card from '../components/Card';
import { LogIn, Lock, Mail, ShieldAlert } from 'lucide-react';

export default function Login({ onSwitchToRegister }) {
  return (
    <div className="max-w-md mx-auto my-8">
      <Card
        title="Sign In to MediTrack"
        subtitle="Manage your daily medicines and health metrics"
        icon={<LogIn className="h-5 w-5" />}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                disabled
                placeholder="user@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                disabled
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Setup Phase Notice</p>
              <p className="text-amber-700 mt-0.5">
                Authentication & JWT sessions will be fully wired up in Task 2. This is the UI layout placeholder.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2.5 px-4 bg-brand-600/60 text-white text-sm font-semibold rounded-lg shadow-sm cursor-not-allowed text-center"
          >
            Sign In (Task 2: JWT Auth)
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-brand-600 font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </Card>
    </div>
  );
}
