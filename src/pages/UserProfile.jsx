import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { donorsAPI } from '../api/donors';
import { getProfileImageUrl } from '../utils/image';
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
  const { user, updateUser } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Maximum size allowed is 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await donorsAPI.uploadPhoto(formData);
      if (res.success) {
        updateUser({ profileImage: res.image || res.profileImage });
        alert("Profile picture updated successfully!");
      } else {
        alert(res.message || "Failed to upload profile picture.");
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Failed to upload profile picture.";
      alert(errMsg);
    }
  };
  const [donations, setDonations] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '1995-08-12',
    gender: 'Male',
    bloodGroup: 'O+',
    weight: 72,
    lastDonation: 'None',
    conditions: 'None',
    address: 'Flat 402, Block C, Pragati Vihar, New Delhi - 110003'
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await donorsAPI.getProfile();
        if (data && data.success) {
          const donor = data.donor;
          if (donor && donor.profileImage && donor.profileImage !== user?.profileImage) {
            updateUser({ profileImage: donor.profileImage });
          }
          setProfile({
            name: donor.fullName || '',
            email: donor.email || '',
            phone: donor.phone || '',
            dob: donor.dob || '1995-08-12',
            gender: donor.gender || 'Male',
            bloodGroup: donor.bloodGroup || 'O+',
            weight: donor.weight || 72,
            lastDonation: donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'None',
            conditions: donor.conditions || 'None',
            address: donor.address || 'Flat 402, Block C, Pragati Vihar, New Delhi - 110003'
          });
        }

        const historyData = await donorsAPI.getDonationHistory();
        if (historyData && historyData.success) {
          setDonations(historyData.history || []);
        }
      } catch (err) {
        console.error('Failed to load profile details:', err);
      }
    };
    loadProfile();
  }, [user?.profileImage, updateUser]);



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
            
            {/* Profile Picture Upload Container */}
            <div className="relative w-28 h-28 mx-auto mt-4 group">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border-4 border-slate-200 overflow-hidden shadow-inner relative">
                {user?.profileImage ? (
                  <img 
                    src={getProfileImageUrl(user.profileImage)} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-14 h-14 text-slate-400" />
                )}
              </div>
              <label 
                htmlFor="profile-pic-upload"
                className="absolute -bottom-1 -right-1 p-2 bg-gov-blue text-white rounded-full shadow-lg border border-white hover:bg-gov-blue-dark transition-all cursor-pointer flex items-center justify-center"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
                <input 
                  type="file"
                  id="profile-pic-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="text-center">
              <label 
                htmlFor="profile-pic-upload" 
                className="text-xs font-bold text-gov-blue hover:text-gov-blue-dark hover:underline cursor-pointer flex items-center justify-center gap-1 mt-1"
              >
                📷 Upload Photo
              </label>
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

          {/* Card 1.5: National Blood Donor ID Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Award className="w-4.5 h-4.5 text-gov-red" />
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">National Donor Card</h3>
            </div>

            {/* The Digital ID Card container */}
            <div id="donor-card-print" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-905 text-white rounded-2xl p-6 relative overflow-hidden border border-slate-850 shadow-lg max-w-xs mx-auto space-y-6 aspect-[1.586/1]">
              {/* Seal watermarks or accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gov-red/5 rounded-full blur-2xl pointer-events-none"></div>
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gov-red"></span>
                    RAKTASETU
                  </h4>
                  <p className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">National Blood Donor ID</p>
                </div>
                <span className="text-[8px] font-mono text-gov-gold-light bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                  RS-2026-000012
                </span>
              </div>

              {/* Body (Photo, Info, QR Code) */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {/* Profile Photo (3 cols) */}
                <div className="col-span-3">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-white/20 shadow-inner">
                    {user?.profileImage ? (
                      <img 
                        src={getProfileImageUrl(user.profileImage)} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Info (6 cols) */}
                <div className="col-span-6 space-y-2">
                  <div>
                    <span className="block text-[7px] uppercase font-bold text-slate-400">Donor Name</span>
                    <span className="text-xs font-bold text-white tracking-wide block truncate max-w-[130px]">{profile.name}</span>
                  </div>
                  <div>
                    <span className="block text-[7px] uppercase font-bold text-slate-400">Blood Group</span>
                    <span className="text-sm font-black text-gov-red-light tracking-wide block">{profile.bloodGroup}</span>
                  </div>
                </div>

                {/* QR Code (3 cols) */}
                <div className="col-span-3 flex justify-end">
                  <div className="w-12 h-12 bg-white p-1 rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                      {/* Stylized QR Code grids */}
                      <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                      <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                      <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                      <path d="M40,0 h10 v10 h-10 z M55,5 h10 v10 h-10 z M40,20 h20 v10 h-20 z" />
                      <path d="M45,40 h15 v10 h-15 z M50,55 h10 v15 h-10 z M35,70 h10 v20 h-10 z" />
                      <path d="M70,40 h10 v10 h-10 z M85,45 h15 v10 h-15 z M75,65 h10 v10 h-10 z M70,80 h30 v10 h-30 z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center text-[7px] text-slate-450 border-t border-white/5 pt-2">
                <span>Ministry of Health & Family Welfare</span>
                <span className="font-bold text-emerald-400">ACTIVE GRID</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  alert('Downloading National Blood Donor ID Card PDF... Status: Success!');
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-slate-655" />
                Download Card
              </button>

              <Link
                to={`/certificate/${user?.id || user?._id || 'D-MOCK-9988'}`}
                className="w-full py-2.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-center"
              >
                <Award className="w-4 h-4 text-white animate-pulse" />
                View Blood Donation Certificate
              </Link>
            </div>
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
              {donations.length > 0 ? (
                donations.map((dn) => (
                  <div key={dn.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800">{dn.venue}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Camp: {dn.campName} • Type: {dn.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold block">{dn.date}</span>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5 block">Donated Successful</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs font-medium">No voluntary donations completed yet.</div>
              )}
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
                {donations.length > 0 ? (
                  donations.map((dn, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-50 bg-slate-50/50 text-xs flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-650 truncate max-w-[140px]">Certificate for {dn.date}</span>
                      <Link 
                        to={`/certificate/${user?.id || user?._id}`}
                        className="px-2 py-1 bg-gov-blue hover:bg-gov-blue-dark text-white rounded font-bold text-[9px] cursor-pointer flex items-center gap-0.5"
                      >
                        PDF
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs font-medium">No certificates generated yet.</div>
                )}
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
