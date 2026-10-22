import React from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Activity, Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Calendar, Heart } from 'lucide-react';

export default function Dashboard({ setActivePage, backendHealth, user }) {
  // Placeholder mock data demonstrating upcoming features
  const stats = [
    { label: "Today's Medicines", value: '4', icon: Calendar, color: 'text-brand-600 bg-brand-50' },
    { label: 'Taken', value: '2', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Pending', value: '1', icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Missed', value: '1', icon: XCircle, color: 'text-rose-600 bg-rose-50' },
  ];

  const todaySchedule = [
    { id: 1, name: 'Metformin', dosage: '500 mg', frequency: 'Twice daily', time: '08:00 AM', status: 'Taken' },
    { id: 2, name: 'Atorvastatin', dosage: '20 mg', frequency: 'Once daily', time: '01:00 PM', status: 'Taken' },
    { id: 3, name: 'Lisinopril', dosage: '10 mg', frequency: 'Once daily', time: '07:00 PM', status: 'Pending' },
    { id: 4, name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', time: '09:00 AM', status: 'Missed' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-brand-600 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-brand-700/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
              Step 2 &bull; Authenticated Session
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, {user?.name || 'MediTrack User'}!
            </h1>
            <p className="text-teal-100 text-sm mt-1 max-w-xl">
              Signed in as <code className="bg-white/20 px-1.5 py-0.5 rounded text-white font-mono text-xs">{user?.email || 'authenticated'}</code>. Track your scheduled dosages and health vitals.
            </p>
          </div>
          <button
            onClick={() => setActivePage('medicines')}
            className="px-4 py-2.5 bg-white text-brand-700 hover:bg-slate-50 font-semibold text-sm rounded-xl shadow transition-colors"
          >
            Manage Medicines &rarr;
          </button>
        </div>
      </div>

      {/* Backend Status Notice */}
      {backendHealth && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Backend API Connected</p>
              <p className="text-xs text-slate-500">
                Endpoint: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">GET /api/health</code> &bull; Uptime: {backendHealth.uptime || 'Active'}
              </p>
            </div>
          </div>
          <StatusBadge status="Active" />
        </div>
      )}

      {/* Progress & Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Today's Schedule & Daily Adherence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <Card
            title="Today's Medicine Schedule"
            subtitle="Scheduled dosages for today"
            icon={<Clock className="h-5 w-5" />}
            footer="Schedule updates and dose actions will be enabled with API connection in subsequent tasks."
          >
            <div className="divide-y divide-slate-100">
              {todaySchedule.map((med) => (
                <div key={med.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-sm">
                      {med.time.split(' ')[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{med.name}</h4>
                      <p className="text-xs text-slate-500">
                        {med.dosage} &bull; {med.frequency} &bull; {med.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={med.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Adherence Progress & Vitals Preview */}
        <div className="space-y-6">
          <Card
            title="Daily Adherence Rate"
            subtitle="Medications completed today"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-50 border-4 border-brand-500 text-brand-700 font-extrabold text-2xl">
                50%
              </div>
              <p className="text-xs text-slate-500 mt-3">2 of 4 doses taken today</p>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
                <div className="bg-brand-500 h-2.5 rounded-full w-1/2"></div>
              </div>
            </div>
          </Card>

          <Card
            title="Health Vitals Glance"
            subtitle="Recent readings placeholder"
            icon={<Heart className="h-5 w-5" />}
          >
            <div className="space-y-3 text-xs">
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
      </div>
    </div>
  );
}
