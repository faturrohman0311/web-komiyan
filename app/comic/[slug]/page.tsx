"use client";

import Navbar from "@/components/navbar";
import { getDetailComic } from "@/lib/api";
import { Bookmark, BookOpen, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ComicDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ComicDetailPage({ params }: ComicDetailPageProps) {
  const [comic, setComic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchDetailComic(slug: string) {
    setLoading(true);

    try {
      const data = await getDetailComic(slug);

      setComic(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getSlug() {
      const resolvedParams = await params;

      fetchDetailComic(resolvedParams.slug);
    }

    getSlug();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0F0F0F]">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 animate-pulse">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">
            <div className="aspect-[2/3] rounded-3xl bg-zinc-900" />

            <div>
              <div className="h-12 w-80 rounded-xl bg-zinc-900 mb-5" />

              <div className="flex gap-3 mb-6">
                <div className="h-8 w-24 rounded-full bg-zinc-900" />
                <div className="h-8 w-24 rounded-full bg-zinc-900" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-zinc-900" />
                <div className="h-4 w-[90%] rounded bg-zinc-900" />
                <div className="h-4 w-[80%] rounded bg-zinc-900" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!comic) return null;

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src={comic?.image}
            alt={comic?.title}
            className="w-full h-full object-cover blur-3xl opacity-20 scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0F0F0F]/90 to-[#0F0F0F]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-20">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">
            {/* COVER */}
            <div>
              <div className="overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
                <img
                  src={comic?.image}
                  alt={comic?.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div>
              {/* BADGE */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                  {comic?.metadata?.type}
                </span>

                <span className="px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm">
                  {comic?.metadata?.status}
                </span>

                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />

                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                {comic?.title_indonesian || comic?.title}
              </h1>

              {/* ALT TITLE */}
              <p className="text-zinc-400 text-lg mt-4">{comic?.title}</p>

              {/* GENRE */}
              <div className="flex flex-wrap gap-3 mt-8">
                {comic?.genres?.map((genre: any, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-zinc-900 border border-white/5 text-sm"
                  >
                    {genre?.name}
                  </span>
                ))}
              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Author</p>

                  <h3 className="font-semibold mt-2">
                    {comic?.metadata?.author}
                  </h3>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Status</p>

                  <h3 className="font-semibold mt-2">
                    {comic?.metadata?.status}
                  </h3>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Rating Umur</p>

                  <h3 className="font-semibold mt-2">
                    {comic?.metadata?.age_rating}
                  </h3>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Chapter</p>

                  <h3 className="font-semibold mt-2">
                    {comic?.chapters?.length}
                  </h3>
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Link
                  href={`/read/${comic?.chapters?.[0]?.slug}`}
                  className="h-14 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold flex items-center gap-2 hover:opacity-90 transition"
                >
                  <BookOpen size={20} />
                  Mulai Baca
                </Link>

                <button className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-zinc-800 transition">
                  <Bookmark size={20} />
                </button>
              </div>

              {/* SYNOPSIS */}
              <div className="mt-14">
                <h2 className="text-2xl font-bold mb-5">Sinopsis</h2>

                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 text-zinc-300 leading-relaxed whitespace-pre-line">
                  {comic?.synopsis_full}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black">Daftar Chapter</h2>

          <p className="text-zinc-500">{comic?.chapters?.length} Chapter</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comic?.chapters?.map((chapter: any, index: number) => (
            <Link
              key={index}
              href={`/read/${chapter?.slug}`}
              className="group bg-zinc-900/50 hover:bg-zinc-800/70 border border-white/5 rounded-2xl p-5 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-purple-400 transition">
                    {chapter?.chapter}
                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">{chapter?.date}</p>
                </div>

                <ChevronRight
                  size={20}
                  className="text-zinc-500 group-hover:text-white"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
