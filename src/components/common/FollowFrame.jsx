import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FollowFrame = ({ followType, usersList, total }) => {
  const remaining = usersList?.length - total;

  return (
    <div className="bg-neutral-700 flex gap-10 items-center p-3 w-full rounded-3xl">
      <div className="text-2xl font-semibold">{followType}</div>
      <div className="flex justify-center items-center">
        {usersList?.map((item) => (
          <Link to={`/profile/${item?.userName}`}>
            <img
              src={item?.profilePhoto}
              alt=""
              className="w-13 rounded-full -mr-5"
            />
          </Link>
        ))}

        {remaining > 0 && (
          <p className="w-13 h-13 rounded-full -mr-5 bg-neutral-600 flex justify-center items-center text-xl font-semibold">
            {remaining}
          </p>
        )}

        {usersList.length === 0 && (
          <p className="w-13 h-13 rounded-full -mr-5 bg-neutral-600 flex justify-center items-center text-xl font-semibold">
            0
          </p>
        )}
      </div>
    </div>
  );
};

export default FollowFrame;
