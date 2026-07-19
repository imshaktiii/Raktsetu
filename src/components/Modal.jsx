import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, accentColor = 'bg-gov-blue' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-4 animate-scale-up text-xs dark:bg-slate-900 dark:border-slate-800">
        {/* Top Accent Strip */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${accentColor}`}></div>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-350 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}
