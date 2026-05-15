"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { BookmarkCheck, BookOpen, Clock3, Search } from "lucide-react";

import { motion } from "framer-motion";

import { getBookmarks } from "@/lib/bookmark/getBookmarks";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/navbar";

interface Comic {
  id: string;
  slug: string;
  title: string;
  image: string;
  type?: string;
  status?: string;
  chapter?: string;
  metadata?: {
    type?: string;
    status?: string;
  };
}

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<Comic[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);

      const data = await getBookmarks();

      setBookmarks(data as Comic[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookmarks = bookmarks.filter((comic) =>
    comic.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen bg-[#070707] mt-16 text-white overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-black" />

          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]" />

          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          {/* Header */}
          <div
            className="
            flex flex-col lg:flex-row
            lg:items-center lg:justify-between
            gap-6 mb-10
          "
          >
            <div>
              <div
                className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-purple-500/10
                border border-purple-500/20
                text-purple-300 text-sm
                mb-4
              "
              >
                <BookmarkCheck size={16} />
                Library Comic
              </div>

              <h1 className="text-4xl lg:text-6xl font-black">Bookmark</h1>

              <p className="text-zinc-400 mt-3 max-w-xl">
                Semua comic favorit yang kamu simpan akan muncul di sini.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-[380px]">
              <Search
                className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-zinc-500
              "
                size={18}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari comic..."
                className="
                w-full h-14 pl-12 pr-4
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                outline-none
                focus:border-purple-500/40
                transition
              "
              />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div
              className="
              grid grid-cols-2
              md:grid-cols-3
              lg:grid-cols-5
              gap-5
            "
            >
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="
                  animate-pulse
                  rounded-3xl
                  overflow-hidden
                  border border-white/5
                  bg-white/[0.03]
                "
                >
                  <div className="aspect-[3/4] bg-white/5" />

                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-white/5 rounded-lg" />

                    <div className="h-4 bg-white/5 rounded-lg w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBookmarks.length === 0 ? (
            /* Empty State */
            <div
              className="
              flex flex-col items-center justify-center
              text-center
              py-32
            "
            >
              <div
                className="
                w-28 h-28 rounded-full
                bg-purple-500/10
                border border-purple-500/20
                flex items-center justify-center
                mb-8
              "
              >
                <BookOpen size={42} className="text-purple-400" />
              </div>

              <h2 className="text-3xl font-black">Belum Ada Bookmark</h2>

              <p className="text-zinc-500 mt-4 max-w-md leading-relaxed">
                Comic yang kamu simpan akan muncul di halaman ini.
              </p>
            </div>
          ) : (
            /* Grid */
            <div
              className="
              grid grid-cols-2
              md:grid-cols-3
              lg:grid-cols-5
              gap-5
            "
            >
              {filteredBookmarks.map((comic: any, index: number) => (
                <motion.div
                  key={comic.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                >
                  <Link
                    href={`/comic/${comic.slug}`}
                    className="
                      group block
                      rounded-3xl
                      overflow-hidden
                      border border-white/10
                      bg-white/[0.04]
                      backdrop-blur-xl
                      hover:border-purple-500/40
                      transition-all duration-300
                    "
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={comic.image}
                        alt={comic.title}
                        className="
                          object-cover
                          transition duration-500
                          group-hover:scale-110
                        "
                      />

                      <div
                        className="
                          absolute inset-0
                          bg-gradient-to-t
                          from-black
                          via-black/10
                          to-transparent
                        "
                      />

                      {/* Saved Badge */}
                      <div
                        className="
                          absolute top-3 right-3
                          w-10 h-10 rounded-2xl
                          bg-purple-500/90
                          backdrop-blur-xl
                          flex items-center justify-center
                          shadow-[0_0_20px_rgba(168,85,247,0.45)]
                        "
                      >
                        <BookmarkCheck size={18} className="fill-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h2
                        className="
                          font-bold text-lg
                          line-clamp-1
                          group-hover:text-purple-300
                          transition
                        "
                      >
                        {comic.title}
                      </h2>

                      <div
                        className="
                          flex items-center gap-2
                          text-zinc-500 text-sm
                          mt-2
                        "
                      >
                        {/* <Clock3 size={14} /> */}

                        <span>
                          Chapter {comic.chapters?.length || "Chapter Terbaru"}
                        </span>
                      </div>

                      {/* Type */}
                      <div className="mt-4 flex gap-2 flex-wrap">
                        <div
                          className="
                            px-3 py-1 rounded-full
                            bg-purple-500/10
                            border border-purple-500/20
                            text-purple-300
                            text-xs
                          "
                        >
                          {comic.metadata.type || "Manga"}
                        </div>

                        <div
                          className="
                            px-3 py-1 rounded-full
                            bg-cyan-500/10
                            border border-cyan-500/20
                            text-cyan-300
                            text-xs
                          "
                        >
                          {comic?.metadata.status || "Ongoing"}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
