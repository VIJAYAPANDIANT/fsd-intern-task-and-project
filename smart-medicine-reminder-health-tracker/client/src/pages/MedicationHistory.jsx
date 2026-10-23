import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { getMedicationHistory } from '../services/recordService';
import { getMedicines } from '../services/medicineService';
import {
  History,
  Filter,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Pill,
  X,
  TrendingUp
} from 'lucide-react';

export default function MedicationHistory() {
  const [historyLogs, setHistoryLogs] = useState([]);
  const [userMedicines, setUserMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMedicineId, setFilterMedicineId] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Load user medicines for the dropdown selector
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const meds = await getMedicines();
        setUserMedicines(meds || []);
      } catch (err) {
        console.warn('Could not load medicines for filter dropdown:', err.message);
      }
    };
    loadMedicines();
  }, []);

  // Fetch history logs whenever filter criteria change
  const fetchHistory = async () => {
    setIsLoading(true);
    setError('');
    try {
      const records = await getMedicationHistory({
        status: filterStatus !== 'All' ? filterStatus : undefined,
        medicineId: filterMedicineId !== 'All' ? filterMedicineId : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      });
      setHistoryLogs(records || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch medication history.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [filterStatus, filterMedicineId, startDate, endDate]);

  const handleResetFilters = () => {
    setFilterStatus('All');
    setFilterMedicineId('All');
    setStartDate('');
    setEndDate('');
  };

  const isFiltered = filterStatus !== 'All' || filterMedicineId !== 'All' || Boolean(startDate) || Boolean(endDate);

  // Derived filter summary metrics
  const totalCount = historyLogs.length;
  const takenCount = historyLogs.filter((l) => l.status === 'Taken').length;
  const missedCount = historyLogs.filter((l) => l.status === 'Missed').length;
  const pendingCount = historyLogs.filter((l) => l.status === 'Pending').length;
  const adherencePercent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <History className="h-6 w-6 text-brand-600" />
            Medication History & Adherence Log
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review past dose records, analyze adherence trends, and filter logs by date range, medicine, or intake status.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Filter Control Panel */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
            <Filter className="h-4 w-4 text-brand-600" />
            <span>Filter Medication History</span>
          </div>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center space-x-1 text-xs text-brand-700 hover:text-brand-900 font-semibold transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="All">All Statuses</option>
              <option value="Taken">Taken</option>
              <option value="Missed">Missed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Medicine Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Medicine
            </label>
            <select
              value={filterMedicineId}
              onChange={(e) => setFilterMedicineId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="All">All Medicines</option>
              {userMedicines.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name} ({med.dosage})
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              From Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              To Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Summary KPI Cards for Filtered Results */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-medium text-slate-500">Total Filtered</p>
          <p className="text-xl font-bold text-slate-800 mt-0.5">{totalCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-medium text-emerald-600">Taken</p>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">{takenCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-medium text-rose-600">Missed</p>
          <p className="text-xl font-bold text-rose-700 mt-0.5">{missedCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-medium text-amber-600">Pending</p>
          <p className="text-xl font-bold text-amber-700 mt-0.5">{pendingCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-[11px] font-medium text-brand-700">Adherence Rate</p>
          <p className="text-xl font-bold text-brand-800 mt-0.5">{adherencePercent}%</p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchHistory} className="underline font-semibold hover:text-rose-900">
            Retry
          </button>
        </div>
      )}

      {/* History Log List */}
      <Card
        title="Historical Intake Logs"
        subtitle={`Showing ${historyLogs.length} record(s) &bull; Newest scheduled dates displayed first`}
        icon={<Clock className="h-5 w-5" />}
        footer="Dose records are stored in server JSON files and updated when doses are taken or missed."
      >
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-6 w-6 text-brand-600 animate-spin" />
            <p className="text-xs text-slate-400">Loading medication history...</p>
          </div>
        ) : historyLogs.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <CalendarDays className="h-10 w-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-700">No Medication Records Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isFiltered
                ? 'No dose records match your active filter criteria. Try clearing or expanding your filters.'
                : 'As you track scheduled doses on the Dashboard, your historical intake logs will appear here.'}
            </p>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Scheduled Date & Time</th>
                  <th className="py-3 px-4">Medicine & Dosage</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Intake Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-slate-700 font-mono text-xs">
                      <div className="flex items-center space-x-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold">{log.scheduledDate}</span>
                        <span className="text-slate-400">&bull;</span>
                        <span className="text-brand-700 font-bold">{log.scheduledTime}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <div className="flex items-center space-x-1.5">
                        <Pill className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                        <span>{log.medicineName}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-normal pl-5">
                        {log.dosage} &bull; {log.frequency}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {log.takenAt ? (
                        <span className="text-emerald-700 font-medium flex items-center space-x-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>
                            Taken at {new Date(log.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </span>
                      ) : log.status === 'Missed' ? (
                        <span className="text-rose-600 font-medium flex items-center space-x-1">
                          <XCircle className="h-3.5 w-3.5 text-rose-500" />
                          <span>Missed scheduled dose</span>
                        </span>
                      ) : (
                        <span className="text-amber-600 flex items-center space-x-1">
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                          <span>Pending scheduled dose</span>
                        </span>
                      )}
                      {log.instructions && (
                        <div className="text-[11px] text-slate-400 italic mt-0.5">
                          Note: {log.instructions}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
