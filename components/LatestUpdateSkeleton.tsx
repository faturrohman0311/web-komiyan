const LatestUpdateSkeleton = () => {
  return (
    <section id="terbaru" className="mt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/70 backdrop-blur-xl p-4 flex items-center gap-4 animate-pulse"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Time */}
                <div className="h-4 w-24 rounded bg-zinc-800 mb-3" />

                {/* Title */}
                <div className="space-y-2">
                  <div className="h-5 w-[90%] rounded-lg bg-zinc-800" />
                  <div className="h-5 w-[70%] rounded-lg bg-zinc-800" />
                </div>

                {/* Chapter */}
                <div className="h-4 w-28 rounded bg-zinc-800 mt-4" />
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 border border-white/[0.03] rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdateSkeleton;
