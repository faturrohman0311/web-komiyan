const ComicSkeleton = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-24">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="group">
            {/* Card */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl skeleton">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* HOT Badge */}
              <div className="absolute top-3 left-3 h-6 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/5" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-3">
                {/* Genre */}
                <div className="h-4 w-20 rounded-full bg-white/10 mb-3" />

                {/* Chapter */}
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 rounded bg-white/10" />

                  {/* Rating */}
                  <div className="h-3 w-10 rounded bg-white/10" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="mt-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 w-[90%] rounded-lg skeleton" />
                <div className="h-5 w-[65%] rounded-lg skeleton" />
              </div>

              {/* Genre + Chapter */}
              <div className="flex items-center gap-2 mt-3">
                <div className="h-4 w-16 rounded skeleton" />

                <div className="w-1 h-1 rounded-full bg-zinc-700" />

                <div className="h-4 w-20 rounded skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComicSkeleton;
