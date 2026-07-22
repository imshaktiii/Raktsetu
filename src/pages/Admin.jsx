import { useState, useEffect } from 'react';
import { adminAPI } from '../api/admin';
import { dashboardAPI } from '../api/dashboard';
import DashboardCard from '../components/DashboardCard';
import { 
  Users, 
  Heart, 
  Calendar, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  AlertTriangle,
  LayoutDashboard,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Directory lists states
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [camps, setCamps] = useState([]);
  const [stats, setStats] = useState(null);

  // Loading & Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterExtra, setFilterExtra] = useState('All'); // availability for donor, urgency for requests, status for camps
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all directory data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsRes = await dashboardAPI.getStats();
      const donorsRes = await adminAPI.getDonors();
      const requestsRes = await adminAPI.getRequests();
      const campsRes = await adminAPI.getCamps();

      if (statsRes.success && donorsRes.success && requestsRes.success && campsRes.success) {
        setStats(statsRes.stats);
        setDonors(donorsRes.donors || []);
        setRequests(requestsRes.requests || []);
        setCamps(campsRes.camps || []);
      } else {
        setError('Error loading administrative directory logs.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection failure. Could not query MongoDB administration registries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset pagination on tab/filter updates
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setFilterGroup('All');
    setFilterExtra('All');
  }, [activeTab]);

  // DELETE Handlers
  const handleDeleteDonor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donor account?')) return;
    try {
      const res = await adminAPI.deleteDonor(id);
      if (res.success) {
        setDonors(donors.filter(d => d._id !== id));
        fetchData(); // Sync stats
      } else {
        alert('Could not delete donor details.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while deleting donor.');
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blood request?')) return;
    try {
      const res = await adminAPI.deleteRequest(id);
      if (res.success) {
        setRequests(requests.filter(r => r._id !== id));
        fetchData();
      } else {
        alert('Could not delete blood request.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while deleting request.');
    }
  };

  const handleDeleteCamp = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blood camp?')) return;
    try {
      const res = await adminAPI.deleteCamp(id);
      if (res.success) {
        setCamps(camps.filter(c => c._id !== id));
        fetchData();
      } else {
        alert('Could not delete blood camp drive.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while deleting camp.');
    }
  };

  // FILTERING LOGIC
  const getFilteredData = () => {
    switch (activeTab) {
      case 'Donors':
        return donors.filter(d => {
          const matchesSearch = d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || d.email.toLowerCase().includes(searchQuery.toLowerCase()) || d.city.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesGroup = filterGroup === 'All' || d.bloodGroup === filterGroup;
          const matchesAvail = filterExtra === 'All' || (filterExtra === 'Available' ? d.available : !d.available);
          return matchesSearch && matchesGroup && matchesAvail;
        });

      case 'Blood Requests':
        return requests.filter(r => {
          const matchesSearch = r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || r.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) || r.city.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesGroup = filterGroup === 'All' || r.bloodGroup === filterGroup;
          const matchesUrgency = filterExtra === 'All' || r.urgency === filterExtra;
          return matchesSearch && matchesGroup && matchesUrgency;
        });

      case 'Blood Camps':
        return camps.filter(c => {
          const matchesSearch = c.campName.toLowerCase().includes(searchQuery.toLowerCase()) || c.venue.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = filterExtra === 'All' || c.status === filterExtra;
          return matchesSearch && matchesStatus;
        });

      default:
        return [];
    }
  };

  const filteredItems = getFilteredData();

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3 text-xs font-semibold text-slate-550">
        <Loader2 className="w-8 h-8 text-gov-blue animate-spin" />
        <p>Loading database admin logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-800 text-sm">Admin Access Failure</h4>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs cursor-pointer">
              Retry Load
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gov-gold-light">Government Portal</span>
          <h2 className="text-lg font-black text-white mt-1 tracking-tight">Admin Console</h2>
        </div>
        
        <nav className="p-4 space-y-1.5 flex-grow font-bold text-xs">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Donors', icon: Users },
            { name: 'Blood Requests', icon: Heart },
            { name: 'Blood Camps', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-left cursor-pointer ${
                  activeTab === tab.name 
                    ? 'bg-gov-red text-white' 
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-grow p-6 sm:p-8 lg:p-12 space-y-8 overflow-y-auto">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
            System Control Panel
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{activeTab} Manager</h1>
        </div>

        {/* TAB VIEW 1: DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8">
            {/* Top widgets grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <DashboardCard title="Total Donors" count={stats?.totalDonors || 0} color="blue" />
              <DashboardCard title="Available Donors" count={stats?.availableDonors || 0} color="emerald" />
              <DashboardCard title="Total Requests" count={stats?.totalBloodRequests || 0} color="slate" />
              <DashboardCard title="Active Requests" count={stats?.activeBloodRequests || 0} color="red" />
              <DashboardCard title="Total Camps" count={stats?.totalBloodCamps || 0} color="purple" />
              <DashboardCard title="Upcoming Camps" count={stats?.upcomingBloodCamps || 0} color="gold" />
            </div>

            {/* General Admin Quick Actions / Notice */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">System Database Health</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-800">MERN Server</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Online & Connected</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-gov-blue shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-800">Mongoose Pipeline</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Active connections</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <Compass className="w-8 h-8 text-gov-gold shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-800">DNS Resolution</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Public resolver configured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DIRECTORY VIEWS (Donors, Requests, Camps) */}
        {activeTab !== 'Dashboard' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Search & Filter Header */}
            <div className="flex flex-col sm:flex-row gap-3 text-xs font-bold text-slate-700 items-center justify-between border-b border-slate-100 pb-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Keyword search..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto items-center">
                {/* Blood Group filter (only for Donors and Requests) */}
                {activeTab !== 'Blood Camps' && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Group:</span>
                    <select
                      value={filterGroup}
                      onChange={(e) => setFilterGroup(e.target.value)}
                      className="p-2 border border-slate-200 rounded-xl bg-white focus:outline-none"
                    >
                      <option value="All">All Groups</option>
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Extra Filter selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Status:</span>
                  <select
                    value={filterExtra}
                    onChange={(e) => setFilterExtra(e.target.value)}
                    className="p-2 border border-slate-200 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="All">All Status</option>
                    {activeTab === 'Donors' && (
                      <>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </>
                    )}
                    {activeTab === 'Blood Requests' && (
                      <>
                        <option value="High">High Urgency</option>
                        <option value="Medium">Medium Urgency</option>
                        <option value="Low">Low Urgency</option>
                      </>
                    )}
                    {activeTab === 'Blood Camps' && (
                      <>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* DATA TABLES CONTENT */}
            <div className="overflow-x-auto">
              
              {/* TABLE: DONORS */}
              {activeTab === 'Donors' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4 text-center">Group</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4 text-center">Availability</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {currentItems.map((donor) => (
                      <tr key={donor._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{donor.fullName}</td>
                        <td className="py-3.5 px-4 font-mono">
                          <p>{donor.email}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{donor.phone}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center font-black text-gov-red">{donor.bloodGroup}</td>
                        <td className="py-3.5 px-4">{donor.city}, {donor.state}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border ${
                            donor.available 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {donor.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button onClick={() => handleDeleteDonor(donor._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TABLE: BLOOD REQUESTS */}
              {activeTab === 'Blood Requests' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Patient</th>
                      <th className="py-3 px-4 text-center">Group</th>
                      <th className="py-3 px-4 text-center">Units</th>
                      <th className="py-3 px-4">Hospital Venue</th>
                      <th className="py-3 px-4 text-center">Urgency</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {currentItems.map((req) => (
                      <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{req.patientName}</td>
                        <td className="py-3.5 px-4 text-center font-black text-gov-red">{req.bloodGroup}</td>
                        <td className="py-3.5 px-4 text-center font-mono">{req.units}</td>
                        <td className="py-3.5 px-4">
                          <p>{req.hospitalName}</p>
                          <p className="text-[10px] text-slate-450 mt-0.5">{req.city}, {req.state}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border ${
                            req.urgency === 'High' ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : req.urgency === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {req.urgency}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button onClick={() => handleDeleteRequest(req._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TABLE: BLOOD CAMPS */}
              {activeTab === 'Blood Camps' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Camp Name</th>
                      <th className="py-3 px-4">Organizer</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Venue Address</th>
                      <th className="py-3 px-4 text-center">Seats Filled</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {currentItems.map((camp) => (
                      <tr key={camp._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{camp.campName}</td>
                        <td className="py-3.5 px-4">
                          <p>{camp.organizerName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{camp.organizerPhone}</p>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p>{new Date(camp.date).toLocaleDateString()}</p>
                          <p className="text-[10px] text-slate-455 mt-0.5">{camp.startTime} - {camp.endTime}</p>
                        </td>
                        <td className="py-3.5 px-4 truncate max-w-[150px]">{camp.venue}, {camp.city}</td>
                        <td className="py-3.5 px-4 text-center font-mono">{camp.registeredDonors} / {camp.totalSeats}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button onClick={() => handleDeleteCamp(camp._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {filteredItems.length === 0 && (
                <div className="py-12 text-center text-slate-400">No matching registry records found.</div>
              )}
            </div>

            {/* Pagination Controls Footer */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
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
        )}
      </main>
    </div>
  );
}
