import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authTokenStore";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("ProtectedRoute: Starting auth check");

    // Check authentication status
    const authResult = checkAuth();
    console.log("ProtectedRoute: Auth check result:", authResult);

    if (!authResult) {
      console.log("ProtectedRoute: No valid token, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }

    console.log("ProtectedRoute: User is authenticated");
    setIsChecking(false);
  }, [navigate, checkAuth]);

  // Show loading state while checking authentication
  if (isChecking) {
    console.log("ProtectedRoute: Still checking authentication...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Checking authentication...</div>
      </div>
    );
  }

  // Only render children if authenticated and not checking
  if (!isAuthenticated) {
    console.log("ProtectedRoute: Not authenticated, showing nothing");
    return null;
  }

  console.log("ProtectedRoute: Rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
