import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-4 text-primary">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Get expertly tailored resumes and cover letters without subscriptions or hidden fees.
          Pay only for what you generate.
        </p>
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-xl border-2 border-accent bg-card">
            <CardHeader className="text-center pb-4">
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="font-sans text-3xl text-primary">Pay Per Generation</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                One-time payment for each set of documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="my-6">
                <span className="text-5xl font-bold font-sans text-accent">$1</span>
                <span className="text-muted-foreground"> / generation</span>
              </div>
              <ul className="space-y-2 text-left text-foreground mb-8">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  AI Tailored Resume
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  AI Generated Cover Letter
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  Optimized for ATS & Recruiters
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  Instant Text Output
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  Easy Copy-to-Clipboard
                </li>
                 <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  Editable Output
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 shadow-md" asChild>
                <Link href="/generate">Start Generating</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

