import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Lock, ArrowRight, CheckCircle } from "lucide-react";
// import { useChangePassword } from "../../hooks/auth/useChangePassword"; // Uncomment when hook is available

export default function ChangePasswordForm() {
  const { t } = useTranslation();

  const [formFields, setFormFields] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  // Mock hook for demonstration - replace with actual hook when available
  const changePassword = {
    mutateAsync: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Change password request:", data);
      setIsSuccess(true);
    },
    isLoading: false,
    isError: false,
    error: null,
  };

  // const { mutateAsync: changePassword, isLoading, isError, error } = useChangePassword(); // Use this when hook is available

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      newPassword: "",
      confirmNewPassword: "",
    };

    // New password validation
    if (!formFields.newPassword.trim()) {
      isValid = false;
      newErrors.newPassword = t("auth.validation.newPasswordRequired");
    } else if (formFields.newPassword.length < 6) {
      isValid = false;
      newErrors.newPassword = t("auth.validation.passwordTooShort");
    }

    // Confirm new password validation
    if (!formFields.confirmNewPassword.trim()) {
      isValid = false;
      newErrors.confirmNewPassword = t(
        "auth.validation.confirmNewPasswordRequired"
      );
    } else if (formFields.confirmNewPassword !== formFields.newPassword) {
      isValid = false;
      newErrors.confirmNewPassword = t(
        "auth.validation.newPasswordsDoNotMatch"
      );
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      await changePassword.mutateAsync({
        newPassword: formFields.newPassword,
        confirmNewPassword: formFields.confirmNewPassword,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {t("auth.changePassword.passwordUpdated")}
          </h3>
          <p className="text-gray-400 text-sm">
            Your password has been successfully updated
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* New Password Field */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.changePassword.newPassword")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formFields.newPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t("auth.changePassword.newPasswordPlaceholder")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-600 my-3">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {t("auth.changePassword.confirmNewPassword")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type={showConfirmNewPassword ? "text" : "password"}
              value={formFields.confirmNewPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={t(
                "auth.changePassword.confirmNewPasswordPlaceholder"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-600 my-3">{errors.confirmNewPassword}</p>
          )}
        </div>

        {changePassword.isError && (
          <p className="text-red-600 my-3">{changePassword.error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={changePassword.isLoading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
          style={{
            backgroundColor: changePassword.isLoading ? "#4F46E5" : "#2563EB",
          }}
        >
          {changePassword.isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t("auth.changePassword.updatingPassword")}
            </div>
          ) : (
            <div className="flex items-center">
              {t("auth.changePassword.updatePassword")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
