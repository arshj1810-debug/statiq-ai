import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Import PDF parser directly
const pdf = require("pdf-parse/lib/pdf-parse.js");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Maximum allowed PDF size: 4 MB
const MAX_FILE_SIZE = 4 * 1024 * 1024;

// Maximum extracted characters sent to Groq
const MAX_TEXT_LENGTH = 15000;

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

// Question returned by AI
type GeneratedQuestion = {
  skill?: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

// Final validated question
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

    // 2. Check if file exists
    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No PDF file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    // 3. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PDF is too large. Please upload a PDF smaller than 4 MB.",
        },
        {
          status: 413,
        }
      );
    }

    // 4. Validate PDF type
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a valid PDF file.",
        },
        {
          status: 400,
        }
      );
    }

    console.log("PDF received:", file.name);
    console.log(
      "PDF size:",
      (file.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    // 5. Convert PDF to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 6. Extract text from PDF
    console.log("Extracting text from PDF...");

    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    console.log(
      "Extracted text length:",
      extractedText?.length || 0
    );

    // 7. Validate extracted text
    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not extract enough text from this PDF. Please upload a text-based PDF.",
        },
        {
          status: 400,
        }
      );
    }

    // 8. Clean and limit PDF content
    const content = extractedText
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_TEXT_LENGTH);

    console.log(
      "Characters sent to Groq:",
      content.length
    );

    // 9. Check Groq API key
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "GROQ_API_KEY is missing. Check your environment variables.",
        },
        {
          status: 500,
        }
      );
    }

    console.log("Groq API key found.");

    // 10. Initialize Groq
    const groq = new Groq({
      apiKey,
    });

    // 11. Create AI prompt
    const prompt = `
You are an AI assessment generator for a learning platform called StatiqAI.

Analyze the learning material below and generate exactly 5 high-quality multiple-choice questions.

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

- Use ONLY information from the provided learning material.
- Generate exactly 5 questions.
- Each question must have exactly 4 options.
- Only ONE option must be correct.
- The correctAnswer must exactly match one of the options.
- Questions should test understanding, not just memorization.
- Assign the most relevant skill to every question.
- The skill value MUST exactly match one of the allowed skill categories.
- If no specific category matches, use "General".
- Do not include explanations.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap the response in triple backticks.

Return exactly this JSON format:

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

LEARNING MATERIAL:

${content}
`;

    console.log("Sending content to Groq...");

    // 12. Generate quiz using Groq
    const completion =
      await groq.chat.completions.create({
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

    // 13. Get AI response
    const responseText =
      completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error(
        "Groq returned an empty response."
      );
    }

    console.log("Raw Groq response:", responseText);

    // 14. Clean AI response
    const cleanedText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 15. Parse JSON
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

    // 16. Validate question structure
    if (
      !generatedData.questions ||
      !Array.isArray(generatedData.questions)
    ) {
      throw new Error(
        "Invalid question format received from AI."
      );
    }

    // Must receive at least 5 questions
    if (generatedData.questions.length < 5) {
      throw new Error(
        `Expected 5 questions but received ${generatedData.questions.length}.`
      );
    }

    // Use only first 5 questions
    const generatedQuestions =
      generatedData.questions.slice(0, 5);

    // 17. Validate questions and add IDs
    const questions: QuizQuestion[] =
      generatedQuestions.map(
        (
          question: GeneratedQuestion,
          index: number
        ) => {
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

          // Validate all options
          const validOptions =
            question.options.every(
              (option) =>
                typeof option === "string" &&
                option.trim().length > 0
            );

          if (!validOptions) {
            throw new Error(
              `Question ${
                index + 1
              } contains invalid options.`
            );
          }

          const cleanedOptions =
            question.options.map((option) =>
              option.trim()
            );

          const cleanedCorrectAnswer =
            question.correctAnswer.trim();

          // Validate correct answer
          if (
            !cleanedOptions.includes(
              cleanedCorrectAnswer
            )
          ) {
            throw new Error(
              `Correct answer does not match an option in question ${
                index + 1
              }.`
            );
          }

          // Validate skill
          const receivedSkill =
            question.skill?.trim() || "General";

          const skill: AllowedSkill =
            ALLOWED_SKILLS.includes(
              receivedSkill as AllowedSkill
            )
              ? (receivedSkill as AllowedSkill)
              : "General";

          if (
            skill === "General" &&
            receivedSkill !== "General"
          ) {
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
            options: cleanedOptions,
            correctAnswer:
              cleanedCorrectAnswer,
          };
        }
      );

    // 18. Final validation
    if (questions.length !== 5) {
      throw new Error(
        `Expected exactly 5 questions but received ${questions.length}.`
      );
    }

    console.log("Quiz generated successfully!");
    console.log(
      "Generated questions:",
      questions
    );

    // 19. Return quiz
    return NextResponse.json({
      success: true,
      total: questions.length,
      data: questions,

      extractedCharacters:
        extractedText.length,

      analyzedCharacters:
        content.length,
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

    // Handle Groq/API errors
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error
    ) {
      console.error(
        "API error status:",
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