import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Calendar, Search, ShieldCheck, Award, Info, Users, 
  MapPin, CheckCircle2, ChevronDown, MessageSquare, ArrowRight, Activity 
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('age');
  const [faqOpen, setFaqOpen] = useState(null);

  const stats = [
    { label: 'Active Registered Donors', count: '45,820+', icon: Users, color: 'text-gov-blue bg-gov-blue/5' },
    { label: 'Blood Bags Collected', count: '128,450+', icon: Heart, color: 'text-gov-red bg-gov-red/5' },
    { label: 'Partner Blood Banks', count: '1,420+', icon: Activity, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Successful Camps Organised', count: '8,960+', icon: Calendar, color: 'text-gov-gold bg-gov-gold/5' },
  ];

  const services = [
    {
      title: 'Find Live Blood Stock',
      description: 'Search and check blood type availability in real-time in government and private blood banks nearby.',
      icon: Search,
      link: '/banks',
      actionText: 'Search Stock',
      color: 'border-gov-blue/20 hover:border-gov-blue hover:shadow-gov-blue/5',
      iconColor: 'text-gov-blue bg-gov-blue/5',
    },
    {
      title: 'Locate Upcoming Camps',
      description: 'Find official blood donation camps scheduled in your district and register to secure a donation slot.',
      icon: Calendar,
      link: '/camps',
      actionText: 'Locate Camps',
      color: 'border-gov-red/20 hover:border-gov-red hover:shadow-gov-red/5',
      iconColor: 'text-gov-red bg-gov-red/5',
    },
    {
      title: 'Register as a Donor',
      description: 'Join the national network of life-savers. Provide blood group information and receive call alerts for emergencies.',
      icon: ShieldCheck,
      link: '/register',
      actionText: 'Register Now',
      color: 'border-gov-gold/20 hover:border-gov-gold hover:shadow-gov-gold/5',
      iconColor: 'text-gov-gold bg-gov-gold/5',
    },
  ];

  const upcomingCamps = [
    {
      id: 1,
      title: 'Mega Civil Lines Blood Camp',
      date: 'July 24, 2026',
      time: '09:00 AM - 04:00 PM',
      location: 'District Red Cross Hall, Civil Lines',
      district: 'Central Delhi',
      organizer: 'Red Cross Society & MoHFW',
    },
    {
      id: 2,
      title: 'Government College Donation Drive',
      date: 'July 28, 2026',
      time: '10:00 AM - 03:00 PM',
      location: 'Main Auditorium, Sector 15',
      district: 'Chandigarh',
      organizer: 'Youth Red Cross & PGIMER',
    },
    {
      id: 3,
      title: 'Metro Station Blood Drive',
      date: 'August 02, 2026',
      time: '08:00 AM - 01:00 PM',
      location: 'Rajiv Chowk Metro Station Concourse',
      district: 'New Delhi',
      organizer: 'Delhi Metro Rail Corp & AIIMS',
    },
  ];

  const eligibilityRules = {
    age: 'Individuals between 18 and 65 years of age are eligible to donate blood.',
    weight: 'Donors must weigh at least 45 kg (99 lbs) to donate whole blood safely.',
    health: 'Must be free from active infections, fever, cold, or chronic diseases. No tattoos, piercings, or minor surgeries in the past 6 months.',
    interval: 'Males can donate blood once every 3 months (90 days). Females can donate once every 4 months (120 days).',
  };

  const compatibilityMatrix = [
    { type: 'O-', canGiveTo: 'All Types (Universal Donor)', canReceiveFrom: 'O-' },
    { type: 'O+', canGiveTo: 'O+, A+, B+, AB+', canReceiveFrom: 'O-, O+' },
    { type: 'A-', canGiveTo: 'A-, A+, AB-, AB+', canReceiveFrom: 'O-, A-' },
    { type: 'A+', canGiveTo: 'A+, AB+', canReceiveFrom: 'O-, O+, A-, A+' },
    { type: 'B-', canGiveTo: 'B-, B+, AB-, AB+', canReceiveFrom: 'O-, B-' },
    { type: 'B+', canGiveTo: 'B+, AB+', canReceiveFrom: 'O-, O+, B-, B+' },
    { type: 'AB-', canGiveTo: 'AB-, AB+', canReceiveFrom: 'O-, A-, B-, AB-' },
    { type: 'AB+', canGiveTo: 'AB+ Only', canReceiveFrom: 'All Types (Universal Recipient)' },
  ];

  const testimonials = [
    {
      quote: "In a medical emergency for my father's surgery, we found O- negative blood within 1 hour through RaktaSetu's directory. It was a lifesaver.",
      author: "Priya Sharma",
      role: "Daughter of Recipient, Jaipur",
    },
    {
      quote: "I have registered as a donor, and the system notified me of a camp just 2 km from my home. The process was sterile, digital, and extremely quick.",
      author: "Rahul Verma",
      role: "Regular Donor, Lucknow",
    },
  ];

  const faqs = [
    {
      q: "Is blood donation safe?",
      a: "Yes, absolutely. Blood donation is conducted using sterile, single-use, disposable equipment. You cannot contract any disease by donating blood.",
    },
    {
      q: "How long does the donation process take?",
      a: "The actual blood withdrawal takes only 8-10 minutes. However, the entire registration, medical check-up, donation, and rest/refreshment period takes about 35-45 minutes total.",
    },
    {
      q: "What should I eat or drink before donating blood?",
      a: "Eat a regular meal and drink plenty of fluids (water, juice) 3-4 hours prior to donation. Avoid alcohol for 24 hours before donating and caffeine right before.",
    },
    {
      q: "Will I feel weak after donating blood?",
      a: "Most donors feel completely normal immediately. We provide light snacks and juice post-donation to replenish sugar levels. You should avoid heavy lifting or strenuous exercise for the rest of the day.",
    },
  ];

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-red-50/20 to-blue-50/20 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Details */}
        <div className="absolute top-1/4 -right-16 w-80 h-80 bg-gov-red/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -left-16 w-80 h-80 bg-gov-blue/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gov-blue/10 text-gov-blue text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-gov-gold-light" />
              Integrated National Digital Network
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              One Bridge of Blood.<br />
              <span className="text-gov-red">A Million Saved Lives.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to **RaktaSetu**, the unified portal for the Ministry of Health. We link willing blood donors with nearby clinical centers, active camps, and real-time bank reserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-xl bg-gov-red text-white font-semibold hover:bg-gov-red-dark transition-all shadow-lg shadow-gov-red/20 text-center hover:scale-102"
              >
                Register as Donor
              </Link>
              <Link
                to="/banks"
                className="px-8 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold hover:bg-slate-50 transition-all text-center hover:scale-102"
              >
                Check Stock Status
              </Link>
            </div>
            {/* Direct Support Notice */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 pt-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Centralized Database Online (Govt. Compliance Secured)</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 overflow-hidden animate-float">
              {/* Header inside mockup card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Urgent Request Board</h3>
                  <p className="text-xs text-slate-500">Live feed across Delhi NCR</p>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-red-100 text-gov-red">
                  Critical Stock
                </span>
              </div>

              {/* Feed items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">AIIMS Hospital</span>
                    <h4 className="text-sm font-bold text-slate-800">Requires O Negative</h4>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-gov-red/10 text-gov-red flex items-center justify-center font-bold text-sm">
                    O-
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Safdarjung Hospital</span>
                    <h4 className="text-sm font-bold text-slate-800">Requires AB Negative</h4>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-gov-red/10 text-gov-red flex items-center justify-center font-bold text-sm">
                    AB-
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Fortis Healthcare</span>
                    <h4 className="text-sm font-bold text-slate-800">Requires B Negative</h4>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-gov-red/10 text-gov-red flex items-center justify-center font-bold text-sm">
                    B-
                  </span>
                </div>
              </div>

              {/* Action */}
              <Link 
                to="/banks"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gov-blue hover:bg-gov-blue-dark text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Respond to Requests
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Dashboard Ticker */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">{stat.count}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            Our Centralized Services
          </h2>
          <p className="text-slate-500">
            Convenient, fast, and digitally tracked services for blood donors and emergency seekers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div 
              key={i} 
              className={`p-8 bg-white border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${svc.color}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${svc.iconColor}`}>
                <svc.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{svc.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{svc.description}</p>
              <Link
                to={svc.link}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-gov-blue hover:text-gov-red transition-colors"
              >
                {svc.actionText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Upcoming Blood Camps Section */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                Active Donation Camps
              </h2>
              <p className="text-slate-500">
                Join scheduled drives near you. Pre-registration ensures quick processing.
              </p>
            </div>
            <Link
              to="/camps"
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
            >
              View All Schedules
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingCamps.map((camp) => (
              <div key={camp.id} className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-gov-blue/5 text-gov-blue font-semibold text-xs">
                      {camp.district}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Verified Camp</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-snug">{camp.title}</h3>
                  <div className="space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{camp.date} | {camp.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{camp.location}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">By {camp.organizer}</span>
                  <Link
                    to="/camps"
                    className="px-4 py-2 bg-gov-red/10 text-gov-red font-semibold text-xs rounded-lg hover:bg-gov-red hover:text-white transition-all"
                  >
                    Register Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Eligibility Information & Compatibility Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Eligibility Rules (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
              Are you eligible to donate?
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Before heading to a camp or center, ensure you satisfy the core medical criteria defined by the National Blood Transfusion Council.
            </p>

            {/* Eligibility Tabs Header */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              {Object.keys(eligibilityRules).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                    activeTab === tab 
                      ? 'bg-gov-blue text-white shadow-sm' 
                      : 'text-slate-500 hover:text-gov-blue hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Eligibility Tab Content */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
              <Info className="w-6 h-6 text-gov-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 capitalize mb-1">{activeTab} Requirement</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{eligibilityRules[activeTab]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Donor card issued after each session</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Complimentary basic health check-up</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Certified medical staff oversight</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Free health report access</span>
              </div>
            </div>
          </div>

          {/* Blood Compatibility Chart (5 columns) */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-slate-800 text-lg mb-1">Blood Compatibility Matrix</h3>
            <p className="text-xs text-slate-400 mb-6">Understand recipient matching profiles.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 uppercase font-semibold">
                    <th className="py-2.5 px-3">Blood Type</th>
                    <th className="py-2.5 px-3">Can Donate To</th>
                    <th className="py-2.5 px-3">Can Receive From</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {compatibilityMatrix.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold text-gov-red">{item.type}</td>
                      <td className="py-2.5 px-3 font-medium">{item.canGiveTo}</td>
                      <td className="py-2.5 px-3 font-medium">{item.canReceiveFrom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-gov-gold-light uppercase text-xs tracking-wider font-bold">Inspirational Journeys</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Lives Transformed, Bridges Built</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-2xl text-left space-y-6 flex flex-col justify-between">
                <div className="relative">
                  <MessageSquare className="w-8 h-8 text-slate-700 absolute -top-4 -left-2" />
                  <p className="text-slate-300 italic relative z-10 leading-relaxed text-sm">
                    "{t.quote}"
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t.author}</h4>
                  <p className="text-xs text-gov-gold-light">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-500">Find quick responses to standard safety and medical concerns.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-gov-blue' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-60 border-t border-slate-100' : 'max-h-0'
                }`}>
                  <p className="p-5 text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
