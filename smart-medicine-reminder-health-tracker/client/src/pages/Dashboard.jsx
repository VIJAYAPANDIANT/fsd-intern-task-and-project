import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { getTodaySchedule, updateRecordStatus } from '../services/recordService';
import {
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Heart,
  Pill,
  RotateCcw,
  Loader2,
  Check,
  X
} from 'lucide-react';

export default function Dashboard({ setActivePage, backendHealth, user }) {
  const [scheduleData, setScheduleData] = useState({
    date: new Date().toISOString().split('T')[0],
    records: [],
    summary: { total: 0, taken: 0, missed: 0, pending: 0, adherenceRate: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchTodayData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getTodaySchedule();
      setScheduleData(data || {
        date: new Date().toISOString().split('T')[0],
        records: [],
        summary: { total: 0, taken: 0, missed: 0, pending: 0, adherenceRate: 0 }
      });
    } catch (err) {
      setError(err.message || 'Failed to load today schedule.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  const handleStatusChange = async (recordId, newStatus, medicineName) => {
    setActionLoadingId(recordId);
    try {
      await updateRecordStatus(recordId, newStatus);
      showNotification('success', `Marked ${medicineName} as ${newStatus}`);
      await fetchTodayData();
    } catch (err) {
      showNotification('error', err.message || `Failed to update status to ${newStatus}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const { records, summary, date } = scheduleData;

  const stats = [
    { label: "Today's Doses", value: summary.total, icon: Calendar, color: 'text-brand-600 bg-brand-50' },
    { label: 'Taken', value: summary.taken, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Pending', value: summary.pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Missed', value: summary.missed, icon: XCircle, color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-brand-600 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-brand-700/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
              Step 5 &bull; Integrated Health & Medication Tracker
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, {user?.name || 'MediTrack User'}!
            </h1>
            <p className="text-teal-100 text-sm mt-1 max-w-xl">
              Today is <span className="font-semibold text-white">{date}</span>. Track your scheduled doses in real time and monitor your daily adherence.
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

      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-medium transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

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
                Endpoint: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">GET /api/records/today</code> &bull; Uptime: {backendHealth.uptime || 'Active'}
              </p>
            </div>
          </div>
          <StatusBadge status="Active" />
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchTodayData} className="underline font-semibold hover:text-rose-900">
            Retry
          </button>
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
            subtitle={`Scheduled dosages for ${date}`}
            icon={<Clock className="h-5 w-5" />}
            footer="Click Take or Miss to record real dose adherence in your history."
          >
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="h-6 w-6 text-brand-600 animate-spin" />
                <p className="text-xs text-slate-400">Loading today's doses...</p>
              </div>
            ) : records.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 mx-auto bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                  <Pill className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-700">No Doses Scheduled for Today</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Add prescriptions with an active start date to automatically generate today's doses.
                </p>
                <button
                  onClick={() => setActivePage('medicines')}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  Configure Medicines
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {records.map((dose) => (
                  <div
                    key={dose.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 border border-brand-200/60 flex flex-col items-center justify-center font-bold text-xs shrink-0">
                        <Clock className="h-3 w-3 text-brand-600 mb-0.5" />
                        <span>{dose.scheduledTime}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-slate-800">{dose.medicineName}</h4>
                          <StatusBadge status={dose.status} />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {dose.dosage} &bull; {dose.frequency}
                          {dose.instructions && <span> &bull; {dose.instructions}</span>}
                        </p>
                        {dose.takenAt && (
                          <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                            Logged at: {new Date(dose.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons: Take, Miss, Reset */}
                    <div className="flex items-center space-x-1.5 self-end sm:self-center">
                      {actionLoadingId === dose.id ? (
                        <div className="px-3 py-1.5 text-xs text-slate-400 flex items-center space-x-1">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Updating...</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStatusChange(dose.id, 'Taken', dose.medicineName)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                              dose.status === 'Taken'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                            title="Mark as Taken"
                          >
                            <Check className="h-3 w-3" />
                            <span>Taken</span>
                          </button>

                          <button
                            onClick={() => handleStatusChange(dose.id, 'Missed', dose.medicineName)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                              dose.status === 'Missed'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            }`}
                            title="Mark as Missed"
                          >
                            <X className="h-3 w-3" />
                            <span>Missed</span>
                          </button>

                          {dose.status !== 'Pending' && (
                            <button
                              onClick={() => handleStatusChange(dose.id, 'Pending', dose.medicineName)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Reset to Pending"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right: Adherence Progress & Vitals Preview */}
        <div className="space-y-6">
          <Card
            title="Daily Adherence Rate"
            subtitle="Medications completed today"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="text-center py-3">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-brand-50 border-4 border-brand-500 text-brand-700 font-extrabold text-3xl shadow-inner">
                {summary.adherenceRate}%
              </div>
              <p className="text-xs text-slate-600 font-medium mt-3">
                {summary.taken} of {summary.total} doses taken today
              </p>
              <div className="w-full bg-slate-100 rounded-full h-3 mt-3 overflow-hidden">
                <div
                  className="bg-brand-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${summary.adherenceRate}%` }}
                ></div>
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
