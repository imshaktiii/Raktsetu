import { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Building, AlertTriangle, ShieldCheck, Mail, Globe, ArrowUpRight, Loader2 } from 'lucide-react';
import { bloodStockAPI } from '../api/bloodStock';

const categories = ['All Categories', 'Government', 'Red Cross', 'Private'];
const bloodGroupsList = ['All Groups', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function BloodBanks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedGroup, setSelectedGroup] = useState('All Groups');

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const res = await bloodStockAPI.getStock();
        if (res && res.success) {
          setStocks(res.stocks || []);
        } else {
          setError(res.message || 'Failed to fetch blood stock records.');
        }
      } catch (err) {
        console.error('Failed to load blood stock:', err);
        setError('Error establishing connection with the national database.');
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  // Reset dependent filters when parent filters change
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedDistrict('All Districts');
    setSelectedCity('All Cities');
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedCity('All Cities');
  };

  // Derive unique values dynamically from loaded stocks
  const states = ['All States', ...new Set(stocks.map((s) => s.state).filter(Boolean))];
  
  const districts = ['All Districts', ...new Set(
    stocks
      .filter((s) => selectedState === 'All States' || s.state === selectedState)
      .map((s) => s.district)
      .filter(Boolean)
  )];

  const cities = ['All Cities', ...new Set(
    stocks
      .filter((s) => selectedState === 'All States' || s.state === selectedState)
      .filter((s) => selectedDistrict === 'All Districts' || s.district === selectedDistrict)
      .map((s) => s.city)
      .filter(Boolean)
  )];

  // Apply filters
  const filteredBanks = stocks.filter((bank) => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bank.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'All States' || bank.state === selectedState;
    const matchesDistrict = selectedDistrict === 'All Districts' || bank.district === selectedDistrict;
    const matchesCity = selectedCity === 'All Cities' || bank.city === selectedCity;
    const matchesCategory = selectedCategory === 'All Categories' || bank.category === selectedCategory;
    
    // Group filter: must have > 0 bags for that group if filtered
    const matchesGroup = selectedGroup === 'All Groups' || 
                         (bank.stock && bank.stock[selectedGroup] && bank.stock[selectedGroup].bags > 0);
                         
    return matchesSearch && matchesState && matchesDistrict && matchesCity && matchesCategory && matchesGroup;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Low':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200 animate-pulse';
      default:
        return 'bg-slate-100 text-slate-400 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-gov-blue-dark to-gov-blue text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(220,38,38,0.2),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-gov-gold-light uppercase text-xs tracking-wider font-bold">Real-time Stock Inventory</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Blood Stock Status</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Locate blood banks and inspect live available bags categorized by blood type. Contact them directly for transfusion or donations.
          </p>
        </div>
      </section>

      {/* Filter panel */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search blood banks by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
              />
            </div>

            {/* State Select */}
            <div className="md:col-span-2">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
              >
                {states.map((st, i) => (
                  <option key={i} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District Select */}
            <div className="md:col-span-2">
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
                disabled={selectedState === 'All States'}
              >
                {districts.map((ds, i) => (
                  <option key={i} value={ds}>{ds}</option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div className="md:col-span-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
                disabled={selectedDistrict === 'All Districts'}
              >
                {cities.map((ct, i) => (
                  <option key={i} value={ct}>{ct}</option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Blood Group Select */}
            <div className="md:col-span-4">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-bold text-gov-red bg-white"
              >
                {bloodGroupsList.map((gp, i) => (
                  <option key={i} value={gp}>
                    {gp === 'All Groups' ? 'Filter by Blood Type' : `Has Stock: ${gp}`}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Color Key */}
            <div className="md:col-span-8 flex flex-wrap gap-4 text-xs font-semibold text-slate-500 justify-end">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Available (Green)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Low Stock (Yellow)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                Out of Stock / Critical (Red)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                Unavailable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 text-gov-blue animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-sm font-semibold">Connecting to National Blood Stock Directory...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 border border-red-150 rounded-3xl p-8 max-w-xl mx-auto">
            <AlertTriangle className="w-10 h-10 text-gov-red mx-auto mb-3" />
            <p className="text-gov-red font-bold text-sm mb-1">{error}</p>
            <p className="text-slate-500 text-xs">Please verify your internet connection or try again later.</p>
          </div>
        ) : filteredBanks.length > 0 ? (
          <div className="space-y-6">
            {filteredBanks.map((bank) => (
              <div 
                key={bank._id} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                
                {/* Column Left: Directory Info (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${
                      bank.category === 'Government' 
                        ? 'bg-gov-blue/10 text-gov-blue' 
                        : bank.category === 'Red Cross' 
                        ? 'bg-gov-red/10 text-gov-red' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {bank.category} Portal
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{bank.district}, {bank.state}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-xl leading-snug">{bank.name}</h3>

                  <div className="space-y-2 text-sm text-slate-500">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{bank.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={`tel:${bank.phone}`} className="hover:text-gov-blue hover:underline">{bank.phone}</a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={`mailto:${bank.email}`} className="hover:text-gov-blue hover:underline">{bank.email}</a>
                    </p>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-slate-400 font-mono">
                    {bank.website && (
                      <a
                        href={`https://${bank.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-gov-blue hover:text-gov-red-dark transition-colors"
                      >
                        Visit Website
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <span>Last Updated: {new Date(bank.updatedAt || bank.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Column Right: Live Stock Matrix (7 cols) */}
                <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl p-4 sm:p-6 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-gov-blue-light" />
                      Current Available Inventory (Whole Blood Units)
                    </h4>
                    
                    {/* Stock Grid */}
                    <div className="grid grid-cols-4 gap-2.5">
                      {bloodGroupsList.filter(g => g !== 'All Groups').map((grp) => {
                        const info = (bank.stock && bank.stock[grp]) || { bags: 0, status: 'Unavailable' };
                        const isFilteredGroup = selectedGroup === grp;
                        return (
                          <div 
                            key={grp}
                            className={`p-2.5 rounded-xl border text-center transition-all ${getStatusStyle(info.status)} ${
                              isFilteredGroup ? 'ring-2 ring-gov-blue scale-102 font-bold shadow-sm' : ''
                            }`}
                          >
                            <span className="block text-xs font-bold">{grp}</span>
                            <span className="block text-lg font-black mt-1 leading-none">{info.bags}</span>
                            <span className="text-[9px] uppercase tracking-tighter opacity-70 mt-1 block">Bags</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operational Notice if stock contains criticals */}
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-amber-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/50">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Please call ahead to confirm availability before traveling during emergency requisitions.</span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8">
            <p className="text-slate-400 text-sm font-medium">No Blood Stock Available</p>
          </div>
        )}
      </section>

    </div>
  );
}
