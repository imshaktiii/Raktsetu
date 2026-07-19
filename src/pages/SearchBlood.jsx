import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  X,
  Compass,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

export default function SearchBlood() {
  // Filter States
  const [selectedGroup, setSelectedGroup] = useState('O+');
  const [selectedState, setSelectedState] = useState('Delhi');
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'Hospital' | 'Blood Bank'
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Detail Modal State
  const [selectedBank, setSelectedBank] = useState(null);

  // Mock Repository Database
  const repositories = [
    {
      id: 1,
      name: 'Red Cross Central Delhi Repository',
      type: 'Blood Bank',
      state: 'Delhi',
      city: 'New Delhi',
      address: '1 Red Cross Road, Connaught Place, New Delhi - 110001',
      distance: 2.1,
      phone: '+91 11 2371 6441',
      email: 'delhi@redcross.org',
      timings: '24 Hours Open',
      license: 'NBTC-DL-0021',
      stocks: { 'O+': 45, 'O-': 4, 'A+': 32, 'A-': 8, 'B+': 28, 'B-': 5, 'AB+': 18, 'AB-': 2 }
    },
    {
      id: 2,
      name: 'Safdarjung Hospital Blood Bank',
      type: 'Hospital',
      state: 'Delhi',
      city: 'New Delhi',
      address: 'Ansari Nagar East, near AIIMS Metro Station, New Delhi - 110029',
      distance: 4.8,
      phone: '+91 11 2673 0000',
      email: 'bloodbank@safdarjunghospital.in',
      timings: '24 Hours Open',
      license: 'NBTC-DL-0195',
      stocks: { 'O+': 18, 'O-': 0, 'A+': 24, 'A-': 2, 'B+': 15, 'B-': 1, 'AB+': 12, 'AB-': 0 }
    },
    {
      id: 3,
      name: 'AIIMS Main Blood Repository',
      type: 'Hospital',
      state: 'Delhi',
      city: 'New Delhi',
      address: 'Ansari Nagar, New Delhi - 110029',
      distance: 5.2,
      phone: '+91 11 2658 8500',
      email: 'rep@aiims.edu',
      timings: '24 Hours Open',
      license: 'NBTC-DL-0089',
      stocks: { 'O+': 38, 'O-': 8, 'A+': 42, 'A-': 6, 'B+': 35, 'B-': 3, 'AB+': 20, 'AB-': 4 }
    },
    {
      id: 4,
      name: 'Rotary Blood Bank Tughlakabad',
      type: 'Blood Bank',
      state: 'Delhi',
      city: 'New Delhi',
      address: 'SCT, Institutional Area, Tughlakabad, New Delhi - 110062',
      distance: 8.5,
      phone: '+91 11 2905 1551',
      email: 'info@rotarybloodbank.org',
      timings: '09:00 AM - 08:00 PM',
      license: 'NBTC-DL-0312',
      stocks: { 'O+': 25, 'O-': 2, 'A+': 19, 'A-': 4, 'B+': 22, 'B-': 0, 'AB+': 10, 'AB-': 1 }
    },
    {
      id: 5,
      name: 'Max Super Specialty Hospital Center',
      type: 'Hospital',
      state: 'Delhi',
      city: 'New Delhi',
      address: '1-2 Press Enclave Road, Saket, New Delhi - 110017',
      distance: 9.3,
      phone: '+91 11 2651 5050',
      email: 'bloodbank.saket@maxhealthcare.com',
      timings: '24 Hours Open',
      license: 'NBTC-DL-0451',
      stocks: { 'O+': 12, 'O-': 1, 'A+': 14, 'A-': 0, 'B+': 8, 'B-': 1, 'AB+': 6, 'AB-': 0 }
    },
    {
      id: 6,
      name: 'Mumbai Municipal Corporation Bank',
      type: 'Blood Bank',
      state: 'Maharashtra',
      city: 'Mumbai',
      address: 'Dr. E. Moses Road, Worli, Mumbai - 400018',
      distance: 12.0,
      phone: '+91 22 2493 4000',
      email: 'mumbaibank@mcgm.gov.in',
      timings: '24 Hours Open',
      license: 'NBTC-MH-0091',
      stocks: { 'O+': 55, 'O-': 12, 'A+': 39, 'A-': 5, 'B+': 41, 'B-': 7, 'AB+': 22, 'AB-': 3 }
    }
  ];

  // Filtering Logic
  const filteredRepositories = repositories.filter(repo => {
    const matchesGroup = repo.stocks[selectedGroup] !== undefined; // must stock selected group
    const matchesState = !selectedState || repo.state === selectedState;
    const matchesCity = !selectedCity || repo.city === selectedCity;
    const matchesType = selectedType === 'All' || repo.type === selectedType;
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          repo.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesState && matchesCity && matchesType && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRepositories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRepositories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
          E-Raktkosh Unified Stock Directory
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Search Blood Availability</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Query regional clinical repositories, view real-time blood group unit balances, and identify the closest authorized blood bank or hospital.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Filter Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <SlidersHorizontal className="w-4.5 h-4.5 text-gov-blue" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Search Filters</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Blood Group Select */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Required Blood Group</label>
              <div className="grid grid-cols-4 gap-2">
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => { setSelectedGroup(bg); setCurrentPage(1); }}
                    className={`py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedGroup === bg 
                        ? 'bg-gov-red border-gov-red text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* State Select */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">State</label>
              <select
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold text-slate-700 focus:outline-none focus:border-gov-blue"
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setCurrentPage(1); }}
              >
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            {/* City Select */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">City</label>
              <select
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold text-slate-700 focus:outline-none focus:border-gov-blue"
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
              >
                {selectedState === 'Delhi' && <option value="New Delhi">New Delhi</option>}
                {selectedState === 'Maharashtra' && <option value="Mumbai">Mumbai</option>}
                {selectedState === 'Karnataka' && <option value="Bengaluru">Bengaluru</option>}
                {selectedState === 'Tamil Nadu' && <option value="Chennai">Chennai</option>}
              </select>
            </div>

            {/* Repository Type (All / Hospital / Blood Bank) */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Repository Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'All', label: 'All Type' },
                  { value: 'Hospital', label: 'Hospital' },
                  { value: 'Blood Bank', label: 'Blood Bank' }
                ].map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => { setSelectedType(type.value); setCurrentPage(1); }}
                    className={`py-2 text-[10px] sm:text-xs font-bold border rounded-xl transition-all cursor-pointer truncate ${
                      selectedType === type.value 
                        ? 'bg-gov-blue border-gov-blue text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name/Address Keyword Search */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Keyword Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Red Cross, Safdarjung..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Middle & Right Columns Combined (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Middle Column: Results List (7 cols on tablet/desktop) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Results Header */}
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500 uppercase">
                Showing {filteredRepositories.length} Match{filteredRepositories.length !== 1 ? 'es' : ''}
              </span>
              <span className="font-semibold text-slate-400">
                Blood Group: <strong className="text-gov-red font-black text-sm">{selectedGroup}</strong>
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
              {currentItems.map((repo) => {
                const availableUnits = repo.stocks[selectedGroup] || 0;
                return (
                  <div 
                    key={repo.id} 
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all space-y-4 relative overflow-hidden"
                  >
                    {/* Repository Type Badge */}
                    <div className="flex justify-between items-start">
                      <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider ${
                        repo.type === 'Hospital' 
                          ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {repo.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-slate-350" /> {repo.distance} km away
                      </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                      <h3 className="font-black text-slate-800 text-sm leading-snug">{repo.name}</h3>
                      <p className="text-[11px] text-slate-550 leading-relaxed">{repo.address}</p>
                    </div>

                    {/* Stock status indicator */}
                    <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-3 text-xs">
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Stock Available</span>
                        <span className={`text-lg font-black mt-0.5 block ${
                          availableUnits > 10 ? 'text-emerald-600' : availableUnits > 0 ? 'text-amber-600' : 'text-gov-red'
                        }`}>
                          {availableUnits} Units
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Timings</span>
                        <span className="font-semibold text-slate-700 mt-0.5 block">{repo.timings}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-1 text-xs">
                      <a 
                        href={`tel:${repo.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-slate-650 hover:text-slate-900 font-mono font-bold"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {repo.phone}
                      </a>
                      <button
                        onClick={() => setSelectedBank(repo)}
                        className="px-4 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1 shrink-0"
                      >
                        <Info className="w-3.5 h-3.5" />
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredRepositories.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">No Repositories Stocked</h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      No connected hospitals or blood banks in Delhi matching city settings stock {selectedGroup} currently.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-bold text-slate-500">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Google Maps Placeholder (5 cols on tablet/desktop) */}
          <div className="hidden md:block md:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 h-[550px] relative overflow-hidden">
            {/* Map Placeholder Graphics */}
            <div className="absolute inset-0 bg-slate-100 flex flex-col justify-between p-4">
              
              {/* Top controls overlay */}
              <div className="flex justify-between items-center gap-2 relative z-10 w-full">
                <div className="bg-white rounded-xl px-3 py-1.5 shadow-md border border-slate-100 text-[10px] font-black text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-gov-blue animate-spin-slow" />
                  Map Center: {selectedCity}
                </div>
                <div className="bg-white rounded-xl p-1.5 shadow-md border border-slate-100 cursor-pointer hover:bg-slate-50">
                  <Layers className="w-3.5 h-3.5 text-slate-650" />
                </div>
              </div>

              {/* Mock map road patterns */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid / Roads */}
                  <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="#1e293b" strokeWidth="2" />
                  <line x1="40%" y1="0%" x2="40%" y2="100%" stroke="#1e293b" strokeWidth="3" />
                  <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="#1e293b" strokeWidth="1" />
                  <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#1e293b" strokeWidth="4" />
                  <line x1="0%" y1="65%" x2="100%" y2="65%" stroke="#1e293b" strokeWidth="2" />
                  <circle cx="40%" cy="30%" r="40" stroke="#1e293b" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Pins mapping current page items */}
              {currentItems.map((item, idx) => {
                const coordinates = [
                  { top: '32%', left: '42%' }, // cp
                  { top: '64%', left: '38%' }, // safdarjung
                  { top: '66%', left: '45%' }, // aiims
                  { top: '78%', left: '60%' }, // tughlakabad
                  { top: '82%', left: '35%' }  // saket max
                ][idx] || { top: '50%', left: '50%' };
                
                return (
                  <div 
                    key={item.id}
                    className="absolute flex flex-col items-center select-none"
                    style={{ top: coordinates.top, left: coordinates.left }}
                  >
                    <div className="bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg max-w-[80px] truncate">
                      {item.name.split(' ')[0]}
                    </div>
                    <div className="w-6 h-6 bg-gov-red border-2 border-white rounded-full flex items-center justify-center shadow-lg -mt-1 transform hover:scale-110 transition-transform cursor-pointer">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                );
              })}

              {/* Bottom directions prompt */}
              <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-100 text-[10px] relative z-10 space-y-1">
                <p className="font-bold text-slate-800">Satellite Navigation Live Feed</p>
                <p className="text-slate-500 leading-normal">
                  Showing connected repositories stocking <strong className="text-gov-red">{selectedGroup}</strong>. Click cards to audit details.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* DETAIL MODAL OVERLAY */}
      {selectedBank && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative overflow-hidden space-y-6 animate-scale-up text-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-blue"></div>
            
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-gov-blue font-bold text-[9px] uppercase tracking-wider">{selectedBank.type}</span>
                <h3 className="font-black text-slate-800 text-sm leading-snug mt-1.5">{selectedBank.name}</h3>
                <p className="text-[10px] text-slate-450 font-mono mt-0.5">Accreditation ID: {selectedBank.license}</p>
              </div>
              <button 
                onClick={() => setSelectedBank(null)}
                className="text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Info */}
            <div className="space-y-4 text-slate-700">
              <div className="space-y-1.5">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Postal Address</span>
                <p className="font-semibold leading-relaxed text-slate-850">{selectedBank.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Contact Number</span>
                  <a href={`tel:${selectedBank.phone}`} className="font-bold text-slate-800 font-mono block mt-0.5 hover:underline">
                    {selectedBank.phone}
                  </a>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Email Address</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">{selectedBank.email}</span>
                </div>
              </div>

              {/* Complete Stock Inventory Grid */}
              <div className="space-y-2">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Stock Inventory Matrix</span>
                <div className="grid grid-cols-4 gap-1.5 font-bold text-center">
                  {Object.entries(selectedBank.stocks).map(([bg, val]) => (
                    <div 
                      key={bg} 
                      className={`p-2 rounded-xl border flex flex-col justify-between ${
                        selectedGroup === bg 
                          ? 'bg-gov-red/5 border-gov-red/20' 
                          : 'bg-slate-50/50 border-slate-100'
                      }`}
                    >
                      <span className="text-[9px] text-slate-450 font-semibold">{bg}</span>
                      <span className={`text-xs mt-0.5 ${val > 10 ? 'text-emerald-600' : val > 0 ? 'text-amber-600' : 'text-gov-red'}`}>
                        {val} U
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <a 
                href={`mailto:${selectedBank.email}`}
                className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-750 font-bold rounded-xl text-center cursor-pointer"
              >
                Send Query
              </a>
              <a 
                href={`tel:${selectedBank.phone}`}
                className="flex-1 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-center shadow-sm cursor-pointer"
              >
                Call Repository
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
