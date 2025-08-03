import { useGetLoggedInUser } from "../../hooks/user/useGetLoggedInUser";
import ProtectedRoute from "../../components/auth/protected-route";
import useAuthStore from "../../store/authTokenStore";

const HomePage = () => {
  const { data: user, isLoading, error } = useGetLoggedInUser();
  const { deleteToken } = useAuthStore();

  // Handle error states
  if (error) {
    console.log("HomePage: User data fetch error:", error);

    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              Failed to load user data: {error.message}
            </div>
            <button
              onClick={() => {
                deleteToken();
                window.location.href = "/login";
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Handle loading state
  if (isLoading) {
    console.log("HomePage: Loading user data...");

    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading user data...</div>
        </div>
      </ProtectedRoute>
    );
  }

  console.log("HomePage: Rendering with user data:", user?.displayName);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="text-red-900 text-2xl font-bold mb-4">HomePage</div>
        {user?.displayName ? (
          <div className="text-lg">Hello {user.displayName}!</div>
        ) : (
          <div className="text-gray-600">
            Welcome! (No display name available)
          </div>
        )}

        {/* Debug info - remove in production */}
        <div className="mt-8 p-4 bg-gray-100 rounded text-sm">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>User loaded: {user ? "Yes" : "No"}</p>
          <p>Display name: {user?.displayName || "Not available"}</p>
          <p>Loading: {isLoading ? "Yes" : "No"}</p>
          <p>Error: {error ? error.message : "None"}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
