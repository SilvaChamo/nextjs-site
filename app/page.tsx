
import { HomeHeaderSection } from "@/components/HomeHeaderSection";
import { InfoSection } from "@/components/InfoSection";
import { CategoriesShowcase } from "@/components/CategoriesShowcase";
import { CommunityBanner } from "@/components/CommunityBanner";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { MobileAppSection } from "@/components/MobileAppSection";
import { AgroCastSection } from "@/components/AgroCastSection";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Parallel Data Fetching
  const [statsResult, companiesResult] = await Promise.all([
    supabase.from('dashboard_indicators').select('slug, value, trend').eq('location', 'hero'),
    supabase.from('companies').select('id, name, slug, category, location, logo_url').limit(3)
  ]);

  // Process Stats
  const stats = statsResult.data
    ? statsResult.data.reduce((acc: any, item) => {
      acc[item.slug] = item;
      return acc;
    }, {})
    : {};

  // Process Companies
  const companies = companiesResult.data
    ? companiesResult.data.map(c => ({
      title: c.name,
      slug: c.slug,
      sub: c.category,
      location: c.location,
      logo: c.logo_url,
      // icon property removed. Client component handles fallback.
    }))
    : [];

  return (
    <main className="min-h-screen bg-transparent">
      <HomeHeaderSection stats={stats} />
      <CategoriesShowcase companies={companies} />
      <CommunityBanner />
      <WhyChooseUs />
      <InfoSection />
      {/* <AgroCastSection /> moved to /design-system/podcast */}
      <MobileAppSection />
    </main>
  );
}
