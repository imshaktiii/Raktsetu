import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../api/dashboard';
import { campsAPI } from '../api/camps';
import DashboardCard from '../components/DashboardCard';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  LineChart, 
  Line
} from 'recharts';
import { Loader2, AlertTriangle, Calendar, MapPin, Award, User } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const [showCampsModal, setShowCampsModal] = useState(false);
  const [campsList, setCampsList] = useState([]);
  const [registeringCampId, setRegisteringCampId] = useState(null);

  useEffect(() => {
    if (showCampsModal) {
      const loadCamps = async () => {
        try {
          const res = await campsAPI.getCamps();
          if (res.success) {
            setCampsList(res.camps || []);
          }
        } catch (err) {
          console.error("Error loading camps:", err);
        }
      };
      loadCamps();
    }
  }, [showCampsModal]);

  const handleRegisterCamp = async (campId) => {
    setRegisteringCampId(campId);
    try {
      const res = await campsAPI.registerForCamp(campId);
      if (res.success) {
        alert("Registration Successful! You have registered for this Blood Camp.");
        setShowCampsModal(false);
        fetchStats();
      } else {
        alert(res.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "You are already registered for this Blood Camp.";
      alert(errMsg);
    } finally {
      setRegisteringCampId(null);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardAPI.getStats();
      if (data && data.success) {
        setStats(data.stats);
      } else {
        setError('Failed to fetch dashboard statistics.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to the dashboard statistics service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getMonthName = (monthNumber) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNumber - 1] || monthNumber;
  };

  const chartRegistrationData = (stats?.monthlyRegistrations || []).map(item => ({
    name: `${getMonthName(item.month)} ${item.year}`,
    Registrations: item.count
  }));

  const chartGroupData = (stats?.bloodGroupDistribution || []).map(item => ({
    name: item.bloodGroup,
    Donors: item.count
  }));

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3 text-xs font-semibold text-slate-550">
        <Loader2 className="w-8 h-8 text-gov-red animate-spin" />
        <p>Loading real-time National Hub statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-800 text-sm">Dashboard Connection Failure</h4>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            <button 
              onClick={fetchStats}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all text-xs cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Profile Photo Display */}
          <Link to="/profile" className="shrink-0 block">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200 shadow-inner hover:scale-105 transition-transform">
              {user?.profileImage ? (
                <img 
                  src={(() => {
                    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                    const hostUrl = baseUrl.replace('/api', '');
                    return user.profileImage.startsWith('http') ? user.profileImage : `${hostUrl}${user.profileImage}`;
                  })()} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>
          </Link>
          <div className="space-y-1">
            <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
              E-Raktkosh Unified National Dashboard
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome, {user?.fullName || 'Donor'}
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Real-time MERN aggregation of registered voluntary donors, active emergency requests, and scheduled blood camps.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/certificate"
            className="px-4 py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer text-center"
          >
            <Award className="w-4 h-4 text-white animate-pulse" />
            Blood Donation Certificate
          </Link>
        </div>
      </div>

      {/* Donor Workspace Panel */}
      {stats?.donorStats && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card A: Donation Eligibility Status */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Donation Eligibility</span>
              <h3 className="text-lg font-black text-slate-800 mt-1">Status Panel</h3>
            </div>
            <div className="py-2">
              {stats.donorStats.eligible ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-605 border border-emerald-105 rounded-xl font-bold text-xs text-emerald-600">
                  <span className="w-2.5 h-2.5 bg-emerald-550 rounded-full animate-pulse"></span>
                  Donation Status: Eligible
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl font-bold text-xs">
                    Next Eligible: {new Date(stats.donorStats.nextEligibleDate).toLocaleDateString()}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Please wait {stats.donorStats.daysRemaining} more days before your next donation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card B: Donate Blood Call-to-Action */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Schedule Appt</span>
              <h3 className="text-lg font-black text-slate-800 mt-1 font-extrabold text-gov-red">Donate Blood</h3>
            </div>
            <div>
              <button 
                onClick={() => setShowCampsModal(true)}
                className="w-full py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                Find Nearby Blood Camps
              </button>
            </div>
          </div>

          {/* Card C: Upcoming Donation */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Scheduled Visit</span>
              <h3 className="text-lg font-black text-slate-800 mt-1">Upcoming Donation</h3>
            </div>
            <div>
              {stats.donorStats.upcomingDonation ? (
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="font-bold text-slate-850">{stats.donorStats.upcomingDonation.campName}</p>
                  <p className="text-[10px] text-slate-450">Date: {new Date(stats.donorStats.upcomingDonation.date).toLocaleDateString()}</p>
                  <p className="text-[10px] text-slate-450">Time: {stats.donorStats.upcomingDonation.startTime} - {stats.donorStats.upcomingDonation.endTime}</p>
                  <p className="text-[10px] text-slate-500 truncate">Location: {stats.donorStats.upcomingDonation.venue}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase tracking-wider border border-blue-100">
                    Status: {stats.donorStats.upcomingDonation.status}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No upcoming donation scheduled.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Stats Cards Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <DashboardCard title="Total Donors" count={stats?.totalDonors || 0} color="blue" />
        <DashboardCard title="Available Donors" count={stats?.availableDonors || 0} color="emerald" />
        <DashboardCard title="Total Requests" count={stats?.totalBloodRequests || 0} color="slate" />
        <DashboardCard title="Active Requests" count={stats?.activeBloodRequests || 0} color="red" />
        <DashboardCard title="Total Camps" count={stats?.totalBloodCamps || 0} color="purple" />
        <DashboardCard title="Upcoming Camps" count={stats?.upcomingBloodCamps || 0} color="gold" />
      </section>

      {/* Analytics Charts Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Blood Group Distribution */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Blood Group Distribution</h3>
            <p className="text-[11px] text-slate-400">Total voluntary registered donors classified by blood type</p>
          </div>
          <div className="h-[280px] text-xs">
            {chartGroupData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartGroupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="Donors" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No donor aggregation metrics.</div>
            )}
          </div>
        </div>

        {/* Chart 2: Monthly Registrations */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Monthly Registrations</h3>
            <p className="text-[11px] text-slate-400">Voluntary donor registration growth rate analytics</p>
          </div>
          <div className="h-[280px] text-xs">
            {chartRegistrationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartRegistrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="Registrations" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No registration trend analytics.</div>
            )}
          </div>
        </div>
      </section>

      {/* Grid: Latest Requests & Scheduled Camps */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Latest Requests (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Latest Blood Requests</h3>
            <p className="text-xs text-slate-500">Live clinical emergency demand orders logged in system</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4 text-center">Group</th>
                  <th className="py-3 px-4 text-center">Units</th>
                  <th className="py-3 px-4">Hospital Venue</th>
                  <th className="py-3 px-4 text-center">Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-750 font-medium">
                {(stats?.recentBloodRequests || []).map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">{req.patientName}</td>
                    <td className="py-3.5 px-4 text-center font-black text-gov-red">{req.bloodGroup}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{req.units}</td>
                    <td className="py-3.5 px-4 truncate max-w-[150px]">{req.hospitalName}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[8px] uppercase tracking-wider ${
                        req.urgency === 'High' ? 'bg-red-50 text-red-600' : req.urgency === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {req.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!stats?.recentBloodRequests || stats.recentBloodRequests.length === 0) && (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-slate-400">No recent blood requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Blood Camps (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Upcoming Blood Camps</h3>
            <p className="text-xs text-slate-500">Voluntary donation camps scheduled in the directory</p>
          </div>
          <div className="space-y-4">
            {(stats?.upcomingCamps || []).map((camp) => (
              <div key={camp._id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3 hover:shadow-md transition-all text-xs font-semibold text-slate-600">
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-slate-850 max-w-[75%] leading-snug">{camp.campName}</h4>
                  <span className="text-[9px] font-bold text-gov-blue bg-gov-blue/5 px-2 py-0.5 rounded border border-gov-blue/10 shrink-0">
                    {camp.registeredDonors} / {camp.totalSeats} seats
                  </span>
                </div>
                <div className="space-y-1 text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gov-red shrink-0" />
                    <span>{new Date(camp.date).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{camp.venue}, {camp.city}</span>
                  </p>
                </div>
              </div>
            ))}
            {(!stats?.upcomingCamps || stats.upcomingCamps.length === 0) && (
              <div className="py-6 text-center text-slate-405">No upcoming blood camps scheduled.</div>
            )}
          </div>
        </div>
      </section>

      {/* Camps List Modal Overlay */}
      {showCampsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100 animate-scale-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gov-red" />
                  Scheduled Donation Camps
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Select a camp below to register your voluntary donation profile</p>
              </div>
              <button 
                onClick={() => setShowCampsModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Scrollable List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-grow bg-slate-50/50">
              {campsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campsList.map((camp) => (
                    <div key={camp._id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-extrabold text-sm text-slate-850 leading-snug">{camp.campName}</h4>
                          <span className="text-[9px] font-bold text-gov-blue bg-gov-blue/5 px-2 py-0.5 rounded border border-gov-blue/10 shrink-0">
                            {camp.registeredDonors} / {camp.totalSeats} registered
                          </span>
                        </div>
                        <div className="text-[11px] space-y-1 text-slate-500">
                          <p><span className="font-bold text-slate-700">Organizer:</span> {camp.organizerName} ({camp.organizerPhone})</p>
                          <p><span className="font-bold text-slate-700">Date:</span> {new Date(camp.date).toLocaleDateString()}</p>
                          <p><span className="font-bold text-slate-700">Time:</span> {camp.startTime} - {camp.endTime}</p>
                          <p><span className="font-bold text-slate-700">Address:</span> {camp.venue}, {camp.city}, {camp.state}</p>
                          <p><span className="font-bold text-slate-700">Blood Groups:</span> All Groups Welcome (A+, A-, B+, B-, AB+, AB-, O+, O-)</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camp.venue + ', ' + camp.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 text-center border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all"
                        >
                          Google Maps
                        </a>
                        <button
                          onClick={() => handleRegisterCamp(camp._id)}
                          disabled={registeringCampId !== null || camp.registeredDonors >= camp.totalSeats}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer ${
                            camp.registeredDonors >= camp.totalSeats
                              ? 'bg-slate-400 cursor-not-allowed'
                              : 'bg-gov-red hover:bg-gov-red-dark'
                          }`}
                        >
                          {registeringCampId === camp._id ? 'Registering...' : camp.registeredDonors >= camp.totalSeats ? 'Full' : 'Register'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">No scheduled blood camps found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
