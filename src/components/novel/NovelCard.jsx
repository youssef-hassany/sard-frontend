import { BookOpen, Clock, Eye } from "lucide-react";
import { getTimeAgo } from "../../utils/date";
import { Link } from "react-router-dom";

const NovelCard = ({ novel }) => {
  return (
    <Link
      to={`/novel/${novel.slug}`}
      className="bg-zinc-700 flex items-center gap-3 p-3 rounded-xl text-zinc-100 shadow-2xl cursor-pointer hover:-translate-y-1 duration-200"
    >
      <img
        src={novel.coverImageUrl}
        alt={novel.title}
        className="w-36 rounded-xl"
      />

      {/* novel info */}
      <div>
        {/* novel title */}
        <h3 className="text-xl py-1 border-b border-zinc-600 mb-5">
          {novel.title}
        </h3>

        <div>
          {/* novel title */}
          <p className="flex items-center my-3">
            <span className="flex items-center gap-1">
              <Eye />
              <span>Views:</span>
            </span>

            <span>{novel.totalViews}</span>
          </p>

          {/* novel chapters number */}
          <p className="flex items-center gap-1s my-3">
            <span className="flex items-center gap-1">
              <BookOpen />
              <span>Status: </span>
            </span>

            <span>{novel.status}</span>
          </p>

          {/* novel creation date */}
          <p className="flex items-center gap-1">
            <span>
              <Clock />{" "}
            </span>
            <span>{getTimeAgo(novel.lastUpdatedAt)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NovelCard;
