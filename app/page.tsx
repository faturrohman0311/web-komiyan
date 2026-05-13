import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LatestUpdate from "@/components/latest-update";
import { comics } from "@/lib/data";
import { getPopulerComic } from "@/lib/api";
import TrendingComic from "@/components/TrendingComic";

export default async function HomePage() {
  const populerData = await getPopulerComic();
  return (
    <main>
      <Navbar />

      <HeroSection data={populerData} />

      <TrendingComic />

      <LatestUpdate />
    </main>
  );
}
