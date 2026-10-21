import React from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Pill, Plus, Clock, Edit2, Trash2 } from 'lucide-react';

export default function Medicines() {
  const medicineList = [
    {
      id: 'm1',
      name: 'Metformin Hydrochloride',
      dosage: '500 mg',
      frequency: 'Twice daily',
      time: '08:00 AM, 08:00 PM',
      instructions: 'Take with food',
      status: 'Active'
    },
    {
      id: 'm2',
      name: 'Atorvastatin',
      dosage: '20 mg',
      frequency: 'Once daily',
      time: '01:00 PM',
      instructions: 'Take after lunch',
      status: 'Active'
    },
    {
      id: 'm3',
      name: 'Lisinopril',
      dosage: '10 mg',
      frequency: 'Once daily',
      time: '07:00 PM',
      instructions: 'Take with water before dinner',
      status: 'Active'
    },
    {
      id: 'm4',
      name: 'Vitamin D3 & Calcium',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '09:00 AM',
      instructions: 'Morning supplement',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="h-6 w-6 text-brand-600" />
            Medicine Schedules
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your daily prescriptions, dosages, and custom reminder timings.
          </p>
        </div>

        <button
          disabled
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600/60 text-white rounded-lg text-sm font-semibold cursor-not-allowed shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Medicine (CRUD in Next Step)</span>
        </button>
      </div>

      {/* Medicines Table / List */}
      <Card
        title="Active Medication Prescriptions"
        subtitle="4 scheduled prescriptions"
        icon={<Clock className="h-5 w-5" />}
        footer="Full Add / Edit / Delete modal interactions and REST API endpoints will be added in upcoming tasks."
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Medicine Name</th>
                <th className="py-3 px-4">Dosage</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4">Reminder Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {medicineList.map((med) => (
                <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {med.name}
                    <div className="text-[11px] font-normal text-slate-400">{med.instructions}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">{med.dosage}</td>
                  <td className="py-3.5 px-4 text-slate-600">{med.frequency}</td>
                  <td className="py-3.5 px-4 text-brand-700 font-medium">{med.time}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={med.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center space-x-2 text-slate-400">
                      <button disabled className="hover:text-slate-600 p-1 cursor-not-allowed" title="Edit">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button disabled className="hover:text-rose-600 p-1 cursor-not-allowed" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
