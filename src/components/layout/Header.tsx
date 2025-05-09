import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-sans text-primary hover:text-accent transition-colors">
          <Briefcase className="h-7 w-7 text-accent" />
          IntelliApply
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="font-sans text-foreground hover:text-accent">Home</Link>
          </Button>
          <Button variant="default" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/generate" className="font-sans">Generate Documents</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
