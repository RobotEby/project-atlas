import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickStats } from "@/components/home/QuickStats";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LatestPosts } from "@/components/home/LatestPosts";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <QuickStats />
      <FeaturedProjects />
      <LatestPosts />
    </Layout>
  );
}
