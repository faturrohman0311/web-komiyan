"use client";
import { getTerbaruComic } from "@/lib/api";
import { useEffect, useState } from "react";
import LatestUpdateSkeleton from "./LatestUpdateSkeleton";
import { slugify } from "@/utils/slugify";
import Link from "next/link";

export default function LatestUpdate() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTerbaruComic() {
    setLoading(true);
    try {
      const data = await getTerbaruComic();

      if (data.comics) {
        setComics(data.comics);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTerbaruComic();
  }, []);
  return (
    <section className="mt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Update Terbaru</h2>

        {loading ? (
          <LatestUpdateSkeleton />
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {comics.map((item: any, index: number) => (
              <Link
                href={`/comic/${slugify(item?.title)}`}
                key={index}
                className="glass  hover:cursor-pointer transition duration-300 glow-hover rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-20 h-28 rounded-xl overflow-hidden bg-zinc-800">
                  <img
                    src={item?.image}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-purple-400 text-sm">{item?.time_ago}</p>

                  <h3 className="font-semibold text-lg mt-1">{item?.title}</h3>

                  <p className="text-zinc-400 text-sm mt-1">{item?.chapter}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
