import React from "react";
import { useTranslation } from "react-i18next";
import mainPicture from "../../assets/mainPicture.jpg";

const FollowFrame = ({ followType }) => {

  return (
    <div className="bg-neutral-700 flex gap-10 items-center p-3 w-full rounded-3xl">
      <div className="text-lg font-semibold">{followType}</div>
      <div className="flex justify-center items-center">
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <img src={mainPicture} alt="" className="w-13 rounded-full -mr-5" />
        <p className="w-13 h-13 rounded-full -mr-5 bg-neutral-600 flex justify-center items-center text-xl font-semibold">
          +29
        </p>
      </div>
    </div>
  );
};

export default FollowFrame;
