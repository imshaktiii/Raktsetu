import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: ''
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const supportNumbers = [
    { label: 'National Toll-Free Helpline', number: '1097', desc: 'Available 24/7 for donor matching & urgent needs' },
    { label: 'Emergency Medical Hotline', number: '104', desc: 'State-wise clinical support and guidelines' },
    { label: 'RaktaSetu Central Control Office', number: '+91-11-23716441', desc: 'Working hours: 09:00 AM to 05:30 PM (Mon-Sat)' }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-gov-blue-dark to-gov-blue text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(220,38,38,0.25),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-gov-gold-light uppercase text-xs tracking-wider font-bold">24/7 Citizen Support</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Help Desk & Contact</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about eligibility, portal registration, or need emergency blood matching support? Reach out to our central team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Grid: Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Submit Official Inquiry</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Fill out the form below. Official replies are typically processed within 24-48 working hours.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-3 text-emerald-800 animate-fade-in mb-6">
              <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-600" />
              <div>
                <h4 className="font-bold text-sm">Query Submitted Successfully</h4>
                <p className="text-xs text-emerald-700/95 mt-1 leading-normal">
                  Thank you for writing to RaktaSetu. An official ticket receipt has been logged. We will reach out to your registered email shortly.
                </p>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  maxLength="10"
                  placeholder="10-digit mobile"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email ID</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Subject Topic</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm bg-white font-semibold"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Emergency Supply Requisition">Emergency Supply Requisition</option>
                <option value="Blood Camp Collaboration">Blood Camp Collaboration</option>
                <option value="Donor Registry Assistance">Donor Registry Assistance</option>
                <option value="Portal Access Issue">Portal Access Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Detailed Message</label>
              <textarea
                required
                rows="5"
                placeholder="Explain details of your request or issue..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gov-blue hover:bg-gov-blue-dark shadow-md'
              }`}
            >
              <Send className="w-4 h-4" />
              {loading ? 'Sending Query...' : 'Submit Form'}
            </button>
          </form>
        </div>

        {/* Right Grid: Helplines & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Helplines Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-lg border-l-4 border-gov-red pl-3">Official Helpline Hub</h3>
            <div className="space-y-4">
              {supportNumbers.map((s, idx) => (
                <div key={idx} className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
                  <span className="text-[10px] text-gov-gold-light uppercase tracking-wider block font-bold">
                    {s.label}
                  </span>
                  <a 
                    href={`tel:${s.number.replace(/[-+]/g, '')}`} 
                    className="text-lg font-black hover:text-gov-red hover:underline transition-colors block mt-0.5"
                  >
                    {s.number}
                  </a>
                  <span className="text-xs text-slate-400 leading-normal block mt-1">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Dashboard Mockup */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <MapPin className="w-4.5 h-4.5 text-gov-red" />
                Central Division Location
              </h3>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-50 text-slate-500 uppercase border border-slate-100 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                HQ Delhi
              </span>
            </div>

            {/* Stylized visual map placeholder */}
            <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-slate-100 relative overflow-hidden flex items-center justify-center">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Central pin indicator */}
              <div className="relative flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gov-red/20 flex items-center justify-center animate-ping absolute"></div>
                <div className="relative w-8 h-8 rounded-full bg-gov-red text-white flex items-center justify-center shadow-lg">
                  <MapPin className="w-4.5 h-4.5 fill-white text-gov-red" />
                </div>
                <span className="mt-1 px-2.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[9px] font-extrabold shadow-md whitespace-nowrap">
                  RaktaSetu Central HQ
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed text-center">
              RaktaSetu Central Command Cell, Ministry of Health & Family Welfare, Nirman Bhawan, New Delhi - 110011
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
