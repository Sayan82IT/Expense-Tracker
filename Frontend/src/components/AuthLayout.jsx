import React from 'react';
import { Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login' || location.pathname === '/';

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0e17] px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4">
            <Wallet className="text-emerald-400" size={26} />
          </div>
          <h1 className="text-2xl font-bold text-white">ExpenseTrack</h1>
          <p className="text-sm text-indigo-400 mt-1">Full-stack Expense Tracking Web Application</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex bg-[#0b0f19] rounded-lg p-1 mb-6">
            <Link
              to="/login"
              className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition ${
                isLogin ? 'bg-emerald-500 text-white' : 'text-slate-400'
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition ${
                !isLogin ? 'bg-emerald-500 text-white' : 'text-slate-400'
              }`}
            >
              Create Account
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;







// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Wallet, TrendingUp, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

// const AuthLayout = ({ children }) => {
//   const location = useLocation();
//   const isLogin = location.pathname === '/login' || location.pathname === '/';

//   return (
//     <div className="min-h-screen w-full flex bg-[#0a0e17] text-slate-100 selection:bg-emerald-500 selection:text-white">
//       {/* Left Column: Premium Branding & Feature Hero Section (Visible on Large Screens) */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-950/30 via-[#0d1322] to-[#0a0e17] p-12 flex-col justify-between overflow-hidden border-r border-slate-800/80">
//         {/* Glow Effects */}
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

//         {/* Top Header / Logo */}
//         <div className="flex items-center gap-3 relative z-10">
//           <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
//             <Wallet size={26} />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-emerald-400">
//               ExpenseFlow MERN
//             </h1>
//             <p className="text-[11px] text-emerald-400/90 font-medium tracking-wider uppercase">
//               Full-Stack Financial Management
//             </p>
//           </div>
//         </div>

//         {/* Center Hero Content */}
//         <div className="relative z-10 my-auto max-w-lg space-y-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
//             <Sparkles size={14} />
//             <span>Smart Personal Expense Tracking</span>
//           </div>

//           <h2 className="text-4xl font-extrabold leading-tight text-white tracking-tight">
//             Take complete control of your <span className="text-emerald-400">financial health.</span>
//           </h2>

//           <p className="text-slate-400 text-sm leading-relaxed">
//             Seamlessly record income streams, monitor category-wise spending habits, and export structured ledger reports powered by MongoDB, Express, React, and Node.js.
//           </p>

//           {/* Feature Highlights Grid */}
//           <div className="grid grid-cols-2 gap-4 pt-4">
//             <div className="p-4 rounded-xl bg-[#111827]/80 border border-slate-800 backdrop-blur-sm">
//               <TrendingUp className="text-emerald-400 mb-2" size={20} />
//               <h3 className="font-semibold text-sm text-slate-200">Income & Expense Logs</h3>
//               <p className="text-xs text-slate-400 mt-1">Real-time balances with instant query filtering.</p>
//             </div>
//             <div className="p-4 rounded-xl bg-[#111827]/80 border border-slate-800 backdrop-blur-sm">
//               <BarChart3 className="text-teal-400 mb-2" size={20} />
//               <h3 className="font-semibold text-sm text-slate-200">Excel Export Utility</h3>
//               <p className="text-xs text-slate-400 mt-1">Download raw financial sheets directly from backend.</p>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Footer Note */}
//         <div className="relative z-10 flex items-center gap-2 text-xs text-slate-500">
//           <ShieldCheck size={16} className="text-emerald-500" />
//           <span>JWT Protected Sessions & Express API Encryption</span>
//         </div>
//       </div>

//       {/* Right Column: Form Container */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
//         <div className="w-full max-w-md">
//           {/* Header Title (Mobile View Logo + Title) */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="w-14 h-14 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center mb-4 shadow-lg shadow-emerald-950/50">
//               <Wallet className="text-emerald-400" size={28} />
//             </div>
//             <h1 className="text-2xl font-bold text-white tracking-tight">ExpenseFlow MERN</h1>
//             <p className="text-sm text-indigo-400 mt-1">Full-stack Financial Management Interface</p>
//           </div>

//           {/* Main Card */}
//           <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
//             {/* Nav Tabs */}
//             <div className="flex bg-[#0b0f19] rounded-xl p-1 mb-6 border border-slate-800/80">
//               <Link
//                 to="/login"
//                 className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
//                   isLogin
//                     ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/50'
//                     : 'text-slate-400 hover:text-slate-200'
//                 }`}
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
//                   !isLogin
//                     ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/50'
//                     : 'text-slate-400 hover:text-slate-200'
//                 }`}
//               >
//                 Create Account
//               </Link>
//             </div>

//             {/* Child Forms (Login, Register, etc.) */}
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;