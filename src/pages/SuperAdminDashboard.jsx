import { useState } from 'react';
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
  Line, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Database, 
  Calendar, 
  GitPullRequest, 
  FileText, 
  Bell, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  AlertCircle, 
  Search, 
  Activity, 
  Sun, 
  Moon, 
  Shield
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Mock State for User Management
  const [users, setUsers] = useState([
    { id: 'USR-892', name: 'Rajesh Sharma', role: 'Donor', email: 'rajesh@gmail.com', phone: '98765 11223', status: 'Active' },
    { id: 'USR-893', name: 'Metro Health Center', role: 'Hospital', email: 'contact@metrohealth.com', phone: '011-2550100', status: 'Pending Approval' },
    { id: 'USR-894', name: 'Red Cross East Delhi', role: 'Blood Bank', email: 'eastdelhi@redcross.org', phone: '98765 44332', status: 'Active' },
    { id: 'USR-895', name: 'Amit Verma', role: 'Donor', email: 'amit.verma@yahoo.com', phone: '99887 76655', status: 'Suspended' }
  ]);

  // Mock State for Hospital Approvals
  const [pendingHospitals, setPendingHospitals] = useState([
    { id: 'HSP-PEND-01', name: 'Apex Multi-Specialty', license: 'LIC-APX-8902', address: 'Dwarka Sector 12, Delhi', date: '2026-07-18' },
    { id: 'HSP-PEND-02', name: 'Fortis Clinic Repository', license: 'LIC-FT-40912', address: 'Noida Sector 62, UP', date: '2026-07-19' }
  ]);

  // Mock State for Blood Bank Approvals
  const [pendingBanks, setPendingBanks] = useState([
    { id: 'BNK-PEND-01', name: 'Jeevan Deep Blood Repository', license: 'LIC-JD-7729', address: 'Connaught Place, Delhi', date: '2026-07-18' }
  ]);

  // Mock State for Blood Camp Approvals
  const [pendingCamps, setPendingCamps] = useState([
    { id: 'CMP-PEND-01', title: 'Independence Week Donation Drive', organizer: 'Lions Club Delhi', date: '2026-07-26', venue: 'India Gate lawns' }
  ]);

  // Mock State for Blood Requests
  const [bloodRequests] = useState([
    { id: 'REQ-901', hospital: 'All India Institute of Health', group: 'O-', units: 6, priority: 'Critical', status: 'Active', date: '2026-07-19' },
    { id: 'REQ-902', hospital: 'Safdarjung Emergency Unit', group: 'A+', units: 4, priority: 'Urgent', status: 'Active', date: '2026-07-19' },
    { id: 'REQ-903', hospital: 'Max Super Specialty Hospital', group: 'AB-', units: 2, priority: 'Normal', status: 'Dispatched', date: '2026-07-18' }
  ]);

  // Mock Notifications
  const notifications = [
    { id: 1, text: 'New Hospital registration request logged: Fortis Clinic Repository.', type: 'registration', time: '10 mins ago' },
    { id: 2, text: 'Alert: Critical blood deficit (O-) reported at Safdarjung repository.', type: 'deficit', time: '35 mins ago' },
    { id: 3, text: 'Security log: Administrative backup executed successfully.', type: 'backup', time: '2 hours ago' }
  ];

  // Chart Data 1: Donor Growth (LineChart)
  const donorGrowthData = [
    { month: 'Jan', Donors: 30000 },
    { month: 'Feb', Donors: 32500 },
    { month: 'Mar', Donors: 36000 },
    { month: 'Apr', Donors: 39500 },
    { month: 'May', Donors: 41000 },
    { month: 'Jun', Donors: 44000 },
    { month: 'Jul', Donors: 45820 }
  ];

  // Chart Data 2: Monthly Donations (BarChart)
  const monthlyDonationsData = [
    { month: 'Jan', Units: 8500 },
    { month: 'Feb', Units: 9200 },
    { month: 'Mar', Units: 11000 },
    { month: 'Apr', Units: 13500 },
    { month: 'May', Units: 10400 },
    { month: 'Jun', Units: 12800 },
    { month: 'Jul', Units: 14500 }
  ];

  // Chart Data 3: Blood Demand vs Supply (AreaChart)
  const demandSupplyData = [
    { month: 'Jan', Demand: 7800, Supply: 7500 },
    { month: 'Feb', Demand: 8500, Supply: 8200 },
    { month: 'Mar', Demand: 10500, Supply: 10000 },
    { month: 'Apr', Demand: 12000, Supply: 11500 },
    { month: 'May', Demand: 9800, Supply: 9400 },
    { month: 'Jun', Demand: 11500, Supply: 11000 },
    { month: 'Jul', Demand: 13000, Supply: 12450 }
  ];

  // Sidebar Menu Items Configuration
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Manage Users', icon: Users },
    { name: 'Hospital Approvals', icon: Building, badge: pendingHospitals.length },
    { name: 'Blood Bank Approvals', icon: Database, badge: pendingBanks.length },
    { name: 'Blood Camp Approvals', icon: Calendar, badge: pendingCamps.length },
    { name: 'Manage Blood Requests', icon: GitPullRequest },
    { name: 'Analytics', icon: Activity },
    { name: 'View Reports', icon: FileText },
    { name: 'Notifications', icon: Bell, badge: notifications.length },
    { name: 'Settings', icon: SettingsIcon }
  ];

  // Actions handlers
  const handleUserStatusChange = (id, newStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    alert(`User status updated to ${newStatus}.`);
  };

  const handleApproveHospital = (id) => {
    const approved = pendingHospitals.find(h => h.id === id);
    setPendingHospitals(pendingHospitals.filter(h => h.id !== id));
    setUsers([...users, { id: `USR-${Math.floor(900 + Math.random() * 99)}`, name: approved.name, role: 'Hospital', email: 'info@approved.com', phone: '011-Approved', status: 'Active' }]);
    alert(`${approved.name} has been approved and registered.`);
  };

  const handleRejectHospital = (id) => {
    const rejected = pendingHospitals.find(h => h.id === id);
    setPendingHospitals(pendingHospitals.filter(h => h.id !== id));
    alert(`Hospital registration request for ${rejected.name} rejected.`);
  };

  const handleApproveBank = (id) => {
    const approved = pendingBanks.find(b => b.id === id);
    setPendingBanks(pendingBanks.filter(b => b.id !== id));
    setUsers([...users, { id: `USR-${Math.floor(900 + Math.random() * 99)}`, name: approved.name, role: 'Blood Bank', email: 'info@approvedbank.com', phone: '011-Approved', status: 'Active' }]);
    alert(`${approved.name} has been approved and registered.`);
  };

  const handleRejectBank = (id) => {
    const rejected = pendingBanks.find(b => b.id === id);
    setPendingBanks(pendingBanks.filter(b => b.id !== id));
    alert(`Blood Bank registration request for ${rejected.name} rejected.`);
  };

  const handleApproveCamp = (id) => {
    const approved = pendingCamps.find(c => c.id === id);
    setPendingCamps(pendingCamps.filter(c => c.id !== id));
    alert(`Blood Camp "${approved.title}" has been authorized.`);
  };

  const handleRejectCamp = (id) => {
    const rejected = pendingCamps.find(c => c.id === id);
    setPendingCamps(pendingCamps.filter(c => c.id !== id));
    alert(`Blood Camp "${rejected.title}" authorization request rejected.`);
  };

  // Filter helper for users
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Super Admin Layout Body */}
      <div className="flex-grow flex relative">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`bg-slate-900 text-white w-64 flex flex-col justify-between shrink-0 transition-transform duration-300 z-30 lg:translate-x-0 lg:static fixed inset-y-0 left-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${darkMode ? 'border-r border-slate-800' : ''}`}>
          <div>
            {/* Header info */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-gov-gold-light fill-gov-gold-light animate-pulse" />
                <span className="font-extrabold text-sm tracking-tight text-slate-100">
                  RaktaSetu <span className="text-gov-red">ADMIN</span>
                </span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-gov-blue text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4.5 h-4.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-gov-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Profile mini badge */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-gov-gold-light font-bold text-sm">
                SA
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-200 truncate">Super Administrator</p>
                <p className="text-[9px] text-slate-500 font-mono">ID: SADM-00001</p>
              </div>
            </div>
          </div>
        </aside>

        {/* SIDEBAR OVERLAY FOR MOBILE */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 lg:hidden"
          ></div>
        )}

        {/* CONTENT REGION */}
        <main className="flex-grow p-6 sm:p-8 space-y-8 overflow-x-hidden">
          
          {/* Header Controls (Mobile Menu & Dark mode toggle) */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-250 border-dashed">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 bg-slate-900 text-white rounded-xl shadow-md cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">National System Registry</span>
                <h2 className="text-sm font-black">Central Administration Command</h2>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 text-gov-gold-light' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>

          {/* Tab 1: Dashboard */}
          {activeTab === 'Dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Welcome Card Section */}
              <div className={`p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl border ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-gov-blue/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-gov-red/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Live System Active</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">Super Administrative Console</h1>
                    <p className={`text-xs max-w-xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Auditing 14 connected states under NBTC guidelines. Manage registrations, audit dispatches, and authorize camps.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <p className="text-[10px] uppercase font-bold text-slate-400">System Logs</p>
                      <p className="text-xl font-black mt-1 text-gov-blue">Optimal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Summary Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { title: 'Total Donors', count: '45,820', color: 'text-gov-blue border-gov-blue/10 bg-gov-blue/5' },
                  { title: 'Hospitals', count: '1,240', color: 'text-purple-700 border-purple-100 bg-purple-50/50' },
                  { title: 'Blood Banks', count: '580', color: 'text-emerald-700 border-emerald-100 bg-emerald-50/50' },
                  { title: 'Blood Camps', count: '240', color: 'text-slate-700 border-slate-200 bg-slate-100/50' },
                  { title: 'Blood Requests', count: '12,450', color: 'text-gov-gold border-gov-gold/15 bg-gov-gold/5' },
                  { title: 'Emergency Cases', count: '42 active', color: 'text-gov-red border-gov-red/10 bg-gov-red/5 font-bold' }
                ].map((card, i) => (
                  <div key={i} className={`p-4 rounded-2xl border shadow-sm flex flex-col justify-between h-[100px] ${card.color} ${
                    darkMode ? 'border-slate-800' : ''
                  }`}>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{card.title}</span>
                    <span className="text-2xl font-black">{card.count}</span>
                  </div>
                ))}
              </div>

              {/* Analytics Section preview (Donor Growth and Demand Supply) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Donor Growth */}
                <div className={`rounded-3xl border p-6 shadow-sm space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                }`}>
                  <div>
                    <h3 className="font-bold text-sm">Donor Network Growth</h3>
                    <p className="text-[11px] text-slate-400">Total registered voluntary lifesavers history</p>
                  </div>
                  <div className="h-[250px] text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={donorGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Donors" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Supply vs Demand */}
                <div className={`rounded-3xl border p-6 shadow-sm space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                }`}>
                  <div>
                    <h3 className="font-bold text-sm">Blood Demand vs Supply</h3>
                    <p className="text-[11px] text-slate-400">Monthly units requested versus successfully supplied</p>
                  </div>
                  <div className="h-[250px] text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={demandSupplyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="Demand" stroke="#dc2626" fill="#dc2626" fillOpacity={0.08} />
                        <Area type="monotone" dataKey="Supply" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.05} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Dashboard Tables (Recent Registrations, Pending Approvals, Active Requests) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Panel: Pending Approvals & Active Requests (8 cols) */}
                <div className="xl:col-span-8 space-y-8">
                  
                  {/* Pending Approvals */}
                  <div className={`rounded-3xl border shadow-sm p-6 sm:p-8 space-y-6 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-base">Pending Institutional Approvals</h3>
                        <p className="text-xs text-slate-500">Hospitals and Blood Banks awaiting administrative licenses</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('Hospital Approvals')}
                        className="text-xs font-bold text-gov-blue hover:underline"
                      >
                        Inspect All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {pendingHospitals.map(h => (
                        <div key={h.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs ${
                          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                        }`}>
                          <div>
                            <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase">Hospital</span>
                            <h4 className="font-bold mt-1 text-slate-800 dark:text-slate-200">{h.name}</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">License: {h.license} • Dwarka, Delhi</p>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button 
                              onClick={() => handleApproveHospital(h.id)}
                              className="flex-grow sm:flex-none px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectHospital(h.id)}
                              className="flex-grow sm:flex-none px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Requests */}
                  <div className={`rounded-3xl border shadow-sm p-6 sm:p-8 space-y-6 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div>
                      <h3 className="font-bold text-base">Active Emergency Requests</h3>
                      <p className="text-xs text-slate-500">High-priority dispatches active inside regional donor grids</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="py-2.5 px-3">Req ID</th>
                            <th className="py-2.5 px-3">Hospital</th>
                            <th className="py-2.5 px-3">Blood Group</th>
                            <th className="py-2.5 px-3 text-center">Units</th>
                            <th className="py-2.5 px-3">Priority</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold">
                          {bloodRequests.slice(0, 2).map((row) => (
                            <tr key={row.id}>
                              <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-300">{row.id}</td>
                              <td className="py-3 px-3">{row.hospital}</td>
                              <td className="py-3 px-3 text-gov-red font-black">{row.group}</td>
                              <td className="py-3 px-3 text-center">{row.units}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                  row.priority === 'Critical' ? 'bg-red-100 text-gov-red' : 'bg-amber-100 text-amber-700'
                                }`}>{row.priority}</span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Right Panel: Registrations & Notifications (4 cols) */}
                <div className="xl:col-span-4 space-y-8">
                  {/* Notifications */}
                  <div className={`rounded-3xl border shadow-sm p-6 space-y-6 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-base">Broadcast Center</h3>
                      <Bell className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-3.5 rounded-2xl border text-[11px] leading-relaxed space-y-1 ${
                          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                        }`}>
                          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-gov-blue">
                            <span>{notif.type} Event</span>
                            <span className="text-slate-450 font-mono font-medium">{notif.time}</span>
                          </div>
                          <p className="text-slate-650 mt-1 leading-normal">{notif.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Registrations */}
                  <div className={`rounded-3xl border shadow-sm p-6 space-y-6 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-base">Recent Registrations</h3>
                      <Users className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="space-y-3">
                      {users.slice(0, 3).map(u => (
                        <div key={u.id} className="flex justify-between items-center gap-2 text-xs">
                          <div>
                            <h4 className="font-bold">{u.name}</h4>
                            <p className="text-[10px] text-slate-450">{u.role} • {u.id}</p>
                          </div>
                          <span className="text-[9px] font-bold uppercase text-slate-400">Active</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Manage Users */}
          {activeTab === 'Manage Users' && (
            <div className="space-y-6 animate-fade-in max-w-5xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">System User Directory</h1>
                <p className="text-xs text-slate-500">Overview of all active donors, hospitals, and blood bank profiles</p>
              </div>

              {/* Filters */}
              <div className={`rounded-2xl border p-4 flex gap-4 items-center justify-between shadow-sm ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, role, email..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white dark:bg-slate-950 dark:border-slate-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Table */}
              <div className={`rounded-3xl border shadow-sm p-6 sm:p-8 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">User ID</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {filteredUsers.map(u => (
                        <tr key={u.id}>
                          <td className="py-3.5 px-4 font-mono text-slate-500">{u.id}</td>
                          <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200">{u.name}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              u.role === 'Donor' ? 'bg-blue-50 text-gov-blue' : u.role === 'Hospital' ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-600'
                            }`}>{u.role}</span>
                          </td>
                          <td className="py-3.5 px-4">{u.email}</td>
                          <td className="py-3.5 px-4 font-mono">{u.phone}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : u.status === 'Pending Approval' ? 'bg-gov-gold/10 text-gov-gold' : 'bg-red-50 text-gov-red'
                            }`}>{u.status}</span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            {u.status !== 'Active' ? (
                              <button 
                                onClick={() => handleUserStatusChange(u.id, 'Active')}
                                className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[10px] font-bold text-emerald-600 cursor-pointer dark:bg-slate-950 dark:border-slate-800"
                              >
                                Activate
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleUserStatusChange(u.id, 'Suspended')}
                                className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[10px] font-bold text-gov-red cursor-pointer dark:bg-slate-950 dark:border-slate-800"
                              >
                                Suspend
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Hospital Approvals */}
          {activeTab === 'Hospital Approvals' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">Hospital Approvals Registry</h1>
                <p className="text-xs text-slate-500">Approve or reject clinical registration submissions</p>
              </div>

              <div className="space-y-4">
                {pendingHospitals.map(h => (
                  <div key={h.id} className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{h.name}</h3>
                      <span className="text-[10px] text-slate-450 font-mono">Logged {h.date}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">License ID</p>
                        <p className="text-slate-800 dark:text-slate-200 font-mono mt-0.5">{h.license}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Registration Address</p>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5">{h.address}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Verification Status</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-gov-gold/10 text-gov-gold font-bold text-[9px]">Awaiting Audit</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button 
                        onClick={() => handleRejectHospital(h.id)}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer dark:bg-slate-950 dark:border-slate-800"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApproveHospital(h.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Approve License
                      </button>
                    </div>
                  </div>
                ))}
                {pendingHospitals.length === 0 && (
                  <p className="text-center py-8 text-slate-400 text-xs font-medium">All hospital registration approvals are clear.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Blood Bank Approvals */}
          {activeTab === 'Blood Bank Approvals' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">Blood Bank Approvals Registry</h1>
                <p className="text-xs text-slate-500">Audit and authorize license codes for new storage centers</p>
              </div>

              <div className="space-y-4">
                {pendingBanks.map(b => (
                  <div key={b.id} className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{b.name}</h3>
                      <span className="text-[10px] text-slate-450 font-mono">Logged {b.date}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">License ID</p>
                        <p className="text-slate-800 dark:text-slate-200 font-mono mt-0.5">{b.license}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Center Address</p>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5">{b.address}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Verification Status</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-gov-gold/10 text-gov-gold font-bold text-[9px]">Awaiting Audit</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button 
                        onClick={() => handleRejectBank(b.id)}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer dark:bg-slate-950 dark:border-slate-800"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApproveBank(b.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Approve License
                      </button>
                    </div>
                  </div>
                ))}
                {pendingBanks.length === 0 && (
                  <p className="text-center py-8 text-slate-400 text-xs font-medium">All blood bank approvals are clear.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 5: Blood Camp Approvals */}
          {activeTab === 'Blood Camp Approvals' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">Blood Camp Authorizations</h1>
                <p className="text-xs text-slate-500">Authorize requests from NGOs, clubs, and clinics to host public camps</p>
              </div>

              <div className="space-y-4">
                {pendingCamps.map(c => (
                  <div key={c.id} className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{c.title}</h3>
                      <span className="text-[10px] text-slate-450 font-mono">Camp ID: {c.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Organizer</p>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5">{c.organizer}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Scheduled Date & Venue</p>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5">{c.date} • {c.venue}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px]">Verification Status</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-gov-gold/10 text-gov-gold font-bold text-[9px]">Pending Consent</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button 
                        onClick={() => handleRejectCamp(c.id)}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer dark:bg-slate-950 dark:border-slate-800"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApproveCamp(c.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Authorize Camp
                      </button>
                    </div>
                  </div>
                ))}
                {pendingCamps.length === 0 && (
                  <p className="text-center py-8 text-slate-400 text-xs font-medium">All camp approvals are clear.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Manage Blood Requests */}
          {activeTab === 'Manage Blood Requests' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">System Request Registry</h1>
                <p className="text-xs text-slate-500">Track and dispatch active orders logged by connected hospitals</p>
              </div>

              {/* Requests Table */}
              <div className={`rounded-3xl border shadow-sm p-6 sm:p-8 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Req ID</th>
                        <th className="py-2.5 px-3">Requesting Hospital</th>
                        <th className="py-2.5 px-3 text-center">Group</th>
                        <th className="py-2.5 px-3 text-center">Units</th>
                        <th className="py-2.5 px-3">Priority</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {bloodRequests.map((req) => (
                        <tr key={req.id}>
                          <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-300">{req.id}</td>
                          <td className="py-3 px-3">{req.hospital}</td>
                          <td className="py-3 px-3 text-center text-gov-red font-black">{req.group}</td>
                          <td className="py-3 px-3 text-center font-mono">{req.units}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              req.priority === 'Critical' ? 'bg-red-100 text-gov-red' : req.priority === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-650'
                            }`}>{req.priority}</span>
                          </td>
                          <td className="py-3 px-3 font-mono">{req.date}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              req.status === 'Dispatched' ? 'bg-emerald-50 text-emerald-600' : 'bg-gov-blue/5 text-gov-blue animate-pulse'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Analytics */}
          {activeTab === 'Analytics' && (
            <div className="space-y-8 animate-fade-in max-w-5xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">National Network Analytics</h1>
                <p className="text-xs text-slate-500">Cross-reference donor growth with monthly collections and hospital demand</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
                {/* Donations Chart */}
                <div className={`rounded-3xl border p-6 shadow-sm space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                }`}>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Monthly Blood Units Collected</h3>
                    <p className="text-[11px] text-slate-400">Total physical bags logged across all banks</p>
                  </div>
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyDonationsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Units" fill="#dc2626" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Donor Growth Chart */}
                <div className={`rounded-3xl border p-6 shadow-sm space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                }`}>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Cumulative Registered Donors</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Voluntary database growth timeline</p>
                  </div>
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={donorGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Donors" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 8: View Reports */}
          {activeTab === 'View Reports' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">System Audit Reports</h1>
                <p className="text-xs text-slate-500">Download ledger books and system clearance certificates</p>
              </div>

              <div className={`rounded-3xl border shadow-sm p-6 sm:p-8 space-y-4 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <h3 className="font-bold text-sm">Downloadable Registers</h3>
                
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {['National Blood Stock Audit Report 2026', 'NGO Voluntary camp clearance logs Q1', 'NHM administrative security assessment'].map((doc, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center transition-colors ${
                      darkMode ? 'bg-slate-950 border-slate-800 hover:bg-slate-900' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                    }`}>
                      <span className="font-semibold text-slate-700 dark:text-slate-350">{doc}</span>
                      <button className="px-3.5 py-1.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer">
                        Download PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 9: Notifications */}
          {activeTab === 'Notifications' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">System Alerts Log</h1>
                <p className="text-xs text-slate-500">Security logs and registration events</p>
              </div>

              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border shadow-sm rounded-3xl flex items-start gap-4 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      notif.type === 'registration' ? 'bg-purple-50 border-purple-100 text-purple-700' : notif.type === 'deficit' ? 'bg-red-55/5 border-red-100 text-gov-red' : 'bg-blue-50 border-blue-100 text-gov-blue'
                    }`}>
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-850 dark:text-slate-200">
                        <span className="capitalize">{notif.type} Event</span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{notif.time}</span>
                      </div>
                      <p className="text-slate-550 mt-1 leading-relaxed">{notif.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 10: Settings */}
          {activeTab === 'Settings' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black tracking-tight">System Parameters</h1>
                <p className="text-xs text-slate-500">Configure administrative security thresholds</p>
              </div>

              <div className={`rounded-3xl border shadow-sm p-6 sm:p-8 space-y-6 text-xs text-slate-700 dark:text-slate-300 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <div className="space-y-4">
                  <h3 className="font-bold text-sm dark:text-slate-200">Authentication & Theme Preferences</h3>
                  
                  <div className="space-y-3.5">
                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer dark:border-slate-800 dark:hover:bg-slate-950">
                      <div>
                        <p className="font-bold">Super Admin Theme</p>
                        <p className="text-[10px] text-slate-500">Toggle dark or light mode interface style</p>
                      </div>
                      <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-3.5 py-1.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-lg font-bold text-[10px] cursor-pointer"
                      >
                        {darkMode ? 'Set Light Mode' : 'Set Dark Mode'}
                      </button>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer dark:border-slate-800 dark:hover:bg-slate-950">
                      <div>
                        <p className="font-bold">Strict Audit Verification</p>
                        <p className="text-[10px] text-slate-500">Require direct NBTC license verification for all new hospital profiles</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-gov-blue focus:ring-gov-blue/20" />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-end">
                  <button 
                    onClick={() => alert('Administrative settings stored.')}
                    className="px-6 py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
