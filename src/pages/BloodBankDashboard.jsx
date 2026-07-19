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
  AreaChart, 
  Area 
} from 'recharts';
import { 
  LayoutDashboard, 
  Database, 
  ArrowDownLeft, 
  ArrowUpRight, 
  GitPullRequest, 
  Calendar, 
  Bell, 
  FileText, 
  User, 
  Settings as SettingsIcon,
  Menu,
  X,
  PlusCircle,
  Edit2,
  Trash2,
  Search,
  AlertTriangle,
  Clock,
  Shield,
  Activity
} from 'lucide-react';

export default function BloodBankDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodFilter, setBloodFilter] = useState('All');

  // Modals visibility
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Selected item states
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [addForm, setAddForm] = useState({ bloodGroup: 'O+', units: '', reserved: '0', expiryDate: '', status: 'Optimal' });
  const [editForm, setEditForm] = useState({ bloodGroup: '', units: '', reserved: '', expiryDate: '', status: '' });

  // Mock State for Inventory
  const [inventoryList, setInventoryList] = useState([
    { id: 1, bloodGroup: 'O+', units: 45, reserved: 8, expiryDate: '2026-08-15', status: 'Optimal' },
    { id: 2, bloodGroup: 'A+', units: 32, reserved: 4, expiryDate: '2026-08-10', status: 'Optimal' },
    { id: 3, bloodGroup: 'B+', units: 28, reserved: 6, expiryDate: '2026-07-28', status: 'Low Stock' },
    { id: 4, bloodGroup: 'AB+', units: 18, reserved: 2, expiryDate: '2026-08-01', status: 'Optimal' },
    { id: 5, bloodGroup: 'O-', units: 4, reserved: 1, expiryDate: '2026-07-24', status: 'Critical' },
    { id: 6, bloodGroup: 'A-', units: 8, reserved: 2, expiryDate: '2026-07-22', status: 'Low Stock' },
    { id: 7, bloodGroup: 'B-', units: 5, reserved: 0, expiryDate: '2026-07-21', status: 'Critical' },
    { id: 8, bloodGroup: 'AB-', units: 2, reserved: 0, expiryDate: '2026-07-20', status: 'Expired' }
  ]);

  // Mock Incoming Donations
  const incomingDonations = [
    { id: 101, donorName: 'Rohan Mehra', group: 'O+', units: 1, center: 'In-house Lab', time: '10 mins ago', verified: true },
    { id: 102, donorName: 'Sneha Kapoor', group: 'A+', units: 1, center: 'Connaught Place Camp', time: '45 mins ago', verified: false },
    { id: 103, donorName: 'Vikram Singh', group: 'B+', units: 1, center: 'In-house Lab', time: '2 hours ago', verified: true }
  ];

  // Mock Outgoing Dispatches
  const outgoingDispatches = [
    { id: 201, hospital: 'Ram Manohar Lohia Hospital', group: 'O+', units: 4, purpose: 'Accident Trauma Case', status: 'Dispatched', time: '30 mins ago' },
    { id: 202, hospital: 'Safdarjung Emergency Unit', group: 'O-', units: 2, purpose: 'Emergency Surgery', status: 'Awaiting Pickup', time: '1 hour ago' }
  ];

  // Mock Requests list
  const requests = [
    { id: 'REQ-801', hospital: 'AIIMS ICU Ward', group: 'O-', units: 6, priority: 'Critical', status: 'Pending Approval' },
    { id: 'REQ-802', hospital: 'Max Super Specialty Hospital', group: 'A+', units: 4, priority: 'Urgent', status: 'Approved' }
  ];

  // Mock Camps
  const camps = [
    { id: 1, title: 'Mega Civil Lines Drive', date: 'July 24, 2026', venue: 'District Red Cross Hall', status: 'Active' },
    { id: 2, title: 'Corporate Lifesaver Drive', date: 'August 05, 2026', venue: 'DLF Cybercity Phase 3', status: 'Scheduled' }
  ];

  // Mock Notifications
  const notifications = [
    { id: 1, text: 'Inventory Alert: O- units drop below safety margins.', type: 'critical', time: '5 mins ago' },
    { id: 2, text: 'Blood dispatch approved for Safdarjung Emergency Unit.', type: 'info', time: '15 mins ago' },
    { id: 3, text: 'Verification pending: Sneha Kapoor donor logs.', type: 'pending', time: '45 mins ago' }
  ];

  // Mock Activities
  const activities = [
    { id: 1, time: '11:15 AM', text: 'Received 1 unit of O+ blood from Rohan Mehra.', handler: 'Dr. Neha Sen' },
    { id: 2, time: '10:00 AM', text: 'Dispatched 4 units of O+ blood to RML Hospital.', handler: 'Inventory Manager' },
    { id: 3, time: 'Yesterday', text: 'Completed routine quality test on A- blood packs.', handler: 'Lab Tech' }
  ];

  // Chart Data 1: Blood Stock Distribution
  const chartStockData = inventoryList.map(item => ({
    name: item.bloodGroup,
    Units: item.units,
    Reserved: item.reserved
  }));

  // Chart Data 2: Monthly Donations History
  const chartDonationHistory = [
    { month: 'Jan', Donations: 85, Dispatches: 70 },
    { month: 'Feb', Donations: 96, Dispatches: 88 },
    { month: 'Mar', Donations: 120, Dispatches: 104 },
    { month: 'Apr', Donations: 140, Dispatches: 115 },
    { month: 'May', Donations: 110, Dispatches: 98 },
    { month: 'Jun', Donations: 135, Dispatches: 124 },
    { month: 'Jul', Donations: 155, Dispatches: 130 }
  ];

  // Sidebar link items
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Blood Inventory', icon: Database },
    { name: 'Incoming Donations', icon: ArrowDownLeft },
    { name: 'Outgoing Blood Units', icon: ArrowUpRight },
    { name: 'Requests', icon: GitPullRequest },
    { name: 'Blood Camps', icon: Calendar },
    { name: 'Notifications', icon: Bell, badge: notifications.length },
    { name: 'Reports', icon: FileText },
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: SettingsIcon }
  ];

  // ADD Blood Unit handler
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addForm.units || !addForm.expiryDate) {
      alert('Please fill in available units and expiry date.');
      return;
    }
    const nextId = inventoryList.length > 0 ? Math.max(...inventoryList.map(x => x.id)) + 1 : 1;
    const entry = {
      id: nextId,
      bloodGroup: addForm.bloodGroup,
      units: parseInt(addForm.units),
      reserved: parseInt(addForm.reserved),
      expiryDate: addForm.expiryDate,
      status: addForm.status
    };
    setInventoryList([...inventoryList, entry]);
    setShowAddModal(false);
    setAddForm({ bloodGroup: 'O+', units: '', reserved: '0', expiryDate: '', status: 'Optimal' });
    alert('Blood unit logged to database successfully!');
  };

  // EDIT Blood Unit handlers
  const openEditModal = (item) => {
    setSelectedItem(item);
    setEditForm({
      bloodGroup: item.bloodGroup,
      units: item.units,
      reserved: item.reserved,
      expiryDate: item.expiryDate,
      status: item.status
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setInventoryList(inventoryList.map(x => x.id === selectedItem.id ? { ...x, ...editForm, units: parseInt(editForm.units), reserved: parseInt(editForm.reserved) } : x));
    setShowEditModal(false);
    alert('Inventory specifications modified successfully!');
  };

  // DELETE handlers
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setInventoryList(inventoryList.filter(x => x.id !== deleteId));
    setShowDeleteModal(false);
    alert('Blood unit registry entry removed.');
  };

  // Search & Filtered inventory helper
  const filteredInventory = inventoryList.filter(item => {
    const matchesSearch = item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) || item.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = bloodFilter === 'All' || item.bloodGroup === bloodFilter;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-grow flex relative">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`bg-slate-900 text-white w-64 flex flex-col justify-between shrink-0 transition-transform duration-300 z-30 lg:translate-x-0 lg:static fixed inset-y-0 left-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div>
            {/* Header info */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-gov-gold-light fill-gov-gold-light animate-pulse" />
                <span className="font-extrabold text-sm tracking-tight text-slate-100">
                  RaktaSetu <span className="text-gov-red">BANK</span>
                </span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
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
                RDB
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-200 truncate">Red Cross Delhi Bank</p>
                <p className="text-[9px] text-slate-500 font-mono">ID: BNK-77192</p>
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

        {/* CONTENT DISPLAY REGION */}
        <main className="flex-grow p-6 sm:p-8 space-y-8 overflow-x-hidden">
          
          {/* Mobile Top Bar */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-200">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-slate-900 text-white rounded-xl shadow-md cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-right">
              <h2 className="text-sm font-black text-slate-800">Red Cross Delhi</h2>
              <p className="text-[10px] text-slate-500 font-mono">BNK-77192</p>
            </div>
          </div>

          {/* Tab 1: Dashboard */}
          {activeTab === 'Dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Header Title */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Bank Repository Console</h1>
                  <p className="text-xs text-slate-500 mt-1">Review inventory balances, audit dispatches, and configure active donation campaigns</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  Log Blood Collection
                </button>
              </div>

              {/* Dashboard Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { title: 'Total Blood Units', count: inventoryList.reduce((acc, x) => acc + x.units, 0), color: 'text-gov-blue border-gov-blue/10 bg-gov-blue/5' },
                  { title: 'Low Stock Groups', count: inventoryList.filter(x => x.status === 'Low Stock' || x.status === 'Critical').length, color: 'text-amber-700 border-amber-100 bg-amber-50/50 font-bold' },
                  { title: "Today's Intake", count: '3 units', color: 'text-emerald-700 border-emerald-100 bg-emerald-50/50' },
                  { title: 'Pending Orders', count: requests.filter(r => r.status === 'Pending Approval').length, color: 'text-slate-700 border-slate-200 bg-slate-100/50' },
                  { title: 'Expiring Soon', count: 3, color: 'text-gov-red border-gov-red/10 bg-gov-red/5' },
                  { title: 'Active Camps', count: camps.filter(c => c.status === 'Active').length, color: 'text-purple-700 border-purple-100 bg-purple-50/50' }
                ].map((card, i) => (
                  <div key={i} className={`p-4 rounded-2xl border shadow-sm flex flex-col justify-between h-[100px] ${card.color}`}>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{card.title}</span>
                    <span className="text-3xl font-black">{card.count}</span>
                  </div>
                ))}
              </div>

              {/* Recharts Analytics Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart 1: Distribution */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Blood Stock Inventory Distribution</h3>
                    <p className="text-[11px] text-slate-400">Available vs Reserved units breakdown per blood type</p>
                  </div>
                  <div className="h-[260px] text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartStockData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Units" fill="#dc2626" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Reserved" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: History */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Monthly Transaction Audits</h3>
                    <p className="text-[11px] text-slate-400">Total blood bags collected versus hospital dispatches</p>
                  </div>
                  <div className="h-[260px] text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartDonationHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="Donations" stroke="#dc2626" fill="#dc2626" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="Dispatches" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.05} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* 12-Column Grid: Stock alerts & notifications */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Panel: Inventory Warnings Table (8 columns) */}
                <div className="xl:col-span-8 space-y-8">
                  {/* Warning Alerts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3 text-xs text-amber-900 shadow-inner">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="font-bold">Low Stock Warning</p>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-normal">
                          Blood groups O- and B- are below safety limits. Automated regional donor alert SMS streams are active.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex gap-3 text-xs text-red-900 shadow-inner animate-pulse-soft">
                      <Clock className="w-5 h-5 text-gov-red shrink-0" />
                      <div>
                        <p className="font-bold">Blood Pack Expiry Alert</p>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-normal">
                          3 whole blood bags of AB- and B- group expire within the next 48 hours. Dispatch allocation prioritized.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Inventory Table */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">Safety Stock Registry</h3>
                        <p className="text-xs text-slate-500">Overview of current blood groups in physical storage</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('Blood Inventory')}
                        className="text-xs font-bold text-gov-blue hover:underline"
                      >
                        Adjust Registry
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="py-2.5 px-3">Blood Group</th>
                            <th className="py-2.5 px-3 text-center">Available Units</th>
                            <th className="py-2.5 px-3 text-center">Reserved Units</th>
                            <th className="py-2.5 px-3">Expiry Date</th>
                            <th className="py-2.5 px-3">Registry Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                          {inventoryList.slice(0, 5).map((row) => (
                            <tr key={row.id}>
                              <td className="py-3 px-3 text-gov-red font-black text-sm">{row.bloodGroup}</td>
                              <td className="py-3 px-3 text-center font-mono">{row.units}</td>
                              <td className="py-3 px-3 text-center font-mono text-slate-400">{row.reserved}</td>
                              <td className="py-3 px-3 font-mono">{row.expiryDate}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  row.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : row.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-gov-red'
                                }`}>
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

                {/* Right Panel: Activities, Notifications (4 columns) */}
                <div className="xl:col-span-4 space-y-8">
                  {/* Notifications Center */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-800 text-base">Broadcast Center</h3>
                      <Bell className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-[11px] leading-relaxed space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-gov-blue">
                            <span>{notif.type === 'critical' ? 'Urgent Alert' : 'System Notice'}</span>
                            <span className="text-slate-400 font-mono">{notif.time}</span>
                          </div>
                          <p className="text-slate-600 leading-normal">{notif.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-800 text-base">Activity Timeline</h3>
                      <Activity className="w-4.5 h-4.5 text-slate-400" />
                    </div>

                    <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-6">
                      {activities.map((act) => (
                        <div key={act.id} className="relative text-[11px]">
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border bg-white border-gov-blue"></span>
                          <div className="flex justify-between text-[9px] font-bold text-gov-blue">
                            <span>{act.time}</span>
                            <span className="text-slate-400">{act.handler}</span>
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

          {/* Tab 2: Blood Inventory Manager */}
          {activeTab === 'Blood Inventory' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blood Stock Registry</h1>
                  <p className="text-xs text-slate-500">Manage available blood units, adjust reservation blocks, and track expiry limits</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  Add Blood Unit
                </button>
              </div>

              {/* Filters & Search Control Header */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search group or status..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-1.5 justify-end w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-slate-500 uppercase self-center mr-2">Filter Type:</span>
                  {['All', 'O+', 'O-', 'A+', 'B+', 'AB-', 'Optimal', 'Critical', 'Expired'].map(f => (
                    <button
                      key={f}
                      onClick={() => setBloodFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        bloodFilter === f 
                          ? 'bg-gov-blue border-gov-blue text-white' 
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inventory Table Card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Blood Group</th>
                        <th className="py-3 px-4 text-center">Available Units</th>
                        <th className="py-3 px-4 text-center">Reserved Units</th>
                        <th className="py-3 px-4">Expiry Date</th>
                        <th className="py-3 px-4">Safety Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                      {filteredInventory.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-4 text-gov-red font-black text-sm">{row.bloodGroup}</td>
                          <td className="py-3.5 px-4 text-center font-mono text-slate-900">{row.units}</td>
                          <td className="py-3.5 px-4 text-center font-mono text-slate-400">{row.reserved}</td>
                          <td className="py-3.5 px-4 font-mono">{row.expiryDate}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              row.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : row.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-gov-red'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <button 
                              onClick={() => openEditModal(row)}
                              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer inline-flex"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => openDeleteModal(row.id)}
                              className="p-1.5 border border-red-100 rounded-lg hover:bg-red-50 text-gov-red transition-colors cursor-pointer inline-flex"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredInventory.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">
                            No blood units match your search filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Incoming Donations */}
          {activeTab === 'Incoming Donations' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Incoming Donation Log</h1>
                <p className="text-xs text-slate-500">Audit logs of whole blood bags collected during camps or in-house labs</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Recent Incoming Bags</h3>
                
                <div className="space-y-3.5">
                  {incomingDonations.map((bag) => (
                    <div key={bag.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gov-red text-white flex items-center justify-center shrink-0 font-black text-lg border border-gov-red/10 shadow-sm">
                          {bag.group}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{bag.donorName}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Donation Point: {bag.center} • {bag.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          bag.verified ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                        }`}>
                          {bag.verified ? 'Lab Tested & Verified' : 'Testing Pending'}
                        </span>
                        <button className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-slate-800 cursor-pointer">
                          Audit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Outgoing Dispatches */}
          {activeTab === 'Outgoing Blood Units' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Outgoing Blood Dispatches</h1>
                <p className="text-xs text-slate-500">Track dispatched reserves supplied to emergency wings or clinical nodes</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Active Dispatches</h3>
                
                <div className="space-y-3.5">
                  {outgoingDispatches.map((disp) => (
                    <div key={disp.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gov-blue text-white flex items-center justify-center shrink-0 font-black text-lg border border-gov-blue/10 shadow-sm">
                          {disp.group}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{disp.hospital}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Purpose: {disp.purpose} • {disp.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          disp.status === 'Dispatched' ? 'bg-emerald-50 text-emerald-600' : 'bg-gov-gold/10 text-gov-gold animate-pulse'
                        }`}>
                          {disp.status}
                        </span>
                        <button className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-slate-800 cursor-pointer">
                          Waybill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Requests */}
          {activeTab === 'Requests' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Regional Supply Requests</h1>
                <p className="text-xs text-slate-500">Track and authorize supply orders placed by nearby clinical wings</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Active Orders</h3>
                
                <div className="space-y-3.5">
                  {requests.map((req) => (
                    <div key={req.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gov-red text-white flex items-center justify-center shrink-0 font-black text-lg shadow-sm">
                          {req.group}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{req.hospital}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Order ID: {req.id} • Units Required: {req.units} units</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.priority === 'Critical' ? 'bg-red-100 text-gov-red animate-pulse' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {req.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-gov-gold/10 text-gov-gold'
                        }`}>
                          {req.status}
                        </span>
                        {req.status === 'Pending Approval' && (
                          <button className="px-3.5 py-1.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer">
                            Approve Supply
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Blood Camps */}
          {activeTab === 'Blood Camps' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Voluntary Blood Camps</h1>
                <p className="text-xs text-slate-500">Configure and coordinate district blood collection drives</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {camps.map((camp) => (
                  <div key={camp.id} className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-slate-800 leading-snug">{camp.title}</h4>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                        camp.status === 'Active' ? 'bg-red-100 text-gov-red animate-pulse' : 'bg-blue-100 text-gov-blue'
                      }`}>
                        {camp.status}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-650">
                      <p>Date: <span className="font-bold text-slate-800">{camp.date}</span></p>
                      <p>Venue: <span className="font-bold text-slate-800">{camp.venue}</span></p>
                    </div>
                    <button className="w-full py-2 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-colors cursor-pointer">
                      Manage Registrations
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 7: Notifications */}
          {activeTab === 'Notifications' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Alerts Log</h1>
                <p className="text-xs text-slate-500">Auditable notifications regarding low safety stocks or camp registrations</p>
              </div>

              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 bg-white border border-slate-100 shadow-sm rounded-3xl flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      notif.type === 'critical' ? 'bg-red-50 border-red-100 text-gov-red' : 'bg-blue-50 border-blue-100 text-gov-blue'
                    }`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-800">
                        <span className="capitalize">{notif.type} Event Alert</span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{notif.time}</span>
                      </div>
                      <p className="text-slate-500 mt-1 leading-relaxed">{notif.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 8: Reports */}
          {activeTab === 'Reports' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Audit Reports</h1>
                <p className="text-xs text-slate-500">Download system transaction ledger books and donor safety certifications</p>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Downloadable Registers</h3>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {['July 2026 Monthly Stock Dispatches ledger', 'Q2 2026 Donor Registration registry log', 'NBTC Blood safety audit clearance certificate'].map((doc, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 text-xs flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-700">{doc}</span>
                      <button className="px-3.5 py-1.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer">
                        Download PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 9: Profile */}
          {activeTab === 'Profile' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Repository Credentials</h1>
                <p className="text-xs text-slate-500">Audit repository licenses and contact nodes</p>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gov-red text-white flex items-center justify-center font-black text-2xl shadow-md">
                    RDB
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Red Cross Central Delhi Blood Repository</h2>
                    <p className="text-xs text-slate-500 font-mono">NBTC Accreditation ID: BNK-77192-DL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Medical Director</p>
                    <p className="text-slate-800 font-semibold mt-1">Dr. Neha Sen (MD, Hematology)</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Registry Contact</p>
                    <p className="text-slate-800 font-mono font-bold mt-1">+91 11 2371 6441</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Physical Address</p>
                    <p className="text-slate-800 font-semibold mt-1">Red Cross Society Building, 1 Red Cross Road, Connaught Place, New Delhi - 110001</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px]">Accreditation Badge</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[9px] uppercase tracking-wider">
                      National Licensed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 10: Settings */}
          {activeTab === 'Settings' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Repository Parameters</h1>
                <p className="text-xs text-slate-500">Configure safety margins and public synchronization preferences</p>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-slate-700">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">Stock alert margins</h3>
                  
                  <div className="space-y-3.5">
                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">Safety stock safety limits (Whole blood)</p>
                        <p className="text-[10px] text-slate-500">Low stock flags trigger automatically below this threshold</p>
                      </div>
                      <select className="p-2 border rounded-lg bg-white font-bold text-xs focus:outline-none focus:border-gov-blue">
                        <option value="5">5 units</option>
                        <option value="10">10 units</option>
                        <option value="15">15 units</option>
                      </select>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">Public Stock Sync</p>
                        <p className="text-[10px] text-slate-500">Automatically sync physical inventory quantities with public query portals</p>
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
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ADD BLOOD UNIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-4 animate-scale-up">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-red"></div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Log Blood Donation</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Blood Group</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white font-bold"
                  value={addForm.bloodGroup}
                  onChange={(e) => setAddForm({ ...addForm, bloodGroup: e.target.value })}
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Available Units</label>
                  <input 
                    type="number"
                    min="1"
                    placeholder="e.g. 5"
                    className="w-full p-2 border rounded-lg bg-white"
                    value={addForm.units}
                    onChange={(e) => setAddForm({ ...addForm, units: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Reserved Units</label>
                  <input 
                    type="number"
                    min="0"
                    placeholder="e.g. 0"
                    className="w-full p-2 border rounded-lg bg-white"
                    value={addForm.reserved}
                    onChange={(e) => setAddForm({ ...addForm, reserved: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Expiry Date</label>
                <input 
                  type="date"
                  className="w-full p-2 border rounded-lg bg-white"
                  value={addForm.expiryDate}
                  onChange={(e) => setAddForm({ ...addForm, expiryDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Stock Status</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white font-semibold"
                  value={addForm.status}
                  onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                >
                  <option value="Optimal">Optimal</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl font-bold transition-all shadow-md cursor-pointer text-center"
              >
                Log Entry to Repository
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT INVENTORY MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-4 animate-scale-up">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-blue"></div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Adjust Inventory Parameters</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Blood Group ({selectedItem?.bloodGroup})</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-lg bg-slate-100 text-slate-500 font-bold"
                  value={editForm.bloodGroup}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Available Units</label>
                  <input 
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded-lg bg-white"
                    value={editForm.units}
                    onChange={(e) => setEditForm({ ...editForm, units: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Reserved Units</label>
                  <input 
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded-lg bg-white"
                    value={editForm.reserved}
                    onChange={(e) => setEditForm({ ...editForm, reserved: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Expiry Date</label>
                <input 
                  type="date"
                  className="w-full p-2 border rounded-lg bg-white"
                  value={editForm.expiryDate}
                  onChange={(e) => setEditForm({ ...editForm, expiryDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Stock Status</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white font-semibold"
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="Optimal">Optimal</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Critical">Critical</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl font-bold transition-all shadow-md cursor-pointer text-center"
              >
                Save Adjustment specifications
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-50 text-gov-red flex items-center justify-center mx-auto border border-red-100">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-800 text-base">Remove Blood Registry?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete this blood unit registry entry? This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Keep Entry
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
