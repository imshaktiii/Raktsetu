import { useState, useEffect } from 'react';
import { campsAPI } from '../api/camps';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle,
  Building,
  Mail,
  Phone,
  PlusCircle,
  FileText
} from 'lucide-react';

export default function BloodCamps() {
  // Camps list state
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    campName: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    venue: '',
    city: '',
    state: '',
    date: '',
    startTime: '',
    endTime: '',
    totalSeats: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch all camps from backend
  const fetchCamps = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await campsAPI.getCamps();
      if (data && data.success) {
        setCamps(data.camps || []);
      } else {
        setError('Failed to load blood camps.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to the blood camps registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  // Handle slot registration click
  const handleRegister = async (campId) => {
    try {
      // Optimistic UI Update
      const updatedCamps = camps.map(camp => {
        if (camp._id === campId) {
          if (camp.registeredDonors >= camp.totalSeats) return camp;
          return { ...camp, registeredDonors: camp.registeredDonors + 1 };
        }
        return camp;
      });
      setCamps(updatedCamps);

      // Backend API Call
      const data = await campsAPI.registerForCamp(campId);
      if (data && data.success) {
        setToast('Successfully registered for blood camp.');
        setTimeout(() => setToast(null), 4000);
        // Refresh to sync exact values
        fetchCamps();
      } else {
        alert(data.message || 'Registration could not be completed.');
        fetchCamps(); // Revert UI
      }
    } catch (err) {
      console.error(err);
      alert('Error registering for blood camp.');
      fetchCamps(); // Revert UI
    }
  };

  // Create Blood Camp Form Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { 
      campName, organizerName, organizerEmail, organizerPhone, 
      venue, city, state, date, startTime, endTime, totalSeats 
    } = formData;

    if (
      !campName.trim() || !organizerName.trim() || !organizerEmail.trim() || 
      !organizerPhone.trim() || !venue.trim() || !city.trim() || !state.trim() || 
      !date || !startTime || !endTime || !totalSeats
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const data = await campsAPI.createCamp(formData);
      if (data && data.success) {
        setToast('Blood Donation Camp scheduled successfully.');
        setTimeout(() => setToast(null), 4000);

        // Reset Form
        setFormData({
          campName: '',
          organizerName: '',
          organizerEmail: '',
          organizerPhone: '',
          venue: '',
          city: '',
          state: '',
          date: '',
          startTime: '',
          endTime: '',
          totalSeats: '',
          description: ''
        });

        // Reload camps list
        fetchCamps();
      } else {
        alert('Could not schedule camp. Please verify details.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while creating blood camp.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100 animate-pulse';
      case 'Completed':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Upcoming':
      default:
        return 'bg-blue-50 text-gov-blue border-blue-100';
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Top Section: Large Government-style Banner */}
      <section className="bg-gradient-to-r from-gov-red-dark to-gov-red text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.25),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-gov-gold-light uppercase text-xs tracking-wider font-bold">Nationwide Camp Tracker</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Upcoming Blood Donation Camps</h1>
          <p className="text-slate-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Find and participate in verified blood donation drives near you.
          </p>
        </div>
      </section>

      {/* Main Grid Content (Form and Lists) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SECTION 1: Create Blood Camp (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <PlusCircle className="w-5 h-5 text-gov-red" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Create Blood Camp</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Camp Name */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Camp Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mega City Center Donation Drive"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                value={formData.campName}
                onChange={(e) => setFormData({ ...formData, campName: e.target.value })}
              />
            </div>

            {/* Organizer Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Organizer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rotary Club"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.organizerName}
                  onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                />
              </div>
              <div className="md:col-span-1">
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Organizer Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. contact@email.com"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-750"
                  value={formData.organizerEmail}
                  onChange={(e) => setFormData({ ...formData, organizerEmail: e.target.value })}
                />
              </div>
              <div className="md:col-span-1">
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Organizer Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="helpline number"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.organizerPhone}
                  onChange={(e) => setFormData({ ...formData, organizerPhone: e.target.value })}
                />
              </div>
            </div>

            {/* Venue, City & State */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Venue Address *</label>
              <input
                type="text"
                required
                placeholder="Hall / Landmark / Building details"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>

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

            {/* Date, Times & Total Seats */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Camp Date *</label>
                <input
                  type="date"
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Total Capacity Seats *</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 50"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.totalSeats}
                  onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">Start Time *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 09:00 AM"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1.5">End Time *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 04:00 PM"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Drive Description</label>
              <textarea
                rows="3"
                placeholder="Brief information about specific blood types required, incentives, or key reminders."
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-705"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
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
                'Publish Donation Camp'
              )}
            </button>
          </form>
        </div>

        {/* SECTION 2: Upcoming Camps (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-200">
            <span className="font-bold text-slate-500 uppercase">
              Registered Donation Drives
            </span>
            <span className="font-bold text-slate-400">
              {camps.length} Camps Scheduled
            </span>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-sm">
              <Loader2 className="w-8 h-8 text-gov-red animate-spin" />
              <p className="text-slate-500 text-xs font-semibold">Updating scheduled camps list...</p>
            </div>
          )}

          {/* Error Indicator */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-3 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-800 text-xs">Connection issue</h4>
                <p className="text-[11px] text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Camps Card Feed */}
          {!loading && !error && (
            <div className="space-y-4">
              {camps.map((camp) => {
                const isFull = camp.registeredDonors >= camp.totalSeats;
                return (
                  <div 
                    key={camp._id} 
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
                  >
                    {/* Visual Government Red Accent Bar */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gov-red group-hover:scale-y-110 transition-transform"></div>

                    <div className="pl-2 space-y-4 text-xs">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`px-2.5 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border ${getStatusStyles(camp.status)}`}>
                            {camp.status}
                          </span>
                          <h3 className="font-black text-slate-800 text-sm leading-snug mt-2">{camp.campName}</h3>
                          <span className="text-[10px] text-slate-450 font-semibold flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" /> {camp.city}, {camp.state}
                          </span>
                        </div>

                        {/* Capacity Stats badge */}
                        <div className="text-right shrink-0">
                          <span className="block text-[8px] uppercase font-bold text-slate-400">Donors Enrolled</span>
                          <span className="text-base font-black text-slate-850 font-mono">
                            {camp.registeredDonors} / {camp.totalSeats}
                          </span>
                        </div>
                      </div>

                      {/* Camp Info details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-y border-slate-50 py-3 text-slate-600 font-semibold">
                        <div className="space-y-1.5">
                          <p className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gov-red shrink-0" />
                            <span className="text-slate-800 font-bold">{new Date(camp.date).toLocaleDateString()}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gov-blue shrink-0" />
                            <span>{camp.startTime} - {camp.endTime}</span>
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="flex items-center gap-1.5">
                            <Building className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[200px]">{camp.venue}</span>
                          </p>
                          <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            Organizer: {camp.organizerName}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      {camp.description && (
                        <p className="text-slate-550 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-1.5">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span>{camp.description}</span>
                        </p>
                      )}

                      {/* Register/Seats Full CTA */}
                      <div className="pt-1 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-[10px] text-slate-400">
                          <a href={`tel:${camp.organizerPhone}`} className="hover:text-slate-700 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" /> Call
                          </a>
                          <a href={`mailto:${camp.organizerEmail}`} className="hover:text-slate-700 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" /> Email
                          </a>
                        </div>
                        
                        <button
                          onClick={() => handleRegister(camp._id)}
                          disabled={isFull}
                          className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm cursor-pointer ${
                            isFull 
                              ? 'bg-slate-200 border border-slate-300 text-slate-500 cursor-not-allowed' 
                              : 'bg-gov-red hover:bg-gov-red-dark text-white'
                          }`}
                        >
                          {isFull ? 'Camp Full' : 'Register for Camp'}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}

              {camps.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">No camps found.</h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      No active blood donation drives currently listed in the registry database.
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
