// import React from 'react';

// const MetricCard = ({ label, value, icon: Icon, iconBg, iconColor, valueColor, footnote }) => {
//   return (
//     <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5">
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//           {label}
//         </span>
//         <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
//           <Icon size={16} />
//         </div>
//       </div>
//       <h3 className={`text-2xl font-bold tracking-tight ${valueColor || 'text-white'}`}>
//         {value}
//       </h3>
//       {footnote && <p className="text-xs text-slate-500 mt-2">{footnote}</p>}
//     </div>
//   );
// };

// export default MetricCard;



import React from 'react';

const MetricCard = ({ label, value, icon: Icon, iconBg, iconColor, valueColor, footnote }) => {
  return (
    <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
          <Icon size={16} />
        </div>
      </div>
      <h3 className={`text-2xl font-bold tracking-tight ${valueColor || 'text-slate-900 dark:text-white'}`}>
        {value}
      </h3>
      {footnote && <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{footnote}</p>}
    </div>
  );
};

export default MetricCard;