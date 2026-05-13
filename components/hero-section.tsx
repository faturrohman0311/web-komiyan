"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

export default function HeroSection({ data }: any) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? data?.comics.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === data?.comics.length - 1 ? 0 : prev + 1));
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[750px] overflow-hidden">
      {/* Background Images */}
      {data?.comics.map((comic: any, index: number) => (
        <img
          key={comic.link}
          src={comic.image}
          alt={comic.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-40" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/60 to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-24">
        <div className="max-w-3xl">
          <span className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
            {data?.comics[current].genre}
          </span>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
            {data?.comics[current].title}
          </h1>

          <p className="max-w-2xl text-zinc-300 mt-5 text-base md:text-lg leading-relaxed">
            {data?.comics[current].chapter}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href={`/comic/${slugify(data?.comics[current].title)}`}
              className="h-14 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold flex items-center gap-2 hover:opacity-90 transition"
            >
              <Play size={20} />
              Baca Sekarang
            </Link>

            <Link
              href={`/comic/${slugify(data?.comics[current].title)}`}
              className="h-14 px-8 flex items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Detail
            </Link>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-3 mt-10">
            {data?.comics.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-10 bg-purple-500" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
