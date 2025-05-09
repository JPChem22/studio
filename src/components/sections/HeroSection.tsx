import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-card rounded-lg shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 z-0">
        <Image 
          src="https://picsum.photos/1600/900" 
          alt="Abstract background" 
          layout="fill" 
          objectFit="cover"
          data-ai-hint="office background"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6 text-primary">
          Land Your Dream Job with <span className="text-accent">AI-Powered</span> Applications
        </h1>
        <p className="text-lg md:text-xl text-foreground mb-10 max-w-3xl mx-auto">
          IntelliApply crafts perfectly tailored resumes and compelling cover letters in seconds, helping you stand out to employers.
        </p>
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-lg">
          <Link href="/generate">Tailor Your Application Now</Link>
        </Button>
      </div>
    </section>
  );
}
