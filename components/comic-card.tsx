import { slugify } from "@/utils/slugify";
import Link from "next/link";

interface ComicCardProps {
  title: string;
  chapter: string;
  genre: string;
  image?: string;
  slug?: string;
}

export default function ComicCard({
  title,
  chapter,
  genre,
  image,
  slug,
}: ComicCardProps) {
  const thumbnail =
    image && image.trim() !== ""
      ? image
      : "https://placehold.co/600x900/18181b/ffffff?text=No+Image";

  return (
    <Link
      href={`/comic/${slug ? slug : slugify(title)}`}
      className="group cursor-pointer transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-zinc-900">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-purple-400 transition">
          {title}
        </h3>

        <p className="text-sm text-zinc-400 mt-1">
          {genre} • {chapter}
        </p>
      </div>
    </Link>
  );
}
