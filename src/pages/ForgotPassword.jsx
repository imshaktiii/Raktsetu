import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Shield, 
  Mail, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowLeft, 
  Lock 
} from 'lucide-react';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: ''
    }
  });

  const passwordValue = watch('password');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOtp = async () => {
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      alert('Verification OTP dispatched! Enter verification code "123456" to verify.');
    }, 1200);
  };

  const handleVerifyOtp = async () => {
    const isOtpValid = await trigger('otp');
    if (!isOtpValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const onSubmitReset = (_data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleFinish = () => {
    setSuccess(false);
    navigate('/login');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100 min-h-[500px]">
        
        {/* Left Column: Info Panel */}
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
                Identity Security
              </span>
              <h2 className="text-2xl font-bold leading-tight">Reset Password</h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                Confirm your identity with an OTP check to configure new login security credentials.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gov-gold-light" />
                </div>
                <p className="text-blue-100 leading-normal">
                  <span className="font-bold text-white block">Identity Verification</span>
                  Secured single-use tokens ensure account parameters remain safe.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-blue-200 mt-12 pt-4 border-t border-white/10 z-10">
            © Ministry of Health & Family Welfare. Securing citizen data records.
          </div>
        </div>

        {/* Right Column: Recover Form steps */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          {success ? (
            /* Success Message Card */
            <div className="text-center space-y-4 py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-inner">
                <ShieldCheck className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800 font-sans">Credentials Reset!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Your account password has been successfully configured. You can now use your email address and new password to log in.
                </p>
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Proceed to Login
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg">Account Recovery</h3>
                <p className="text-xs text-slate-400">Step {step} of 3: {step === 1 ? 'Enter Email' : step === 2 ? 'Verify OTP' : 'New Credentials'}</p>
              </div>

              {/* Step 1: Input Email */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Registered Email ID</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. name@domain.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('email', { 
                          required: 'Registered email address is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address format' }
                        })}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full py-3 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-colors cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating OTP Token...
                      </>
                    ) : (
                      'Request Verification OTP'
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Input OTP */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1 text-center">
                      Enter Verification OTP
                    </label>
                    <p className="text-[10px] text-slate-500 text-center mb-3">
                      Sent to your email. (Demo OTP code: <span className="font-bold">123456</span>)
                    </p>
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Enter 6-digit OTP"
                      className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm text-center tracking-widest font-extrabold transition-colors ${
                        errors.otp ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                      }`}
                      {...register('otp', { 
                        required: 'Verification OTP is required',
                        pattern: { value: /^\d{6}$/, message: 'OTP must be exactly 6 digits' },
                        validate: (value) => value === '123456' || 'Invalid OTP code'
                      })}
                    />
                    {errors.otp && <p className="text-red-500 text-xs mt-1 text-center">{errors.otp.message}</p>}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="flex-grow py-3 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-colors cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP Token'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Input New Password */}
              {step === 3 && (
                <form onSubmit={handleSubmit(onSubmitReset)} className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimum 6 characters"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.password ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('password', { 
                          required: 'New password is required',
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

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Retype password"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border focus:outline-none text-sm transition-colors ${
                          errors.confirmPassword ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-gov-blue'
                        }`}
                        {...register('confirmPassword', { 
                          required: 'Please confirm password',
                          validate: (value) => value === passwordValue || 'Passwords do not match'
                        })}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gov-red hover:bg-gov-red-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-colors cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Configuring New Password...
                      </>
                    ) : (
                      'Update Account Credentials'
                    )}
                  </button>
                </form>
              )}

              {/* Redirect Footer links */}
              <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
                <Link to="/login" className="text-gov-blue font-bold hover:underline inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to Portal Login
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
