"use client";

import ComicCard from "@/components/comic-card";
import ComicSkeleton from "@/components/ComicSkeleton";
import Navbar from "@/components/navbar";
import { searchComic } from "@/lib/api";
import { useEffect, useState } from "react";

interface SearchPageProps {
  params: Promise<{
    keyword: string;
  }>;
}

export default function SearchPage({ params }: SearchPageProps) {
  const [keyword, setKeyword] = useState("");
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSearchComic(search: string) {
    setLoading(true);

    try {
      const data = await searchComic(search);

      if (data?.data) {
        setComics(data.data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;

      const decodedKeyword = decodeURIComponent(resolvedParams.keyword);

      setKeyword(decodedKeyword);

      fetchSearchComic(decodedKeyword);
    }

    getParams();
  }, [params]);

  return (
    <main className="min-h-screen pt-28 px-4 md:px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-black">Hasil pencarian</h1>

          <p className="text-purple-400 text-xl mt-3">{keyword}</p>
        </div>

        {/* Loading */}
        {loading && <ComicSkeleton />}

        {/* Empty State */}
        {!loading && comics.length === 0 && (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-bold">Comic tidak ditemukan</h2>

            <p className="text-zinc-400 mt-3">Coba keyword lain</p>
          </div>
        )}

        {/* Result */}
        {!loading && comics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
            {comics.map((comic: any, index: number) => (
              <ComicCard
                key={index}
                title={comic?.title}
                slug={comic?.slug}
                link={comic?.link}
                chapter={comic?.chapter}
                genre={comic?.type}
                image={comic?.thumbnail}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
