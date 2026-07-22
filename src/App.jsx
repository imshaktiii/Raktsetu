import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import BloodCamps from './pages/BloodCamps';
import BloodBanks from './pages/BloodBanks';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import BloodBankDashboard from './pages/BloodBankDashboard';
import Admin from './pages/Admin';
import SearchBlood from './pages/SearchBlood';
import EmergencyRequest from './pages/EmergencyRequest';
import UserProfile from './pages/UserProfile';
import NotificationCenter from './pages/NotificationCenter';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SearchDonor from './pages/SearchDonor';
import BloodRequests from './pages/BloodRequests';
import Certificate from './pages/Certificate';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
          {/* Navigation Bar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/camps" element={<BloodCamps />} />
              <Route path="/banks" element={<BloodBanks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/hospital-dashboard" element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <HospitalDashboard />
                </ProtectedRoute>
              } />
              <Route path="/bank-dashboard" element={
                <ProtectedRoute allowedRoles={['bank']}>
                  <BloodBankDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/search-blood" element={<SearchBlood />} />
              <Route path="/search-donor" element={<SearchDonor />} />
              <Route path="/blood-requests" element={<BloodRequests />} />
              <Route path="/emergency-request" element={<EmergencyRequest />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotificationCenter />
                </ProtectedRoute>
              } />
              <Route path="/certificate/:donorId" element={
                <ProtectedRoute>
                  <Certificate />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
