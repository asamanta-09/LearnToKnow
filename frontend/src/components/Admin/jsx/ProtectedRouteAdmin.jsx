import { Navigate } from 'react-router-dom';

function ProtectedRouteAdmin({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admins/login" replace />;
  }
  return children;
}
export default ProtectedRouteAdmin;
