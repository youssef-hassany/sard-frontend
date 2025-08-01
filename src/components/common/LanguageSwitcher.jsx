import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "en" },
    { code: "ar", name: "العربية", flag: "ar" },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("language", languageCode);
    document.dir = languageCode === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm">
          {languages.find((lang) => lang.code === i18n.language)?.flag || "🌐"}
        </span>
      </button>

      <div
        className={`absolute top-full ${
          document.dir === "ltr" ? "left-0" : "right-0"
        } mt-1 w-32 bg-gray-800 border border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
      >
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2 ${
              i18n.language === language.code
                ? "text-blue-400 bg-gray-700"
                : "text-gray-300"
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
