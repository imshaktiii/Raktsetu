import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  Award, 
  Key, 
  Trash2, 
  Camera, 
  ShieldAlert,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function UserProfile() {
  // Mock Profile State
  const [profile, setProfile] = useState({
    name: 'Shakti Prasad',
    email: 'shakti.prasad@raktsetu.in',
    phone: '98765 43210',
    dob: '1995-08-12',
    gender: 'Male',
    bloodGroup: 'O+',
    weight: 72,
    lastDonation: '2026-04-15',
    conditions: 'None',
    address: 'Flat 402, Block C, Pragati Vihar, New Delhi - 110003'
  });

  // Donation History Mock Logs
  const donations = [
    { id: 'DN-201', date: '2026-04-15', venue: 'Mega Civil Lines Drive', units: 1, type: 'Whole Blood' },
    { id: 'DN-185', date: '2026-01-10', venue: 'DLF Cybercity Phase 3', units: 1, type: 'Whole Blood' },
    { id: 'DN-142', date: '2025-10-05', venue: 'In-house Central Delhi Bank', units: 1, type: 'Whole Blood' }
  ];

  // Achievements Gamification Badges
  const achievements = [
    { title: 'Bronze Donor Badge', desc: 'Authorized first voluntary blood donation', level: 'Completed' },
    { title: 'Silver Savior Badge', desc: 'Contributed 3+ whole blood donation packs', level: 'Completed' },
    { title: 'Centurion Life Badge', desc: 'Registered active card inside national donor grid', level: 'Completed' }
  ];

  // Modals Visibility States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form States
  const [editForm, setEditForm] = useState({ ...profile });
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  // Handle Edit Profile Submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setShowEditModal(false);
    alert('User profile information updated successfully!');
  };

  // Handle Password Update
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      alert('Please fill in all password fields.');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New password and confirmation do not match.');
      return;
    }
    alert('Administrative security credentials updated successfully!');
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  // Handle Account Deletion
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    alert('Account removal command initiated. Redirecting to home...');
    window.location.href = '/';
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue/10 text-gov-blue rounded-md border border-gov-blue/5">
          E-Raktkosh Unified Profile Console
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Your Profile</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Audit personal credentials, download donor appreciation certificates, view donation milestones, and adjust safety configurations.
        </p>
      </div>

      {/* Main Grid: Info Cards on Left, History & Achievements on Right */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Personal and Medical Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Card 1: Avatar, Name & Blood Group Badge */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden text-center">
            {/* Background design accents */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gov-red via-gov-gold to-gov-blue"></div>
            
            {/* Profile Picture Mock */}
            <div className="relative w-24 h-24 mx-auto mt-4">
              <div className="w-full h-full rounded-3xl bg-slate-100 flex items-center justify-center border-2 border-slate-100 overflow-hidden">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <button 
                onClick={() => alert('Change profile photo action triggered (Mock).')}
                className="absolute -bottom-1 -right-1 p-2 bg-gov-blue text-white rounded-xl shadow-lg border border-white hover:bg-gov-blue-dark transition-all cursor-pointer"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
              <p className="text-xs text-slate-500 font-mono">National Donor ID: ER-99210-DL</p>
            </div>

            {/* Blood Group Badge */}
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex items-center justify-between max-w-xs mx-auto text-left gap-4">
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Registered Blood Type</span>
                <span className="text-xs font-bold text-slate-700 mt-0.5 block">Eligible Donor</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gov-red text-white flex items-center justify-center font-black text-lg border border-gov-red/10 shadow-md">
                {profile.bloodGroup}
              </div>
            </div>

            {/* Actions: Edit profile */}
            <button 
              onClick={() => { setEditForm({ ...profile }); setShowEditModal(true); }}
              className="w-full py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Modify Profile Details
            </button>
          </div>

          {/* Card 2: Detailed Personal & Medical Information */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <FileText className="w-4.5 h-4.5 text-gov-blue" />
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Repository Details</h3>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-350" /> Email Address
                </span>
                <span className="font-semibold">{profile.email}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-350" /> Mobile Number
                </span>
                <span className="font-mono font-bold">{profile.phone}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-350" /> Date of Birth
                </span>
                <span className="font-mono font-bold">{profile.dob} ({profile.gender})</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-350" /> Body Weight
                </span>
                <span className="font-semibold">{profile.weight} kg</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-350" /> Last Donation Date
                </span>
                <span className="font-mono font-bold text-gov-red">{profile.lastDonation}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-350" /> Medical Conditions
                </span>
                <span className="font-semibold text-slate-500">{profile.conditions}</span>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <span className="block text-[9px] uppercase font-bold text-slate-450 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-350" /> Postal Address
                </span>
                <span className="font-semibold leading-relaxed block">{profile.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Donation History, Achievements, Certificates & Password (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Card 3: Donation History list */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-gov-red" />
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Donation History</h3>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Total: {donations.length} Times</span>
            </div>

            <div className="space-y-3">
              {donations.map((dn) => (
                <div key={dn.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-800">{dn.venue}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Donation ID: {dn.id} • Type: {dn.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold block">{dn.date}</span>
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5 block">Dispatched Successful</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Certificates & Gamification Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Certificates Appreciation list */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <FileText className="w-4.5 h-4.5 text-gov-gold" />
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Appreciation Certificates</h3>
              </div>

              <div className="space-y-2.5">
                {donations.map((dn, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-50 bg-slate-50/50 text-xs flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-650 truncate max-w-[140px]">Certificate for {dn.id}</span>
                    <button 
                      onClick={() => alert('Appreciation Certificate PDF download triggered (Mock).')}
                      className="px-2 py-1 bg-gov-blue hover:bg-gov-blue-dark text-white rounded font-bold text-[9px] cursor-pointer flex items-center gap-0.5"
                    >
                      PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements badges list */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <Award className="w-4.5 h-4.5 text-gov-red animate-pulse" />
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Honorary Milestones</h3>
              </div>

              <div className="space-y-3 text-xs">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-7 h-7 rounded bg-red-50 text-gov-red flex items-center justify-center shrink-0 border border-red-100">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-850">{ach.title}</h4>
                      <p className="text-[10px] text-slate-450 mt-0.5 leading-normal">{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Card 5: Security Settings & Password Update Form */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Key className="w-4.5 h-4.5 text-gov-blue" />
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Security Settings</h3>
            </div>

            <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs items-end">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue bg-white"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                />
              </div>
              
              <div className="sm:col-span-3 flex justify-between items-center pt-2">
                <button 
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="text-gov-red hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Deactivate Account
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 space-y-4 animate-scale-up text-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-blue"></div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Modify Profile Parameters</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Body Weight (kg)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: parseInt(e.target.value) || '' })}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Postal Address</label>
                <textarea
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-blue h-16 resize-none"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl font-bold transition-all shadow-md cursor-pointer text-center"
              >
                Save Details adjustments
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DEACTIVATE ACCOUNT CONFIRMATION DIALOG */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-50 text-gov-red flex items-center justify-center mx-auto border border-red-100">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-800 text-base">Deactivate Profile?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to request deactivation of your voluntary donor card? This logs a registry suspend event with the ministry block.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Keep Profile
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
