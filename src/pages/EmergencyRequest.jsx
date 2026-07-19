import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Clock, 
  Phone, 
  User, 
  Activity, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  Search,
  Building
} from 'lucide-react';

export default function EmergencyRequest() {
  // Live Requests Board State (Initialized with dummy logs)
  const [requests, setRequests] = useState([
    {
      id: 'EMG-801',
      patientName: 'Kunal Sen',
      hospital: 'AIIMS Trauma Center, ICU Room 4',
      bloodGroup: 'O-',
      units: 4,
      priority: 'Critical',
      contact: '98765 12345',
      doctor: 'Dr. S. K. Gupta',
      requiredBefore: 'Within 2 hours',
      address: 'Ansari Nagar, New Delhi - 110029',
      date: '2026-07-19'
    },
    {
      id: 'EMG-802',
      patientName: 'Sunita Sharma',
      hospital: 'Max Super Specialty Ward B',
      bloodGroup: 'AB-',
      units: 2,
      priority: 'Urgent',
      contact: '99887 76655',
      doctor: 'Dr. Anita Rao',
      requiredBefore: 'Within 6 hours',
      address: 'Saket Enclave, New Delhi - 110017',
      date: '2026-07-19'
    },
    {
      id: 'EMG-803',
      patientName: 'Ravi Malhotra',
      hospital: 'Ram Manohar Lohia Hospital',
      bloodGroup: 'B-',
      units: 5,
      priority: 'Critical',
      contact: '98112 34567',
      doctor: 'Dr. Vivek Dev',
      requiredBefore: 'Within 1 hour',
      address: 'Baba Kharak Singh Marg, Connaught Place, New Delhi - 110001',
      date: '2026-07-19'
    }
  ]);

  // Form State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [dispatchedId, setDispatchedId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      patientName: '',
      hospital: '',
      bloodGroup: 'O+',
      units: '',
      priority: 'Urgent',
      contact: '',
      doctor: '',
      requiredBefore: '',
      address: ''
    }
  });

  const onSubmit = (data) => {
    const nextId = `EMG-${Math.floor(800 + Math.random() * 200)}`;
    const newRequest = {
      id: nextId,
      patientName: data.patientName,
      hospital: data.hospital,
      bloodGroup: data.bloodGroup,
      units: parseInt(data.units),
      priority: data.priority,
      contact: data.contact,
      doctor: data.doctor,
      requiredBefore: data.requiredBefore || 'ASAP',
      address: data.address,
      date: new Date().toISOString().split('T')[0]
    };

    setRequests([newRequest, ...requests]);
    setDispatchedId(nextId);
    setShowSuccessModal(true);
    reset();
  };

  // Search filter
  const filteredRequests = requests.filter(req => 
    req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.hospital.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-red-50 text-gov-red rounded-md border border-gov-red/10 animate-pulse">
          Critical trauma ICU response network
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Emergency Blood Request Console</h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Log an emergency trauma request to broadcast across our local donor lists and clinical repositories instantly.
        </p>
      </div>

      {/* Main Grid: Form on Left, Live Board on Right */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <ShieldAlert className="w-5 h-5 text-gov-red animate-pulse" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Log Emergency Case</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            {/* Patient Name */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Patient Name</label>
              <input
                type="text"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red"
                placeholder="Full Name"
                {...register('patientName', { required: 'Patient name is required' })}
              />
              {errors.patientName && <span className="text-gov-red text-[10px] mt-1 block">{errors.patientName.message}</span>}
            </div>

            {/* Hospital Name */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Hospital / Clinic</label>
              <input
                type="text"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red"
                placeholder="e.g. AIIMS ICU, Ward 3"
                {...register('hospital', { required: 'Hospital location is required' })}
              />
              {errors.hospital && <span className="text-gov-red text-[10px] mt-1 block">{errors.hospital.message}</span>}
            </div>

            {/* Grid 1: Group & Units */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Blood Group</label>
                <select
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold"
                  {...register('bloodGroup')}
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Units Required</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red"
                  placeholder="e.g. 4"
                  {...register('units', { required: 'Units count is required' })}
                />
                {errors.units && <span className="text-gov-red text-[10px] mt-1 block">{errors.units.message}</span>}
              </div>
            </div>

            {/* Grid 2: Priority & Mobile */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Priority Case</label>
                <select
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white font-bold text-gov-red"
                  {...register('priority')}
                >
                  <option value="Urgent">Urgent Warning</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Contact Mobile</label>
                <input
                  type="tel"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red"
                  placeholder="98765 43210"
                  {...register('contact', { 
                    required: 'Contact number is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }
                  })}
                />
                {errors.contact && <span className="text-gov-red text-[10px] mt-1 block">{errors.contact.message}</span>}
              </div>
            </div>

            {/* Doctor Name & Required Before */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Attending Doctor</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red"
                  placeholder="Dr. Name"
                  {...register('doctor', { required: 'Doctor name is required' })}
                />
                {errors.doctor && <span className="text-gov-red text-[10px] mt-1 block">{errors.doctor.message}</span>}
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Required Before</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red"
                  placeholder="e.g. Within 2 hours"
                  {...register('requiredBefore')}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Hospital Address</label>
              <textarea
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red h-16 resize-none"
                placeholder="Full address for dispatch delivery..."
                {...register('address', { required: 'Hospital address is required' })}
              ></textarea>
              {errors.address && <span className="text-gov-red text-[10px] mt-1 block">{errors.address.message}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gov-red hover:bg-gov-red-dark text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Activity className="w-4 h-4 animate-pulse" />
              Broadcast Emergency Case
            </button>
          </form>
        </div>

        {/* Right Column: Live Request Board (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Board Header & Search */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-gov-red animate-ping" />
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Live Broadcast Feed</h3>
            </div>
            
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient, hospital or group..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-gov-red text-xs bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Active Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <div 
                key={req.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all relative overflow-hidden space-y-4"
              >
                {/* Glow border for Critical cases */}
                {req.priority === 'Critical' && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gov-red"></div>
                )}
                {req.priority === 'Urgent' && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-amber-500"></div>
                )}

                {/* Priority Badges */}
                <div className="flex justify-between items-start pl-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400">ID: {req.id}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      req.priority === 'Critical' 
                        ? 'bg-red-50 text-gov-red border border-red-100 animate-pulse' 
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {req.priority} case
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-350" /> {req.requiredBefore}
                  </span>
                </div>

                {/* Patient / Hospital layout */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pl-1.5">
                  <div className="sm:col-span-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gov-red text-white flex items-center justify-center shrink-0 font-black text-lg shadow-sm border border-gov-red/10">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Required</span>
                      <span className="text-sm font-black text-slate-800">{req.units} Units</span>
                    </div>
                  </div>
                  <div className="sm:col-span-9 space-y-1">
                    <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      Patient: {req.patientName}
                    </h4>
                    <p className="text-xs text-slate-600 flex items-start gap-1.5">
                      <Building className="w-4 h-4 text-slate-450 shrink-0 mt-0.5" />
                      Hospital: {req.hospital}
                    </p>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="border-t border-slate-50 pt-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs pl-1.5">
                  <div className="flex flex-wrap gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> Contact: {req.contact}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" /> Doctor: {req.doctor}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={`tel:${req.contact.replace(/\s+/g, '')}`}
                      className="px-3.5 py-1.5 bg-gov-red hover:bg-gov-red-dark text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Call Dispatch
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {filteredRequests.length === 0 && (
              <p className="text-center py-8 text-slate-400 text-xs font-medium bg-white rounded-3xl border border-slate-100">
                No active emergency broadcasts match your search.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* DISPATCH BROADCAST SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-50 text-gov-red flex items-center justify-center mx-auto border-2 border-red-100">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>
            <div className="space-y-1.5 text-xs">
              <span className="inline-block text-[9px] uppercase font-bold text-gov-red bg-red-50 px-2 py-0.5 rounded">Emergency ID: {dispatchedId}</span>
              <h3 className="font-bold text-slate-800 text-base">Trauma Broadcast Dispatched</h3>
              <p className="text-slate-500 leading-relaxed">
                Emergency blood request has been compiled, encrypted, and broadcasted to local donor grids and blood banks.
              </p>
            </div>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2 bg-gov-red hover:bg-gov-red-dark text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Console
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
