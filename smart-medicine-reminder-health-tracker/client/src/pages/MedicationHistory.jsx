import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { getMedicationHistory } from '../services/recordService';
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
  CalendarDays
} from 'lucide-react';

export default function MedicationHistory() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setIsLoading(true);
    setError('');
    try {
      const records = await getMedicationHistory({
        date: selectedDate,
        status: filterStatus
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
  }, [selectedDate, filterStatus]);

  const handleResetFilters = () => {
    setSelectedDate('');
    setFilterStatus('All');
  };

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
            Review historical intake logs and filter records by scheduled date or dose status.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 uppercase tracking-wide">
          <Filter className="h-4 w-4 text-brand-600" />
          <span>Filter History Records:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter Dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-500">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="All">All Statuses</option>
              <option value="Taken">Taken</option>
              <option value="Missed">Missed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Date Filter Input */}
          <div className="flex items-center space-x-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline"
              >
                Clear
              </button>
            )}
          </div>

          {(selectedDate || filterStatus !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="px-2.5 py-1 text-xs text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg font-medium transition-colors"
            >
              Reset Filters
            </button>
          )}
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
        title="Dose Intake Logs"
        subtitle={`Showing ${historyLogs.length} record(s) matching your criteria`}
        icon={<Clock className="h-5 w-5" />}
        footer="Records are stored in JSON format on the server and synchronized with your active prescriptions."
      >
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-6 w-6 text-brand-600 animate-spin" />
            <p className="text-xs text-slate-400">Loading medication history...</p>
          </div>
        ) : historyLogs.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <CalendarDays className="h-10 w-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-700">No Medication Records Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {selectedDate || filterStatus !== 'All'
                ? 'Try adjusting your date or status filters to view records.'
                : 'As you track scheduled doses on the Dashboard, your intake records will appear here.'}
            </p>
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
                      <div>{log.medicineName}</div>
                      <div className="text-xs text-slate-500 font-normal">
                        {log.dosage} &bull; {log.frequency}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {log.takenAt ? (
                        <span className="text-emerald-700 font-medium">
                          Taken at {new Date(log.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ) : log.status === 'Missed' ? (
                        <span className="text-rose-600 font-medium">Missed scheduled dose</span>
                      ) : (
                        <span className="text-amber-600">Pending scheduled dose</span>
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
