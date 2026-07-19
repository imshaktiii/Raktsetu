import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Award, ShieldCheck, Heart, User, MapPin, ClipboardList, Check } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'A+',
    weight: '',
    state: 'Delhi',
    district: 'New Delhi',
    // Medical checklist
    tattoo: 'No',
    surgery: 'No',
    diseases: 'No',
    donationInterval: 'Yes',
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.age || !formData.weight) {
      alert('Please fill in all details before proceeding.');
      return;
    }
    if (parseInt(formData.age) < 18 || parseInt(formData.age) > 65) {
      alert('Donor must be between 18 and 65 years of age.');
      return;
    }
    if (parseInt(formData.weight) < 45) {
      alert('Donor must weigh at least 45 kg.');
      return;
    }
    setStep(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100">
        
        {/* Left Column: Benefits Panel (4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-br from-gov-red-dark via-gov-red to-red-500 text-white p-8 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <span className="font-extrabold text-lg tracking-tight">Rakta<span className="text-white/80">Setu</span></span>
            <div className="space-y-2">
              <h2 className="text-xl font-bold leading-tight">Become a Voluntary Donor</h2>
              <p className="text-xs text-red-100">
                Join our nationwide network and make a difference. Your minor contribution holds life-saving powers.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-gov-gold-light shrink-0" />
                <p className="text-red-100 leading-normal">
                  <span className="font-bold text-white block">One Bag Saves 3 Lives</span>
                  Whole blood is separated into red cells, plasma, and platelets.
                </p>
              </div>
              <div className="flex gap-3">
                <Award className="w-5 h-5 text-gov-gold-light shrink-0" />
                <p className="text-red-100 leading-normal">
                  <span className="font-bold text-white block">Digital Donor Card</span>
                  Receive a unique portal donor pass showing your donation logs.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-red-200 mt-8">
            Integrated with NHM registry services. Voluntary, non-paid donation regulations apply.
          </div>
        </div>

        {/* Right Column: Progress Form (8 cols) */}
        <div className="md:col-span-8 p-8 sm:p-10 flex flex-col justify-center">
          {success ? (
            <div className="text-center space-y-3 py-12 animate-pulse-soft">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Donor Account Registered!</h3>
              <p className="text-sm text-slate-500">Your profile is active. Redirecting to Portal Login...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Form Step Headers */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    step === 1 ? 'bg-gov-blue text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {step === 1 ? '1' : <Check className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-xs font-bold text-slate-800">Personal Info</span>
                </div>
                <div className="h-0.5 w-10 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    step === 2 ? 'bg-gov-blue text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    2
                  </span>
                  <span className="text-xs font-bold text-slate-500">Medical Survey</span>
                </div>
              </div>

              {step === 1 ? (
                /* STEP 1: Personal Info */
                <form onSubmit={handleNextStep} className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                    <User className="w-4 h-4 text-gov-blue" />
                    Step 1: Contact & Credentials
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="As in government identification card"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email ID</label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        maxLength="10"
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Age</label>
                      <input
                        type="number"
                        required
                        min="18"
                        max="65"
                        placeholder="e.g. 24"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        required
                        min="40"
                        placeholder="e.g. 68"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Blood Group</label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm font-semibold bg-white"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg, idx) => (
                          <option key={idx} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">District</label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-gov-blue text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gov-blue hover:bg-gov-blue-dark text-white font-semibold rounded-xl text-sm transition-colors shadow-md mt-6"
                  >
                    Proceed to Health Survey
                  </button>
                </form>
              ) : (
                /* STEP 2: Medical survey declarations */
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-gov-blue" />
                    Step 2: Medical Self-Declaration
                  </h3>

                  <div className="space-y-3.5">
                    {/* Q1 */}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-xs text-slate-600 leading-normal">
                        1. Have you gotten a tattoo, body piercing, or acupuncture in the past 6 months?
                      </span>
                      <div className="flex gap-2">
                        {['Yes', 'No'].map((ans) => (
                          <button
                            key={ans}
                            type="button"
                            onClick={() => setFormData({ ...formData, tattoo: ans })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                              formData.tattoo === ans 
                                ? 'border-gov-red bg-gov-red text-white' 
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2 */}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-xs text-slate-600 leading-normal">
                        2. Have you undergone minor dental surgery or a surgical operation recently?
                      </span>
                      <div className="flex gap-2">
                        {['Yes', 'No'].map((ans) => (
                          <button
                            key={ans}
                            type="button"
                            onClick={() => setFormData({ ...formData, surgery: ans })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                              formData.surgery === ans 
                                ? 'border-gov-red bg-gov-red text-white' 
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q3 */}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-xs text-slate-600 leading-normal">
                        3. Do you experience diabetes, blood pressure issues, or cardiac conditions?
                      </span>
                      <div className="flex gap-2">
                        {['Yes', 'No'].map((ans) => (
                          <button
                            key={ans}
                            type="button"
                            onClick={() => setFormData({ ...formData, diseases: ans })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                              formData.diseases === ans 
                                ? 'border-gov-red bg-gov-red text-white' 
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q4 */}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-xs text-slate-600 leading-normal">
                        4. Has it been at least 3 months (90 days) since your last whole blood donation?
                      </span>
                      <div className="flex gap-2">
                        {['Yes', 'No'].map((ans) => (
                          <button
                            key={ans}
                            type="button"
                            onClick={() => setFormData({ ...formData, donationInterval: ans })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                              formData.donationInterval === ans 
                                ? 'border-gov-blue bg-gov-blue text-white' 
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex gap-2.5 items-start">
                    <ShieldAlert className="w-4 h-4 text-gov-gold shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-600 leading-tight">
                      Note: False declarations may lead to slot cancellation during on-site clinical screening. Your health data is confidential.
                    </p>
                  </div>

                  {/* Buttons navigation */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 py-3 text-white text-xs font-semibold rounded-xl transition-colors ${
                        loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gov-red hover:bg-gov-red-dark shadow-md'
                      }`}
                    >
                      {loading ? 'Submitting Registry Form...' : 'Complete Registration'}
                    </button>
                  </div>
                </form>
              )}

              {/* Redirect footer */}
              <div className="text-center text-xs text-slate-500 pt-2">
                Already registered?{' '}
                <Link to="/login" className="text-gov-blue font-bold hover:underline">
                  Log in here
                </Link>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
