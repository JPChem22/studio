"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Sparkles, FileText, Mail } from 'lucide-react';
import { tailorResume, TailorResumeInput, TailorResumeOutput } from '@/ai/flows/tailor-resume';
import { generateCoverLetter, GenerateCoverLetterInput, GenerateCoverLetterOutput } from '@/ai/flows/generate-cover-letter';
import { useToast } from "@/hooks/use-toast";
import CopyButton from '@/components/common/CopyButton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }),
  resume: z.string().min(100, { message: "Resume content must be at least 100 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function GeneratePage() {
  const [tailoredResumeResult, setTailoredResumeResult] = useState<string | null>(null);
  const [coverLetterResult, setCoverLetterResult] = useState<string | null>(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [isLoadingCoverLetter, setIsLoadingCoverLetter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
      resume: "",
    },
  });

  const handleTailorResume: SubmitHandler<FormData> = async (data) => {
    setIsLoadingResume(true);
    setError(null);
    setTailoredResumeResult(null);
    setCoverLetterResult(null); // Reset cover letter if re-tailoring resume

    try {
      const input: TailorResumeInput = {
        jobDescription: data.jobDescription,
        resume: data.resume,
      };
      const result: TailorResumeOutput = await tailorResume(input);
      setTailoredResumeResult(result.tailoredResume);
      toast({ title: "Resume Tailored!", description: "Your resume has been successfully tailored." });
    } catch (e: any) {
      console.error("Error tailoring resume:", e);
      setError(`Failed to tailor resume: ${e.message}`);
      toast({ title: "Error", description: `Failed to tailor resume: ${e.message}`, variant: "destructive" });
    } finally {
      setIsLoadingResume(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!tailoredResumeResult || !form.getValues("jobDescription")) {
      setError("Tailored resume and job description are required to generate a cover letter.");
      toast({ title: "Missing Information", description: "Please tailor your resume and ensure job description is filled.", variant: "destructive"});
      return;
    }
    setIsLoadingCoverLetter(true);
    setError(null);
    setCoverLetterResult(null);

    try {
      const input: GenerateCoverLetterInput = {
        tailoredResume: tailoredResumeResult,
        jobDescription: form.getValues("jobDescription"),
      };
      const result: GenerateCoverLetterOutput = await generateCoverLetter(input);
      setCoverLetterResult(result.coverLetter);
      toast({ title: "Cover Letter Generated!", description: "Your cover letter has been successfully generated." });
    } catch (e: any) {
      console.error("Error generating cover letter:", e);
      setError(`Failed to generate cover letter: ${e.message}`);
      toast({ title: "Error", description: `Failed to generate cover letter: ${e.message}`, variant: "destructive" });
    } finally {
      setIsLoadingCoverLetter(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-sans text-3xl text-primary flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" />
            AI Application Assistant
          </CardTitle>
          <CardDescription>
            Provide your current resume and the job description for the role you're applying for. Our AI will help you tailor your application!
             Each generation (resume tailoring or cover letter creation) costs $0.50.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleTailorResume)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-foreground">Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full job description here..."
                        rows={8}
                        className="bg-background focus:ring-accent focus:border-accent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-foreground">Your Current Resume</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your current resume content here..."
                        rows={12}
                        className="bg-background focus:ring-accent focus:border-accent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isLoadingResume || isLoadingCoverLetter} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoadingResume ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Tailor Resume
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="shadow-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {tailoredResumeResult && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-sans text-2xl text-primary flex items-center gap-2">
              <FileText className="h-6 w-6 text-accent" />
              Tailored Resume
            </CardTitle>
            <CardDescription>Your AI-tailored resume is ready. Review it and then generate a cover letter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={tailoredResumeResult} readOnly rows={15} className="bg-muted/30 border-muted-foreground/30" />
            <div className="flex flex-col sm:flex-row gap-2">
                <CopyButton textToCopy={tailoredResumeResult} buttonText="Copy Tailored Resume" className="flex-grow" />
                <Button onClick={handleGenerateCoverLetter} disabled={isLoadingCoverLetter || isLoadingResume} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground flex-grow">
                {isLoadingCoverLetter ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Mail className="mr-2 h-4 w-4" />
                )}
                Generate Cover Letter
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {coverLetterResult && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-sans text-2xl text-primary flex items-center gap-2">
                <Mail className="h-6 w-6 text-accent" />
                Generated Cover Letter
            </CardTitle>
            <CardDescription>Your AI-generated cover letter. Copy it and use it for your application!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Textarea value={coverLetterResult} readOnly rows={15} className="bg-muted/30 border-muted-foreground/30" />
            <CopyButton textToCopy={coverLetterResult} buttonText="Copy Cover Letter" className="w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
