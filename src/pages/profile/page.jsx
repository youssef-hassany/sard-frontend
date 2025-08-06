import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AboutMe from "../../components/profile/AboutMe";
import MyNovels from "../../components/profile/MyNovels";
import Library from "../../components/profile/Library";
import BadgesList from "../../components/profile/BadgesList";

const ProfilePage = () => {
  const { t } = useTranslation();

  const [selectedSubPage, setSelectedSubPage] = useState("about-me");

  /* 
        in order to change the text written in the buttons that navigates between sections you have to use the t function in this array
        for example, if you want to translate the (About Me) text and you already changed the translation.json files to handle it
        then you will have to vome to this array, choose the (title) property and use the t function in it
        so if you added the text in translation.json in a variable called (aboutMe), then You have to make a change similar to this:-
        before: title: "About Me"
        after: title: t("aboutMe")
    */
  const subPages = [
    { title: "About Me", value: "about-me", isActive: true },
    { title: "My Novels", value: "my-novels", isActive: false },
    { title: "Library", value: "library", isActive: false },
    { title: "Badges", value: "badges", isActive: false },
  ];

  const navigateSubPages = (val) => {
    setSelectedSubPage(val);
  };

  return (
    <div>
      {/* make the header section under this */}
      <div>header</div>

      {/* the navigation buttons */}
      <div className="bg-neutral-800 flex justify-between text-white p-2">
        <div className="flex gap-3">
          {subPages.map((subPage) => (
            <button
              className="cursor-pointer"
              onClick={() => navigateSubPages(subPage.value)}
            >
              {subPage.title}
            </button>
          ))}
        </div>

        <button>Settings button</button>
      </div>

      {/* components of the sub sections */}
      {selectedSubPage === "about-me" && <AboutMe />}
      {selectedSubPage === "my-novels" && <MyNovels />}
      {selectedSubPage === "library" && <Library />}
      {selectedSubPage === "badges" && <BadgesList />}
    </div>
  );
};

export default ProfilePage;
