import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Wallet,
  LayoutGrid,
  TrendingUp,
  TrendingDown,
  PieChart,
  Settings,
  Code2,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutGrid },
  { to: '/incomes', label: 'Incomes', icon: TrendingUp },
  { to: '/expenses', label: 'Expenses', icon: TrendingDown },
  { to: '/analytics', label: 'Analytics & Reports', icon: PieChart },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-[#0d1220] border-r border-slate-800/80 flex flex-col justify-between p-5 shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Wallet size={18} />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white leading-tight">ExpenseTrack</h1>
            <p className="text-[10px] text-emerald-400 font-mono tracking-wide">Expense Tracker</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-500 text-xs font-mono">
        <Code2 size={14} className="text-emerald-500" />
        Express API Wiring
      </div> */}
    </aside>
  );
};

export default Sidebar;