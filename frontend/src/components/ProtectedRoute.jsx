import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="route-loading">
        <div className="route-loading-spinner" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;