import { useState } from 'react';
import { 
  Bell, 
  GitPullRequest, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  Settings as SettingsIcon, 
  Trash2, 
  CheckCircle2, 
  SlidersHorizontal
} from 'lucide-react';

export default function NotificationCenter() {
  // Mock State for Notifications list
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: 'Emergency Alerts',
      title: 'Critical O- Blood Deficit Alert',
      desc: 'AIIMS ICU ward has reported an emergency trauma shortage. Nearby compatible donors are requested to report to CP center.',
      time: '10 mins ago',
      read: false,
      icon: ShieldAlert,
      color: 'bg-red-50 text-gov-red border-red-100'
    },
    {
      id: 2,
      category: 'Blood Requests',
      title: 'New Blood Request: REQ-902 (A+)',
      desc: 'Safdarjung Emergency Unit has logged a request for 4 units of A+ whole blood. Verification complete.',
      time: '35 mins ago',
      read: false,
      icon: GitPullRequest,
      color: 'bg-blue-50 text-gov-blue border-blue-100'
    },
    {
      id: 3,
      category: 'Donation Reminders',
      title: 'Donation Eligibility Reached',
      desc: '90 days have elapsed since your last donation on April 15, 2026. You are now eligible to donate whole blood packs again.',
      time: '2 hours ago',
      read: false,
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-100'
    },
    {
      id: 4,
      category: 'Nearby Camps',
      title: 'Mega Civil Lines Drive Commencing',
      desc: 'District Red Cross Society is hosting a voluntary blood camp tomorrow at Red Cross Hall starting from 09:00 AM.',
      time: 'Yesterday',
      read: true,
      icon: Calendar,
      color: 'bg-purple-50 text-purple-700 border-purple-100'
    },
    {
      id: 5,
      category: 'System Notifications',
      title: 'Donor Card Security Update',
      desc: 'National Health Authority has updated security hashes for electronic donor identity cards. Credentials verified.',
      time: '2 days ago',
      read: true,
      icon: SettingsIcon,
      color: 'bg-slate-50 text-slate-650 border-slate-100'
    }
  ]);

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Blood Requests', 'Donation Reminders', 'Nearby Camps', 'Emergency Alerts', 'System Notifications'];

  // Actions handlers
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    alert('All active notifications marked as read.');
  };

  const handleMarkSingleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Filtered Notifications list helper
  const filteredNotifications = notifications.filter(n => 
    activeCategory === 'All' || n.category === activeCategory
  );

  // Unread Count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Title Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
            E-Raktkosh Unified Broadcasts
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Notification Center
            {unreadCount > 0 && (
              <span className="bg-gov-red text-white text-xs font-black px-2 py-0.5 rounded-full animate-pulse">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500">
            Audit live broadcasts, view nearby donation camp calendars, and manage security/eligibility updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* Main Container Layout */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Category Selector (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 space-y-2">
          <span className="block text-[10px] uppercase font-bold text-slate-400 px-4 py-2 tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gov-blue" />
            Category Filter
          </span>
          
          <div className="space-y-1">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? notifications.length 
                : notifications.filter(n => n.category === cat).length;
              
              const isSelected = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-900 text-white shadow-sm font-black' 
                      : 'text-slate-555 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Notifications List (8 cols) */}
        <div className="md:col-span-8 space-y-4">
          {filteredNotifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                onClick={() => handleMarkSingleRead(notif.id)}
                className={`p-5 rounded-3xl border shadow-sm transition-all relative overflow-hidden flex items-start gap-4 cursor-pointer hover:shadow-md ${
                  notif.read 
                    ? 'bg-white border-slate-100 opacity-75' 
                    : 'bg-white border-slate-200 ring-2 ring-gov-blue/5'
                }`}
              >
                {/* Unread dot indicator */}
                {!notif.read && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-gov-blue animate-pulse"></span>
                )}

                {/* Category Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${notif.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text Description */}
                <div className="flex-grow space-y-1.5 text-xs">
                  <div className="flex justify-between items-center pr-4 font-bold text-slate-800">
                    <span className="text-[10px] text-slate-450 uppercase tracking-wider">{notif.category}</span>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">{notif.time}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 leading-snug">{notif.title}</h3>
                  <p className="text-slate-550 leading-relaxed max-w-xl">{notif.desc}</p>
                  
                  {/* Delete individual action */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering mark read on click
                        handleDeleteNotification(notif.id);
                      }}
                      className="p-1 border border-slate-100 rounded-lg hover:bg-red-50 text-slate-400 hover:text-gov-red transition-colors cursor-pointer inline-flex"
                      title="Delete Notification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm font-black">All Clear</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  No active broadcasts logged in this category currently. Check again later.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
