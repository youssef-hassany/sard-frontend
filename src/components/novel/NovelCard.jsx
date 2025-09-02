import { Clock, PersonStanding } from "lucide-react";

const NovelCard = ({ novel }) => {
  return (
    <div className="bg-zinc-700 flex items-center gap-3 p-3 rounded-xl text-zinc-100 shadow-2xl cursor-pointer hover:-translate-y-1 duration-200">
      <img src={novel.image} alt={novel.name} className="w-36 rounded-xl" />

      {/* novel info */}
      <div>
        {/* novel title */}
        <h3 className="text-xl py-1 border-b border-zinc-600 mb-5">
          {novel.name}
        </h3>

        <div>
          {/* novel title */}
          <p className="mb-3">Chapters: {novel.chaptersNum}</p>

          {/* novel chapters number */}
          <p className="flex items-center my-3">
            <span className="flex items-center">
              <PersonStanding />
              <span>Author:</span>
            </span>

            <span>{novel.author}</span>
          </p>

          {/* novel creation date */}
          <p className="flex items-center gap-1">
            <span>
              <Clock />{" "}
            </span>
            <span>{novel.createdAt}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NovelCard;
