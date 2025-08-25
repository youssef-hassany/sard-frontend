import React from "react";

const ChapterTable = ({ title, date }) => {
  return (
    <div>
      <div className="flex justify-between border-b border-white py-[10px]">
        <p className="text-white font-bold">{title}</p>
        <p className="text-white font-bold">{date}</p>
      </div>
    </div>
  );
};

export default ChapterTable;

// import React from "react";

// const NovelHeader = ({ title, date }) => {
//   return (
//     <div className="flex justify-between border-b border-white py-[10px]">
//       <p className="text-white font-bold">{title}</p>
//       <p className="text-white font-bold">{date}</p>
//     </div>
//   );
// };

// export default NovelHeader;
