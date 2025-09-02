import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChaptersList from "../../components/novel/ChaptersList";
import NovelCharacters from "../../components/novel/NovelCharacters";
// import NovelRatings from "../../components/novel/NovelRatings";
import CommentsList from "../../components/novel/CommentsList";
import NovelCate from "../../components/novel/NovelCate";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import NovelStars from "../../components/novel/NovelStars";
import ChapterTable from "../../components/novel/ChapterTable";
import { Link, useParams } from "react-router-dom";
import { useGetNovelBySlug } from "../../hooks/novel/useGetNovelBySlug";
import { formatDateShort } from "../../utils/date";
import { Pencil } from "lucide-react";

const NovelPage = () => {
  const { t } = useTranslation();
  const { novelSlug } = useParams();

  const { data: novel } = useGetNovelBySlug(novelSlug);

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
    <div className="xl md:p-[40px] p-[10px] bg-[#2C2C2C]">
      {/* make the header section under this */}
      <div className="grid shadow-[6px_12px_10px_black]  text-white xl:grid-cols-[1fr_4fr] lg:grid-cols-[1fr_2fr] md:grid-cols[1fr] gap-[30px] p-[15px] bg-[#3C3C3C] rounded-2xl ">
        <div className="w-[100%] row-start-1 md:col-start-1 ">
          <img
            src={
              novel?.coverImageUrl ||
              "https://m.media-amazon.com/images/I/81m6eNdRWwL._UF894,1000_QL80_.jpg"
            }
            alt=""
            className="rounded-2xl w-[100%]"
          />
        </div>
        <div className="flex flex-col ">
          <p className="text-[40px] font-bold pb-[30px] border-b-[1px] border-b-[#797979] mb-2">
            {novel?.title}
          </p>
          <div className="flex flex-col justify-between h-full">
            <div className="flex gapy-x-3 gap-x-3 flex-wrap">
              {novel?.genresList?.map((genre) => (
                <NovelCate text={genre.name} />
              ))}
            </div>
            <div className="bg-[#4A4A4A] rounded-2xl p-[20px] mt-2">
              <p className="font-bold leading-relaxed">{novel?.summary}</p>
            </div>

            <div className="flex  flex-wrap justify-between items-center gap-[20px] mt-[15px]">
              <div className="flex justify-between flex-wrap items-center gap-3 md:gap-[20px]">
                {
                  <Link to={`/profile/${novel?.author?.userName}`}>
                    {" "}
                    <img
                      src={
                        novel?.author?.profilePhoto ||
                        "https://4kwallpapers.com/images/wallpapers/attack-on-titan-2048x2048-10442.jpg"
                      }
                      alt=""
                      className="w-[50px] h-[50px] rounded-[50%]"
                    />{" "}
                  </Link>
                }
                <p className="font-bold">{novel?.author?.displayName}</p>
              </div>
              <div className="flex gap-[10px] items-center">
                <div className="flex flex-row-reverse gap-[5px] items-center ">
                  {novel &&
                    Array.from({
                      length: Math.round(novel?.totalAverageScore || 0),
                    }).map((_, i) => <NovelStars key={i} />)}

                  <div className="font-bold ">{novel?.totalAverageScore}</div>
                  <span className="text-[12px]">
                    {" "}
                    &#40;{novel?.reviewCount}&#41;
                  </span>
                </div>
                <Pencil />

                <div className="flex gap-[20px] text-[18px] font-bold">
                  <p className="font-bold">
                    {formatDateShort(novel?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex text-white font-bold justify-between py-[30px]">
        <p className="md:text-[30px] font-bold">Ratings</p>
        <p className="md:text-[30px] font-bold"> Charactes</p>
        <p className="md:text-[30px] font-bold"> youssef</p>
        <p className="md:text-[30px] font-bold"> Nouraldin</p>
      </div>

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

      {/* Chapters */}
      <div className="grid justify-between md:grid-cols-[1fr_1fr] grid-cols-1 gap-[40px] md:gap-[80px] py-[40px] ">
        <div className="flex flex-col gap-[30px]">
          <div className="bg-[#3C3C3C] px-[25px] rounded-2xl p-[10px] shadow-[6px_12px_10px_black] ">
            <div className="flex items-center gap-[10px]  text-white text-[larger] font-bold">
              <svg
                className="w-[25px]"
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5 0C10.5199 0 0 10.5199 0 23.5C0 36.4801 10.5199 47 23.5 47C36.4801 47 47 36.4801 47 23.5C47 10.5199 36.4801 0 23.5 0ZM37.2053 25.4553C37.2053 26.5385 36.3332 27.4105 35.25 27.4105H27.4197V35.25C27.4197 36.3332 26.5477 37.2053 25.4645 37.2053H21.5447C20.4615 37.2053 19.5895 36.324 19.5895 35.25V27.4197H11.75C10.6668 27.4197 9.79473 26.5385 9.79473 25.4645V21.5447C9.79473 20.4615 10.6668 19.5895 11.75 19.5895H19.5803V11.75C19.5803 10.6668 20.4523 9.79473 21.5355 9.79473H25.4553C26.5385 9.79473 27.4105 10.676 27.4105 11.75V19.5803H35.25C36.3332 19.5803 37.2053 20.4615 37.2053 21.5355V25.4553Z"
                  fill="white"
                />
              </svg>

              <p>{t("novelPage.addToReading")}</p>
            </div>
            <div className="flex items-center gap-[10px] text-white text-[larger] font-bold">
              <svg
                className="w-[25px]"
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5 36.5556C24.2398 36.5556 24.8604 36.3049 25.3617 35.8036C25.8631 35.3022 26.1129 34.6825 26.1111 33.9444C26.1094 33.2064 25.8587 32.5867 25.3591 32.0853C24.8595 31.584 24.2398 31.3333 23.5 31.3333C22.7602 31.3333 22.1405 31.584 21.6409 32.0853C21.1413 32.5867 20.8906 33.2064 20.8889 33.9444C20.8871 34.6825 21.1378 35.3031 21.6409 35.8062C22.144 36.3092 22.7637 36.559 23.5 36.5556ZM23.5 26.1111C24.2398 26.1111 24.8604 25.8604 25.3617 25.3591C25.8631 24.8578 26.1129 24.2381 26.1111 23.5V13.0556C26.1111 12.3157 25.8604 11.696 25.3591 11.1964C24.8578 10.6969 24.2381 10.4462 23.5 10.4444C22.7619 10.4427 22.1422 10.6934 21.6409 11.1964C21.1396 11.6995 20.8889 12.3192 20.8889 13.0556V23.5C20.8889 24.2398 21.1396 24.8604 21.6409 25.3617C22.1422 25.8631 22.7619 26.1129 23.5 26.1111ZM15.8625 47C15.1662 47 14.503 46.8694 13.8728 46.6083C13.2427 46.3472 12.6874 45.9773 12.2069 45.4986L1.50139 34.7931C1.02269 34.3144 0.652778 33.7591 0.391667 33.1272C0.130556 32.4953 0 31.8329 0 31.1401V15.8651C0 15.1688 0.130556 14.5056 0.391667 13.8754C0.652778 13.2453 1.02269 12.69 1.50139 12.2096L12.2069 1.504C12.6856 1.0253 13.2409 0.655389 13.8728 0.394278C14.5047 0.133167 15.1679 0.00174074 15.8625 0H31.1375C31.8338 0 32.4979 0.130556 33.1298 0.391667C33.7617 0.652778 34.3161 1.02269 34.7931 1.50139L45.4986 12.2069C45.9773 12.6856 46.3472 13.2409 46.6083 13.8728C46.8694 14.5047 47 15.1679 47 15.8625V31.1375C47 31.8338 46.8694 32.4979 46.6083 33.1298C46.3472 33.7617 45.9773 34.3161 45.4986 34.7931L34.7931 45.4986C34.3144 45.9773 33.7591 46.3472 33.1272 46.6083C32.4953 46.8694 31.8321 47 31.1375 47H15.8625ZM15.9278 41.7778H31.0722L41.7778 31.0722V15.9278L31.0722 5.22222H15.9278L5.22222 15.9278V31.0722L15.9278 41.7778Z"
                  fill="white"
                />
              </svg>

              <p>{t("novelPage.reportNovel")}</p>
            </div>
            <div className="flex items-center gap-[10px] text-white text-[larger] font-bold">
              <svg
                className="w-[25px]"
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.1667 47C36.9907 47 35.1412 46.3146 33.6181 44.9437C32.0949 43.5729 31.3333 41.9083 31.3333 39.95C31.3333 39.715 31.3986 39.1667 31.5292 38.305L13.1861 28.67C12.4898 29.2575 11.6847 29.7181 10.7708 30.0518C9.85695 30.3855 8.87778 30.5516 7.83333 30.55C5.65741 30.55 3.80787 29.8646 2.28472 28.4937C0.761574 27.1229 0 25.4583 0 23.5C0 21.5417 0.761574 19.8771 2.28472 18.5062C3.80787 17.1354 5.65741 16.45 7.83333 16.45C8.87778 16.45 9.85695 16.6168 10.7708 16.9506C11.6847 17.2843 12.4898 17.7441 13.1861 18.33L31.5292 8.695C31.4421 8.42083 31.3882 8.15685 31.3673 7.90305C31.3464 7.64925 31.3351 7.3649 31.3333 7.05C31.3333 5.09167 32.0949 3.42708 33.6181 2.05625C35.1412 0.685417 36.9907 0 39.1667 0C41.3426 0 43.1921 0.685417 44.7153 2.05625C46.2384 3.42708 47 5.09167 47 7.05C47 9.00833 46.2384 10.6729 44.7153 12.0437C43.1921 13.4146 41.3426 14.1 39.1667 14.1C38.1222 14.1 37.1431 13.9332 36.2292 13.5995C35.3153 13.2657 34.5102 12.8059 33.8139 12.22L15.4708 21.855C15.5579 22.1292 15.6127 22.3939 15.6353 22.6493C15.658 22.9047 15.6684 23.1882 15.6667 23.5C15.6649 23.8118 15.6545 24.0961 15.6353 24.353C15.6162 24.61 15.5614 24.874 15.4708 25.145L33.8139 34.78C34.5102 34.1925 35.3153 33.7327 36.2292 33.4005C37.1431 33.0684 38.1222 32.9016 39.1667 32.9C41.3426 32.9 43.1921 33.5854 44.7153 34.9562C46.2384 36.3271 47 37.9917 47 39.95C47 41.9083 46.2384 43.5729 44.7153 44.9437C43.1921 46.3146 41.3426 47 39.1667 47ZM39.1667 42.3C39.9065 42.3 40.5271 42.0752 41.0284 41.6255C41.5297 41.1759 41.7795 40.6174 41.7778 39.95C41.776 39.2826 41.5254 38.7249 41.0258 38.2768C40.5262 37.8287 39.9065 37.6031 39.1667 37.6C38.4269 37.5969 37.8071 37.8225 37.3076 38.2768C36.808 38.7311 36.5573 39.2889 36.5556 39.95C36.5538 40.6111 36.8045 41.1696 37.3076 41.6255C37.8106 42.0814 38.4303 42.3063 39.1667 42.3ZM7.83333 25.85C8.57315 25.85 9.19372 25.6244 9.69506 25.1732C10.1964 24.722 10.4462 24.1643 10.4444 23.5C10.4427 22.8357 10.192 22.278 9.69244 21.8268C9.19285 21.3756 8.57315 21.15 7.83333 21.15C7.09352 21.15 6.47382 21.3756 5.97422 21.8268C5.47463 22.278 5.22396 22.8357 5.22222 23.5C5.22048 24.1643 5.47115 24.7228 5.97422 25.1756C6.4773 25.6283 7.097 25.8531 7.83333 25.85ZM39.1667 9.4C39.9065 9.4 40.5271 9.1744 41.0284 8.7232C41.5297 8.272 41.7795 7.71427 41.7778 7.05C41.776 6.38573 41.5254 5.828 41.0258 5.3768C40.5262 4.9256 39.9065 4.7 39.1667 4.7C38.4269 4.7 37.8071 4.9256 37.3076 5.3768C36.808 5.828 36.5573 6.38573 36.5556 7.05C36.5538 7.71427 36.8045 8.27278 37.3076 8.72555C37.8106 9.17832 38.4303 9.40313 39.1667 9.4Z"
                  fill="white"
                />
              </svg>

              <p>{t("novelPage.shareWith")}</p>
            </div>
          </div>
          <div className="bg-[#3C3C3C] rounded-2xl p-[20px] shadow-[6px_12px_10px_black] text-white">
            <p className="font-bold text-2xl pb-[20px] ">
              {t("novelPage.youMayLike")}
            </p>
            <div className="grid xl:grid-cols-[1fr_4fr] lg:grid-cols-[1fr_2fr] grid-cols-1 gap-[20px]">
              <div className="w-[100%] h-[100%]">
                <img
                  className="rounded-2xl h-[100%]"
                  src="https://4kwallpapers.com/images/wallpapers/sung-jinwoo-amoled-1440x2560-15859.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-[10px] justify-between">
                <p className="text-[20px] font-bold border-b border-white py-[10px]">
                  {t("novelPage.suggestedNovelTitle")}
                </p>
                <p className="lg:text-[16px] text-[14px]">
                  في زمنٍ اشتعلت فيه الحروب، وتاهت فيه الحقيقة بين صرخات الرصاص
                  ودموع الضعفاء، يقف شابٌ بسيط يُدعى سليم، لا يحمل لقب بطل، ولا
                  يسعى وراء المجد… كل ما يعرفه أنه "فقط جندي". تُروى القصة من
                  عينيه، حيث نرى العالم كما يراه هو: جبهات القتال، الخوف المختبئ
                  خلف الأوامر، الأص...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px] ">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 14V13.2C0 12.6333 0.146 12.1127 0.438 11.638C0.73 11.1633 1.11733 10.8007 1.6 10.55C2.63333 10.0333 3.68333 9.646 4.75 9.388C5.81667 9.13 6.9 9.00067 8 9C9.1 8.99933 10.1833 9.12867 11.25 9.388C12.3167 9.64733 13.3667 10.0347 14.4 10.55C14.8833 10.8 15.271 11.1627 15.563 11.638C15.855 12.1133 16.0007 12.634 16 13.2V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14ZM2 14H14V13.2C14 13.0167 13.9543 12.85 13.863 12.7C13.7717 12.55 13.6507 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5627 10.775 11.338C9.85833 11.1133 8.93333 11.0007 8 11C7.06667 10.9993 6.14167 11.112 5.225 11.338C4.30833 11.564 3.4 11.9013 2.5 12.35C2.35 12.4333 2.229 12.55 2.137 12.7C2.045 12.85 1.99933 13.0167 2 13.2V14ZM8 6C8.55 6 9.021 5.80433 9.413 5.413C9.805 5.02167 10.0007 4.55067 10 4C9.99933 3.44933 9.80367 2.97867 9.413 2.588C9.02233 2.19733 8.55133 2.00133 8 2C7.44867 1.99867 6.978 2.19467 6.588 2.588C6.198 2.98133 6.002 3.452 6 4C5.998 4.548 6.194 5.019 6.588 5.413C6.982 5.807 7.45267 6.00267 8 6Z"
                        fill="white"
                      />
                    </svg>
                    <p>
                      {t("novelPage.writer")}:{" "}
                      <span>{t("novelPage.writerName")}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px] ">
                    <p>1200</p>
                    <p>4.0</p>
                    <NovelStars />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-[#3C3C3C] p-[10px] shadow-[6px_12px_10px_black] h-fit py-[30px] px-[20px]">
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
          <ChapterTable
            title={t("novelPage.novelTitle")}
            date={t("novelPage.novelDate")}
          />
        </div>
      </div>

      {/* components of the sub sections */}
      {selectedSubPage === "chapters" && <ChaptersList />}
      {selectedSubPage === "characters" && <NovelCharacters />}
      {selectedSubPage === "ratings" && <NovelRatings />}
      {selectedSubPage === "comments" && <CommentsList />}
      <LanguageSwitcher />
    </div>
  );
};

export default NovelPage;
