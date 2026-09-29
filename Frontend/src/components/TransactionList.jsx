import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, type, onEdit, onDelete }) => {
  const accent = type === 'income' ? 'emerald' : 'rose';

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl">
        No {type === 'income' ? 'income' : 'expense'} entries yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-800/60">
      {transactions.map((tx) => (
        <div key={tx._id} className="flex items-center justify-between py-4 group">
          <div>
            <p className="text-sm font-semibold text-white">{tx.description}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {tx.category} • {new Date(tx.date).toLocaleDateString('en-CA')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold text-${accent}-400`}>
              {type === 'income' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
            </span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => onEdit(tx)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(tx._id)}
                className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;