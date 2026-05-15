"use client";

import { useEffect, useState } from "react";

import { Bookmark } from "lucide-react";

import { Comic } from "@/types/comic";

import { addBookmark } from "@/lib/bookmark/addBookmark";

import { removeBookmark } from "@/lib/bookmark/removeBookmark";

import { isBookmarked } from "@/lib/bookmark/isBookmarked";

interface Props {
  comic: Comic;
}

export default function BookmarkButton({ comic }: Props) {
  const [bookmarked, setBookmarked] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBookmark();
  }, []);

  const checkBookmark = async () => {
    const exists = await isBookmarked(comic.slug);

    setBookmarked(exists);
  };

  const toggleBookmark = async () => {
    try {
      setLoading(true);

      if (bookmarked) {
        await removeBookmark(comic.slug);

        setBookmarked(false);
      } else {
        await addBookmark(comic);

        setBookmarked(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`
        w-12 h-12 rounded-2xl
        flex items-center justify-center
        transition-all duration-300
        border
        ${
          bookmarked
            ? "bg-purple-500 border-purple-400 text-white"
            : "bg-white/5 border-white/10 text-zinc-300"
        }
      `}
    >
      <Bookmark className={bookmarked ? "fill-white" : ""} />
    </button>
  );
}
