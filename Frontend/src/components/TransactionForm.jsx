import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORY_OPTIONS = {
  income: ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'],
  expense: ['Housing', 'Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other'],
};

const TransactionForm = ({ type, onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: CATEGORY_OPTIONS[type][0],
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description || '',
        amount: initialData.amount ?? '',
        category: initialData.category || CATEGORY_OPTIONS[type][0],
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 10) : formData.date,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const accent = type === 'income' ? 'emerald' : 'rose';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      setError('Please fill in all fields');
      return;
    }
    if (Number(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ ...formData, amount: Number(formData.amount) });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save transaction');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 rounded-lg px-3 py-2.5 focus:outline-none focus:border-' +
    accent +
    '-500';

  return (
    <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-bold text-white">
          {initialData ? 'Edit' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}
        </h3>
        <button onClick={onCancel} className="text-slate-500 hover:text-slate-300">
          <X size={18} />
        </button>
      </div>

      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-300 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={type === 'income' ? 'e.g. Software Dev Salary' : 'e.g. Organic Supermarket'}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Amount ($)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            {CATEGORY_OPTIONS[type].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex gap-3 mt-2">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 bg-${accent}-500 hover:bg-${accent}-600 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 transition`}
          >
            {submitting ? 'Saving...' : initialData ? 'Update' : `Add ${type === 'income' ? 'Income' : 'Expense'}`}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg py-2.5 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;