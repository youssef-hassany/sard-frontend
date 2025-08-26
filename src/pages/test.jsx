import React from "react";
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Card from "../components/common/Card";

const Test = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-red-600 bg-blue-800 text-2xl md:text-4xl lg:text-5xl">
        {t("testPage.test")}
      </div>
      <div>{t("auth.login.signIn")}</div>
      <LanguageSwitcher />

      {/* card */}
      <Card text={"card one"} />
      <Card text={"card two"} />
      <Card text={"carddddd"} />
      <Card text={"hello"} />
    </div>
  );
};

export default Test;
