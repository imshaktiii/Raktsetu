import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Shield, 
  KeyRound, 
  Smartphone, 
  Mail, 
  ShieldCheck, 
  Landmark, 
  Eye, 
  EyeOff, 
  Loader2 
} from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('donor'); // donor, bank, organizer
  const [loginMethod, setLoginMethod] = useState('password'); // password, otp
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      phone: '',
      otp: '',
      rememberMe: false
    }
  });

  const watchPhone = watch('phone');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOtp = () => {
    if (!watchPhone || !/^[6-9]\d{9}$/.test(watchPhone)) {
      alert('Please enter a valid 10-digit mobile number starting with 6-9.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      alert('Demo OTP dispatched! Enter verification code "123456" to authenticate.');
    }, 1200);
  };

  const onLoginSubmit = (_data) => {
    setLoading(true);

    // Mock Login authentication
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100 min-h-[550px]">
        
        {/* Left Column: Portal Info (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-gov-blue-dark via-gov-blue to-gov-blue-light text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <Shield className="w-6 h-6 text-gov-gold-light fill-gov-gold-light animate-pulse" />
              <span className="font-extrabold text-xl tracking-tight">Rakta<span className="text-gov-red">Setu</span></span>
            </Link>
            <div className="space-y-2">
              <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white/10 rounded-md">
                Official Gateway
              </span>
              <h2 className="text-2xl font-bold leading-tight">Unified National Portal Login</h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                Log in to access your electronic donor card, view real-time blood stock registers, coordinate camps, or track state-level updates.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gov-gold-light" />
                </div>
                <p className="text-blue-100 leading-normal">
                  <span className="font-bold text-white block">Secured Connection</span>
                  AES 256-bit encrypted data protocols compliant with ISO 27001 medical standards.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4 text-gov-gold-light" />
                </div>
                <p className="text-blue-100 leading-normal">
                  <span className="font-bold text-white block">Ministry Affiliated</span>
                  Directly linked with the National Health Authority (NHA) digital registry database.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-blue-200 mt-12 pt-4 border-t border-white/10 z-10">
            © Ministry of Health & Family Welfare. In case of security or access queries, dial official assistance helpline at 1097.
          </div>
        </div>

        {/* Right Column: Login Form (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          {success ? (
            <div className="text-center space-y-4 py-12 animate-pulse-soft">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100">
                <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Authentication Successful</h3>
                <p className="text-xs text-slate-500 mt-1">Establishing secure session. Redirecting to workspace...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Role Selector Tabs */}
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Portal Workspace</span>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  {['donor', 'bank', 'organizer'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => { 
                        setRole(r); 
                        setOtpSent(false); 
                        setValue('otp', '');
                      }}
                      className={`py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        role === r 
                          ? 'bg-white text-gov-blue shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {r === 'bank' ? 'Blood Bank' : r === 'organizer' ? 'Organizer' : r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Method and Title */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg capitalize">{role} Access Portal</h3>
                <div className="flex gap-1.5 bg-slate-100 p-0.5 rounded-lg">
                  {['password', 'otp'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setLoginMethod(method)}
                      className={`px-3 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        loginMethod === method 
                          ? 'bg-gov-blue text-white shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
                
                {/* Method 1: Password Authenticate */}
                {loginMethod === 'password' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email ID</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="e.g. name@domain.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                            errors.email ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                          }`}
                          {...register('email', { 
                            required: 'Email address is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                          })}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-600 uppercase">Password</label>
                        <Link
                          to="/forgot-password"
                          className="text-[10px] text-gov-blue hover:underline font-bold"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                            errors.password ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                          }`}
                          {...register('password', { 
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' }
                          })}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-gov-blue focus:ring-gov-blue/30"
                          {...register('rememberMe')}
                        />
                        <span className="text-xs text-slate-600">Keep me logged in on this computer</span>
                      </label>
                    </div>
                  </>
                ) : (
                  /* Method 2: OTP Authenticate */
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Linked Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Smartphone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            maxLength="10"
                            placeholder="Enter 10-digit mobile number"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                              errors.phone ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                            } ${otpSent ? 'bg-slate-50 text-slate-500' : ''}`}
                            disabled={otpSent}
                            {...register('phone', { 
                              required: 'Mobile number is required',
                              pattern: { value: /^[6-9]\d{9}$/, message: 'Must be a valid 10-digit number' }
                            })}
                          />
                        </div>
                        {!otpSent && (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shrink-0 shadow-sm"
                          >
                            Send OTP
                          </button>
                        )}
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    {otpSent && (
                      <div className="space-y-1.5 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-bold text-slate-600 uppercase">One-Time Verification Code</label>
                          <button 
                            type="button"
                            onClick={() => { setOtpSent(false); setValue('otp', ''); }} 
                            className="text-[10px] text-gov-red hover:underline font-bold cursor-pointer"
                          >
                            Change Mobile
                          </button>
                        </div>
                        <input
                          type="text"
                          maxLength="6"
                          placeholder="Enter 6-digit OTP code"
                          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm text-center tracking-widest font-extrabold ${
                            errors.otp ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                          }`}
                          {...register('otp', { 
                            required: 'Verification OTP is required',
                            pattern: { value: /^\d{6}$/, message: 'OTP must be exactly 6 digits' }
                          })}
                        />
                        {errors.otp && <p className="text-red-500 text-xs mt-1 text-center">{errors.otp.message}</p>}
                      </div>
                    )}
                  </>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading || (loginMethod === 'otp' && !otpSent)}
                  className={`w-full py-3 text-white rounded-xl text-xs font-bold transition-all mt-6 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer ${
                    loading || (loginMethod === 'otp' && !otpSent)
                      ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                      : 'bg-gov-blue hover:bg-gov-blue-dark'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Authenticating Digital Profile...
                    </>
                  ) : (
                    'Authenticate & Log In'
                  )}
                </button>
              </form>

              {/* Redirect Footer */}
              <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
                Don't have a profile yet?{' '}
                <Link to="/register" className="text-gov-red font-bold hover:underline">
                  Become a Donor
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
