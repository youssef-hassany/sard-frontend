import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RegisterForm from "../../components/auth/RegisterForm";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#2C2C2C" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl shadow-2xl p-8 border border-gray-700"
          style={{ backgroundColor: "#3C3C3C" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {t("auth.register.title")}
            </h2>
            <p className="text-gray-400">{t("auth.register.subtitle")}</p>
          </div>

          {/* Form */}
          <RegisterForm />

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2 text-gray-400"
                  style={{ backgroundColor: "#3C3C3C" }}
                >
                  {t("auth.register.orContinueWith")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <GoogleAuthButton />
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            {t("auth.register.haveAccount")}{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              {t("auth.register.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
