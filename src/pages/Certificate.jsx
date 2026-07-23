import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfileImageUrl } from '../utils/image';
import { certificateAPI } from '../api/certificate';
import { 
  Loader2, 
  AlertTriangle, 
  Printer, 
  Download, 
  Award,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export default function Certificate() {
  const { donorId: paramDonorId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [donorData, setDonorData] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Read logged-in donor
  const localUser = JSON.parse(localStorage.getItem('raktsetu_user') || '{}');
  const donorId = paramDonorId || user?.id || user?._id || localUser.id || localUser._id;

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!donorId) {
        setError('No registered donor found in session. Please log in.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await certificateAPI.getCertificateData(donorId);
        if (data && data.success) {
          setDonorData(data.donor);
        } else {
          setError('Failed to fetch certificate metadata.');
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to the national certificate database.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [donorId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Triggers standard print dialog configured to Save as PDF
    setToast('Generating print-ready PDF vector...');
    setTimeout(() => {
      setToast(null);
      window.print();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3 text-xs font-semibold text-slate-550">
        <Loader2 className="w-8 h-8 text-gov-red animate-spin" />
        <p>Generating digital certificate document...</p>
      </div>
    );
  }

  if (error || !donorData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-800 text-sm">Certificate Generation Failure</h4>
            <p className="text-xs text-red-700 mt-1">{error || 'Donor records could not be verified.'}</p>
            <Link to="/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gov-blue hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Action panel (Hidden on Print) */}
      <div className="w-full max-w-4xl bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 no-print text-xs font-bold">
        <Link to="/profile" className="text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print Certificate
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Printable Certificate wrapper (A4 Landscape aspect) */}
      <div 
        id="printable-certificate" 
        className="w-full max-w-[1000px] aspect-[1.414/1] bg-white p-12 relative border-[12px] border-double border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between"
      >
        {/* Saffron and Green Corner Accents */}
        <div className="absolute top-0 left-0 w-24 h-2 bg-gov-red"></div>
        <div className="absolute top-0 left-0 w-2 h-24 bg-gov-red"></div>
        <div className="absolute bottom-0 right-0 w-24 h-2 bg-emerald-600"></div>
        <div className="absolute bottom-0 right-0 w-2 h-24 bg-emerald-600"></div>

        {/* Central Ashoka Chakra Watermark background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035]">
          <svg viewBox="0 0 100 100" className="w-[450px] h-[450px] text-gov-blue" fill="currentColor">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="5" />
            {Array.from({ length: 24 }).map((_, idx) => (
              <line 
                key={idx} 
                x1="50" 
                y1="50" 
                x2={50 + 40 * Math.cos((idx * 2 * Math.PI) / 24)} 
                y2={50 + 40 * Math.sin((idx * 2 * Math.PI) / 24)} 
                stroke="currentColor" 
                strokeWidth="1" 
              />
            ))}
          </svg>
        </div>

        {/* Header Block */}
        <div className="text-center space-y-2 relative z-10">
          <div className="flex items-center justify-center gap-3">
            {/* Gov Seal/Logo Emblem placeholder */}
            <div className="w-12 h-12 text-gov-red flex items-center justify-center shrink-0">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <h5 className="font-bold text-[10px] tracking-widest text-slate-500 uppercase">Ministry of Health & Family Welfare</h5>
              <h4 className="font-black text-xs text-slate-800 tracking-tight uppercase">Government of India</h4>
            </div>
          </div>
          <div className="border-b-2 border-slate-200 w-2/3 mx-auto pb-2">
            <h2 className="text-gov-red font-black text-lg tracking-widest font-serif mt-1">RAKTASETU PORTAL</h2>
            <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold font-mono">National Voluntary Blood Donor Grid</p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center space-y-1.5 relative z-10 my-4">
          <h1 className="font-serif text-3xl font-bold tracking-wide text-slate-800 italic">Certificate of Appreciation</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-gov-gold">Awarded for Voluntary Contribution</p>
        </div>

        {/* Recipient Details & Citation */}
        <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10 text-xs font-serif leading-relaxed text-slate-650 flex flex-col items-center">
          <p className="italic">This certificate is proudly presented to</p>
          
          {/* Profile Photo Display */}
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-300 shadow-inner">
            {donorData.profileImage ? (
              <img 
                src={getProfileImageUrl(donorData.profileImage)} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-wide font-sans underline decoration-gov-gold decoration-2 underline-offset-8">
              {donorData.fullName}
            </h2>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold font-mono pt-1">
              National Donor Registration ID: {donorData._id}
            </p>
          </div>

          <p className="max-w-xl mx-auto italic text-slate-600">
            in grateful appreciation for the noble contribution of donating whole blood at the verified state-level registry drive. Their selfless act helps secure healthy reserve volumes, contributing directly towards emergency clinical requirements.
          </p>
        </div>

        {/* Certificate metadata table footer */}
        <div className="grid grid-cols-12 gap-8 items-end relative z-10 mt-6 text-[10px] font-sans">
          
          {/* Left Metadata (4 cols) */}
          <div className="col-span-4 space-y-2 border-l border-slate-200 pl-4">
            <div>
              <span className="block font-bold text-slate-400 uppercase text-[8px]">Certificate Number</span>
              <span className="font-mono font-bold text-slate-800">{donorData.certificateNumber}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-400 uppercase text-[8px]">Blood Group Registered</span>
              <span className="font-black text-gov-red font-mono text-xs">{donorData.bloodGroup}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-400 uppercase text-[8px]">Donation Event Date</span>
              <span className="font-semibold text-slate-800 font-mono">
                {new Date(donorData.lastDonationDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Central Stamp & seal (4 cols) */}
          <div className="col-span-4 flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full border-4 border-dashed border-gov-gold/45 text-gov-gold/75 flex items-center justify-center text-center font-black text-[8px] font-mono select-none uppercase tracking-wider leading-tight">
              RaktaSetu<br/>Verified<br/>Seal
            </div>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">Registry stamp</span>
          </div>

          {/* Right QR & Signature (4 cols) */}
          <div className="col-span-4 flex justify-between items-end border-r border-slate-200 pr-4">
            {/* QR Verification */}
            <div className="space-y-1">
              <span className="block font-bold text-slate-400 uppercase text-[7px] leading-none mb-1">Verify Card</span>
              <div className="w-14 h-14 bg-white p-1 rounded border border-slate-200">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-850" fill="currentColor">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                  <path d="M40,0 h10 v10 h-10 z M55,5 h10 v10 h-10 z M40,20 h20 v10 h-20 z" />
                  <path d="M45,40 h15 v10 h-15 z M50,55 h10 v15 h-10 z M35,70 h10 v20 h-10 z" />
                  <path d="M70,40 h10 v10 h-10 z M85,45 h15 v10 h-15 z M75,65 h10 v10 h-10 z M70,80 h30 v10 h-30 z" />
                </svg>
              </div>
            </div>

            {/* Signature Block */}
            <div className="text-center space-y-1">
              {/* Mock signature vector lines */}
              <div className="w-24 h-6 mx-auto border-b border-slate-300 relative select-none">
                <span className="absolute bottom-0 left-2 text-[9px] font-serif italic text-slate-400 select-none">Dr. R. K. Sharma</span>
              </div>
              <span className="block font-bold text-slate-400 uppercase text-[7px]">Director, NBTC</span>
            </div>
          </div>

        </div>
      </div>

      {/* Printing Print media styling */}
      <style>{`
        @media print {
          body {
            background: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #printable-certificate {
            box-shadow: none !important;
            border: 8px double #1e293b !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(0.95) !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
