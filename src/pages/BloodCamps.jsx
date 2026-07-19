import { useState } from 'react';
import { 
  Calendar, MapPin, Search, Filter, ShieldCheck, Check, 
  X, QrCode, Clock, FileText, Download, Printer 
} from 'lucide-react';

const mockCamps = [
  {
    id: 1,
    title: 'Mega Civil Lines Blood Camp',
    date: 'July 24, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'District Red Cross Hall, Civil Lines',
    district: 'Central Delhi',
    organizer: 'Red Cross Society & MoHFW',
    slots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 04:00 PM']
  },
  {
    id: 2,
    title: 'Government College Donation Drive',
    date: 'July 28, 2026',
    time: '10:00 AM - 03:00 PM',
    location: 'Main Auditorium, Sector 15',
    district: 'Chandigarh',
    organizer: 'Youth Red Cross & PGIMER',
    slots: ['10:00 AM - 11:30 AM', '11:30 AM - 01:00 PM', '01:00 PM - 03:00 PM']
  },
  {
    id: 3,
    title: 'Metro Station Blood Drive',
    date: 'August 02, 2026',
    time: '08:00 AM - 01:00 PM',
    location: 'Rajiv Chowk Metro Station Concourse',
    district: 'New Delhi',
    organizer: 'Delhi Metro Rail Corp & AIIMS',
    slots: ['08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 01:00 PM']
  },
  {
    id: 4,
    title: 'Rotary Club Health Center Camp',
    date: 'August 05, 2026',
    time: '09:30 AM - 04:30 PM',
    location: 'Rotary Bhavan, Mall Road',
    district: 'Shimla',
    organizer: 'Rotary Club & Shimla Blood Bank',
    slots: ['09:30 AM - 11:30 AM', '11:30 AM - 01:30 PM', '01:30 PM - 03:30 PM', '03:30 PM - 04:30 PM']
  },
  {
    id: 5,
    title: 'Community Community Hall Drive',
    date: 'August 12, 2026',
    time: '09:00 AM - 02:00 PM',
    location: 'Community Hall, Sector 4',
    district: 'Gurugram',
    organizer: 'Local RWAs & Civil Hospital',
    slots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '01:00 PM - 02:00 PM']
  },
  {
    id: 6,
    title: 'Tech Park Wellness Camp',
    date: 'August 18, 2026',
    time: '10:00 AM - 05:00 PM',
    location: 'DLF CyberCity Tower C Lobby',
    district: 'Gurugram',
    organizer: 'Corporate Social Responsibility Cell',
    slots: ['10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 05:00 PM']
  }
];

const districts = ['All Districts', 'Central Delhi', 'New Delhi', 'Chandigarh', 'Shimla', 'Gurugram'];

export default function BloodCamps() {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [activeCamp, setActiveCamp] = useState(null); // Camp being registered for
  const [ticketData, setTicketData] = useState(null); // Successfully booked ticket details
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bloodGroup: 'A+',
    slot: '',
    declared: false
  });

  const filteredCamps = mockCamps.filter((camp) => {
    const matchesSearch = camp.title.toLowerCase().includes(search.toLowerCase()) || 
                          camp.location.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All Districts' || camp.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handleOpenRegister = (camp) => {
    setActiveCamp(camp);
    setFormData({
      name: '',
      phone: '',
      bloodGroup: 'A+',
      slot: camp.slots[0],
      declared: false
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.declared) {
      alert('Please fill all fields and accept the health declaration.');
      return;
    }

    const ticketId = 'RST-' + Math.floor(100000 + Math.random() * 900000);
    setTicketData({
      ticketId,
      campTitle: activeCamp.title,
      date: activeCamp.date,
      time: formData.slot,
      location: activeCamp.location,
      donorName: formData.name,
      donorPhone: formData.phone,
      bloodGroup: formData.bloodGroup,
    });
    setActiveCamp(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-gov-red-dark to-gov-red text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.25),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-gov-gold-light uppercase text-xs tracking-wider font-bold">Nationwide Camp Tracker</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Blood Donation Camps</h1>
          <p className="text-slate-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Locate upcoming blood camps in your area. Pre-register for a slot to reduce physical waiting time and secure refreshments.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by camp title, landmark, or organization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/10 text-sm"
            />
          </div>

          {/* District selector */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:inline" />
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Filter District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full sm:w-48 px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
            >
              {districts.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Camp Listing Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        {filteredCamps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCamps.map((camp) => (
              <div 
                key={camp.id} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gov-red group-hover:scale-y-110 transition-transform"></div>

                <div className="space-y-4 pl-2">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-gov-blue/10 text-gov-blue">
                      {camp.district}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Slots Open
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-snug">{camp.title}</h3>
                  
                  <div className="space-y-2.5 text-sm text-slate-500">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gov-red shrink-0" />
                      <span className="font-medium text-slate-700">{camp.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gov-blue-light shrink-0" />
                      <span>{camp.time}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{camp.location}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between pl-2">
                  <span className="text-xs text-slate-400 font-semibold">Organized by {camp.organizer}</span>
                  <button
                    onClick={() => handleOpenRegister(camp)}
                    className="px-4 py-2.5 bg-gov-red text-white text-xs font-semibold rounded-xl hover:bg-gov-red-dark transition-colors shadow-sm"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8">
            <p className="text-slate-400 text-sm font-medium">No camps scheduled matches your current filters.</p>
          </div>
        )}
      </section>

      {/* Booking Form Modal */}
      {activeCamp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden animate-fade-in">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Book Donation Slot</h3>
                <p className="text-xs text-slate-500">{activeCamp.title}</p>
              </div>
              <button 
                onClick={() => setActiveCamp(null)} 
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name as in ID card"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg, idx) => (
                      <option key={idx} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Preferred Time Slot</label>
                <div className="grid grid-cols-1 gap-2">
                  {activeCamp.slots.map((s, idx) => (
                    <label 
                      key={idx} 
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        formData.slot === s 
                          ? 'border-gov-blue bg-gov-blue/5 text-gov-blue font-semibold' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={s}
                        checked={formData.slot === s}
                        onChange={() => setFormData({ ...formData, slot: s })}
                        className="sr-only"
                      />
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declared}
                    onChange={(e) => setFormData({ ...formData, declared: e.target.checked })}
                    className="mt-0.5 text-gov-blue rounded border-slate-300 focus:ring-gov-blue"
                  />
                  <span className="text-[11px] text-slate-500 leading-tight">
                    I declare that I am between 18-65 years old, weigh above 45kg, and have not experienced fever or minor surgeries in the last 6 months.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gov-red text-white text-sm font-semibold rounded-xl hover:bg-gov-red-dark transition-colors shadow-lg shadow-gov-red/10"
              >
                Confirm Appointment Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Registration Success Ticket Modal */}
      {ticketData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden animate-fade-in border-t-8 border-gov-red">
            
            {/* Header Success Badge */}
            <div className="flex flex-col items-center text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Slot Booking Confirmed!</h3>
              <p className="text-xs text-slate-500">Your digital donation pass is active.</p>
            </div>

            {/* Ticket Layout */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative space-y-4">
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Pass ID</span>
                  <span className="text-sm font-black text-slate-800 tracking-wider">{ticketData.ticketId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Blood Group</span>
                  <span className="px-2 py-0.5 text-xs font-bold rounded bg-gov-red/10 text-gov-red">{ticketData.bloodGroup}</span>
                </div>
              </div>

              {/* Camp Title */}
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Camp / Drive</span>
                <span className="text-sm font-bold text-slate-900">{ticketData.campTitle}</span>
              </div>

              {/* Time & Venue */}
              <div className="grid grid-cols-2 gap-2 border-y border-dashed border-slate-200 py-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Schedule Date</span>
                  <span className="text-xs font-semibold text-slate-700">{ticketData.date}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Booked Slot</span>
                  <span className="text-xs font-semibold text-slate-700">{ticketData.time}</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Venue Address</span>
                <span className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{ticketData.location}</span>
                </span>
              </div>

              {/* Donor Name */}
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Donor Name</span>
                <span className="text-xs font-bold text-slate-800">{ticketData.donorName}</span>
              </div>

              {/* QR Code Mockup */}
              <div className="flex justify-center border-t border-slate-200/60 pt-4">
                <div className="p-3 bg-white border border-slate-100 rounded-xl flex flex-col items-center gap-1.5 shadow-sm">
                  <QrCode className="w-20 h-20 text-slate-900" />
                  <span className="text-[8px] uppercase tracking-widest text-slate-400 font-semibold">Scan at Entrance</span>
                </div>
              </div>
            </div>

            {/* Print and Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
              <button
                onClick={() => setTicketData(null)}
                className="flex-1 py-2.5 rounded-xl bg-gov-blue hover:bg-gov-blue-dark text-white text-xs font-bold transition-all text-center"
              >
                Done
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
