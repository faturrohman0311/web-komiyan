"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!keyword.trim()) return;

    router.push(`/search/${keyword}`);
  }
  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
          >
            KomiYan
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <Link href="/" className="hover:text-white transition">
              Beranda
            </Link>

            <Link href="/#trending" className="hover:text-white transition">
              Trending
            </Link>

            <Link
              href="#"
              onClick={() => {
                alert("Comingsoon");
              }}
              className="hover:text-white transition"
            >
              Genre
            </Link>

            <Link href="/#terbaru" className="hover:text-white transition">
              Terbaru
            </Link>

            <Link
              href="#"
              onClick={() => {
                alert("Comingsoon");
              }}
              className="hover:text-white transition"
            >
              Bookmark
            </Link>
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-zinc-900 rounded-full px-4 h-10 w-64 border border-white/5"
            >
              <Search size={18} className="text-zinc-400" />

              <input
                placeholder="Cari manga..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-transparent outline-none text-sm ml-2 w-full text-white"
              />
            </form>

            {/* Login */}
            <button className="h-10 px-5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-semibold hover:opacity-90 transition">
              Login
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#111111] border-r border-white/10 z-50 p-6 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            KomiYan
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Mobile */}
        <div className="flex items-center bg-zinc-900 rounded-2xl px-4 h-12 border border-white/5 mb-8">
          <Search size={18} className="text-zinc-400" />

          <input
            placeholder="Cari manga..."
            className="bg-transparent outline-none text-sm ml-3 w-full text-white"
          />
        </div>

        {/* Mobile Menu */}
        <nav className="flex flex-col gap-3">
          <Link
            href="/"
            className="h-12 px-4 rounded-xl flex items-center hover:bg-white/5 transition"
          >
            Beranda
          </Link>

          <Link
            href="/populer"
            className="h-12 px-4 rounded-xl flex items-center hover:bg-white/5 transition"
          >
            Populer
          </Link>

          <Link
            href="/genre"
            className="h-12 px-4 rounded-xl flex items-center hover:bg-white/5 transition"
          >
            Genre
          </Link>

          <Link
            href="/terbaru"
            className="h-12 px-4 rounded-xl flex items-center hover:bg-white/5 transition"
          >
            Terbaru
          </Link>

          <Link
            href="/bookmark"
            className="h-12 px-4 rounded-xl flex items-center hover:bg-white/5 transition"
          >
            Bookmark
          </Link>
        </nav>

        {/* Login Button */}
        <button className="mt-auto h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:opacity-90 transition">
          Login
        </button>
      </aside>
    </>
  );
}
