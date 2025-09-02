const NovelCardSkeleton = () => {
  return (
    <div className="bg-zinc-700 flex items-center gap-3 p-3 rounded-xl shadow-2xl animate-pulse">
      {/* Image skeleton */}
      <div className="w-36 h-48 bg-zinc-600 rounded-xl"></div>

      {/* Content skeleton */}
      <div className="flex-1">
        {/* Title skeleton */}
        <div className="h-6 bg-zinc-600 rounded mb-2 w-3/4"></div>
        <div className="h-px bg-zinc-600 mb-5"></div>

        {/* Chapters skeleton */}
        <div className="h-4 bg-zinc-600 rounded mb-3 w-1/2"></div>

        {/* Author skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-zinc-600 rounded"></div>
          <div className="h-4 bg-zinc-600 rounded w-20"></div>
          <div className="h-4 bg-zinc-600 rounded w-24"></div>
        </div>

        {/* Date skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-600 rounded"></div>
          <div className="h-4 bg-zinc-600 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default NovelCardSkeleton;
