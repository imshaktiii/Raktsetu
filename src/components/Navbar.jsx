import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Heart, ShieldAlert, Award } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        isScrolled === false && setIsScrolled(true);
      } else {
        isScrolled === true && setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Blood Camps', path: '/camps' },
    { name: 'Blood Banks', path: '/banks' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Government Banner */}
      <div className="bg-gov-blue text-white text-xs py-2 px-4 sm:px-6 flex flex-wrap justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-gov-gold animate-pulse"></span>
            Ministry of Health & Family Welfare
          </span>
          <span className="hidden md:inline text-white/60">|</span>
          <span className="hidden md:inline font-light">Official National Blood Portal</span>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0 font-medium">
          <a href="tel:1097" className="flex items-center gap-1 text-gov-gold-light hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
            National Helpline: 1097
          </a>
          <a href="tel:104" className="flex items-center gap-1 text-gov-gold-light hover:text-white transition-colors">
            Helpline: 104
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gov-red/10 rounded-xl group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 text-gov-red fill-gov-red" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gov-blue border-2 border-white rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gov-blue flex items-center gap-1">
                  Rakta<span className="text-gov-red">Setu</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold leading-none">
                  A Life-Saving Connect
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-gov-red bg-gov-red/5 font-semibold'
                      : 'text-slate-600 hover:text-gov-blue hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gov-blue hover:text-gov-blue-light transition-colors"
              >
                Portal Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gov-red-dark text-white text-sm font-semibold hover:bg-gov-red-darker transition-all duration-200 shadow-sm shadow-gov-red-dark/20 hover:shadow-md hover:shadow-gov-red-dark/30 transform hover:-translate-y-0.5"
              >
                Become a Donor
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-lg bg-gov-red-dark text-white text-xs font-semibold hover:bg-gov-red-darker"
              >
                Register
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`md:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} onClick={() => setIsOpen(false)}>
          <div 
            className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gov-red fill-gov-red" />
                  <span className="font-bold text-lg text-gov-blue">RaktaSetu</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isActive(link.path)
                        ? 'text-gov-red bg-gov-red/5 font-semibold'
                        : 'text-slate-600 hover:text-gov-blue hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-100 pt-6 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Portal Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-gov-red-dark text-white font-semibold hover:bg-gov-red-darker shadow-sm"
              >
                Become a Donor
              </Link>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-gov-blue shrink-0" />
                <div className="text-[11px] text-slate-500">
                  <p className="font-semibold text-slate-700">Official Government Service</p>
                  Secure login & verified donor profiles.
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
