import { useState, useEffect } from 'react';
import { requestsAPI } from '../api/requests';
import { 
  Loader2, 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Building, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Heart
} from 'lucide-react';

export default function BloodRequests() {
  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    units: '',
    hospitalName: '',
    city: '',
    state: '',
    contactNumber: '',
    urgency: 'Medium',
    requiredDate: ''
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState([]);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await requestsAPI.getRequests();
      if (data && data.success) {
        setRequests(data.requests || []);
      } else {
        setError('Failed to fetch blood requests.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to the blood requests registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientName, units, hospitalName, city, state, contactNumber, requiredDate } = formData;

    if (!patientName.trim() || !units || !hospitalName.trim() || !city.trim() || !state.trim() || !contactNumber.trim() || !requiredDate) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const data = await requestsAPI.createRequest({
        ...formData,
        units: Number(formData.units)
      });

      if (data && data.success) {
        // Show success toast
        setToast('Emergency blood request successfully registered.');
        setTimeout(() => setToast(null), 4000);

        // Clear form
        setFormData({
          patientName: '',
          bloodGroup: 'O+',
          units: '',
          hospitalName: '',
          city: '',
          state: '',
          contactNumber: '',
          urgency: 'Medium',
          requiredDate: ''
        });

        // Refresh request list
        fetchRequests();
      } else {
        alert('Could not submit request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while sending request details.');
    } finally {
      setSubmitting(false);
    }
  };

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-50 text-red-600 border-red-100 animate-pulse';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Low':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusStyles = (status) => {
    return status === 'Fulfilled' 
      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
      : 'bg-blue-50 text-gov-blue border-blue-100';
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-red/10 text-gov-red rounded-md border border-gov-red/5">
          E-Raktkosh Traumatic Broadcast System
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Emergency Blood Requests</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Register emergency blood requests instantly to make them visible to compatible regional donors, hospitals, and blood banks.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Heart className="w-5 h-5 text-gov-red fill-gov-red" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Create Request Form</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Patient Name */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Patient Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </div>

            {/* Blood Group & Units */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Blood Group *</label>
                <select
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold text-slate-700 focus:outline-none focus:border-gov-blue"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Units Required *</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 3"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.units}
                  onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                />
              </div>
            </div>

            {/* Hospital Name */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Hospital Name & Address *</label>
              <input
                type="text"
                required
                placeholder="e.g. AIIMS Main Ward, New Delhi"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Delhi"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Contact Number *</label>
              <input
                type="tel"
                required
                placeholder="Mobile or Landline"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              />
            </div>

            {/* Urgency & Required Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Urgency Level *</label>
                <select
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold text-slate-700 focus:outline-none focus:border-gov-blue"
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Required Before *</label>
                <input
                  type="date"
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-750"
                  value={formData.requiredDate}
                  onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-xs"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Broadcast Blood Request'
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Broadcast Feed List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex justify-between items-center text-xs pb-1">
            <span className="font-bold text-slate-500 uppercase">
              Emergency Broadcast Feed
            </span>
            <span className="font-bold text-slate-400">
              Live Feed
            </span>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-sm">
              <Loader2 className="w-8 h-8 text-gov-red animate-spin" />
              <p className="text-slate-500 text-xs font-semibold">Updating live request feed...</p>
            </div>
          )}

          {/* Error Indicator */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-3 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-800 text-xs">Feed Issue</h4>
                <p className="text-[11px] text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Request Cards */}
          {!loading && !error && (
            <div className="space-y-4">
              {requests.map((req) => (
                <div 
                  key={req._id} 
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
                >
                  {/* Urgency Highlight Badge Strip */}
                  <div className={`absolute top-0 left-0 w-1.5 h-full transition-transform ${
                    req.urgency === 'High' ? 'bg-red-500 group-hover:scale-y-110' : req.urgency === 'Medium' ? 'bg-amber-400' : 'bg-slate-300'
                  }`}></div>

                  <div className="pl-2 space-y-4 text-xs">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-800 leading-snug text-sm">{req.patientName}</h4>
                          <span className="text-[10px] text-slate-450 font-semibold flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" /> {req.city}, {req.state}
                          </span>
                        </div>
                      </div>

                      {/* Blood Group & Units Badge */}
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-gov-red/10 border border-gov-red/20 text-gov-red font-black text-center flex items-center justify-center text-sm shadow-sm shrink-0">
                          {req.bloodGroup}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1.5 rounded-lg font-mono">
                          {req.units} Units
                        </span>
                      </div>
                    </div>

                    {/* Hospital & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-y border-slate-50 py-3 text-slate-650 font-semibold">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Hospital Venue</span>
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-850 truncate max-w-[200px]">{req.hospitalName}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Contact Phone</span>
                        <a 
                          href={`tel:${req.contactNumber.replace(/\s+/g, '')}`} 
                          className="flex items-center gap-1.5 hover:text-gov-blue hover:underline font-mono font-bold"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {req.contactNumber}
                        </a>
                      </div>
                    </div>

                    {/* Badges Footer */}
                    <div className="flex flex-wrap justify-between items-center gap-3 text-xs">
                      <div className="flex gap-2">
                        {/* Urgency Badge */}
                        <span className={`px-2.5 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border ${getUrgencyStyles(req.urgency)}`}>
                          {req.urgency} Urgency
                        </span>

                        {/* Status Badge */}
                        <span className={`px-2.5 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border ${getStatusStyles(req.status)}`}>
                          {req.status}
                        </span>
                      </div>

                      {/* Required Date */}
                      <span className="text-[10px] text-slate-450 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Need Before: {new Date(req.requiredDate).toLocaleDateString()}
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">No requests found.</h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      No active emergency requests broadcasted in the national directory.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
