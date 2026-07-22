import { useState, useEffect } from 'react';
import { dashboardAPI } from '../api/dashboard';
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
import { Loader2, AlertTriangle, Calendar, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

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
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
          E-Raktkosh Unified National Dashboard
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">National Hub Statistics</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Real-time MERN aggregation of registered voluntary donors, active emergency requests, and scheduled blood camps.
        </p>
      </div>

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
    </div>
  );
}
