"use client";
import { useEffect, useState } from "react";
import ComicCard from "./comic-card";
import { getTrendingComic } from "@/lib/api";
import ComicSkeleton from "./ComicSkeleton";

const TrendingComic = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTrendingComic() {
    setLoading(true);
    try {
      const data = await getTrendingComic();

      if (data.trending) {
        setComics(data.trending);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrendingComic();
  }, []);

  return (
    <section id="trending" className="max-w-7xl mx-auto px-6 mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Sedang Trending</h2>

        <button className="text-purple-400 hover:text-purple-300">
          Lihat Semua
        </button>
      </div>

      {loading ? (
        <ComicSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {comics.map((comic: any) => (
            <ComicCard key={comic.link} {...comic} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingComic;
