import React, { useState } from 'react';
import Card from '../components/Card';
import { registerUser } from '../services/authService';
import { UserPlus, User, Mail, Lock, ShieldCheck, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function Register({ onSwitchToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const data = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      setSuccessMessage('Registration successful! Logging you in...');

      // Notify parent app of successful registration & token
      setTimeout(() => {
        if (onRegisterSuccess && data) {
          onRegisterSuccess(data.token, data.user);
        }
      }, 700);
    } catch (err) {
      setApiError(err.message || 'Unable to connect to the backend server. Please verify the API is running.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <Card
        title="Create an Account"
        subtitle="Start tracking medications and stay on top of your health"
        icon={<UserPlus className="h-5 w-5" />}
      >
        {apiError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Vijayapandian T"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg text-slate-800 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="vijay@example.com"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg text-slate-800 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="At least 6 characters"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg text-slate-800 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Re-enter your password"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg text-slate-800 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Security Architecture</p>
              <p className="text-emerald-700 mt-0.5">
                Passwords are never stored in plain text. They are hashed using bcrypt with salt rounds on the backend.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
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
