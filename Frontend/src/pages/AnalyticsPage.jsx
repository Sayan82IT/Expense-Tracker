// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import { TrendingUp, TrendingDown, Wallet, ListOrdered } from 'lucide-react';
// import Sidebar from '../components/Sidebar';
// import { getIncomeOverview, getExpenseOverview } from '../services/api';

// const RANGES = [
//   { value: 'daily', label: 'Today' },
//   { value: 'weekly', label: 'This Week' },
//   { value: 'monthly', label: 'This Month' },
//   { value: 'yearly', label: 'This Year' },
// ];

// const EXPENSE_COLORS = ['#f43f5e', '#fb923c', '#facc15', '#a78bfa', '#38bdf8', '#f472b6', '#94a3b8'];
// const INCOME_COLORS = ['#34d399', '#4ade80', '#2dd4bf', '#a3e635', '#22d3ee', '#818cf8', '#94a3b8'];

// const AnalyticsPage = () => {
//   const [range, setRange] = useState('monthly');
//   const [income, setIncome] = useState(null);
//   const [expense, setExpense] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         setError('');
//         const [incRes, expRes] = await Promise.all([
//           getIncomeOverview(range),
//           getExpenseOverview(range),
//         ]);
//         setIncome(incRes.data?.data || null);
//         setExpense(expRes.data?.data || null);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load analytics');
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [range]);

//   const totalIncome = income?.totalIncome || 0;
//   const totalExpense = expense?.totalExpenses || 0;
//   const net = totalIncome - totalExpense;

//   const comparisonData = [
//     { name: 'Income', value: totalIncome },
//     { name: 'Expense', value: totalExpense },
//   ];

//   const combinedRecent = [
//     ...(income?.recentTransactions || []).map((t) => ({ ...t, type: 'income' })),
//     ...(expense?.recentTransactions || []).map((t) => ({ ...t, type: 'expense' })),
//   ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

//   return (
//     <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col md:flex-row font-sans">
//       <Sidebar />

//       <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-white tracking-tight">Analytics & Reports</h2>
//             <p className="text-sm text-slate-400 mt-0.5">Breakdown of income and expenses by category</p>
//           </div>

//           <div className="flex bg-[#111827] border border-slate-800 rounded-xl p-1">
//             {RANGES.map((r) => (
//               <button
//                 key={r.value}
//                 onClick={() => setRange(r.value)}
//                 className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
//                   range === r.value
//                     ? 'bg-emerald-500 text-white'
//                     : 'text-slate-400 hover:text-slate-200'
//                 }`}
//               >
//                 {r.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-4 py-2.5">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="text-center py-16 text-slate-400 text-sm">Loading analytics...</div>
//         ) : (
//           <>
//             {/* Summary cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//               <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Income</span>
//                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
//                     <TrendingUp size={16} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-emerald-400">${totalIncome.toFixed(2)}</h3>
//                 <p className="text-xs text-slate-500 mt-1">{income?.numberOfTransactions || 0} transactions</p>
//               </div>

//               <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Expense</span>
//                   <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
//                     <TrendingDown size={16} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-rose-400">${totalExpense.toFixed(2)}</h3>
//                 <p className="text-xs text-slate-500 mt-1">{expense?.numberOfTransactions || 0} transactions</p>
//               </div>

//               <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Net Savings</span>
//                   <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
//                     <Wallet size={16} />
//                   </div>
//                 </div>
//                 <h3 className={`text-2xl font-bold ${net >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
//                   ${net.toFixed(2)}
//                 </h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   {totalIncome === 0 ? '0' : ((net / totalIncome) * 100).toFixed(1)}% of income retained
//                 </p>
//               </div>
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Income vs Expense bar */}
//               <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//                 <h3 className="text-base font-bold text-white mb-4">Income vs Expense</h3>
//                 {totalIncome === 0 && totalExpense === 0 ? (
//                   <div className="text-center py-16 text-slate-500 text-sm">No data for this period.</div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height={260}>
//                     <BarChart data={comparisonData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//                       <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
//                       <YAxis stroke="#64748b" fontSize={12} />
//                       <Tooltip
//                         contentStyle={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: 8 }}
//                         labelStyle={{ color: '#e2e8f0' }}
//                       />
//                       <Bar dataKey="value" radius={[6, 6, 0, 0]}>
//                         <Cell fill="#34d399" />
//                         <Cell fill="#f43f5e" />
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>

//               {/* Expense by category pie */}
//               <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//                 <h3 className="text-base font-bold text-white mb-4">Expense by Category</h3>
//                 {(expense?.categoryDistribution || []).length === 0 ? (
//                   <div className="text-center py-16 text-slate-500 text-sm">No expenses recorded yet.</div>
//                 ) : (
//                   <>
//                     <ResponsiveContainer width="100%" height={220}>
//                       <PieChart>
//                         <Pie
//                           data={expense.categoryDistribution}
//                           dataKey="amount"
//                           nameKey="category"
//                           innerRadius={55}
//                           outerRadius={90}
//                           paddingAngle={2}
//                         >
//                           {expense.categoryDistribution.map((_, i) => (
//                             <Cell key={i} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip
//                           contentStyle={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: 8 }}
//                           formatter={(value) => `$${Number(value).toFixed(2)}`}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                     <div className="grid grid-cols-2 gap-2 mt-4">
//                       {expense.categoryDistribution.map((c, i) => (
//                         <div key={c.category} className="flex items-center gap-2 text-xs text-slate-300">
//                           <span
//                             className="w-2.5 h-2.5 rounded-full shrink-0"
//                             style={{ background: EXPENSE_COLORS[i % EXPENSE_COLORS.length] }}
//                           />
//                           <span className="truncate">{c.category}</span>
//                           <span className="ml-auto text-slate-500">{c.percent}%</span>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Income by source pie */}
//             <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//               <h3 className="text-base font-bold text-white mb-4">Income by Source</h3>
//               {(income?.categoryDistribution || []).length === 0 ? (
//                 <div className="text-center py-10 text-slate-500 text-sm">No income recorded yet.</div>
//               ) : (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
//                   <ResponsiveContainer width="100%" height={220}>
//                     <PieChart>
//                       <Pie
//                         data={income.categoryDistribution}
//                         dataKey="amount"
//                         nameKey="category"
//                         innerRadius={55}
//                         outerRadius={90}
//                         paddingAngle={2}
//                       >
//                         {income.categoryDistribution.map((_, i) => (
//                           <Cell key={i} fill={INCOME_COLORS[i % INCOME_COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Tooltip
//                         contentStyle={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: 8 }}
//                         formatter={(value) => `$${Number(value).toFixed(2)}`}
//                       />
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="grid grid-cols-2 gap-2">
//                     {income.categoryDistribution.map((c, i) => (
//                       <div key={c.category} className="flex items-center gap-2 text-xs text-slate-300">
//                         <span
//                           className="w-2.5 h-2.5 rounded-full shrink-0"
//                           style={{ background: INCOME_COLORS[i % INCOME_COLORS.length] }}
//                         />
//                         <span className="truncate">{c.category}</span>
//                         <span className="ml-auto text-slate-500">{c.percent}%</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Recent combined transactions */}
//             <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <ListOrdered size={18} className="text-slate-400" />
//                 <h3 className="text-base font-bold text-white">Recent Transactions ({RANGES.find(r => r.value === range)?.label})</h3>
//               </div>
//               {combinedRecent.length === 0 ? (
//                 <div className="text-center py-10 text-slate-500 text-sm">No transactions in this period.</div>
//               ) : (
//                 <div className="divide-y divide-slate-800/60">
//                   {combinedRecent.map((tx) => (
//                     <div key={tx._id} className="flex items-center justify-between py-3">
//                       <div>
//                         <p className="text-sm font-semibold text-white">{tx.description}</p>
//                         <p className="text-xs text-slate-500">
//                           {tx.category} • {new Date(tx.date).toLocaleDateString('en-CA')}
//                         </p>
//                       </div>
//                       <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
//                         {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AnalyticsPage;


import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, ListOrdered } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getIncomeOverview, getExpenseOverview } from '../services/api';

const RANGES = [
  { value: 'daily', label: 'Today' },
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
];

const EXPENSE_COLORS = ['#f43f5e', '#fb923c', '#facc15', '#a78bfa', '#38bdf8', '#f472b6', '#94a3b8'];
const INCOME_COLORS = ['#34d399', '#4ade80', '#2dd4bf', '#a3e635', '#22d3ee', '#818cf8', '#94a3b8'];

const AnalyticsPage = () => {
  const [range, setRange] = useState('monthly');
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const [incRes, expRes] = await Promise.all([
          getIncomeOverview(range),
          getExpenseOverview(range),
        ]);
        setIncome(incRes.data?.data || null);
        setExpense(expRes.data?.data || null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [range]);

  const totalIncome = income?.totalIncome || 0;
  const totalExpense = expense?.totalExpenses || 0;
  const net = totalIncome - totalExpense;

  const comparisonData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  const combinedRecent = [
    ...(income?.recentTransactions || []).map((t) => ({ ...t, type: 'income' })),
    ...(expense?.recentTransactions || []).map((t) => ({ ...t, type: 'expense' })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e17] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Analytics & Reports</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Breakdown of income and expenses by category</p>
          </div>

          <div className="flex bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-1">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  range === r.value
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg px-4 py-2.5">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-slate-400 dark:text-slate-400 text-sm">Loading analytics...</div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">Total Income</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">${totalIncome.toFixed(2)}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{income?.numberOfTransactions || 0} transactions</p>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">Total Expense</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center">
                    <TrendingDown size={16} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-rose-500 dark:text-rose-400">${totalExpense.toFixed(2)}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{expense?.numberOfTransactions || 0} transactions</p>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">Net Savings</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                    <Wallet size={16} />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold ${net >= 0 ? 'text-blue-500 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400'}`}>
                  ${net.toFixed(2)}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  {totalIncome === 0 ? '0' : ((net / totalIncome) * 100).toFixed(1)}% of income retained
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Income vs Expense</h3>
                {totalIncome === 0 && totalExpense === 0 ? (
                  <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">No data for this period.</div>
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        <Cell fill="#34d399" />
                        <Cell fill="#f43f5e" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Expense by Category</h3>
                {(expense?.categoryDistribution || []).length === 0 ? (
                  <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">No expenses recorded yet.</div>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={expense.categoryDistribution}
                          dataKey="amount"
                          nameKey="category"
                          innerRadius={55}
                          outerRadius={90}
                          paddingAngle={2}
                        >
                          {expense.categoryDistribution.map((_, i) => (
                            <Cell key={i} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }}
                          formatter={(value) => `$${Number(value).toFixed(2)}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {expense.categoryDistribution.map((c, i) => (
                        <div key={c.category} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: EXPENSE_COLORS[i % EXPENSE_COLORS.length] }}
                          />
                          <span className="truncate">{c.category}</span>
                          <span className="ml-auto text-slate-400 dark:text-slate-500">{c.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Income by source pie */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Income by Source</h3>
              {(income?.categoryDistribution || []).length === 0 ? (
                <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">No income recorded yet.</div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={income.categoryDistribution}
                        dataKey="amount"
                        nameKey="category"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={2}
                      >
                        {income.categoryDistribution.map((_, i) => (
                          <Cell key={i} fill={INCOME_COLORS[i % INCOME_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }}
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2">
                    {income.categoryDistribution.map((c, i) => (
                      <div key={c.category} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: INCOME_COLORS[i % INCOME_COLORS.length] }}
                        />
                        <span className="truncate">{c.category}</span>
                        <span className="ml-auto text-slate-400 dark:text-slate-500">{c.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent combined transactions */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ListOrdered size={18} className="text-slate-400 dark:text-slate-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Transactions ({RANGES.find(r => r.value === range)?.label})</h3>
              </div>
              {combinedRecent.length === 0 ? (
                <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">No transactions in this period.</div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  {combinedRecent.map((tx) => (
                    <div key={tx._id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{tx.description}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {tx.category} • {new Date(tx.date).toLocaleDateString('en-CA')}
                        </p>
                      </div>
                      <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                        {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AnalyticsPage;