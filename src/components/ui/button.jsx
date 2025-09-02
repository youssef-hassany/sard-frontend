import { Loader2 } from "lucide-react";

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onClick,
  type = "button",
  children,
  className = "",
  ...props
}) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:cursor-not-allowed cursor-pointer";

  // Variant styles
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border border-transparent disabled:bg-blue-300",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white border border-transparent disabled:bg-gray-300",
    outline:
      "bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 hover:border-blue-700 disabled:text-blue-300 disabled:border-blue-300 disabled:hover:bg-transparent",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent disabled:text-gray-300 disabled:hover:bg-transparent",
    destructive:
      "bg-red-600 hover:bg-red-700 text-white border border-transparent disabled:bg-red-300",
    destructiveOutline:
      "bg-transparent hover:bg-red-50 text-red-600 border border-red-600 hover:border-red-700 disabled:text-red-300 disabled:border-red-300 disabled:hover:bg-transparent",
    success:
      "bg-green-600 hover:bg-green-700 text-white border border-transparent disabled:bg-green-300",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white border border-transparent disabled:bg-yellow-300",
    link: "bg-transparent hover:underline text-blue-600 border border-transparent p-0 h-auto disabled:text-blue-300 disabled:no-underline",
  };

  // Size styles
  const sizes = {
    xs: "px-2.5 py-1.5 text-xs rounded",
    sm: "px-3 py-2 text-sm rounded-md",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <Loader2
          className={`animate-spin mr-2 ${
            size === "xs"
              ? "h-3 w-3"
              : size === "sm"
              ? "h-3 w-3"
              : size === "md"
              ? "h-4 w-4"
              : size === "lg"
              ? "h-5 w-5"
              : "h-6 w-6"
          }`}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
