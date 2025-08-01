import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/common/LanguageSwitcher";

const Test = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>Test</div>
      <div>{t("auth.login.signIn")}</div>
      <LanguageSwitcher />
    </div>
  );
};

export default Test;
