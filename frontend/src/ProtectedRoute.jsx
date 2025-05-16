import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Not logged in — redirect to login
    return <Navigate to="/students/login" replace />;
  }
  // Logged in — show protected content
  return children;
}
export default ProtectedRoute;
