import { useState } from 'react';
import { donorsAPI } from '../api/donors';
import { Search, MapPin, Phone, SlidersHorizontal, Loader2, User, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await donorsAPI.searchDonors(bloodGroup, city.trim());
      if (data && data.success) {
        setDonors(data.donors || []);
      } else {
        setDonors([]);
        setError('Unable to fetch donors list. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while connecting to the server.');
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
          E-Raktkosh Unified Donor Registry
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Search Blood Donors</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Search for registered voluntary blood donors within your city to request direct emergency donations.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Search Filter Form (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <SlidersHorizontal className="w-4.5 h-4.5 text-gov-blue" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Search Filters</h3>
          </div>

          <form onSubmit={handleSearch} className="space-y-4 text-xs">
            {/* Blood Group Select */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">Required Blood Group</label>
              <select
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold text-slate-700 focus:outline-none focus:border-gov-blue"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* City Input */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1.5">City</label>
              <input
                type="text"
                placeholder="e.g. Kolhapur, Pune, Mumbai"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white font-semibold text-slate-700"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-xs"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Search Donors
            </button>
          </form>
        </div>

        {/* Right Column: Search Results (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Results Header */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-500 uppercase">
              {hasSearched ? `Showing ${donors.length} Donor${donors.length !== 1 ? 's' : ''} Found` : 'Enter parameters to search'}
            </span>
            {hasSearched && (
              <span className="font-semibold text-slate-400">
                Blood Group: <strong className="text-gov-red font-black text-sm">{bloodGroup}</strong>
              </span>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-gov-red animate-spin" />
              <p className="text-slate-500 text-xs font-semibold">Querying live donor registry...</p>
            </div>
          )}

          {/* Error Message */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-800 text-xs">Search Issue</h4>
                <p className="text-[11px] text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Donor Cards Grid */}
          {!loading && !error && hasSearched && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donors.map((donor) => (
                <div 
                  key={donor._id || Math.random()} 
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
                >
                  {/* Left Red Stripe Accent */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gov-red group-hover:scale-y-110 transition-transform"></div>

                  <div className="pl-2 space-y-3 text-xs">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-800 leading-snug text-sm">{donor.fullName}</h4>
                          <span className="text-[10px] text-slate-450 font-semibold flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" /> {donor.city}, {donor.state}
                          </span>
                        </div>
                      </div>
                      
                      {/* Blood Group Badge */}
                      <span className="w-8 h-8 rounded-xl bg-gov-red/10 border border-gov-red/20 text-gov-red font-black text-center flex items-center justify-center text-sm shadow-sm shrink-0">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    {/* Contact & Availability Details */}
                    <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Mobile Phone</span>
                        {donor.phone ? (
                          <a 
                            href={`tel:${donor.phone.replace(/\s+/g, '')}`} 
                            className="font-bold text-slate-700 font-mono flex items-center gap-1 mt-0.5 hover:text-gov-blue hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {donor.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400 font-semibold block mt-0.5">N/A</span>
                        )}
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Availability</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] mt-1 ${
                          donor.available 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-slate-150 text-slate-500 border border-slate-200'
                        }`}>
                          {donor.available ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              Available
                            </>
                          ) : (
                            'Not Available'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && hasSearched && donors.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">No donors found.</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  No active volunteers match the selected blood group and city constraints.
                </p>
              </div>
            </div>
          )}

          {/* Initial State (Before search) */}
          {!hasSearched && (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Start Your Search</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Choose a blood group and enter a city name to look up volunteer donors.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
