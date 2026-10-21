import React, { useState } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { History, Filter, Calendar, Search } from 'lucide-react';

export default function MedicationHistory() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-10-21');

  const historyLogs = [
    { id: 101, medicine: 'Metformin Hydrochloride (500mg)', date: '2026-10-21', time: '08:00 AM', status: 'Taken', notes: 'Logged on time after breakfast' },
    { id: 102, medicine: 'Vitamin D3 & Calcium (1000 IU)', date: '2026-10-21', time: '09:00 AM', status: 'Missed', notes: 'Auto-marked after grace window' },
    { id: 103, medicine: 'Atorvastatin (20mg)', date: '2026-10-21', time: '01:00 PM', status: 'Taken', notes: 'Logged after lunch' },
    { id: 104, medicine: 'Lisinopril (10mg)', date: '2026-10-21', time: '07:00 PM', status: 'Pending', notes: 'Scheduled for tonight' },
    { id: 105, medicine: 'Metformin Hydrochloride (500mg)', date: '2026-10-20', time: '08:00 PM', status: 'Taken', notes: 'Taken with dinner' },
    { id: 106, medicine: 'Atorvastatin (20mg)', date: '2026-10-20', time: '01:00 PM', status: 'Taken', notes: 'Logged successfully' },
  ];

  const filteredLogs = historyLogs.filter((item) => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesDate = !selectedDate || item.date === selectedDate;
    return matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <History className="h-6 w-6 text-brand-600" />
          Medication History & Adherence Log
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review historical intake records and analyze adherence trends over time.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 uppercase tracking-wide">
          <Filter className="h-4 w-4 text-brand-600" />
          <span>Filter Records:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
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

          {/* Date Filter */}
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
        </div>
      </div>

      {/* History Log List */}
      <Card
        title="Dose Intake Logs"
        subtitle={`Showing ${filteredLogs.length} record(s)`}
        footer="Dynamic filtering with REST backend history endpoint will be implemented in subsequent tasks."
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No medication records found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Medicine</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-slate-600 font-mono text-xs">
                      {log.date} &bull; {log.time}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{log.medicine}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500">{log.notes}</td>
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
