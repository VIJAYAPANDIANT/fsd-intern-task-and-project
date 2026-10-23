import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine
} from '../services/medicineService';
import {
  Pill,
  Plus,
  Clock,
  Edit2,
  Trash2,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
  Info,
  CalendarDays
} from 'lucide-react';

const INITIAL_FORM = {
  name: '',
  dosage: '',
  frequency: 'Once daily',
  reminderTimes: '08:00',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  instructions: ''
};

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filterFrequency, setFilterFrequency] = useState('');

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // User Notification Banner
  const [notification, setNotification] = useState(null);

  // Fetch medicines with optional search and filter
  const fetchMedicinesList = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      const data = await getMedicines({
        name: searchName,
        frequency: filterFrequency
      });
      setMedicines(data || []);
    } catch (err) {
      setFetchError(err.message || 'Failed to load medicines.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicinesList();
  }, [filterFrequency]);

  // Handle Search Input Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMedicinesList();
  };

  // Open modal in Create mode
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setFormErrors({});
    setModalError('');
    setIsModalOpen(true);
  };

  // Open modal in Edit mode
  const handleOpenEditModal = (med) => {
    setModalMode('edit');
    setEditingId(med.id);
    setFormData({
      name: med.name || '',
      dosage: med.dosage || '',
      frequency: med.frequency || 'Once daily',
      reminderTimes: Array.isArray(med.reminderTimes) ? med.reminderTimes.join(', ') : '',
      startDate: med.startDate || '',
      endDate: med.endDate || '',
      instructions: med.instructions || ''
    });
    setFormErrors({});
    setModalError('');
    setIsModalOpen(true);
  };

  // Validate form fields before submitting
  const validateForm = () => {
    const errors = {};
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!formData.name.trim()) {
      errors.name = 'Medicine name is required.';
    }

    if (!formData.dosage.trim()) {
      errors.dosage = 'Dosage is required (e.g., 500 mg, 1 tablet).';
    }

    if (!formData.frequency.trim()) {
      errors.frequency = 'Frequency is required.';
    }

    // Validate comma-separated reminder times
    const times = formData.reminderTimes
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (times.length === 0) {
      errors.reminderTimes = 'At least one reminder time is required (e.g., 08:00).';
    } else {
      const invalidTimes = times.filter((t) => !timeRegex.test(t));
      if (invalidTimes.length > 0) {
        errors.reminderTimes = `Invalid format for "${invalidTimes.join(', ')}". Use 24-hr HH:mm (e.g., 08:00, 20:30).`;
      }
    }

    if (!formData.startDate.trim()) {
      errors.startDate = 'Start date is required.';
    } else if (!dateRegex.test(formData.startDate.trim())) {
      errors.startDate = 'Start date must be in YYYY-MM-DD format.';
    }

    if (formData.endDate && formData.endDate.trim()) {
      if (!dateRegex.test(formData.endDate.trim())) {
        errors.endDate = 'End date must be in YYYY-MM-DD format.';
      } else if (formData.endDate.trim() < formData.startDate.trim()) {
        errors.endDate = 'End date cannot be earlier than start date.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Create / Edit Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setModalError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    const timesArray = formData.reminderTimes
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name.trim(),
      dosage: formData.dosage.trim(),
      frequency: formData.frequency.trim(),
      reminderTimes: timesArray,
      startDate: formData.startDate.trim(),
      endDate: formData.endDate && formData.endDate.trim() ? formData.endDate.trim() : null,
      instructions: formData.instructions && formData.instructions.trim() ? formData.instructions.trim() : null
    };

    try {
      if (modalMode === 'create') {
        await createMedicine(payload);
        showNotification('success', `"${payload.name}" was added to your schedule.`);
      } else {
        await updateMedicine(editingId, payload);
        showNotification('success', `"${payload.name}" schedule was updated.`);
      }
      setIsModalOpen(false);
      fetchMedicinesList();
    } catch (err) {
      setModalError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteMedicine(deletingId);
      showNotification('success', `Medicine was removed from your schedule.`);
      setDeletingId(null);
      fetchMedicinesList();
    } catch (err) {
      showNotification('error', err.message || 'Failed to delete medicine.');
    } finally {
      setIsDeleting(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="h-6 w-6 text-brand-600" />
            Medicine Schedules
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure your active medication prescriptions, dosages, and custom reminder timings.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Medical Disclaimer Alert */}
      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <span className="font-semibold">Healthcare Reminder:</span> MediTrack is a schedule organizer and does not provide clinical or medical advice. Always consult your doctor or pharmacist for prescribed dosages and medication timings.
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search medicine by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </form>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterFrequency}
            onChange={(e) => setFilterFrequency(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="">All Frequencies</option>
            <option value="Once daily">Once daily</option>
            <option value="Twice daily">Twice daily</option>
            <option value="Three times daily">Three times daily</option>
            <option value="Four times daily">Four times daily</option>
            <option value="Weekly">Weekly</option>
            <option value="As needed">As needed</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {fetchError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button
            onClick={fetchMedicinesList}
            className="underline font-semibold hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading your scheduled medicines...</p>
        </div>
      ) : medicines.length === 0 ? (
        /* Empty state */
        <Card className="text-center py-12">
          <div className="w-14 h-14 mx-auto mb-4 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <Pill className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Medicines Scheduled</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            You have not added any medications yet. Add your daily prescriptions to receive timely reminders.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Your First Medicine</span>
          </button>
        </Card>
      ) : (
        /* Medicines List Table / Card View */
        <Card
          title="Active Prescriptions"
          subtitle={`${medicines.length} prescription(s) configured in your schedule`}
          icon={<Clock className="h-5 w-5" />}
          footer="Changes are saved instantly to your secure JSON storage on the server."
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Medicine & Instructions</th>
                  <th className="py-3 px-4">Dosage</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Reminder Times</th>
                  <th className="py-3 px-4">Schedule Dates</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <div className="flex items-center space-x-2">
                        <span className="p-1.5 bg-brand-50 text-brand-700 rounded-lg shrink-0">
                          <Pill className="h-3.5 w-3.5" />
                        </span>
                        <span>{med.name}</span>
                      </div>
                      {med.instructions && (
                        <p className="text-[11px] font-normal text-slate-400 mt-0.5 ml-7">
                          {med.instructions}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-mono text-xs">{med.dosage}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">
                        {med.frequency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(med.reminderTimes) && med.reminderTimes.map((time, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200"
                          >
                            <Clock className="h-3 w-3 mr-1 text-teal-600" />
                            {time}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                        <span>{med.startDate}</span>
                        {med.endDate && <span>&rarr; {med.endDate}</span>}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          onClick={() => handleOpenEditModal(med)}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="Edit Medicine"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(med.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Medicine"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-brand-50 text-brand-600 rounded-xl">
                  <Pill className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {modalMode === 'create' ? 'Add New Medicine' : 'Edit Medicine Schedule'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter prescription details provided by your healthcare provider
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Medicine Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Metformin, Lisinopril, Paracetamol"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.name ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                  }`}
                />
                {formErrors.name && <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>}
              </div>

              {/* Dosage & Frequency Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500 mg, 1 tablet, 10 ml"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.dosage ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                    }`}
                  />
                  {formErrors.dosage && <p className="text-[11px] text-rose-600 mt-1">{formErrors.dosage}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Frequency *
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  >
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
              </div>

              {/* Reminder Times (comma separated) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Reminder Times (24h HH:mm format, comma-separated) *
                </label>
                <input
                  type="text"
                  placeholder="e.g., 08:00, 20:00"
                  value={formData.reminderTimes}
                  onChange={(e) => setFormData({ ...formData, reminderTimes: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.reminderTimes ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                  }`}
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Use 24-hour time. Multiple times can be separated with commas (e.g. 08:00, 14:00, 20:00).
                </p>
                {formErrors.reminderTimes && <p className="text-[11px] text-rose-600 mt-0.5">{formErrors.reminderTimes}</p>}
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.startDate ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                    }`}
                  />
                  {formErrors.startDate && <p className="text-[11px] text-rose-600 mt-1">{formErrors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.endDate ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-brand-500/20 focus:border-brand-500'
                    }`}
                  />
                  {formErrors.endDate && <p className="text-[11px] text-rose-600 mt-1">{formErrors.endDate}</p>}
                </div>
              </div>

              {/* Optional Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g., Take with a full glass of water after food."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5"
                >
                  {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{modalMode === 'create' ? 'Save Medicine' : 'Update Schedule'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal Dialog */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Confirm Medicine Deletion</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this medicine from your schedule? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Delete Medicine</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
