import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, FileSignature, Target } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Resume Tailoring',
    description: 'Our AI analyzes job descriptions and your resume to highlight your most relevant skills and experiences, ensuring your application perfectly matches what employers are looking for.',
    image: 'https://picsum.photos/seed/resume/600/400',
    aiHint: 'resume analysis',
  },
  {
    icon: FileSignature,
    title: 'AI Cover Letter Generation',
    description: 'Based on your tailored resume and the job description, IntelliApply crafts a compelling cover letter that showcases your unique qualifications and enthusiasm for the role.',
    image: 'https://picsum.photos/seed/letter/600/400',
    aiHint: 'document writing',
  },
  {
    icon: Target,
    title: 'Optimized for Impact',
    description: 'Increase your chances of landing interviews with application documents designed to impress hiring managers and Applicant Tracking Systems (ATS).',
    image: 'https://picsum.photos/seed/impact/600/400',
    aiHint: 'career success',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-12 text-primary">
          Why Choose <span className="text-accent">IntelliApply?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card">
              <div className="relative h-48 w-full">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  layout="fill" 
                  objectFit="cover" 
                  data-ai-hint={feature.aiHint}
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className="h-8 w-8 text-accent" />
                  <CardTitle className="font-sans text-2xl text-primary">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-foreground text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
