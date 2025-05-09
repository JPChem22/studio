import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPaste, FileText, Sparkles, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: ClipboardPaste,
    title: 'Paste Job Details',
    description: 'Provide the job description for the role you\'re targeting.',
  },
  {
    icon: FileText,
    title: 'Provide Your Resume',
    description: 'Share your current resume for our AI to analyze and enhance.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Tailoring',
    description: 'Our advanced AI customizes your resume to highlight relevant skills and experience.',
  },
  {
    icon: CheckCircle,
    title: 'Get Your Documents',
    description: 'Receive a tailored resume and a compelling cover letter, ready to impress.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-12 text-primary">
          Simple Steps to a <span className="text-accent">Standout Application</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardHeader>
                <div className="mx-auto bg-accent/20 text-accent p-4 rounded-full w-fit mb-4">
                  <step.icon className="h-10 w-10" />
                </div>
                <CardTitle className="font-sans text-xl text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
