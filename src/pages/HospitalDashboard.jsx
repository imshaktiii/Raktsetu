import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { 
  LayoutDashboard, 
  GitPullRequest, 
  ShieldAlert, 
  Users, 
  Database, 
  Bell, 
  Building, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Activity, 
  Shield 
} from 'lucide-react';

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form State for creating a new blood request
  const [newRequest, setNewRequest] = useState({
    bloodGroup: 'O+',
    units: '',
    priority: 'Normal',
    patientName: '',
    purpose: ''
  });

  // Mock State for requests
  const [requestsList, setRequestsList] = useState([
    { id: 'REQ-101', bloodGroup: 'O+', units: 4, priority: 'Urgent', patientName: 'Sanjay Dutt', status: 'Dispatched', date: '2026-07-19' },
    { id: 'REQ-102', bloodGroup: 'AB-', units: 2, priority: 'Critical', patientName: 'Rohit Sharma', status: 'Pending Approval', date: '2026-07-19' },
    { id: 'REQ-103', bloodGroup: 'A+', units: 5, priority: 'Normal', patientName: 'Aditi Rao', status: 'Completed', date: '2026-07-18' }
  ]);

  // Mock Inventory
  const [inventory] = useState([
    { group: 'A+', units: 24, status: 'Optimal' },
    { group: 'A-', units: 8, status: 'Low' },
    { group: 'B+', units: 32, status: 'Optimal' },
    { group: 'B-', units: 6, status: 'Low' },
    { group: 'AB+', units: 15, status: 'Optimal' },
    { group: 'AB-', units: 3, status: 'Critical' },
    { group: 'O+', units: 45, status: 'Optimal' },
    { group: 'O-', units: 5, status: 'Critical' }
  ]);

  // Mock Emergency requests list
  const emergencyRequests = [
    { id: 'EMG-01', patient: 'Accident Trauma Case', group: 'O-', units: '4 Units', age: 34, location: 'Trauma ICU Ward A', status: 'Matching Donors', time: '10 mins ago' },
    { id: 'EMG-02', patient: 'Postpartum Hemorrhage', group: 'AB-', units: '2 Units', age: 29, location: 'Maternity Wing', status: 'Donor En Route', time: '25 mins ago' }
  ];

  // Mock Nearby Blood Banks
  const nearbyBanks = [
    { id: 1, name: 'Red Cross Central Delhi', distance: '1.8 km', stock: { 'O+': 20, 'O-': 4, 'B+': 18, 'A+': 15 }, phone: '+91 11 2371 6441' },
    { id: 2, name: 'Safdarjung Regional Bank', distance: '3.5 km', stock: { 'O+': 32, 'O-': 8, 'AB-': 2, 'B+': 22 }, phone: '+91 11 2616 5000' },
    { id: 3, name: 'AIIMS Central Blood Repository', distance: '4.2 km', stock: { 'O+': 55, 'O-': 12, 'AB-': 5, 'A+': 30 }, phone: '+91 11 2658 8500' }
  ];

  // Mock Compatible Donors
  const donorMatches = [
    { id: 1, name: 'Amit Patel', bloodGroup: 'O-', distance: '1.4 km', phone: '98765 43210', availability: 'Available Now', matchesFor: 'EMG-01' },
    { id: 2, name: 'Priya Sen', bloodGroup: 'AB-', distance: '2.8 km', phone: '98765 01234', availability: 'Available (1 hr)', matchesFor: 'EMG-02' },
    { id: 3, name: 'Sunil Verma', bloodGroup: 'O-', distance: '3.1 km', phone: '98765 56789', availability: 'Available Now', matchesFor: 'EMG-01' }
  ];

  // Mock Notifications
  const notifications = [
    { id: 1, text: 'New donor (Amit Patel, O-) matched for Accident Trauma Case.', type: 'match', time: '5 mins ago' },
    { id: 2, text: 'Blood request REQ-101 approved by Red Cross Central Delhi.', type: 'approval', time: '12 mins ago' },
    { id: 3, text: 'National donation drive camp scheduled at India Gate on July 26.', type: 'camp', time: '1 hour ago' }
  ];

  // Mock Timeline Activities
  const activities = [
    { id: 1, time: '10:45 AM', text: 'Emergency request for O- blood dispatched to regional donors.', author: 'Dr. A. K. Roy' },
    { id: 2, time: '09:30 AM', text: 'Received 5 units of A+ blood from Safdarjung Regional Bank.', author: 'Lab Tech Sharma' },
    { id: 3, time: 'Yesterday', text: 'New normal request REQ-103 completed successfully.', author: 'System' }
  ];

  // Sidebar Menu Configuration
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Blood Requests', icon: GitPullRequest },
    { name: 'Emergency Requests', icon: ShieldAlert },
    { name: 'Donor Matches', icon: Users },
    { name: 'Blood Inventory', icon: Database },
    { name: 'Notifications', icon: Bell, badge: notifications.length },
    { name: 'Hospital Profile', icon: Building },
    { name: 'Settings', icon: SettingsIcon }
  ];

  // Handle Form Submission for New Blood Request
  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newRequest.units || !newRequest.patientName) {
      alert('Please fill in patient name and units required.');
      return;
    }
    const reqId = `REQ-${Math.floor(104 + Math.random() * 900)}`;
    const newEntry = {
      id: reqId,
      bloodGroup: newRequest.bloodGroup,
      units: parseInt(newRequest.units),
      priority: newRequest.priority,
      patientName: newRequest.patientName,
      status: 'Pending Approval',
      date: new Date().toISOString().split('T')[0]
    };
    setRequestsList([newEntry, ...requestsList]);
    setNewRequest({
      bloodGroup: 'O+',
      units: '',
      priority: 'Normal',
      patientName: '',
      purpose: ''
    });
    alert(`Blood Request ${reqId} logged successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hospital Dashboard Main Wrapper */}
      <div className="flex-grow flex relative">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`bg-slate-900 text-white w-64 flex flex-col justify-between shrink-0 transition-transform duration-300 z-30 lg:translate-x-0 lg:static fixed inset-y-0 left-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div>
            {/* Hospital Identification Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-gov-gold-light fill-gov-gold-light animate-pulse" />
                <span className="font-extrabold text-sm tracking-tight text-slate-100">
                  RaktaSetu <span className="text-gov-red">HOSP</span>
                </span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Links */}
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

          {/* Hospital Profile Mini Badge */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-gov-gold-light font-bold text-sm">
                AIH
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-200 truncate">All India Hospital</p>
                <p className="text-[9px] text-slate-500 font-mono">ID: HSP-40918</p>
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

        {/* MAIN DISPLAY REGION */}
        <main className="flex-grow p-6 sm:p-8 space-y-8 overflow-x-hidden">
          
          {/* Mobile Top Bar to trigger Sidebar */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-200">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-slate-900 text-white rounded-xl shadow-md cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-right">
              <h2 className="text-sm font-black text-slate-800">All India Hospital</h2>
              <p className="text-[10px] text-slate-500 font-mono">HSP-40918</p>
            </div>
          </div>

          {/* Tab 1: Dashboard View */}
          {activeTab === 'Dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Header Title Section */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Console</h1>
                  <p className="text-xs text-slate-500 mt-1">Manage blood operations, view donor matches, and coordinate emergency reserves</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gov-blue bg-gov-blue/5 border border-gov-blue/10 px-3.5 py-2 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Connected to National Hub</span>
                </div>
              </div>

              {/* Widgets Dashboard Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <DashboardCard title="Total Requests" count={requestsList.length} color="blue" />
                <DashboardCard title="Active Emergency" count={emergencyRequests.length} color="red" />
                <DashboardCard title="In-House Stock" count={inventory.reduce((acc, row) => acc + row.units, 0)} color="emerald" />
                <DashboardCard title="Nearby Banks" count={nearbyBanks.length} color="slate" />
                <DashboardCard title="Today's Donors" count={4} color="purple" />
                <DashboardCard title="Pending Approval" count={requestsList.filter(r => r.status === 'Pending Approval').length} color="gold" />
              </div>

              {/* 12-Column Panel Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Panel: Request Manager, Emergency Ward (8 columns) */}
                <div className="xl:col-span-8 space-y-8">
                  
                  {/* Blood Request Management */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
                    <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Blood Request Management</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Create Request Form (5 cols) */}
                      <form onSubmit={handleCreateRequest} className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                        <span className="block text-[11px] font-bold text-slate-500 uppercase">Create New Request</span>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Patient Full Name</label>
                          <input
                            type="text"
                            placeholder="Patient's name"
                            className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white"
                            value={newRequest.patientName}
                            onChange={(e) => setNewRequest({ ...newRequest, patientName: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Blood Group</label>
                            <select
                              className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white"
                              value={newRequest.bloodGroup}
                              onChange={(e) => setNewRequest({ ...newRequest, bloodGroup: e.target.value })}
                            >
                              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Units (350ml)</label>
                            <input
                              type="number"
                              min="1"
                              placeholder="e.g. 2"
                              className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white"
                              value={newRequest.units}
                              onChange={(e) => setNewRequest({ ...newRequest, units: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Priority Status</label>
                          <select
                            className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white font-bold"
                            value={newRequest.priority}
                            onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                          >
                            <option value="Normal">Normal Priority</option>
                            <option value="Urgent">Urgent Priority</option>
                            <option value="Critical">Critical Priority</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          Publish Request Link
                        </button>
                      </form>

                      {/* Request Status List (7 cols) */}
                      <div className="md:col-span-7 space-y-3.5">
                        <span className="block text-[11px] font-bold text-slate-500 uppercase">Recent Requests status</span>
                        
                        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                          {requestsList.map((req) => (
                            <div key={req.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 text-xs">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-slate-700">{req.id}</span>
                                  <span className="text-[10px] text-slate-500">{req.patientName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                                  <span>Blood: <span className="font-bold text-slate-700">{req.bloodGroup}</span></span>
                                  <span>Units: <span className="font-bold text-slate-700">{req.units}</span></span>
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                    req.priority === 'Critical' ? 'bg-red-100 text-gov-red' : req.priority === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'
                                  }`}>{req.priority}</span>
                                </div>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                                req.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : req.status === 'Pending Approval' ? 'bg-gov-gold/10 text-gov-gold' : 'bg-gov-blue/5 text-gov-blue'
                              }`}>
                                {req.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Emergency Requests */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Live Emergency Ward Requests</h3>
                        <p className="text-xs text-slate-500">Urgent matches active inside regional donor grids</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-gov-red text-[10px] font-bold animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span>Live Broadcast active</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {emergencyRequests.map((emg) => (
                        <div key={emg.id} className="p-4 rounded-2xl border-2 border-red-100 bg-red-50/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gov-red text-white flex items-center justify-center shrink-0 font-black text-lg shadow-md animate-pulse">
                              {emg.group}
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-slate-800 leading-snug">{emg.patient} ({emg.age} yrs)</h4>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {emg.location}
                                </span>
                                <span>Needed: <span className="font-bold text-slate-700">{emg.units}</span></span>
                                <span className="text-[10px] text-gov-red font-mono">{emg.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gov-red bg-red-100 px-2 py-0.5 rounded">
                              <span className="w-1.5 h-1.5 rounded-full bg-gov-red animate-ping"></span>
                              {emg.status}
                            </span>
                            <button 
                              onClick={() => {
                                setActiveTab('Donor Matches');
                              }}
                              className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                            >
                              Trace Matches
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearby Blood Banks Stock Check */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Nearby Blood Bank Reserves</h3>
                        <p className="text-xs text-slate-500">Live inventories of connected regional repositories</p>
                      </div>
                      <Link to="/banks" className="text-xs font-bold text-gov-blue hover:underline flex items-center gap-0.5">
                        Query Stock Map
                        <ArrowUpRight className="w-4.5 h-4.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {nearbyBanks.map((bank) => (
                        <div key={bank.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                          <div>
                            <h4 className="font-bold text-xs text-slate-800 leading-snug">{bank.name}</h4>
                            <span className="text-[10px] text-slate-400 mt-1 block">Distance: {bank.distance}</span>
                            
                            {/* Stock badges grid */}
                            <div className="grid grid-cols-4 gap-1.5 mt-3 text-center">
                              {Object.entries(bank.stock).map(([grp, qty]) => (
                                <div key={grp} className="bg-white border rounded p-1">
                                  <p className="text-[9px] font-bold text-slate-500">{grp}</p>
                                  <p className="text-xs font-black text-slate-800">{qty}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <a 
                              href={`tel:${bank.phone}`}
                              className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold hover:bg-slate-50 text-center flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              Contact
                            </a>
                            <button className="flex-1 py-1.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer">
                              View Stock
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel: Activities, Donor Matches, Notifications (4 columns) */}
                <div className="xl:col-span-4 space-y-8">
                  
                  {/* Notifications Alert Panel */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-800 text-base">Broadcast Center</h3>
                      <Bell className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-[11px] leading-relaxed space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-gov-blue">
                            <span>{notif.type === 'match' ? 'Donor Matched' : notif.type === 'approval' ? 'Approval Alert' : 'Regional Camp'}</span>
                            <span className="text-slate-400 font-mono">{notif.time}</span>
                          </div>
                          <p className="text-slate-600 leading-normal">{notif.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Donor Matches list */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-800 text-base">Compatible Donor matches</h3>
                      <Users className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="space-y-3.5">
                      {donorMatches.map((donor) => (
                        <div key={donor.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gov-red text-white flex items-center justify-center shrink-0 font-bold text-xs">
                              {donor.bloodGroup}
                            </div>
                            <div>
                              <h4 className="font-bold text-[11px] text-slate-800">{donor.name}</h4>
                              <p className="text-[9px] text-slate-400">{donor.distance} • {donor.availability}</p>
                            </div>
                          </div>
                          <button className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 cursor-pointer">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities Timeline */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-800 text-base">Activity Timeline</h3>
                      <Activity className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-6">
                      {activities.map((act) => (
                        <div key={act.id} className="relative text-[11px]">
                          {/* Dot indicator */}
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border bg-white border-gov-blue"></span>
                          <div className="flex justify-between text-[9px] font-bold text-gov-blue">
                            <span>{act.time}</span>
                            <span className="text-slate-400">{act.author}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-normal">{act.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Blood Requests management */}
          {activeTab === 'Blood Requests' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blood Request Registry</h1>
                <p className="text-xs text-slate-500">Create new blood orders and trace their authentication statuses</p>
              </div>

              {/* Form & Table combined layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Form (4 cols) */}
                <form onSubmit={handleCreateRequest} className="md:col-span-4 bg-white border border-slate-100 shadow-sm rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">Create New Blood Request</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Patient Name</label>
                    <input
                      type="text"
                      placeholder="Enter patient full name"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white font-medium"
                      value={newRequest.patientName}
                      onChange={(e) => setNewRequest({ ...newRequest, patientName: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Blood Group</label>
                      <select
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white font-bold"
                        value={newRequest.bloodGroup}
                        onChange={(e) => setNewRequest({ ...newRequest, bloodGroup: e.target.value })}
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Units Needed</label>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 3"
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white"
                        value={newRequest.units}
                        onChange={(e) => setNewRequest({ ...newRequest, units: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Priority Tier</label>
                    <select
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-xs bg-white font-bold"
                      value={newRequest.priority}
                      onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4.5 h-4.5" />
                    Submit Request
                  </button>
                </form>

                {/* Status Table (8 cols) */}
                <div className="md:col-span-8 bg-white border border-slate-100 shadow-sm rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">Active Requests Status</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                          <th className="py-2.5 px-3">Req ID</th>
                          <th className="py-2.5 px-3">Patient</th>
                          <th className="py-2.5 px-3">Group</th>
                          <th className="py-2.5 px-3 text-center">Units</th>
                          <th className="py-2.5 px-3">Priority</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                        {requestsList.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-slate-900">{req.id}</td>
                            <td className="py-3 px-3">{req.patientName}</td>
                            <td className="py-3 px-3 text-gov-red font-black">{req.bloodGroup}</td>
                            <td className="py-3 px-3 text-center">{req.units}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                req.priority === 'Critical' ? 'bg-red-100 text-gov-red animate-pulse' : req.priority === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                              }`}>{req.priority}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                req.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : req.status === 'Pending Approval' ? 'bg-gov-gold/10 text-gov-gold' : 'bg-gov-blue/5 text-gov-blue'
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
            </div>
          )}

          {/* Tab 3: Emergency Requests */}
          {activeTab === 'Emergency Requests' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Emergency Operations console</h1>
                <p className="text-xs text-slate-500">Live tracker of critical trauma cases and high-urgency donor matching</p>
              </div>

              <div className="space-y-4">
                {emergencyRequests.map((emg) => (
                  <div key={emg.id} className="bg-white border-2 border-red-100 shadow-sm rounded-3xl p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gov-red animate-ping"></span>
                        <h3 className="font-extrabold text-sm text-slate-800">{emg.patient}</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Dispatched {emg.time}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">Needed Blood Group</p>
                        <p className="text-xl font-black text-gov-red mt-1">{emg.group}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">Units Required</p>
                        <p className="text-xl font-black text-slate-800 mt-1">{emg.units}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">ICU Ward Location</p>
                        <p className="text-xs font-bold text-slate-700 mt-1">{emg.location}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">Operation Status</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-gov-red">
                          {emg.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors cursor-pointer">
                        Mute Alert
                      </button>
                      <button 
                        onClick={() => setActiveTab('Donor Matches')}
                        className="px-4 py-2 bg-gov-red hover:bg-gov-red-dark text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Verify Matches
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Donor Matches */}
          {activeTab === 'Donor Matches' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Compatible Donor Matches</h1>
                <p className="text-xs text-slate-500">Live location-linked network registry matches for quick contact</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {donorMatches.map((donor) => (
                  <div key={donor.id} className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gov-red text-white flex items-center justify-center font-black text-lg border border-gov-red/10 shadow-sm shadow-gov-red/5 shrink-0">
                          {donor.bloodGroup}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 leading-snug">{donor.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Availability: <span className="font-bold text-emerald-600">{donor.availability}</span></p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gov-blue bg-gov-blue/5 px-2 py-0.5 rounded">
                        {donor.distance}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <p>Linked Emergency Case: <span className="font-mono font-bold text-slate-700">{donor.matchesFor}</span></p>
                    </div>

                    <div className="flex gap-2">
                      <a 
                        href={`tel:${donor.phone}`}
                        className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        Call Donor
                      </a>
                      <button className="flex-1 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all cursor-pointer">
                        Send Official SMS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Blood Inventory */}
          {activeTab === 'Blood Inventory' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Blood Inventory</h1>
                <p className="text-xs text-slate-500">In-house laboratory inventory reserves status</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {inventory.map((row) => (
                  <div key={row.group} className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                        {row.group}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        row.status === 'Optimal' ? 'bg-emerald-500' : row.status === 'Low' ? 'bg-amber-500 animate-pulse' : 'bg-gov-red animate-ping'
                      }`}></span>
                    </div>

                    <div>
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Available Stock</p>
                      <p className="text-3xl font-black text-slate-850 mt-1">{row.units} <span className="text-xs font-bold text-slate-400">units</span></p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold border-t border-slate-100 pt-2.5">
                      <span>Status: {row.status}</span>
                      <button className="text-gov-blue hover:underline cursor-pointer">Adjust</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Notifications */}
          {activeTab === 'Notifications' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Alert Broadcast Log</h1>
                <p className="text-xs text-slate-500">Historical records of matches, approvals, and regional campaigns</p>
              </div>

              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 bg-white border border-slate-100 shadow-sm rounded-3xl flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      notif.type === 'match' ? 'bg-gov-red/5 border-gov-red/10 text-gov-red' : notif.type === 'approval' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-gov-blue/5 border-gov-blue/10 text-gov-blue'
                    }`}>
                      {notif.type === 'match' ? <ShieldAlert className="w-5 h-5" /> : notif.type === 'approval' ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-800">
                        <span className="capitalize">{notif.type} Alert</span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{notif.time}</span>
                      </div>
                      <p className="text-slate-500 mt-1 leading-relaxed">{notif.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 7: Hospital Profile */}
          {activeTab === 'Hospital Profile' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Registry Details</h1>
                <p className="text-xs text-slate-500">Review clinical licenses, registration codes, and address bindings</p>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gov-blue text-white flex items-center justify-center font-black text-2xl border border-gov-blue/10 shadow-md">
                    AIH
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">All India Institute of Health</h2>
                    <p className="text-xs text-slate-500 font-mono">Government License ID: HSP-40918-DL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Head of Blood Bank</p>
                    <p className="text-slate-800 font-semibold mt-1">Dr. Ashutosh K. Roy (MD, Pathology)</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Emergency Hotline</p>
                    <p className="text-slate-800 font-mono font-bold mt-1">+91 11 2301 5555</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Registry Address</p>
                    <p className="text-slate-800 font-semibold mt-1">Ansari Nagar East, Near AIIMS Metro, New Delhi - 110029</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Affiliated Registry</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[9px] uppercase tracking-wider">
                      NBTC Accredited
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 8: Settings */}
          {activeTab === 'Settings' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portal Parameters Settings</h1>
                <p className="text-xs text-slate-500">Configure notifications, auto-match distance radii, and authentication parameters</p>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-slate-700">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">Emergency Broadcast Settings</h3>
                  
                  <div className="space-y-3.5">
                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">Auto Match Radii (Camps & Donors)</p>
                        <p className="text-[10px] text-slate-500">Automatically broadcast emergency requests to compatible donors within range</p>
                      </div>
                      <select className="p-2 border rounded-lg bg-white font-bold text-xs focus:outline-none focus:border-gov-blue">
                        <option value="2">2 km</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                      </select>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">Automatic Stock Sync</p>
                        <p className="text-[10px] text-slate-500">Share real-time blood stock counts with public directories automatically</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-gov-blue focus:ring-gov-blue/20" />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">SMS Donor Alert Broadcasting</p>
                        <p className="text-[10px] text-slate-500">Enable automatic SMS dispatches during critical category logs</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-gov-blue focus:ring-gov-blue/20" />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => alert('Settings saved successfully (Mock)!')}
                    className="px-6 py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Save Configuration
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
