import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRegister } from "../../hooks/auth/useRegister";
import useAuthStore from "../../store/authTokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../ui/button";

export default function RegisterForm() {
  const { t } = useTranslation();

  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const [formFields, setformFields] = useState({
    username: "",
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setformFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const {
    mutateAsync: register,
    isPending: isLoading,
    isError,
    error,
  } = useRegister();

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    };

    // Username validation - should be at least 3 characters and no spaces
    if (
      formFields.username.trim().length < 3 ||
      formFields.username.includes(" ")
    ) {
      isValid = false;
      newErrors.username = t("auth.validation.usernameInvalid");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formFields.email.trim()) {
      isValid = false;
      newErrors.email = t("auth.validation.emailRequired");
    } else if (!emailRegex.test(formFields.email)) {
      isValid = false;
      newErrors.email = t("auth.validation.emailInvalid");
    }

    // Display name validation - should be at least 3 characters
    if (formFields.displayName.trim().length < 3) {
      isValid = false;
      newErrors.displayName = t("auth.validation.displayNameInvalid");
    }

    // Password validation
    if (!formFields.password.trim()) {
      isValid = false;
      newErrors.password = t("auth.validation.passwordRequired");
    } else if (formFields.password.length < 6) {
      isValid = false;
      newErrors.password = t("auth.validation.passwordTooShort");
    }

    // Confirm password validation
    if (!formFields.confirmPassword.trim()) {
      isValid = false;
      newErrors.confirmPassword = t("auth.validation.confirmPasswordRequired");
    } else if (formFields.confirmPassword !== formFields.password) {
      isValid = false;
      newErrors.confirmPassword = t("auth.validation.passwordsDoNotMatch");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("Username", formFields.username);
    formData.append("Email", formFields.email);
    formData.append("DisplayName", formFields.displayName);
    formData.append("Password", formFields.password);

    try {
      const token = await register(formData);

      setToken(token);
      navigate("/", { replace: true });
      toast.success(t("auth.register.accountCreatedMessage"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form */}
      <div className="space-y-6">
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.register.username")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              value={formFields.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.register.usernamePlaceholder")}
            />
          </div>
          {errors.username && (
            <p className="text-red-600 my-3">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.register.email")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formFields.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.register.emailPlaceholder")}
            />
          </div>
          {errors.email && <p className="text-red-600 my-3">{errors.email}</p>}
        </div>

        {/* Display Name Field */}
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.register.displayName")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={formFields.displayName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.register.displayNamePlaceholder")}
            />
          </div>
          {errors.displayName && (
            <p className="text-red-600 my-3">{errors.displayName}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.register.password")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formFields.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.register.passwordPlaceholder")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 my-3">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.register.confirmPassword")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formFields.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.register.confirmPasswordPlaceholder")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 my-3">{errors.confirmPassword}</p>
          )}
        </div>

        {isError && <p className="text-red-600 my-3">{error?.message}</p>}

        {/* Submit Button */}
        <Button type="submit" isLoading={isLoading}>
          <div className="flex items-center">
            {t("auth.register.createAccount")}
            {!isLoading && (
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            )}
          </div>
        </Button>
      </div>
    </form>
  );
}
