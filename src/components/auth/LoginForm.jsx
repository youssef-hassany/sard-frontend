import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useLogin } from "../../hooks/auth/useLogin";

export default function LoginForm() {
  const { t } = useTranslation();

  const [formFields, setformFields] = useState({
    loginCardinality: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    loginCardinality: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setformFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync: login, isLoading, isError, error } = useLogin();

  const validateFields = () => {
    let isValid = true;

    if (!formFields.loginCardinality.trim()) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        loginCardinality: t("auth.validation.fieldRequired"),
      }));
    }

    if (!formFields.password.trim()) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        password: t("auth.validation.fieldRequired"),
      }));
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setErrors({
      loginCardinality: "",
      password: "",
    });

    try {
      await login(formFields);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form */}
      <div className="space-y-6">
        {/* loginCardinality Field */}
        <div>
          <label
            htmlFor="loginCardinality"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.login.emailOrUsername")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="loginCardinality"
              name="loginCardinality"
              type="loginCardinality"
              value={formFields.loginCardinality}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.login.emailOrUsernamePlaceholder")}
            />
          </div>

          {errors.loginCardinality && (
            <p className="text-red-600 my-3">{errors.loginCardinality}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.login.password")}
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
              placeholder={t("auth.login.passwordPlaceholder")}
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {t("auth.login.forgotPassword")}
          </button>
        </div>

        {isError && <p className="text-red-600 my-3">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
          style={{ backgroundColor: isLoading ? "#4F46E5" : "#2563EB" }}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t("auth.login.signingIn")}
            </div>
          ) : (
            <div className="flex items-center">
              {t("auth.login.signIn")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
