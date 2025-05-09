// The tailorResume function allows users to tailor their resume to match a job description.
// It takes a resume and a job description as input, and returns a tailored resume.
// - tailorResume - A function that handles the resume tailoring process.
// - TailorResumeInput - The input type for the tailorResume function.
// - TailorResumeOutput - The return type for the tailorResume function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeInputSchema = z.object({
  resume: z
    .string()
    .describe('The resume to tailor.'),
  jobDescription: z.string().describe('The job description to tailor the resume to.'),
});

export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  tailoredResume: z.string().describe('The tailored resume.'),
});

export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;

export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  return tailorResumeFlow(input);
}

const relevantContentTool = ai.defineTool({
  name: 'extractRelevantContent',
  description: 'Extracts relevant content from a resume based on a job description to highlight key skills and experiences.',
  inputSchema: z.object({
    resume: z.string().describe('The resume to extract content from.'),
    jobDescription: z.string().describe('The job description to use for extracting content.'),
  }),
  outputSchema: z.string().describe('The relevant content extracted from the resume, structured to highlight alignment with the job description.'),
},
async (input) => {
  // This is a placeholder. In a real scenario, this tool would use NLP or other methods
  // to analyze both texts and extract/summarize relevant parts of the resume.
  // For now, it can just acknowledge the inputs.
  return `Identified key overlaps between the resume and the job description: ${input.jobDescription.substring(0,100)}... based on resume content. Focus on skills X, Y, Z.`;
}
);

const prompt = ai.definePrompt({
  name: 'tailorResumePrompt',
  input: {schema: TailorResumeInputSchema},
  output: {schema: TailorResumeOutputSchema},
  tools: [relevantContentTool],
  prompt: `You are an expert resume writer and career coach. Your task is to meticulously tailor the provided resume to align perfectly with the given job description.
The goal is to create a highly impactful document that will impress recruiters and pass through Applicant Tracking Systems (ATS).

Follow these critical instructions for tailoring the resume:

1.  **Objective/Summary Statement**:
    *   The resume MUST begin with a clear, concise, and compelling objective or summary statement.
    *   If an objective/summary statement exists, critically evaluate and rewrite it to be laser-focused on the specific requirements and keywords found in the job description.
    *   If no objective/summary statement is present, create a powerful one that immediately highlights the candidate's most relevant qualifications and career aspirations for THIS role.

2.  **Resume Headings**:
    *   Standardize all resume headings for optimal clarity, readability, and professional appeal.
    *   Use common, universally recognized headings such as 'Objective' (or 'Summary'), 'Work Experience' (or 'Professional Experience'), 'Projects', 'Education', 'Skills'. Ensure consistency in formatting (e.g., capitalization, bolding) for all headings.

3.  **Bullet Points (STAR Method)**:
    *   For EVERY bullet point under 'Work Experience', 'Projects', or similar sections detailing accomplishments, you MUST rewrite it to strictly adhere to the STAR (Situation, Task, Action, Result) method.
        *   **Situation**: Briefly set the context or describe the challenge.
        *   **Task**: Clearly articulate your specific responsibility, goal, or what was required of you in that situation.
        *   **Action**: Detail the specific steps and actions YOU took to address the task or challenge. Start with strong, dynamic action verbs.
        *   **Result**: Quantify the outcomes and impact of your actions whenever possible. Use numbers, percentages, metrics, or specific achievements to demonstrate value.
    *   **Example Transformation**:
        *   Original: "Responsible for managing social media."
        *   STAR Method (target format): "Managed 5 corporate social media accounts (Facebook, Twitter, Instagram, LinkedIn, TikTok) [Action], in a fast-paced startup environment facing declining engagement [Situation], tasked with reversing this trend and increasing brand visibility [Task], resulting in a 25% increase in overall engagement and 15% follower growth within 6 months by developing and implementing a data-driven content strategy incorporating A/B tested campaigns and influencer collaborations [Result & further Action detail]."
    *   If the original resume lacks specific details for a full STAR bullet, use the \`extractRelevantContent\` tool to identify potentially relevant information or, if necessary, make well-reasoned inferences based on the job description and the resume content to construct a plausible and impactful STAR-formatted bullet point. The aim is to make the candidate shine.

4.  **Content Relevance and Keyword Optimization**:
    *   Utilize the \`extractRelevantContent\` tool to identify and prioritize skills, experiences, and achievements from the resume that are most relevant to the job description.
    *   Subtly integrate keywords from the job description throughout the resume, especially in the objective/summary, skills section, and STAR bullet points, ensuring natural language and avoiding keyword stuffing.

Format the entire output as a complete, ready-to-use resume text.

Resume:
{{{resume}}}

Job Description:
{{{jobDescription}}}

Tailored Resume:`,
});

const tailorResumeFlow = ai.defineFlow(
  {
    name: 'tailorResumeFlow',
    inputSchema: TailorResumeInputSchema,
    outputSchema: TailorResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
