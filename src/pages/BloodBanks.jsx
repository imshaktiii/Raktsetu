import { useState } from 'react';
import { Search, MapPin, Phone, Building, AlertTriangle, ShieldCheck, Mail, Globe, ArrowUpRight } from 'lucide-react';

const mockBanks = [
  {
    id: 1,
    name: 'AIIMS Central Blood Bank',
    category: 'Government',
    address: 'Ansari Nagar, Near Ring Road',
    district: 'New Delhi',
    phone: '+91-11-26588500',
    email: 'bloodbank@aiims.edu',
    website: 'www.aiims.edu',
    stock: {
      'A+': { bags: 24, status: 'Available' },
      'A-': { bags: 4, status: 'Low' },
      'B+': { bags: 38, status: 'Available' },
      'B-': { bags: 2, status: 'Critical' },
      'AB+': { bags: 15, status: 'Available' },
      'AB-': { bags: 1, status: 'Critical' },
      'O+': { bags: 45, status: 'Available' },
      'O-': { bags: 0, status: 'Unavailable' }
    }
  },
  {
    id: 2,
    name: 'Red Cross Society Regional Center',
    category: 'Red Cross',
    address: '1, Red Cross Road, Near Parliament House',
    district: 'Central Delhi',
    phone: '+91-11-23716441',
    email: 'info@indianredcross.org',
    website: 'www.indianredcross.org',
    stock: {
      'A+': { bags: 18, status: 'Available' },
      'A-': { bags: 8, status: 'Available' },
      'B+': { bags: 22, status: 'Available' },
      'B-': { bags: 6, status: 'Low' },
      'AB+': { bags: 9, status: 'Available' },
      'AB-': { bags: 4, status: 'Low' },
      'O+': { bags: 28, status: 'Available' },
      'O-': { bags: 5, status: 'Low' }
    }
  },
  {
    id: 3,
    name: 'Safdarjung Hospital Blood Depot',
    category: 'Government',
    address: 'Ansari Nagar East, Safdarjung',
    district: 'New Delhi',
    phone: '+91-11-26707100',
    email: 'contact@safdarjunghospital.gov.in',
    website: 'www.vmmc-sjh.nic.in',
    stock: {
      'A+': { bags: 12, status: 'Available' },
      'A-': { bags: 1, status: 'Critical' },
      'B+': { bags: 19, status: 'Available' },
      'B-': { bags: 0, status: 'Unavailable' },
      'AB+': { bags: 5, status: 'Low' },
      'AB-': { bags: 0, status: 'Unavailable' },
      'O+': { bags: 31, status: 'Available' },
      'O-': { bags: 2, status: 'Critical' }
    }
  },
  {
    id: 4,
    name: 'Max Super Speciality Blood Bank',
    category: 'Private',
    address: 'Press Enclave Road, Saket',
    district: 'South Delhi',
    phone: '+91-11-26515050',
    email: 'saket@maxhealthcare.com',
    website: 'www.maxhealthcare.in',
    stock: {
      'A+': { bags: 30, status: 'Available' },
      'A-': { bags: 10, status: 'Available' },
      'B+': { bags: 35, status: 'Available' },
      'B-': { bags: 8, status: 'Available' },
      'AB+': { bags: 18, status: 'Available' },
      'AB-': { bags: 5, status: 'Low' },
      'O+': { bags: 40, status: 'Available' },
      'O-': { bags: 12, status: 'Available' }
    }
  },
  {
    id: 5,
    name: 'Civil Hospital Blood Center',
    category: 'Government',
    address: 'Near Sadar Bazar, Sector 10',
    district: 'Gurugram',
    phone: '+91-124-2322412',
    email: 'hry-civilgurugram@gov.in',
    website: 'www.haryanahealth.nic.in',
    stock: {
      'A+': { bags: 8, status: 'Low' },
      'A-': { bags: 0, status: 'Unavailable' },
      'B+': { bags: 14, status: 'Available' },
      'B-': { bags: 2, status: 'Critical' },
      'AB+': { bags: 4, status: 'Low' },
      'AB-': { bags: 0, status: 'Unavailable' },
      'O+': { bags: 15, status: 'Available' },
      'O-': { bags: 1, status: 'Critical' }
    }
  }
];

const bloodGroups = ['All Groups', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const categories = ['All Categories', 'Government', 'Red Cross', 'Private'];

export default function BloodBanks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredBanks = mockBanks.filter((bank) => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bank.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || bank.category === selectedCategory;
    
    // Group filter: must have > 0 bags for that group if filtered
    const matchesGroup = selectedGroup === 'All Groups' || 
                         (bank.stock[selectedGroup] && bank.stock[selectedGroup].bags > 0);
                         
    return matchesSearch && matchesCategory && matchesGroup;
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
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Blood Bank Directory</h1>
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
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search blood banks by name, district, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
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

            {/* Blood Group Select */}
            <div className="md:col-span-3">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-bold text-gov-red bg-white"
              >
                {bloodGroups.map((gp, i) => (
                  <option key={i} value={gp}>
                    {gp === 'All Groups' ? 'Filter by Blood Type' : `Has Stock: ${gp}`}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Color Key */}
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 pt-1 border-t border-slate-50">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Available (&gt;10 bags)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Low Stock (3-9 bags)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              Critical (&lt;3 bags)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              Unavailable (0 bags)
            </span>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        {filteredBanks.length > 0 ? (
          <div className="space-y-6">
            {filteredBanks.map((bank) => (
              <div 
                key={bank.id} 
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
                    <span className="text-xs text-slate-400 font-semibold">{bank.district}</span>
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

                  <div className="pt-2 flex gap-3">
                    <a
                      href={`https://${bank.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-gov-blue hover:text-gov-red-dark transition-colors"
                    >
                      Visit Website
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
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
                      {Object.entries(bank.stock).map(([grp, info]) => {
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
            <p className="text-slate-400 text-sm font-medium">No blood banks found matching the select parameters.</p>
          </div>
        )}
      </section>

    </div>
  );
}
