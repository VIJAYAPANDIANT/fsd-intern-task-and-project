import React from 'react';
import Card from '../components/Card';
import { UserPlus, User, Mail, Lock, ShieldCheck } from 'lucide-react';

export default function Register({ onSwitchToLogin }) {
  return (
    <div className="max-w-md mx-auto my-8">
      <Card
        title="Create an Account"
        subtitle="Start tracking medications and stay on top of your health"
        icon={<UserPlus className="h-5 w-5" />}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                disabled
                placeholder="Jane Doe"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                disabled
                placeholder="jane@example.com"
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

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Security Architecture Note</p>
              <p className="text-emerald-700 mt-0.5">
                Passwords will be securely hashed with salt on the server using bcrypt before persisting to storage.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2.5 px-4 bg-brand-600/60 text-white text-sm font-semibold rounded-lg shadow-sm cursor-not-allowed text-center"
          >
            Create Account (Task 2: Registration)
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-brand-600 font-semibold hover:underline"
          >
            Sign In Here
          </button>
        </div>
      </Card>
    </div>
  );
}
