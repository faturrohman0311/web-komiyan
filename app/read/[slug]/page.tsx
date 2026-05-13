"use client";

import { getChapterComic } from "@/lib/api";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Maximize2,
  Minimize2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ReadComicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ReadComicPage({ params }: ReadComicPageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();

        setIsFullscreen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [chapter, setChapter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hideUI, setHideUI] = useState(false);

  async function fetchChapter(slug: string) {
    setLoading(true);

    try {
      const data = await getChapterComic(slug);

      setChapter(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getSlug() {
      const resolvedParams = await params;

      fetchChapter(resolvedParams.slug);
    }

    getSlug();
  }, [params]);

  // Auto Hide UI
  useEffect(() => {
    let timeout: any;

    const handleMouseMove = () => {
      setHideUI(false);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setHideUI(true);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    handleMouseMove();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <div className="max-w-5xl mx-auto px-3 py-10 animate-pulse">
          <div className="h-12 w-72 bg-zinc-900 rounded-2xl mb-8" />

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-[9/16] rounded-2xl bg-zinc-900"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!chapter) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          hideUI ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="backdrop-blur-2xl bg-black/70 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href={`/comic/${chapter?.navigation?.chapterList}`}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition shrink-0"
              >
                <ChevronLeft size={20} />
              </Link>

              <div className="min-w-0">
                <h1 className="font-bold line-clamp-1 text-sm md:text-base">
                  {chapter?.chapter_title}
                </h1>

                <p className="text-zinc-500 text-xs md:text-sm line-clamp-1">
                  {chapter?.manga_title}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition"
              >
                {isFullscreen ? (
                  <Minimize2 size={18} />
                ) : (
                  <Maximize2 size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* READER */}
      <section className="pt-6 md:pt-10 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-[2px]">
            {chapter?.images?.map((image: string, index: number) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`${chapter?.chapter_title} ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING NAVIGATION */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          hideUI ? "translate-y-40 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="backdrop-blur-2xl bg-black/70 border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
          {/* PREVIOUS */}
          {chapter?.navigation?.previousChapter ? (
            <Link
              href={`/read/${chapter?.navigation?.previousChapter}`}
              className="h-12 px-5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2 transition"
            >
              <ChevronLeft size={18} />
              <span className="hidden md:block">Prev</span>
            </Link>
          ) : (
            <button
              disabled
              className="h-12 px-5 rounded-xl bg-white/[0.03] text-zinc-600 cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* CHAPTER LIST */}
          <Link
            href={`/comic/${chapter?.navigation?.chapterList}`}
            className="h-12 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 flex items-center gap-2 transition"
          >
            <List size={18} />
            <span className="hidden md:block">Chapter</span>
          </Link>

          {/* NEXT */}
          {chapter?.navigation?.nextChapter ? (
            <Link
              href={`/read/${chapter?.navigation?.nextChapter}`}
              className="h-12 px-5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2 transition"
            >
              <span className="hidden md:block">Next</span>

              <ChevronRight size={18} />
            </Link>
          ) : (
            <button
              disabled
              className="h-12 px-5 rounded-xl bg-white/[0.03] text-zinc-600 cursor-not-allowed flex items-center gap-2"
            >
              Tamat
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
