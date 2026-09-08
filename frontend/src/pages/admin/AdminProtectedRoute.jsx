
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  const storedAdminUser = localStorage.getItem("adminUser");

  const adminUser = storedAdminUser
    ? JSON.parse(storedAdminUser)
    : null;

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!adminUser || adminUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;

