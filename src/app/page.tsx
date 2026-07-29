import { Hero } from "@/components/home/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
