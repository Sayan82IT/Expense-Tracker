import React from 'react';
import { Construction } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ComingSoon = ({ title }) => (
  <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col md:flex-row font-sans">
    <Sidebar />
    <main className="flex-1 flex items-center justify-center p-10">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4 text-emerald-400">
          <Construction size={28} />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-400 mt-2">This section is under construction.</p>
      </div>
    </main>
  </div>
);

export default ComingSoon;