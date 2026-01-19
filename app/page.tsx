import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { SearchSection } from "@/components/SearchSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <SearchSection />
    </main>
  );
}
