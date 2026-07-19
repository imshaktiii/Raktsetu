import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Search, 
  X, 
  Clock, 
  Users, 
  Compass, 
  CheckCircle2
} from 'lucide-react';

export default function BloodCamps() {
  // Navigation Tabs State: 'Upcoming' | 'Past'
  const [activeTab, setActiveTab] = useState('Upcoming');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Modals Visibility
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  // Selected Camp for Modal
  const [selectedCamp, setSelectedCamp] = useState(null);

  // Form States
  const [donateForm, setDonateForm] = useState({ name: '', phone: '', bloodGroup: 'O+', slot: '', declared: false });
  const [volunteerForm, setVolunteerForm] = useState({ name: '', phone: '', email: '', role: 'Registration Desk', agreed: false });

  // Mock Database: Upcoming Camps
  const upcomingCamps = [
    {
      id: 1,
      title: 'Mega Civil Lines Donation Camp',
      date: 'July 24, 2026',
      time: '09:00 AM - 04:00 PM',
      location: 'District Red Cross Hall, Civil Lines, New Delhi - 110054',
      district: 'Central Delhi',
      organizer: 'Red Cross Delhi & MoHFW',
      slotsAvailable: 24,
      slots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 04:00 PM'],
      contact: '+91 11 2371 6441',
      email: 'camps@redcrossdelhi.org',
      license: 'NBTC-CMP-0045'
    },
    {
      id: 2,
      title: 'Vasant Kunj Corporate Wellness Camp',
      date: 'July 28, 2026',
      time: '10:00 AM - 03:00 PM',
      location: 'DLF Cybercity Phase 3 Lobby, Vasant Kunj, Delhi - 110070',
      district: 'South Delhi',
      organizer: 'Max Healthcare Foundation',
      slotsAvailable: 15,
      slots: ['10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM', '02:00 PM - 03:00 PM'],
      contact: '+91 11 2651 5050',
      email: 'camps@maxhealthcare.com',
      license: 'NBTC-CMP-0092'
    },
    {
      id: 3,
      title: 'Rajiv Chowk Metro Concourse Drive',
      date: 'August 02, 2026',
      time: '08:00 AM - 01:00 PM',
      location: 'Rajiv Chowk Metro Station Concourse, Delhi - 110001',
      district: 'Central Delhi',
      organizer: 'Delhi Metro Rail Corp & AIIMS',
      slotsAvailable: 32,
      slots: ['08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 01:00 PM'],
      contact: '+91 11 2658 8500',
      email: 'rep@aiims.edu',
      license: 'NBTC-CMP-0185'
    }
  ];

  // Mock Database: Past Camps
  const pastCamps = [
    {
      id: 101,
      title: 'Connaught Place NGO Lifesaver Camp',
      date: 'June 15, 2026',
      time: '09:00 AM - 04:00 PM',
      location: 'Inner Circle Parks, Connaught Place, Delhi - 110001',
      district: 'Central Delhi',
      organizer: 'Rotary Blood Bank Tughlakabad',
      donorsAttended: 142,
      contact: '+91 11 2905 1551',
      email: 'info@rotarybloodbank.org',
      license: 'NBTC-CMP-0012'
    },
    {
      id: 102,
      title: 'Gurugram Sector 14 Community Camp',
      date: 'June 01, 2026',
      time: '10:00 AM - 04:00 PM',
      location: 'Community Hall, Sector 14, Gurugram - 122001',
      district: 'Gurugram',
      organizer: 'Local RWAs & Civil Hospital',
      donorsAttended: 88,
      contact: '+91 124 232 0102',
      email: 'camps@gurugramhospital.org',
      license: 'NBTC-CMP-0005'
    }
  ];

  // Districts for dropdown filter
  const districts = ['All', 'Central Delhi', 'South Delhi', 'Gurugram'];

  // Handle donation registration submit
  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!donateForm.name || !donateForm.phone || !donateForm.declared) {
      alert('Please fill all fields and accept the health declaration.');
      return;
    }
    const ticketId = 'CMP-TKT-' + Math.floor(100000 + Math.random() * 900000);
    setTicketData({
      ticketId,
      campTitle: selectedCamp.title,
      date: selectedCamp.date,
      time: donateForm.slot || selectedCamp.slots[0],
      location: selectedCamp.location,
      donorName: donateForm.name,
      donorPhone: donateForm.phone,
      bloodGroup: donateForm.bloodGroup,
    });
    setShowDonateModal(false);
    setDonateForm({ name: '', phone: '', bloodGroup: 'O+', slot: '', declared: false });
  };

  // Handle volunteer registration submit
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.phone || !volunteerForm.agreed) {
      alert('Please fill name, phone, and accept terms.');
      return;
    }
    setVolunteerSuccess(true);
    setTimeout(() => {
      setVolunteerSuccess(false);
      setShowVolunteerModal(false);
      setVolunteerForm({ name: '', phone: '', email: '', role: 'Registration Desk', agreed: false });
      alert('Volunteer Registration complete. Check your phone for tasks.');
    }, 1500);
  };

  // Filter logic
  const activeCampsList = activeTab === 'Upcoming' ? upcomingCamps : pastCamps;
  const filteredCamps = activeCampsList.filter(camp => {
    const matchesSearch = camp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          camp.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || camp.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
          E-Raktkosh Unified Camp Directory
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Blood Camp Management</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Register for upcoming donation camp slots, check previous collection drives, or apply to assist as a voluntary camp guide.
        </p>
      </div>

      {/* Navigation Tabs (Upcoming vs Past) & Search Filter Header */}
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Toggle tabs */}
        <div className="flex gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-100 font-bold shrink-0">
          {['Upcoming', 'Past'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedDistrict('All'); }}
              className={`px-4 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-gov-blue shadow-sm font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab} Camps
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto text-xs font-bold text-slate-700">
          
          {/* Keyword Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search camp or location..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* District Selector */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-450 uppercase hidden sm:inline">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full sm:w-36 p-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-gov-blue"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Grid: Camp Cards List */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <div 
            key={camp.id} 
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            {/* Visual Red Accent */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gov-red group-hover:scale-y-110 transition-transform"></div>

            <div className="space-y-4 pl-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider bg-gov-blue/10 text-gov-blue border border-gov-blue/5">
                  {camp.district}
                </span>
                <span className={`text-[10px] font-bold uppercase ${
                  activeTab === 'Upcoming' ? 'text-emerald-600 animate-pulse' : 'text-slate-400'
                }`}>
                  {activeTab === 'Upcoming' ? `${camp.slotsAvailable} Slots Open` : 'Completed'}
                </span>
              </div>

              {/* Title & Timing details */}
              <div className="space-y-2">
                <h3 className="font-black text-slate-800 text-sm leading-snug">{camp.title}</h3>
                
                <div className="space-y-1.5 text-slate-500 font-semibold">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gov-red shrink-0" />
                    <span className="text-slate-700 font-bold">{camp.date}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gov-blue shrink-0" />
                    <span>{camp.time}</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{camp.location}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Organizer Details & Actions */}
            <div className="border-t border-slate-50 pt-4 pl-1.5 flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-semibold">
                  Organized by: <strong className="text-slate-700">{camp.organizer.split(' & ')[0]}</strong>
                </span>
                <button 
                  onClick={() => { setSelectedCamp(camp); setShowOrganizerModal(true); }}
                  className="text-[9px] font-bold text-gov-blue hover:underline cursor-pointer uppercase"
                >
                  Organizer details
                </button>
              </div>

              {/* Booking/Volunteer Actions */}
              {activeTab === 'Upcoming' ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => { setSelectedCamp(camp); setShowVolunteerModal(true); }}
                    className="py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-center cursor-pointer"
                  >
                    Volunteer Helper
                  </button>
                  <button
                    onClick={() => { setSelectedCamp(camp); setShowDonateModal(true); }}
                    className="py-2.5 bg-gov-red hover:bg-gov-red-dark text-white font-bold rounded-xl text-center shadow-sm cursor-pointer"
                  >
                    Book Donor Slot
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-semibold text-slate-650">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gov-blue shrink-0" />
                    Attendance: {camp.donorsAttended} Donors
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Audit Certified
                  </span>
                </div>
              )}
            </div>

          </div>
        ))}

        {filteredCamps.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl border border-slate-100 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">No Camps Scheduled</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                No active donation drives scheduled under this district.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* DONATE BOOKING MODAL */}
      {showDonateModal && selectedCamp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-4 animate-scale-up text-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-red"></div>
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-850 text-sm">Register for Donation</h3>
                <p className="text-[10px] text-slate-450 mt-0.5 truncate max-w-[280px]">{selectedCamp.title}</p>
              </div>
              <button onClick={() => setShowDonateModal(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDonateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Donor Name</label>
                <input 
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                  value={donateForm.name}
                  onChange={(e) => setDonateForm({ ...donateForm, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                  <input 
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                    value={donateForm.phone}
                    onChange={(e) => setDonateForm({ ...donateForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Blood Group</label>
                  <select 
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold"
                    value={donateForm.bloodGroup}
                    onChange={(e) => setDonateForm({ ...donateForm, bloodGroup: e.target.value })}
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Preferred Time Slot</label>
                <select 
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-semibold"
                  value={donateForm.slot}
                  onChange={(e) => setDonateForm({ ...donateForm, slot: e.target.value })}
                >
                  {selectedCamp.slots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Health check declaration */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-red-50 bg-red-50/20 text-slate-650 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded text-gov-red focus:ring-gov-red/20 mt-0.5 shrink-0" 
                  checked={donateForm.declared}
                  onChange={(e) => setDonateForm({ ...donateForm, declared: e.target.checked })}
                />
                <span className="leading-relaxed text-[10px]">
                  I declare that my weight exceeds 45kg, my age is strictly between 18-65, and I have not donated whole blood in the last 90 days.
                </span>
              </label>

              <button 
                type="submit"
                className="w-full py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl font-bold transition-all shadow-md cursor-pointer text-center"
              >
                Confirm Appointment Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VOLUNTEER REGISTRATION MODAL */}
      {showVolunteerModal && selectedCamp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-4 animate-scale-up text-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-blue"></div>
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-850 text-sm">Register as Volunteer Helper</h3>
                <p className="text-[10px] text-slate-450 mt-0.5 truncate max-w-[280px]">{selectedCamp.title}</p>
              </div>
              <button onClick={() => setShowVolunteerModal(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {volunteerSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Registration Dispatched</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Establishing voluntary credentials. Syncing parameters...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Full Name</label>
                  <input 
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                    <input 
                      type="tel"
                      placeholder="98765 43210"
                      className="w-full p-2.5 border border-slate-200 rounded-xl"
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-505 uppercase mb-1">Volunteer Role</label>
                    <select 
                      className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-semibold"
                      value={volunteerForm.role}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                    >
                      <option value="Registration Desk">Registration Desk</option>
                      <option value="Refreshments Support">Refreshments Support</option>
                      <option value="Donor Guidance">Donor Guidance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Email Address</label>
                  <input 
                    type="email"
                    placeholder="name@email.com"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  />
                </div>

                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-50 bg-slate-50/50 text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded text-gov-blue focus:ring-gov-blue/20 mt-0.5 shrink-0" 
                    checked={volunteerForm.agreed}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, agreed: e.target.checked })}
                  />
                  <span className="leading-relaxed text-[10px]">
                    I agree to the National Volunteer conduct terms and confirm that I will be physically present during camp hours.
                  </span>
                </label>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl font-bold transition-all shadow-md cursor-pointer text-center"
                >
                  Register as Volunteer
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ORGANIZER INFO MODAL (Including Map Placeholder) */}
      {showOrganizerModal && selectedCamp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-6 animate-scale-up text-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-blue"></div>
            
            {/* Header */}
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-gov-blue font-bold text-[9px] uppercase tracking-wider">Organizer Details</span>
                <h3 className="font-black text-slate-800 text-sm leading-snug mt-1.5">{selectedCamp.organizer}</h3>
                <p className="text-[10px] text-slate-450 font-mono mt-0.5">Accreditation ID: {selectedCamp.license}</p>
              </div>
              <button onClick={() => setShowOrganizerModal(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-4 text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Direct Helpline</span>
                  <a href={`tel:${selectedCamp.contact}`} className="font-bold text-slate-800 font-mono block mt-0.5 hover:underline">
                    {selectedCamp.contact}
                  </a>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Email Address</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">{selectedCamp.email}</span>
                </div>
              </div>

              {/* Map Placeholder Graphics */}
              <div className="space-y-2">
                <span className="block text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-gov-blue animate-spin-slow" /> Location Satellite Map
                </span>
                
                <div className="h-40 rounded-2xl bg-slate-100 relative overflow-hidden flex flex-col justify-between p-3 border border-slate-200">
                  {/* Road layouts */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="#1e293b" strokeWidth="2" />
                      <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="#1e293b" strokeWidth="3" />
                      <line x1="0%" y1="40%" x2="100%" y2="40%" stroke="#1e293b" strokeWidth="2" />
                      <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="#1e293b" strokeWidth="1" />
                    </svg>
                  </div>
                  {/* Pin */}
                  <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="bg-slate-900 text-white text-[7px] font-bold px-1 py-0.5 rounded shadow">
                      Camp Site
                    </div>
                    <div className="w-5 h-5 bg-gov-red border-2 border-white rounded-full flex items-center justify-center shadow-lg -mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-1.5 shadow text-[8px] font-semibold text-slate-500 max-w-[200px] mt-auto relative z-10 border">
                    {selectedCamp.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <a 
                href={`mailto:${selectedCamp.email}`}
                className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-750 font-bold rounded-xl text-center cursor-pointer"
              >
                Send Email
              </a>
              <a 
                href={`tel:${selectedCamp.contact}`}
                className="flex-1 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-center shadow-sm cursor-pointer"
              >
                Call Organizer
              </a>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENT BOOKED TICKET DIALOG */}
      {ticketData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-scale-up text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>
            
            {/* Ticket parameters */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3.5 text-left text-slate-700">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="font-bold text-[9px] text-gov-red">DONATION APPOINTMENT</span>
                <span className="font-mono font-bold text-slate-500">{ticketData.ticketId}</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-xs">{ticketData.donorName}</h4>
                <p className="text-[10px] text-slate-500 font-mono">Mobile: {ticketData.donorPhone} • Group: {ticketData.bloodGroup}</p>
              </div>

              <div className="space-y-1 pt-1.5 border-t border-slate-100">
                <p className="text-[10px] text-slate-450 uppercase font-bold">Appointment Venue</p>
                <p className="font-bold text-slate-800 text-[11px]">{ticketData.campTitle}</p>
                <p className="text-[10px] text-slate-500">{ticketData.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1.5 border-t border-slate-100 font-semibold">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Date</span>
                  <span className="text-slate-800 text-[10px]">{ticketData.date}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Time Slot</span>
                  <span className="text-slate-800 text-[10px]">{ticketData.time}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setTicketData(null)}
                className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
              >
                Close Receipt
              </button>
              <button 
                onClick={() => alert('Appointment ticket receipt saved (Mock).')}
                className="flex-1 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl font-bold transition-colors cursor-pointer shadow-sm"
              >
                Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
