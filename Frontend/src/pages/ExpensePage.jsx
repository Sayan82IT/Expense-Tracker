// import React, { useEffect, useState } from 'react';
// import { Plus, TrendingDown } from 'lucide-react';
// import Sidebar from '../components/Sidebar';
// import TransactionForm from '../components/TransactionForm';
// import TransactionList from '../components/TransactionList';
// import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';

// const ExpensePage = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   const loadExpenses = async () => {
//     try {
//       setLoading(true);
//       const res = await getExpenses();
//       setExpenses(res.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to load expenses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadExpenses();
//   }, []);

//   const handleAdd = async (formData) => {
//     await addExpense(formData);
//     setShowForm(false);
//     loadExpenses();
//   };

//   const handleUpdate = async (formData) => {
//     await updateExpense(editingItem._id, formData);
//     setEditingItem(null);
//     setShowForm(false);
//     loadExpenses();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this expense entry?')) return;
//     try {
//       await deleteExpense(id);
//       loadExpenses();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete');
//     }
//   };

//   const total = expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);

//   return (
//     <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col md:flex-row font-sans">
//       <Sidebar />

//       <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
//               <TrendingDown className="text-rose-400" size={24} /> Expenses
//             </h2>
//             <p className="text-sm text-slate-400 mt-0.5">
//               Total recorded: <span className="text-rose-400 font-semibold">${total.toFixed(2)}</span>
//             </p>
//           </div>
//           {!showForm && (
//             <button
//               onClick={() => { setEditingItem(null); setShowForm(true); }}
//               className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
//             >
//               <Plus size={16} /> Add Expense
//             </button>
//           )}
//         </div>

//         {error && (
//           <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-4 py-2.5">
//             {error}
//           </div>
//         )}

//         {showForm && (
//           <TransactionForm
//             type="expense"
//             initialData={editingItem}
//             onSubmit={editingItem ? handleUpdate : handleAdd}
//             onCancel={() => { setShowForm(false); setEditingItem(null); }}
//           />
//         )}

//         <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//           <h3 className="text-base font-bold text-white mb-4">All Expense Entries</h3>
//           {loading ? (
//             <div className="text-center py-10 text-slate-400 text-sm">Loading...</div>
//           ) : (
//             <TransactionList
//               transactions={expenses}
//               type="expense"
//               onEdit={(tx) => { setEditingItem(tx); setShowForm(true); }}
//               onDelete={handleDelete}
//             />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ExpensePage;



import React, { useEffect, useState } from 'react';
import { Plus, TrendingDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      setExpenses(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAdd = async (formData) => {
    await addExpense(formData);
    setShowForm(false);
    loadExpenses();
  };

  const handleUpdate = async (formData) => {
    await updateExpense(editingItem._id, formData);
    setEditingItem(null);
    setShowForm(false);
    loadExpenses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense entry?')) return;
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  const total = expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e17] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <TrendingDown className="text-rose-500 dark:text-rose-400" size={24} /> Expenses
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Total recorded: <span className="text-rose-500 dark:text-rose-400 font-semibold">${total.toFixed(2)}</span>
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => { setEditingItem(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <Plus size={16} /> Add Expense
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg px-4 py-2.5">
            {error}
          </div>
        )}

        {showForm && (
          <TransactionForm
            type="expense"
            initialData={editingItem}
            onSubmit={editingItem ? handleUpdate : handleAdd}
            onCancel={() => { setShowForm(false); setEditingItem(null); }}
          />
        )}

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">All Expense Entries</h3>
          {loading ? (
            <div className="text-center py-10 text-slate-400 dark:text-slate-400 text-sm">Loading...</div>
          ) : (
            <TransactionList
              transactions={expenses}
              type="expense"
              onEdit={(tx) => { setEditingItem(tx); setShowForm(true); }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ExpensePage;