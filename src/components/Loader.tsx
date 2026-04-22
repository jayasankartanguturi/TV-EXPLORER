const Loader = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full px-6 md:px-12 mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col gap-3">
          <div className="bg-gray-800 rounded-md aspect-[2/3] w-full relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-700/40 to-transparent" />
          </div>
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
