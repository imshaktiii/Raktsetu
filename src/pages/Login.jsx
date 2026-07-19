import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, KeyRound, Smartphone, Mail, ShieldCheck, Landmark } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('donor'); // donor, bank, organizer
  const [loginMethod, setLoginMethod] = useState('password'); // password, otp
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      alert('Demo OTP sent! Use verification code "123456" to log in.');
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock Login
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100">
        
        {/* Left Column: Portal Information (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-gov-blue-dark via-gov-blue to-gov-blue-light text-white p-8 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gov-red/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight">Rakta<span className="text-gov-red">Setu</span></span>
            </Link>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-tight">Unified National Portal Login</h2>
              <p className="text-xs text-slate-300">
                Access your secure portal to manage donation history, blood stock directories, or schedule camps.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-gov-gold-light shrink-0" />
                <p className="text-slate-300 leading-normal">
                  <span className="font-bold text-white block">Secured Connection</span>
                  256-bit encryption compliant with digital healthcare guidelines.
                </p>
              </div>
              <div className="flex gap-3">
                <Landmark className="w-5 h-5 text-gov-gold-light shrink-0" />
                <p className="text-slate-300 leading-normal">
                  <span className="font-bold text-white block">Government Authenticated</span>
                  Linked with National Health Authority registries.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 mt-8">
            © Ministry of Health & Family Welfare. For official assistance call helpline at 1097.
          </div>
        </div>

        {/* Right Column: Interactive Login Form (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          {success ? (
            <div className="text-center space-y-3 py-12 animate-pulse-soft">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Authentication Successful</h3>
              <p className="text-sm text-slate-500">Redirecting to your dashboard workspace...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Role Select Tabs */}
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Portal Role</span>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  {['donor', 'bank', 'organizer'].map((r) => (
                    <button
                      key={r}
                      onClick={() => { setRole(r); setOtpSent(false); }}
                      className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
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

              {/* Login Method Toggle */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg capitalize">{role} Authentication</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLoginMethod('password')}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border transition-all ${
                      loginMethod === 'password' 
                        ? 'border-gov-blue bg-gov-blue text-white' 
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Password
                  </button>
                  <button
                    onClick={() => setLoginMethod('otp')}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border transition-all ${
                      loginMethod === 'otp' 
                        ? 'border-gov-blue bg-gov-blue text-white' 
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Mobile OTP
                  </button>
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {loginMethod === 'password' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Registered Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. name@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-600 uppercase">Password</label>
                        <span className="text-[10px] text-gov-blue hover:underline cursor-pointer">Forgot Password?</span>
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Aadhaar Linked Mobile</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Smartphone className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                          <input
                            type="tel"
                            required
                            maxLength="10"
                            placeholder="Enter 10-digit mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                            disabled={otpSent}
                          />
                        </div>
                        {!otpSent && (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                          >
                            Send OTP
                          </button>
                        )}
                      </div>
                    </div>

                    {otpSent && (
                      <div className="animate-fade-in space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-bold text-slate-600 uppercase">Verification OTP</label>
                          <span 
                            onClick={() => setOtpSent(false)} 
                            className="text-[10px] text-gov-red hover:underline cursor-pointer"
                          >
                            Change Number
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          maxLength="6"
                          placeholder="Enter 6-digit OTP code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm text-center tracking-widest font-bold"
                        />
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading || (loginMethod === 'otp' && !otpSent)}
                  className={`w-full py-3 text-white rounded-xl text-sm font-semibold transition-all mt-6 ${
                    loading 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : (loginMethod === 'otp' && !otpSent) 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-gov-blue hover:bg-gov-blue-dark shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? 'Authenticating Credentials...' : 'Authenticate'}
                </button>
              </form>

              {/* Redirection link */}
              <div className="text-center text-xs text-slate-500 pt-2">
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
