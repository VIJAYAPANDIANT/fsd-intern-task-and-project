import React from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import {
  Pill,
  Activity,
  History,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Heart,
  ArrowRight,
  Sparkles,
  Lock,
  FileText,
  BellRing,
  Check,
  CalendarDays,
  UserCheck
} from 'lucide-react';

export default function Home({ setActivePage, user, backendStatus }) {
  const isAuth = Boolean(user);

  return (
    <div className="space-y-16 py-4">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-brand-600 to-cyan-600 text-white shadow-xl shadow-brand-900/10 p-8 sm:p-12 lg:p-16">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5 text-teal-200" />
            <span>Smart Medicine Reminder & Health Tracker</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Never Miss a Dose. <br className="hidden sm:inline" />
            Take Control of Your Health Journey.
          </h1>

          <p className="text-teal-50 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
            MediTrack is an intelligent full-stack healthcare web application designed to organize prescription schedules, automate daily dose reminders, track adherence in real time, and analyze historical intake logs.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {isAuth ? (
              <>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="px-6 py-3 bg-white text-brand-700 hover:bg-slate-50 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActivePage('medicines')}
                  className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm rounded-xl backdrop-blur border border-white/20 transition-all"
                >
                  Manage Prescriptions
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActivePage('register')}
                  className="px-6 py-3 bg-white text-brand-700 hover:bg-slate-50 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActivePage('login')}
                  className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm rounded-xl backdrop-blur border border-white/20 transition-all"
                >
                  Sign In to Account
                </button>
              </>
            )}
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-teal-200 shrink-0" />
              <span>JWT & Bcrypt Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-teal-200 shrink-0" />
              <span>Auto-Generated Doses</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-teal-200 shrink-0" />
              <span>Real-Time Adherence %</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-teal-200 shrink-0" />
              <span>Cross-User Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE PREVIEW CARD */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card
            title="Today's Dose Schedule Preview"
            subtitle="Real-time dose cards with status toggles and intake timestamps"
            icon={<Clock className="h-5 w-5" />}
          >
            <div className="divide-y divide-slate-100">
              {/* Dose 1 */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 border border-brand-200/60 flex flex-col items-center justify-center font-bold text-xs shrink-0">
                    <Clock className="h-3 w-3 text-brand-600 mb-0.5" />
                    <span>08:00</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-800">Amoxicillin 500mg</h4>
                      <StatusBadge status="Taken" />
                    </div>
                    <p className="text-xs text-slate-500">1 capsule &bull; Twice daily &bull; Take after breakfast</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Logged at 08:15 AM</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-lg border border-emerald-200 self-end sm:self-center">
                  Completed
                </span>
              </div>

              {/* Dose 2 */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex flex-col items-center justify-center font-bold text-xs shrink-0">
                    <Clock className="h-3 w-3 text-amber-600 mb-0.5" />
                    <span>13:00</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-800">Metformin 500mg</h4>
                      <StatusBadge status="Pending" />
                    </div>
                    <p className="text-xs text-slate-500">1 tablet &bull; Once daily &bull; Take with lunch</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 self-end sm:self-center">
                  <button
                    onClick={() => setActivePage(isAuth ? 'dashboard' : 'login')}
                    className="px-2.5 py-1 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 transition"
                  >
                    Take
                  </button>
                  <button
                    onClick={() => setActivePage(isAuth ? 'dashboard' : 'login')}
                    className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-xs rounded-lg hover:bg-rose-100 transition"
                  >
                    Miss
                  </button>
                </div>
              </div>

              {/* Dose 3 */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 border border-brand-200/60 flex flex-col items-center justify-center font-bold text-xs shrink-0">
                    <Clock className="h-3 w-3 text-brand-600 mb-0.5" />
                    <span>20:00</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-800">Vitamin D3</h4>
                      <StatusBadge status="Pending" />
                    </div>
                    <p className="text-xs text-slate-500">1000 IU &bull; Once daily &bull; Take with dinner</p>
                  </div>
                </div>
                <span className="text-xs text-amber-600 font-medium self-end sm:self-center">Upcoming Dose</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Adherence Ring & Vitals */}
        <div className="space-y-6">
          <Card
            title="Daily Adherence Rate"
            subtitle="Dynamic live calculation"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-50 border-4 border-brand-500 text-brand-700 font-extrabold text-2xl shadow-inner">
                67%
              </div>
              <p className="text-xs text-slate-600 font-medium mt-2">2 of 3 doses completed</p>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2.5 overflow-hidden">
                <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </Card>

          <Card
            title="Health Vitals Glance"
            subtitle="Patient biometric baseline"
            icon={<Heart className="h-5 w-5" />}
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Blood Pressure</span>
                <span className="font-semibold text-slate-800">120/80 mmHg</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600">Heart Rate</span>
                <span className="font-semibold text-slate-800">72 bpm</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Blood Glucose</span>
                <span className="font-semibold text-slate-800">95 mg/dL</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CORE FEATURES / "EVERYTHING ABOUT THE WEBSITE" */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Everything You Need to Master Your Medication
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            MediTrack combines intuitive prescription management with automated schedule generation, adherence analytics, and audit logging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Automated Daily Scheduling</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prescriptions automatically generate today's dose cards on the server. Active date windows are respected and duplicate dose rows are mathematically prevented.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Pill className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Prescription Lifecycle (CRUD)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add, update, and organize medications with dosage specs, frequencies, 24-hr reminder times, start/end dates, and food instructions with deletion confirmation safeguards.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Real-Time Status & Timestamps</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mark doses as Taken, Missed, or reset to Pending. Marking Taken automatically records the exact ISO intake timestamp for accurate medical adherence records.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Adherence Progress Engine</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dynamic adherence percentages recalculate immediately upon dose updates. Monitor your daily compliance rate with visual progress bars and status counters.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <History className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Multi-Filter Medication History</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Query historical logs with date range pickers (From Date / To Date), specific medicine selectors, and intake status filters, with newest records shown first.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Zero-Database Storage Security</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Built strictly without MongoDB or SQL per requirements. Uses atomic rename file writes, concurrency write queues, JWT Bearer tokens, and cross-user data isolation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="bg-slate-100/70 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-brand-600 tracking-wide uppercase">Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How MediTrack Works</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Getting started takes less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-800">Create Your Safe Account</h4>
            <p className="text-xs text-slate-500">
              Sign up with your email. Your passwords are encrypted with bcrypt and your data is protected with JWT token authentication.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-800">Add Prescriptions</h4>
            <p className="text-xs text-slate-500">
              Add your medications, dosage, daily frequency, and reminder times (e.g., 08:00, 20:00). Start and end dates are saved safely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-800">Track & Review Adherence</h4>
            <p className="text-xs text-slate-500">
              Open your Dashboard to mark doses Taken or Missed. Filter historical trends and download logs for your doctor visits.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CALL TO ACTION */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to Take Charge of Your Health?
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          Join MediTrack today to simplify your medication schedule, stay adherent, and maintain an accurate log of your doses.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {isAuth ? (
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setActivePage('register')}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActivePage('login')}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-all"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
