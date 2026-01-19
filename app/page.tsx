import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SearchSection />
    </main>
  );
}
