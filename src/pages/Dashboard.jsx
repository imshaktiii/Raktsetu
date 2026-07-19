import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Award, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Bell, 
  Download, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight,
  Clipboard,
  Activity,
  FileText
} from 'lucide-react';

export default function Dashboard() {
  const [profileComplete, setProfileComplete] = useState(85);
  
  // Mock Donor Data
  const donorInfo = {
    name: 'Rajesh Kumar Sharma',
    portalId: 'RST-849204',
    bloodGroup: 'O+',
    memberSince: 'Oct 14, 2024',
    rank: 'Gold Lifesaver',
    lastDonationDate: 'April 10, 2026',
    nextEligibleDate: 'July 10, 2026', // Eligible since it's past July 10 (today is July 19, 2026)
    donationsCount: 12,
    totalLivesSaved: 36,
  };

  // Check eligibility status
  const isEligible = new Date(donorInfo.nextEligibleDate) <= new Date('2026-07-19');

  const history = [
    { id: 1, date: 'April 10, 2026', center: 'Mega Civil Lines Camp, Delhi', type: 'Whole Blood', volume: '350 ml', status: 'Approved & Dispatched' },
    { id: 2, date: 'January 05, 2026', center: 'Red Cross Center, New Delhi', type: 'Whole Blood', volume: '350 ml', status: 'Approved & Dispatched' },
    { id: 3, date: 'September 20, 2025', center: 'AIIMS Blood Bank, Delhi', type: 'Platelets', volume: '250 ml', status: 'Approved & Dispatched' },
  ];

  const nearbyCamps = [
    { id: 1, title: 'Mega Independence Camp', date: 'July 26, 2026', time: '09:00 AM - 05:00 PM', location: 'Red Cross Hall, Connaught Place', distance: '2.5 km' },
    { id: 2, title: 'District Welfare Donation Drive', date: 'August 02, 2026', time: '10:00 AM - 04:00 PM', location: 'Community Center, Sector 15', distance: '4.8 km' },
  ];

  const urgentRequests = [
    { id: 1, hospital: 'Ram Manohar Lohia Hospital', bloodGroup: 'O+', unitsNeeded: '3 Units', distance: '1.2 km', urgency: 'Immediate' },
    { id: 2, hospital: 'Safdarjung Emergency Unit', bloodGroup: 'O-', unitsNeeded: '2 Units', distance: '3.5 km', urgency: 'Critical' },
  ];

  const notifications = [
    { id: 1, type: 'emergency', text: 'Critical shortage of O+ blood reported at RML Hospital. Immediate donors requested.' },
    { id: 2, type: 'milestone', text: 'Congratulations! You achieved "Gold Lifesaver" status after your 12th donation.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header Status Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
          {/* Subtle backgrounds */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gov-red/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-gov-blue/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Profile Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <User className="w-6 h-6 text-gov-gold-light" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">{donorInfo.name}</h1>
                  <p className="text-xs text-slate-400 font-mono">Portal ID: {donorInfo.portalId} • {donorInfo.rank}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Welcome back to your RaktaSetu dashboard. You are officially certified under NHM guidelines. Your digital credential card is verified and active.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Database Online</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs flex items-center gap-2">
                  <Award className="w-4 h-4 text-gov-gold-light" />
                  <span>{donorInfo.donationsCount} Donations Completed</span>
                </div>
              </div>
            </div>

            {/* Profile Completion Card (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Profile Completion</span>
                <span className="text-gov-gold-light">{profileComplete}% Completed</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gov-gold-light h-full rounded-full transition-all duration-500"
                  style={{ width: `${profileComplete}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400">
                Complete Aadhaar validation to achieve NBTC Verified Donor Badge and enable faster camp registrations.
              </p>
              <button 
                onClick={() => setProfileComplete(100)} 
                className="w-full py-2 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                Validate Identity
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SECTION: Main Metrics & Listings (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Top Cards: Blood Group, Last Donation, Eligibility */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Card 1: Blood Group Badge */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-[160px] relative overflow-hidden">
                <div className="absolute right-[-10px] bottom-[-10px] text-gov-red/5">
                  <Heart className="w-24 h-24 fill-gov-red/5 stroke-none" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</span>
                  <Heart className="w-5 h-5 text-gov-red fill-gov-red animate-pulse" />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-5xl font-black text-slate-900 tracking-tight">{donorInfo.bloodGroup}</span>
                  <span className="text-xs font-bold text-gov-red uppercase">O-Positive</span>
                </div>
                <span className="text-[10px] text-slate-400">Verified by NHM Blood Lab</span>
              </div>

              {/* Card 2: Last Donation */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-[160px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Donation</span>
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-800">{donorInfo.lastDonationDate}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-1">Whole Blood • Delhi Camp</p>
                </div>
                <button className="text-[10px] font-bold text-gov-blue hover:underline flex items-center gap-1 cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  Get Certificate
                </button>
              </div>

              {/* Card 3: Eligibility */}
              <div className={`rounded-2xl p-6 border shadow-sm flex flex-col justify-between h-[160px] transition-colors ${
                isEligible 
                  ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' 
                  : 'bg-amber-50/50 border-amber-100 text-amber-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Donation Status</span>
                  {isEligible ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight">
                    {isEligible ? 'Eligible to Donate' : 'Resting Period'}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {isEligible 
                      ? 'Safe 90-day donation window is open.' 
                      : `Eligible on ${donorInfo.nextEligibleDate}`}
                  </p>
                </div>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-white w-max border">
                  {isEligible ? 'Active Lifesaver' : 'Wait Required'}
                </span>
              </div>
            </div>

            {/* Nearby Blood Camps */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Nearby Donation Camps</h3>
                  <p className="text-xs text-slate-500">Scheduled camps matching your district preference</p>
                </div>
                <Link to="/camps" className="text-xs font-bold text-gov-blue hover:underline flex items-center gap-0.5">
                  View All Camps
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyCamps.map((camp) => (
                  <div key={camp.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3.5 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-slate-800 max-w-[80%] leading-snug">{camp.title}</h4>
                      <span className="text-[9px] font-bold text-gov-blue bg-gov-blue/5 px-2 py-0.5 rounded">
                        {camp.distance}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{camp.date} • {camp.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{camp.location}</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-xs transition-colors cursor-pointer">
                      Pre-Register Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Emergency Requests */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Urgent Regional Requests</h3>
                  <p className="text-xs text-slate-500">Immediate clinical needs matching your blood group ({donorInfo.bloodGroup})</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-gov-red text-[10px] font-bold animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>2 Active Requests</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {urgentRequests.map((req) => (
                  <div key={req.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 gap-4">
                    <div className="flex items-center gap-4">
                      {/* Blood drop indicator */}
                      <div className="w-12 h-12 rounded-xl bg-gov-red/10 text-gov-red flex items-center justify-center shrink-0 font-black text-base border border-gov-red/20 shadow-sm shadow-gov-red/5">
                        {req.bloodGroup}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 leading-snug">{req.hospital}</h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {req.distance}
                          </span>
                          <span>Required: <span className="font-bold text-slate-700">{req.unitsNeeded}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        req.urgency === 'Immediate' ? 'bg-red-100 text-gov-red' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {req.urgency}
                      </span>
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-gov-red hover:bg-gov-red-dark text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer">
                        Accept & Donate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Donation History Log</h3>
                <p className="text-xs text-slate-500">Your voluntary blood donations logged on the RaktaSetu platform</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Donation Center</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Volume</th>
                      <th className="py-3 px-4">Registry Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {history.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">{row.date}</td>
                        <td className="py-3.5 px-4 truncate max-w-[200px]">{row.center}</td>
                        <td className="py-3.5 px-4">{row.type}</td>
                        <td className="py-3.5 px-4 font-mono">{row.volume}</td>
                        <td className="py-3.5 px-4">
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

          {/* RIGHT SECTION: Notifications & Quick Actions (4 columns) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Quick Access Links</h3>
                <p className="text-xs text-slate-500">Portal utilities for quick assistance</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <button className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between group transition-all cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gov-blue" />
                    Find Active Camps
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between group transition-all cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Clipboard className="w-4 h-4 text-gov-blue" />
                    Download Digital ID
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between group transition-all cursor-pointer">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gov-blue" />
                    Update Health Profile
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between group transition-all cursor-pointer">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gov-blue" />
                    Report Post-Donation Issue
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Notifications & System Broadcasts */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Broadcast Center</h3>
                  <p className="text-xs text-slate-500">Official bulletins & updates</p>
                </div>
                <Bell className="w-4.5 h-4.5 text-slate-400" />
              </div>

              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                    notif.type === 'emergency' 
                      ? 'bg-red-50/50 border-red-100 text-red-900' 
                      : 'bg-blue-50/50 border-blue-100 text-blue-900'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      {notif.type === 'emergency' ? (
                        <>
                          <span className="inline-block w-2 h-2 rounded-full bg-gov-red"></span>
                          <span className="text-gov-red uppercase text-[9px] tracking-wider">Urgent Broadcast</span>
                        </>
                      ) : (
                        <>
                          <span className="inline-block w-2 h-2 rounded-full bg-gov-blue"></span>
                          <span className="text-gov-blue uppercase text-[9px] tracking-wider">Portal Alert</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-normal">{notif.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Quick Preview */}
            <div className="bg-gradient-to-br from-gov-blue to-gov-blue-dark text-white rounded-3xl p-6 shadow-md border border-slate-800 relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-gov-gold-light uppercase tracking-wider">Donor Certificate Badge</span>
                <Award className="w-6 h-6 text-gov-gold-light" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Download Lifesaver Pass</h4>
                <p className="text-[10px] text-blue-100">Verified credential usable for priority health services.</p>
              </div>
              <button className="w-full py-2 bg-white text-gov-blue hover:bg-slate-50 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm">
                <Download className="w-4 h-4 text-gov-blue" />
                Download PDF Pass
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
