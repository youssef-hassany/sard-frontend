import React from "react";

const NovelCate = ({ text }) => {
  return (
    <p
      className="bg-[#4A4A4A] py-[8px] px-[24px] rounded-2xl my-[5px] font-bold
    hover:bg-[#3FBB4A] transition-all duration-250 ease-in-out"
    >
      {text}
    </p>
  );
};

export default NovelCate;
