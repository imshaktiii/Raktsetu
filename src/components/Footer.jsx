import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, ExternalLink, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-gov-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Government Initiative */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gov-red/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-gov-red fill-gov-red" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Rakta<span className="text-gov-red">Setu</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An official digital initiative to coordinate blood donor networks, camps, and availability directories across the nation. Connecting donors and seekers in real-time.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <Shield className="w-5 h-5 text-gov-gold-light shrink-0" />
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-white block">Secured Platform</span>
                Encryption protected donor health data.
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gov-red pl-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-all">Home Portal</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-all">About Initiative</Link>
              </li>
              <li>
                <Link to="/camps" className="hover:text-white hover:underline transition-all">Upcoming Camps</Link>
              </li>
              <li>
                <Link to="/banks" className="hover:text-white hover:underline transition-all">Live Blood Stock</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-all">Help Desk & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Guidelines */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gov-blue-light pl-2">
              Resources & Info
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register" className="hover:text-white hover:underline transition-all">Donor Registration</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white hover:underline transition-all">Camp Organizer Portal</Link>
              </li>
              <li>
                <a href="https://nhp.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-all">
                  National Health Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-all">
                  MoHFW Website <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.redcross.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-all">
                  Red Cross Society <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gov-gold pl-2">
              National Center
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gov-red shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-normal">
                  RaktaSetu Central Division,<br />
                  Ministry of Health & Family Welfare,<br />
                  New Delhi - 110011, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gov-blue-light shrink-0" />
                <div className="text-slate-400">
                  <span className="block text-white font-medium">1097 (Toll-Free Helpline)</span>
                  <span className="text-xs">Available 24x7 support</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gov-gold-light shrink-0" />
                <a href="mailto:support-raktsetu@gov.in" className="hover:text-white transition-colors">
                  support-raktsetu@gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p>© {currentYear} RaktaSetu Portal, Ministry of Health & Family Welfare. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-600">
              Disclaimer: This is a demo portal for blood availability visualization and donor engagement.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="text-slate-700">|</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="text-slate-700">|</span>
            <span className="hover:text-slate-400 cursor-pointer">Hyperlink Policy</span>
            <span className="text-slate-700">|</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
