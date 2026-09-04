import { NextResponse } from "next/server";

// Type for skill-wise quiz results
type SkillResult = {
  correct: number;
  total: number;
  percentage: number;
};

// Type for the latest quiz result
type QuizResult = {
  score: number;
  total: number;
  percentage: number;
  skillResults: Record<string, SkillResult>;
};

// Temporary in-memory storage
let latestQuizResult: QuizResult | null = null;

// Default competency data
const competencies = [
  {
    id: 1,
    name: "Statistical Analysis",
    category: "Statistical",
    currentLevel: 82,
    targetLevel: 90,
  },
  {
    id: 2,
    name: "Python",
    category: "Technical",
    currentLevel: 55,
    targetLevel: 85,
  },
  {
    id: 3,
    name: "SQL & Databases",
    category: "Technical",
    currentLevel: 62,
    targetLevel: 85,
  },
  {
    id: 4,
    name: "Data Visualization",
    category: "Technical",
    currentLevel: 70,
    targetLevel: 85,
  },
  {
    id: 5,
    name: "AI & Machine Learning",
    category: "Technical",
    currentLevel: 40,
    targetLevel: 80,
  },
  {
    id: 6,
    name: "Digital Governance",
    category: "Governance",
    currentLevel: 68,
    targetLevel: 80,
  },
];

// GET competency data
export async function GET() {
  const quizResult = latestQuizResult;

  // Update competency levels based on skill-wise quiz performance
  const updatedCompetencies = competencies.map((competency) => {
    let updatedCurrentLevel = competency.currentLevel;

    // Check whether the latest quiz contains this skill
    if (quizResult?.skillResults) {
      const skillResult =
        quizResult.skillResults[competency.name];

      // Update only if questions were generated for this skill
      if (skillResult && skillResult.total > 0) {
        updatedCurrentLevel = Math.min(
          Math.max(skillResult.percentage, 0),
          competency.targetLevel
        );
      }
    }

    return {
      ...competency,
      currentLevel: updatedCurrentLevel,
      gap: Math.max(
        0,
        competency.targetLevel - updatedCurrentLevel
      ),
    };
  });

  return NextResponse.json({
    success: true,
    total: updatedCompetencies.length,
    quizResult,
    data: updatedCompetencies,
  });
}

// POST latest quiz result
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      score,
      total,
      percentage,
      skillResults,
    } = body;

    // Validate overall quiz result
    if (
      typeof score !== "number" ||
      typeof total !== "number" ||
      typeof percentage !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quiz result data.",
        },
        { status: 400 }
      );
    }

    // Validate skillResults
    if (
      !skillResults ||
      typeof skillResults !== "object" ||
      Array.isArray(skillResults)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid skill-wise result data.",
        },
        { status: 400 }
      );
    }

    // Validate every skill result
    for (const skill of Object.keys(skillResults)) {
      const result = skillResults[skill];

      if (
        !result ||
        typeof result.correct !== "number" ||
        typeof result.total !== "number" ||
        typeof result.percentage !== "number"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid result data for skill: ${skill}`,
          },
          { status: 400 }
        );
      }
    }

    // Save latest quiz result
    latestQuizResult = {
      score,
      total,
      percentage,
      skillResults,
    };

    console.log("Quiz result saved successfully:");
    console.log(latestQuizResult);

    return NextResponse.json({
      success: true,
      message:
        "Quiz result and skill-wise competency data saved successfully.",
      data: latestQuizResult,
    });
  } catch (error) {
    console.error(
      "Failed to save quiz result:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save quiz result.",
      },
      { status: 500 }
    );
  }
}