
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const customerToken = localStorage.getItem("customerToken");
  const customerUser = localStorage.getItem("customerUser");

  if (!customerToken || !customerUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
