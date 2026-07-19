import { Loader2 } from 'lucide-react';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false, 
  loading = false, 
  className = '' 
}) {
  const baseStyle = 'px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-gov-blue hover:bg-gov-blue-dark text-white active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none',
    secondary: 'bg-gov-red hover:bg-gov-red-dark text-white active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none',
    outline: 'border border-slate-200 hover:bg-slate-50 text-slate-700 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none'
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${selectedVariant} ${className}`}
    >
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {children}
    </button>
  );
}
