// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Wallet, 
//   TrendingUp, 
//   TrendingDown, 
//   DollarSign, 
//   LogOut, 
//   Search, 
//   Plus, 
//   Download, 
//   ArrowUpRight, 
//   ArrowDownRight,
//   User,
//   LayoutDashboard,
//   ReceiptText,
//   Settings
// } from 'lucide-react';
// import { AuthContext } from '../context/AuthContext';
// import { fetchDashboardData } from '../services/api';

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [summary, setSummary] = useState({ totalBalance: 0, totalIncome: 0, totalExpense: 0 });
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('all');

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetchDashboardData();
//         const data = response?.data || {};
        
//         setSummary(data.summary || { totalBalance: 0, totalIncome: 0, totalExpense: 0 });
//         setRecentTransactions(data.recentTransactions || []);
//       } catch (err) {
//         console.error('Failed to load dashboard data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Filter logic for searching transactions
//   const filteredTransactions = recentTransactions.filter((tx) => {
//     const matchesSearch = (tx.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           (tx.category || '').toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesTab = activeTab === 'all' ? true : tx.type === activeTab;
//     return matchesSearch && matchesTab;
//   });

//   return (
//     <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col md:flex-row font-sans">
      
//       {/* LEFT SIDEBAR NAVIGATION */}
//       <aside className="w-full md:w-64 bg-[#111827] border-r border-slate-800/80 p-6 flex flex-col justify-between">
//         <div>
//           {/* Brand Header */}
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-md">
//               <Wallet size={20} />
//             </div>
//             <div>
//               <h1 className="font-bold text-base text-white tracking-tight">ExpenseFlow</h1>
//               <p className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">MERN Dashboard</p>
//             </div>
//           </div>

//           {/* Nav Links */}
//           <nav className="space-y-1.5">
//             <button 
//               onClick={() => setActiveTab('all')}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
//                 activeTab === 'all' 
//                   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
//                   : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
//               }`}
//             >
//               <LayoutDashboard size={18} /> Overview
//             </button>
//             <button 
//               onClick={() => setActiveTab('income')}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
//                 activeTab === 'income' 
//                   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
//                   : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
//               }`}
//             >
//               <TrendingUp size={18} /> Incomes
//             </button>
//             <button 
//               onClick={() => setActiveTab('expense')}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
//                 activeTab === 'expense' 
//                   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
//                   : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
//               }`}
//             >
//               <TrendingDown size={18} /> Expenses
//             </button>
//           </nav>
//         </div>

//         {/* User Profile Card & Signout */}
//         <div className="pt-6 border-t border-slate-800/80 mt-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-sm">
//               {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
//             </div>
//             <div className="overflow-hidden">
//               <p className="text-sm font-semibold text-white truncate">{user?.name || 'Authenticated User'}</p>
//               <p className="text-xs text-slate-400 truncate">{user?.email || 'user@example.com'}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold border border-red-500/20 transition active:scale-[0.98]"
//           >
//             <LogOut size={16} /> Logout
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        
//         {/* Top Bar Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-white tracking-tight">Financial Overview</h2>
//             <p className="text-sm text-slate-400 mt-0.5">Welcome back! Here is a summary of your personal account activity.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 bg-[#111827] hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-xl text-sm font-semibold transition">
//               <Download size={16} /> Export
//             </button>
//             <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-emerald-950/50 active:scale-[0.98]">
//               <Plus size={16} /> New Entry
//             </button>
//           </div>
//         </div>

//         {/* METRICS CARDS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
//           {/* Card 1: Total Balance */}
//           <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Balance</span>
//               <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
//                 <DollarSign size={18} />
//               </div>
//             </div>
//             <h3 className="text-3xl font-extrabold text-white tracking-tight">
//               ${summary.totalBalance.toLocaleString()}
//             </h3>
//             <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 font-medium">
//               <ArrowUpRight size={14} />
//               <span>Available balance across accounts</span>
//             </div>
//           </div>

//           {/* Card 2: Total Income */}
//           <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Income</span>
//               <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
//                 <TrendingUp size={18} />
//               </div>
//             </div>
//             <h3 className="text-3xl font-extrabold text-emerald-400 tracking-tight">
//               +${summary.totalIncome.toLocaleString()}
//             </h3>
//             <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 font-medium">
//               <span>Recorded incoming deposits</span>
//             </div>
//           </div>

//           {/* Card 3: Total Expense */}
//           <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Expense</span>
//               <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
//                 <TrendingDown size={18} />
//               </div>
//             </div>
//             <h3 className="text-3xl font-extrabold text-red-400 tracking-tight">
//               -${summary.totalExpense.toLocaleString()}
//             </h3>
//             <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 font-medium">
//               <span>Recorded outgoing payments</span>
//             </div>
//           </div>

//         </div>

//         {/* TRANSACTIONS SECTION */}
//         <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-xl">
          
//           {/* Header & Search Bar */}
//           <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
//             <div>
//               <h3 className="text-lg font-bold text-white">Recent Activity</h3>
//               <p className="text-xs text-slate-400 mt-0.5">Your latest financial transactions</p>
//             </div>
//             <div className="relative flex-1 max-w-xs">
//               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 transition"
//               />
//             </div>
//           </div>

//           {/* Transactions List / Table */}
//           {loading ? (
//             <div className="text-center py-12 text-slate-400 text-sm">Loading transactions data...</div>
//           ) : filteredTransactions.length === 0 ? (
//             <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
//               <ReceiptText className="mx-auto text-slate-600 mb-2" size={32} />
//               <p className="text-slate-400 text-sm font-medium">No recent transactions found.</p>
//               <p className="text-slate-600 text-xs mt-1">Try adjusting your filter or search query.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
//                     <th className="py-3 px-4">Transaction Details</th>
//                     <th className="py-3 px-4">Category</th>
//                     <th className="py-3 px-4">Type</th>
//                     <th className="py-3 px-4 text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-800/60 text-sm">
//                   {filteredTransactions.map((tx) => (
//                     <tr key={tx._id || Math.random()} className="hover:bg-slate-900/40 transition">
                      
//                       {/* Title & Date */}
//                       <td className="py-4 px-4 font-medium text-white">
//                         <div className="flex items-center gap-3">
//                           <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
//                             {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//                           </div>
//                           <div>
//                             <p className="font-semibold text-slate-200">{tx.title || 'Untitled Transaction'}</p>
//                             <p className="text-xs text-slate-500">{tx.date ? new Date(tx.date).toLocaleDateString() : 'N/A'}</p>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Category */}
//                       <td className="py-4 px-4">
//                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
//                           {tx.category || 'General'}
//                         </span>
//                       </td>

//                       {/* Type Badge */}
//                       <td className="py-4 px-4">
//                         <span className={`capitalize text-xs font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
//                           {tx.type}
//                         </span>
//                       </td>

//                       {/* Amount */}
//                       <td className={`py-4 px-4 text-right font-bold text-base ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
//                         {tx.type === 'income' ? '+' : '-'}${Number(tx.amount || 0).toLocaleString()}
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//         </div>

//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Wallet,
//   TrendingUp,
//   TrendingDown,
//   BarChart3,
//   Sun,
//   Bell,
//   ChevronDown,
//   Plus,
//   Download,
//   ArrowUpRight,
//   ArrowDownRight,
//   LogOut,
//   User,
// } from 'lucide-react';
// import { AuthContext } from '../context/AuthContext';
// import { fetchDashboardData } from '../services/api';
// import Sidebar from '../components/Sidebar';
// import MetricCard from '../components/MetricCard';

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const menuRef = useRef(null);

//   const [data, setData] = useState({
//     monthlyIncome: 0,
//     monthlyExpense: 0,
//     savings: 0,
//     savingsRate: 0,
//     recentTransactions: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const res = await fetchDashboardData();
//         setData(res.data?.data || {});
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load dashboard data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const handleExportCSV = () => {
//     const rows = data.recentTransactions || [];
//     if (rows.length === 0) return;

//     const header = ['Description', 'Category', 'Type', 'Date', 'Amount'];
//     const lines = rows.map((tx) => [
//       `"${(tx.description || '').replace(/"/g, '""')}"`,
//       tx.category || '',
//       tx.type || '',
//       tx.date ? new Date(tx.date).toLocaleDateString() : '',
//       tx.amount ?? 0,
//     ].join(','));

//     const csvContent = [header.join(','), ...lines].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   const recent = (data.recentTransactions || []).slice(0, 5);

//   return (
//     <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col md:flex-row font-sans">
//       <Sidebar />

//       <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto">
//         {/* Top bar */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
//             <p className="text-sm text-slate-400 mt-0.5">
//               Real-time financial sync connected to Express MERN API.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#111827] border border-slate-800 text-slate-300 hover:bg-slate-800 transition">
//               <Sun size={17} />
//             </button>
//             <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#111827] border border-slate-800 text-slate-300 hover:bg-slate-800 transition">
//               <Bell size={17} />
//               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
//             </button>

//             <div className="relative" ref={menuRef}>
//               <button
//                 onClick={() => setMenuOpen((p) => !p)}
//                 className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white pl-2 pr-3 py-2 rounded-xl text-sm font-semibold transition"
//               >
//                 <span className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">
//                   {user?.name?.[0]?.toUpperCase() || 'U'}
//                 </span>
//                 {user?.name || 'User'}
//                 <ChevronDown size={14} className={`transition ${menuOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {menuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-slate-800 rounded-xl shadow-xl overflow-hidden z-10">
//                   <button
//                     onClick={() => { setMenuOpen(false); navigate('/profile'); }}
//                     className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition"
//                   >
//                     <User size={15} /> My Profile
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800 transition border-t border-slate-800"
//                   >
//                     <LogOut size={15} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-4 py-2.5">
//             {error}
//           </div>
//         )}

//         {/* Metric cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           <MetricCard
//             label="Total Balance"
//             value={`$${Number(data.savings || 0).toFixed(2)}`}
//             icon={Wallet}
//             iconBg="bg-emerald-500/10"
//             iconColor="text-emerald-400"
//             footnote="Net available funds"
//           />
//           <MetricCard
//             label="Total Income"
//             value={`$${Number(data.monthlyIncome || 0).toFixed(2)}`}
//             icon={ArrowUpRight}
//             iconBg="bg-emerald-500/10"
//             iconColor="text-emerald-400"
//             valueColor="text-emerald-400"
//             footnote="Recorded revenue"
//           />
//           <MetricCard
//             label="Total Expense"
//             value={`$${Number(data.monthlyExpense || 0).toFixed(2)}`}
//             icon={ArrowDownRight}
//             iconBg="bg-red-500/10"
//             iconColor="text-red-400"
//             valueColor="text-red-400"
//             footnote="Recorded outgoings"
//           />
//           <MetricCard
//             label="Savings Rate"
//             value={`${Number(data.savingsRate || 0)}%`}
//             icon={BarChart3}
//             iconBg="bg-blue-500/10"
//             iconColor="text-blue-400"
//             valueColor="text-blue-400"
//             footnote="Income retained"
//           />
//         </div>

//         {/* Action buttons */}
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate('/incomes')}
//               className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
//             >
//               <Plus size={16} /> Add Income
//             </button>
//             <button
//               onClick={() => navigate('/expenses')}
//               className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
//             >
//               <Plus size={16} /> Add Expense
//             </button>
//           </div>
//           <button
//             onClick={handleExportCSV}
//             className="flex items-center gap-2 bg-[#111827] hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
//           >
//             <Download size={16} /> Export CSV / Excel
//           </button>
//         </div>

//         {/* Recent transactions */}
//         <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-base font-bold text-white">Recent Transactions</h3>
//             <span className="text-xs text-slate-500">Showing top {recent.length} entries</span>
//           </div>

//           {loading ? (
//             <div className="text-center py-10 text-slate-400 text-sm">Loading transactions...</div>
//           ) : recent.length === 0 ? (
//             <div className="text-center py-10 text-slate-500 text-sm">No transactions this month yet.</div>
//           ) : (
//             <div className="divide-y divide-slate-800/60">
//               {recent.map((tx) => {
//                 const isIncome = tx.type === 'income';
//                 return (
//                   <div key={tx._id} className="flex items-center justify-between py-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
//                         {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-white">{tx.description}</p>
//                         <p className="text-xs text-slate-500">
//                           {tx.category} • {new Date(tx.date).toLocaleDateString('en-CA')}
//                         </p>
//                       </div>
//                     </div>
//                     <span className={`text-sm font-bold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
//                       {isIncome ? '+' : '-'}${Number(tx.amount).toFixed(2)}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  BarChart3,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  User,
  BellOff,
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { fetchDashboardData } from '../services/api';
import Sidebar from '../components/Sidebar';
import MetricCard from '../components/MetricCard';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  const [data, setData] = useState({
    monthlyIncome: 0,
    monthlyExpense: 0,
    savings: 0,
    savingsRate: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchDashboardData();
        setData(res.data?.data || {});
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExportCSV = () => {
    const rows = data.recentTransactions || [];
    if (rows.length === 0) return;

    const header = ['Description', 'Category', 'Type', 'Date', 'Amount'];
    const lines = rows.map((tx) => [
      `"${(tx.description || '').replace(/"/g, '""')}"`,
      tx.category || '',
      tx.type || '',
      tx.date ? new Date(tx.date).toLocaleDateString() : '',
      tx.amount ?? 0,
    ].join(','));

    const csvContent = [header.join(','), ...lines].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const recent = (data.recentTransactions || []).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e17] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time expense tracking web application.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((p) => !p)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Bell size={17} />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-20">
                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
                  </div>
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <BellOff className="text-slate-300 dark:text-slate-600 mb-2" size={24} />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No new notifications</p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">You're all caught up.</p>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white pl-2 pr-3 py-2 rounded-xl text-sm font-semibold transition"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
                {user?.name || 'User'}
                <ChevronDown size={14} className={`transition ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-20">
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/settings'); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <User size={15} /> My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition border-t border-slate-200 dark:border-slate-800"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg px-4 py-2.5">
            {error}
          </div>
        )}

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            label="Total Balance"
            value={`$${Number(data.savings || 0).toFixed(2)}`}
            icon={Wallet}
            iconBg="bg-emerald-500/10"
            iconColor="text-emerald-500 dark:text-emerald-400"
            footnote="Net available funds"
          />
          <MetricCard
            label="Total Income"
            value={`$${Number(data.monthlyIncome || 0).toFixed(2)}`}
            icon={ArrowUpRight}
            iconBg="bg-emerald-500/10"
            iconColor="text-emerald-500 dark:text-emerald-400"
            valueColor="text-emerald-500 dark:text-emerald-400"
            footnote="Recorded revenue"
          />
          <MetricCard
            label="Total Expense"
            value={`$${Number(data.monthlyExpense || 0).toFixed(2)}`}
            icon={ArrowDownRight}
            iconBg="bg-red-500/10"
            iconColor="text-red-500 dark:text-red-400"
            valueColor="text-red-500 dark:text-red-400"
            footnote="Recorded outgoings"
          />
          <MetricCard
            label="Savings Rate"
            value={`${Number(data.savingsRate || 0)}%`}
            icon={BarChart3}
            iconBg="bg-blue-500/10"
            iconColor="text-blue-500 dark:text-blue-400"
            valueColor="text-blue-500 dark:text-blue-400"
            footnote="Income retained"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/incomes')}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <Plus size={16} /> Add Income
            </button>
            <button
              onClick={() => navigate('/expenses')}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <Plus size={16} /> Add Expense
            </button>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-[#111827] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <Download size={16} /> Export CSV / Excel
          </button>
        </div>

        {/* Recent transactions */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
            <span className="text-xs text-slate-400 dark:text-slate-500">Showing top {recent.length} entries</span>
          </div>

          {loading ? (
            <div className="text-center py-10 text-slate-400 dark:text-slate-400 text-sm">Loading transactions...</div>
          ) : recent.length === 0 ? (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">No transactions this month yet.</div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {recent.map((tx) => {
                const isIncome = tx.type === 'income';
                return (
                  <div key={tx._id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isIncome ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500 dark:text-rose-400'}`}>
                        {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{tx.description}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {tx.category} • {new Date(tx.date).toLocaleDateString('en-CA')}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${isIncome ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                      {isIncome ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;