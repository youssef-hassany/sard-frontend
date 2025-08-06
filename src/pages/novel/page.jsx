import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChaptersList from "../../components/novel/ChaptersList";
import NovelCharacters from "../../components/novel/NovelCharacters";
import NovelRatings from "../../components/novel/NovelRatings";
import CommentsList from "../../components/novel/CommentsList";

const NovelPage = () => {
  const { t } = useTranslation();

  const [selectedSubPage, setSelectedSubPage] = useState("chapters");

  /* 
            in order to change the text written in the buttons that navigates between sections you have to use the t function in this array
            for example, if you want to translate the (Chapters) text and you already changed the translation.json files to handle it
            then you will have to vome to this array, choose the (title) property and use the t function in it
            so if you added the text in translation.json in a variable called (chapters), then You have to make a change similar to this:-
            before: title: "Chapters"
            after: title: t("chapters")
        */
  const subPages = [
    { title: "Chapters", value: "chapters", isActive: true },
    { title: "Characters", value: "characters", isActive: false },
    { title: "Ratings", value: "ratings", isActive: false },
    { title: "Comments", value: "comments", isActive: false },
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
        {subPages.map((subPage) => (
          <button
            className="cursor-pointer"
            onClick={() => navigateSubPages(subPage.value)}
          >
            {subPage.title}
          </button>
        ))}
      </div>

      {/* components of the sub sections */}
      {selectedSubPage === "chapters" && <ChaptersList />}
      {selectedSubPage === "characters" && <NovelCharacters />}
      {selectedSubPage === "ratings" && <NovelRatings />}
      {selectedSubPage === "comments" && <CommentsList />}
    </div>
  );
};

export default NovelPage;
