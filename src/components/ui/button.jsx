import { Loader } from "lucide-react";

const Button = ({ isLoading, onClick, type = "button", children }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
      style={{ backgroundColor: isLoading ? "#4F46E5" : "#2563EB" }}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader className="animate-spin h-4 w-4 mr-2" />
          {children}
        </div>
      ) : (
        <div className="flex items-center">{children}</div>
      )}
    </button>
  );
};

export default Button;
