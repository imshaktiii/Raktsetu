import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8 text-center space-y-6">
        
        {/* Error Icon */}
        <div className="relative mx-auto w-20 h-20 bg-gov-red/10 rounded-full flex items-center justify-center animate-pulse-soft">
          <ShieldAlert className="w-10 h-10 text-gov-red" />
          <span className="absolute -top-1 -right-1 px-2.5 py-0.5 bg-gov-blue text-white rounded-full font-bold text-[10px]">
            404
          </span>
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            The portal address or resource you are looking for does not exist or has been shifted. Please verify the URL.
          </p>
        </div>

        {/* Helpline Notice */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-left">
          <Phone className="w-5 h-5 text-gov-blue shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 block">Emergency Services Available</span>
            If you are facing a critical blood requisition emergency, call Toll-Free Helpline at **1097** immediately.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            Home Portal
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
