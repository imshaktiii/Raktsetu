export default function DashboardCard({ title, count, color = 'blue', className = '' }) {
  // Pre-configured style variations for unified design token usage
  const styles = {
    blue: 'text-gov-blue border-gov-blue/10 bg-gov-blue/5 dark:bg-gov-blue/10',
    red: 'text-gov-red border-gov-red/10 bg-gov-red/5 dark:bg-gov-red/10 font-bold',
    gold: 'text-gov-gold border-gov-gold/15 bg-gov-gold/5 dark:bg-gov-gold/10',
    purple: 'text-purple-700 border-purple-100 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-800/40',
    emerald: 'text-emerald-700 border-emerald-100 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-800/40',
    slate: 'text-slate-705 border-slate-200 bg-slate-100/50 dark:bg-slate-800/20 dark:border-slate-800'
  };

  const selectedStyle = styles[color] || styles.blue;

  return (
    <div className={`p-4 rounded-2xl border shadow-sm flex flex-col justify-between h-[100px] transition-all hover:shadow-md ${selectedStyle} ${className}`}>
      <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{title}</span>
      <span className="text-2xl sm:text-3xl font-black tracking-tight">{count}</span>
    </div>
  );
}
