import { Award, ShieldAlert, Heart, Calendar, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function About() {
  const steps = [
    {
      number: '01',
      title: 'Registration & Verification',
      description: 'Fill in details regarding your personal bio, contact numbers, and basic health credentials. Carry a valid photo ID.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Mini Health Assessment',
      description: 'Our medical officer checks your pulse, blood pressure, temperature, and hemoglobin level to confirm donation fitness.',
      icon: ShieldCheck,
    },
    {
      number: '03',
      title: 'The Donation Process',
      description: 'We draw about 350ml - 450ml of whole blood. The actual drawing takes roughly 8 to 10 minutes inside a clean lounge.',
      icon: Heart,
    },
    {
      number: '04',
      title: 'Post-Donation Rest',
      description: 'Rest for 10-15 minutes and enjoy light snacks (biscuits and fruit juice) to quickly restore fluid volumes.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-gov-blue-dark to-gov-blue text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10 animate-fade-in">
          <span className="text-gov-gold-light uppercase text-xs tracking-wider font-bold">Government of India Initiative</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">About RaktaSetu</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            RaktaSetu is an integrated digital platform designed to automate and standardize blood donation, stock tracking, and camp coordination nationwide.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gov-red/10 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-gov-red fill-gov-red" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Core Mission</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To eliminate blood shortages across healthcare institutions in India by leveraging real-time inventory synchronization, organizing district level blood camps, and establishing a trusted database of voluntary donors.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gov-blue/10 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-gov-blue" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Future Vision</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A country where no surgery or life-saving procedure is delayed due to blood non-availability. Through seamless digital linking, RaktaSetu envisions a zero-waste, high-efficiency ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* The Lifecycle of Donation */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-slate-900">The Donation Lifecycle</h2>
            <p className="text-slate-500">From the moment you arrive till you walk out a hero—here is what to expect.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:-translate-y-1 transition-all">
                <span className="absolute -top-6 left-6 text-5xl font-black text-gov-red/10 tracking-tight">
                  {step.number}
                </span>
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mt-2 text-gov-blue">
                  <step.icon className="w-5 h-5 text-gov-blue" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Section Left: Exclusions */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Important Exclusions</h2>
            <p className="text-slate-500 leading-relaxed">
              Donating blood is a noble act, but safety is paramount. Do not donate blood if you fit any of the following conditions:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-gov-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Temporary Exclusions (Deferral)</h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 mt-2 space-y-1">
                    <li>Recent fever, flu, throat infection, or antibiotic course (14 days deferral)</li>
                    <li>Recent tattoo, acupuncture, or ear/body piercing (6 months deferral)</li>
                    <li>Recent dental surgery or minor operations (1-3 months deferral)</li>
                    <li>Pregnancy, recent delivery or breastfeeding status (12 months deferral)</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-gov-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Permanent Exclusions</h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 mt-2 space-y-1">
                    <li>Tested positive for HIV, Hepatitis B, or Hepatitis C</li>
                    <li>Chronic health diseases such as heart issues, epilepsy, or active cancer</li>
                    <li>History of bleeding disorders or severe asthma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section Right: Inspiring Facts */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
            <span className="text-gov-gold-light text-xs font-bold uppercase tracking-wider">Fast Facts</span>
            <h3 className="text-2xl font-bold">Why Donate Blood?</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="border-l-4 border-gov-red pl-4">
                <h4 className="font-bold text-white mb-1">One Donation = Three Lives</h4>
                <p className="text-xs text-slate-400">Whole blood is separated into three components: Red Blood Cells, Plasma, and Platelets. Each can go to a different recipient.</p>
              </div>
              <div className="border-l-4 border-gov-blue-light pl-4">
                <h4 className="font-bold text-white mb-1">Naturally Refreshed Body</h4>
                <p className="text-xs text-slate-400">Donating blood stimulates the production of new red blood cells, keeping your circulatory system active and healthy.</p>
              </div>
              <div className="border-l-4 border-gov-gold pl-4">
                <h4 className="font-bold text-white mb-1">Burn Calories & Check Iron</h4>
                <p className="text-xs text-slate-400">A single donation burns about 650 calories, and helps regulate blood iron levels, lowering cardiovascular risks.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
