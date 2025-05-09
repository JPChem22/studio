import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PricingSection from "@/components/sections/PricingSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <section className="py-16 md:py-24 text-center bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6 text-primary">
            Ready to Elevate Your Job Applications?
          </h2>
          <p className="text-lg text-foreground mb-10 max-w-xl mx-auto">
            Stop sending generic resumes. Start impressing employers with applications tailored by IntelliApply.
          </p>
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-lg">
            <Link href="/generate">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
