import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Import the actual PDF parser directly.
// This avoids pdf-parse loading its internal test files during build.
const pdf = require("pdf-parse/lib/pdf-parse.js");

export const runtime = "nodejs";

// Prevent this API route from being evaluated as static data
export const dynamic = "force-dynamic";

// Allowed competency categories
const ALLOWED_SKILLS = [
  "Statistical Analysis",
  "Python",
  "SQL & Databases",
  "Data Visualization",
  "AI & Machine Learning",
  "Digital Governance",
  "General",
] as const;

type AllowedSkill = (typeof ALLOWED_SKILLS)[number];

// Question type returned by AI
type GeneratedQuestion = {
  skill?: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizQuestion = {
  id: number;
  skill: AllowedSkill;
  question: string;
  options: string[];
  correctAnswer: string;
};

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Quiz generation API is ready. Use POST to upload a PDF.",
  });
}

export async function POST(request: Request) {
  try {
    // 1. Get uploaded file
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No PDF file uploaded.",
        },
        { status: 400 }
      );
    }

    // 2. Validate PDF
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a valid PDF file.",
        },
        { status: 400 }
      );
    }

    console.log("PDF received:", file.name);
    console.log("PDF size:", file.size);

    // 3. Convert PDF to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Extract text from PDF
    console.log("Extracting text from PDF...");

    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    console.log(
      "Extracted text length:",
      extractedText?.length || 0
    );

    // 5. Validate extracted text
    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not extract enough text from this PDF. Please upload a text-based PDF.",
        },
        { status: 400 }
      );
    }

    // 6. Check Groq API key
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "GROQ_API_KEY is missing. Check your environment variables.",
        },
        { status: 500 }
      );
    }

    console.log("Groq API key found.");

    // 7. Initialize Groq
    const groq = new Groq({
      apiKey,
    });

    // Limit PDF content
    const content = extractedText.slice(0, 25000);

    // 8. Create AI prompt
    const prompt = `
You are an AI assessment generator for a learning platform called StatiqAI.

Analyze the learning material extracted from the PDF below.

Generate exactly 5 high-quality multiple-choice questions.

IMPORTANT SKILL CATEGORIES:

For every question, assign exactly ONE skill from this list:

- Statistical Analysis
- Python
- SQL & Databases
- Data Visualization
- AI & Machine Learning
- Digital Governance
- General

RULES:

- Use ONLY information from the PDF content.
- Generate exactly 5 questions.
- Each question must have exactly 4 options.
- Only ONE option must be correct.
- The correctAnswer must exactly match one of the options.
- Questions should test understanding of the learning material.
- Assign the most relevant skill to every question.
- The skill value MUST exactly match one of the skill categories provided above.
- If no specific category matches, use "General".
- Do not include explanations.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap the response in triple backticks.

Return the response in exactly this format:

{
  "questions": [
    {
      "skill": "Python",
      "question": "Question text",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": "Correct option text"
    }
  ]
}

PDF CONTENT:

${content}
`;

    console.log("Sending PDF content to Groq...");

    // 9. Generate quiz with Groq
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content:
            "You are a precise AI assessment generator for StatiqAI. Return only valid JSON. Every question must include a skill field. The skill must be exactly one of: Statistical Analysis, Python, SQL & Databases, Data Visualization, AI & Machine Learning, Digital Governance, General.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.3,

      max_completion_tokens: 3000,

      response_format: {
        type: "json_object",
      },
    });

    console.log("Groq response received.");

    // 10. Get AI response
    const responseText =
      completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error(
        "Groq returned an empty response."
      );
    }

    console.log("Raw Groq response:", responseText);

    // 11. Clean response
    const cleanedText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 12. Parse JSON
    let generatedData: {
      questions: GeneratedQuestion[];
    };

    try {
      generatedData = JSON.parse(cleanedText);
    } catch (jsonError) {
      console.error(
        "JSON parse error:",
        jsonError
      );

      console.error(
        "Invalid AI response:",
        cleanedText
      );

      throw new Error(
        "AI did not return valid JSON."
      );
    }

    // 13. Validate AI response
    if (
      !generatedData.questions ||
      !Array.isArray(generatedData.questions)
    ) {
      throw new Error(
        "Invalid question format received from AI."
      );
    }

    // Must receive exactly 5 questions
    if (generatedData.questions.length < 5) {
      throw new Error(
        `Expected 5 questions but received ${generatedData.questions.length}.`
      );
    }

    // Use only the first 5 questions
    const generatedQuestions =
      generatedData.questions.slice(0, 5);

    // 14. Validate and add IDs
    const questions: QuizQuestion[] =
      generatedQuestions.map(
        (
          question: GeneratedQuestion,
          index: number
        ) => {
          // Validate question format
          if (
            !question.question ||
            typeof question.question !== "string" ||
            !Array.isArray(question.options) ||
            question.options.length !== 4 ||
            !question.correctAnswer ||
            typeof question.correctAnswer !== "string"
          ) {
            throw new Error(
              `Invalid format in question ${index + 1}.`
            );
          }

          // Make sure every option is valid
          const validOptions =
            question.options.every(
              (option) =>
                typeof option === "string" &&
                option.trim().length > 0
            );

          if (!validOptions) {
            throw new Error(
              `Question ${index + 1} contains invalid options.`
            );
          }

          // Make sure correct answer matches an option
          if (
            !question.options.includes(
              question.correctAnswer
            )
          ) {
            throw new Error(
              `Correct answer does not match an option in question ${
                index + 1
              }.`
            );
          }

          // Use AI skill or General as fallback
          const receivedSkill =
            question.skill?.trim() || "General";

          // Validate skill
          const skill: AllowedSkill =
            ALLOWED_SKILLS.includes(
              receivedSkill as AllowedSkill
            )
              ? (receivedSkill as AllowedSkill)
              : "General";

          if (skill === "General" && receivedSkill !== "General") {
            console.warn(
              `Invalid skill "${receivedSkill}" in question ${
                index + 1
              }. Using General instead.`
            );
          }

          return {
            id: index + 1,
            skill,
            question: question.question.trim(),
            options: question.options.map(
              (option) => option.trim()
            ),
            correctAnswer:
              question.correctAnswer.trim(),
          };
        }
      );

    // 15. Final safety check
    if (questions.length !== 5) {
      throw new Error(
        `Expected exactly 5 questions but received ${questions.length}.`
      );
    }

    console.log("Quiz generated successfully!");
    console.log("Generated questions:", questions);

    // 16. Return quiz
    return NextResponse.json({
      success: true,
      total: questions.length,
      data: questions,
      extractedCharacters: extractedText.length,
    });
  } catch (error: unknown) {
    console.error(
      "QUIZ GENERATION ERROR:",
      error
    );

    let message =
      "An unexpected error occurred while generating the quiz.";

    if (error instanceof Error) {
      message = error.message;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error
    ) {
      console.error(
        "Groq API error status:",
        error.status
      );
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }
}