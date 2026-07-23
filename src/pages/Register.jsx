import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { indiaStatesDistricts } from '../data/indiaStatesDistricts';
import { 
  ShieldAlert, 
  Award, 
  ShieldCheck, 
  Heart, 
  User, 
  MapPin, 
  ClipboardList, 
  Check, 
  Lock, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'Male',
      bloodGroup: 'A+',
      weight: '',
      lastDonation: '',
      medicalConditions: '',
      address: '',
      state: '',
      district: '',
      city: '',
      pinCode: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  });

  const passwordValue = watch('password');
  const selectedState = watch('state');
  const [stateSearch, setStateSearch] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  useEffect(() => {
    setValue('district', '');
  }, [selectedState, setValue]);

  const stateKeys = Object.keys(indiaStatesDistricts);
  const filteredStates = stateKeys.filter(st =>
    st.toLowerCase().includes(stateSearch.toLowerCase())
  );
  const availableDistricts = selectedState ? (indiaStatesDistricts[selectedState] || []) : [];

  // Define steps validation fields
  const stepFields = {
    1: ['fullName', 'email', 'phone', 'dob', 'gender'],
    2: ['bloodGroup', 'weight', 'lastDonation', 'medicalConditions'],
    3: ['address', 'state', 'district', 'city', 'pinCode'],
    4: ['password', 'confirmPassword', 'acceptTerms']
  };

  const handleNextStep = async () => {
    const fieldsToValidate = stepFields[step];
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const birthDate = new Date(data.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      await registerUser({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        bloodGroup: data.bloodGroup,
        age,
        gender: data.gender,
        city: data.city,
        state: data.state,
        address: data.address
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSuccess(false);
    navigate('/login');
  };

  // Age Validation Function
  const validateAge = (value) => {
    if (!value) return 'Date of Birth is required';
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18 || age > 65) {
      return 'Donor must be between 18 and 65 years old';
    }
    return true;
  };

  // Last Donation Date Validation Function
  const validateLastDonation = (value) => {
    if (!value) return true; // Optional field
    const donationDate = new Date(value);
    const today = new Date();
    if (donationDate > today) {
      return 'Last donation date cannot be in the future';
    }
    const diffTime = today - donationDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 90) {
      return `Last donation must be at least 90 days ago (currently ${diffDays} days ago)`;
    }
    return true;
  };

  const stepsInfo = [
    { number: 1, label: 'Profile', desc: 'Personal details' },
    { number: 2, label: 'Medical', desc: 'Donation eligibility' },
    { number: 3, label: 'Location', desc: 'Contact address' },
    { number: 4, label: 'Security', desc: 'Secure account' }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100 min-h-[600px]">
        
        {/* Left Column: Benefits Panel (4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-br from-gov-red-dark via-gov-red to-red-500 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
              <span className="font-extrabold text-xl tracking-tight">Rakta<span className="text-white/80">Setu</span></span>
            </div>
            <div className="space-y-3">
              <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/10 rounded-md">
                National Portal
              </span>
              <h2 className="text-2xl font-bold leading-tight">Become a Voluntary Donor</h2>
              <p className="text-xs text-red-100 leading-relaxed">
                Join our national network of healthcare-linked blood donors. Your contribution directly assists local emergency wings and clinical centers in real time.
              </p>
            </div>

            <div className="space-y-5 pt-6 border-t border-white/10 text-xs">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-gov-gold-light fill-gov-gold-light" />
                </div>
                <p className="text-red-100 leading-normal">
                  <span className="font-bold text-white block">Saves Up to 3 Lives</span>
                  Every single whole blood bag can help up to three different clinical patients.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-gov-gold-light" />
                </div>
                <p className="text-red-100 leading-normal">
                  <span className="font-bold text-white block">Digital Donor Badge</span>
                  Register to receive updates, access digital camp tickets, and verify your donor logs.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-red-200 mt-12 pt-6 border-t border-white/10 z-10">
            Complies with the National Blood Transfusion Council (NBTC) guidelines. Your registration holds official medical validity.
          </div>
        </div>

        {/* Right Column: Progress Form (8 cols) */}
        <div className="md:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Step Progress Indicator */}
            <div className="mb-8">
              {/* Desktop Progress Stepper */}
              <div className="hidden sm:flex items-center justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-gov-red transition-all duration-300 -translate-y-1/2 z-0"
                  style={{ width: `${((step - 1) / (stepsInfo.length - 1)) * 100}%` }}
                ></div>

                {stepsInfo.map((s) => {
                  const isActive = step === s.number;
                  const isCompleted = step > s.number;
                  return (
                    <div key={s.number} className="flex flex-col items-center relative z-10 text-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-300 shadow-sm ${
                          isCompleted
                            ? 'bg-gov-red border-gov-red text-white'
                            : isActive
                            ? 'bg-white border-gov-red text-gov-red font-extrabold scale-110 shadow-md shadow-gov-red/10'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5 stroke-[3px]" /> : s.number}
                      </div>
                      <span className={`text-xs font-bold mt-2 ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                        {s.label}
                      </span>
                      <span className="text-[9px] text-slate-400 hidden lg:block max-w-[80px]">
                        {s.desc}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Progress Bar */}
              <div className="sm:hidden space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Step {step} of 4: {stepsInfo[step-1].label}</span>
                  <span>{Math.round(((step - 1) / (stepsInfo.length - 1)) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gov-red h-full transition-all duration-300"
                    style={{ width: `${((step - 1) / (stepsInfo.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Form Steps Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-xs font-bold text-red-600 animate-shake">
                  <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 animate-pulse" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
                    <User className="w-5 h-5 text-gov-red" />
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Personal Details</h3>
                      <p className="text-xs text-slate-500">Provide official identity information to start</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="As in government identification card"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                        errors.fullName ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                      }`}
                      {...register('fullName', { 
                        required: 'Full name is required',
                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                        pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only alphabetical characters are allowed' }
                      })}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address format' }
                        })}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit mobile"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.phone ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('phone', { 
                          required: 'Mobile number is required',
                          pattern: { value: /^[6-9]\d{9}$/, message: 'Must be a valid 10-digit number starting with 6-9' }
                        })}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date of Birth</label>
                      <input
                        type="date"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.dob ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('dob', { 
                          required: 'Date of birth is required',
                          validate: validateAge
                        })}
                      />
                      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Gender</label>
                      <select
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm bg-white"
                        {...register('gender', { required: 'Gender is required' })}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Donation Eligibility */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
                    <ClipboardList className="w-5 h-5 text-gov-red" />
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Donation Eligibility</h3>
                      <p className="text-xs text-slate-500">Self-declare medical status to verify safe donation</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Blood Group</label>
                      <select
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm bg-white font-bold text-slate-800"
                        {...register('bloodGroup', { required: 'Blood group is required' })}
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        placeholder="Min weight 45 kg"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.weight ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('weight', { 
                          required: 'Weight is required',
                          min: { value: 45, message: 'Donor must weigh at least 45 kg' }
                        })}
                      />
                      {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      Last Donation Date (Optional)
                    </label>
                    <input
                      type="date"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                        errors.lastDonation ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                      }`}
                      {...register('lastDonation', { 
                        validate: validateLastDonation
                      })}
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Leave empty if you have never donated blood before.</p>
                    {errors.lastDonation && <p className="text-red-500 text-xs mt-1">{errors.lastDonation.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      Medical Conditions (Optional)
                    </label>
                    <textarea
                      placeholder="List any past surgeries, tattoos, piercings in the past 6 months, or ongoing medications (e.g. blood pressure, diabetes)."
                      rows="3"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm resize-none"
                      {...register('medicalConditions')}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 3: Location Details */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
                    <MapPin className="w-5 h-5 text-gov-red" />
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Address & Location</h3>
                      <p className="text-xs text-slate-500">Provide contact location for emergency donor coordination</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Residential Address</label>
                    <input
                      type="text"
                      placeholder="House/Plot No, Street, Landmark"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                        errors.address ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                      }`}
                      {...register('address', { required: 'Residential address is required' })}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">State</label>
                      <input
                        type="hidden"
                        {...register('state', { required: 'State is required' })}
                      />
                      <input
                        type="text"
                        placeholder="Search & select State"
                        value={stateSearch}
                        onChange={(e) => {
                          setStateSearch(e.target.value);
                          setShowStateDropdown(true);
                          if (e.target.value !== selectedState) {
                            setValue('state', '');
                          }
                        }}
                        onFocus={() => setShowStateDropdown(true)}
                        onBlur={() => setTimeout(() => setShowStateDropdown(false), 200)}
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.state ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                      />
                      {showStateDropdown && (
                        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg">
                          {filteredStates.map((st) => (
                            <div
                              key={st}
                              onClick={() => {
                                setValue('state', st, { shouldValidate: true });
                                setStateSearch(st);
                                setShowStateDropdown(false);
                              }}
                              className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm font-semibold text-slate-700"
                            >
                              {st}
                            </div>
                          ))}
                          {filteredStates.length === 0 && (
                            <div className="px-4 py-2 text-slate-400 text-sm">No states found</div>
                          )}
                        </div>
                      )}
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">District</label>
                      <select
                        disabled={!selectedState}
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.district ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        } ${!selectedState ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'bg-white'}`}
                        {...register('district', { required: 'District is required' })}
                      >
                        <option value="">Select District</option>
                        {availableDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                      {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">City / Town</label>
                      <input
                        type="text"
                        placeholder="e.g. Karol Bagh"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.city ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('city', { required: 'City/Town is required' })}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">PIN Code</label>
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="6-digit PIN code"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.pinCode ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('pinCode', { 
                          required: 'PIN Code is required',
                          pattern: { value: /^\d{6}$/, message: 'Must be exactly 6 digits' }
                        })}
                      />
                      {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Account Security */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
                    <Lock className="w-5 h-5 text-gov-red" />
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Account Security</h3>
                      <p className="text-xs text-slate-500">Create login credentials for RaktaSetu Portal</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                        errors.password ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                      }`}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                      })}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Retype password"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                        errors.confirmPassword ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                      }`}
                      {...register('confirmPassword', { 
                        required: 'Confirm password is required',
                        validate: (value) => value === passwordValue || 'Passwords do not match'
                      })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-gov-red focus:ring-gov-red/30 mt-0.5"
                        {...register('acceptTerms', { 
                          required: 'You must accept the voluntary donor declaration terms' 
                        })}
                      />
                      <span className="text-[11px] text-slate-600 leading-normal">
                        I hereby declare that all medical statements are correct and I consent to receive communication and blood emergency notifications under National Health Mission guidelines.
                      </span>
                    </label>
                    {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms.message}</p>}
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex gap-3 pt-6 border-t border-slate-100 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Step
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-3 bg-gov-blue hover:bg-gov-blue-dark text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md hover:shadow-lg cursor-pointer ${
                      loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gov-red hover:bg-gov-red-dark'
                    }`}
                  >
                    {loading ? 'Submitting Registration...' : 'Submit Donor Application'}
                    {!loading && <Check className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Redirect to login footer */}
          <div className="text-center text-xs text-slate-500 pt-8 mt-4 border-t border-slate-100">
            Already registered on RaktaSetu?{' '}
            <Link to="/login" className="text-gov-blue font-bold hover:underline">
              Log in here
            </Link>
          </div>
        </div>

      </div>

      {/* Success Dialog Modal Overlay */}
      {success && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden border border-slate-100 text-center space-y-5 animate-scale-up">
            {/* Header branding strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

            {/* Checkmark circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-inner">
              <ShieldCheck className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800">Registration Complete!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Your profile has been created successfully in the National Digital Blood Donor Database. You are now active for voluntary donations.
              </p>
            </div>

            {/* Mock Digital Card Info */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 max-w-xs mx-auto text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-400">Portal ID:</span>
                <span className="font-mono font-bold text-slate-700">RST-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-400">Profile Status:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Clearance:</span>
                <span className="font-bold text-gov-blue">NBTC Verified</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/50 rounded-xl flex gap-2.5 items-start text-left text-[10px] text-slate-600 border border-blue-100">
              <ShieldAlert className="w-4 h-4 text-gov-blue shrink-0 mt-0.5" />
              <p className="leading-normal">
                Credentials successfully cached. Please proceed to portal login using your registered email and secure password.
              </p>
            </div>

            <button
              onClick={handleModalClose}
              className="w-full py-3 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Proceed to Portal Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
