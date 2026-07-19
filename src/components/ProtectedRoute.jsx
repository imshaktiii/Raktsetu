import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show secure authorization loader while session check is in progress
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4 text-xs font-semibold text-slate-500">
        <Loader2 className="w-8 h-8 text-gov-blue animate-spin" />
        <p>Verifying secure session certificates...</p>
      </div>
    );
  }

  // Redirect to login if user session is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role validation check (e.g. hospital, bank, admin, donor)
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role?.toLowerCase())) {
    console.warn(`Access denied. Role "${user?.role}" is unauthorized to view this resource.`);
    return <Navigate to="/" replace />;
  }

  return children;
}
