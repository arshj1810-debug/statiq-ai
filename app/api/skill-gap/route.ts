import { NextResponse } from "next/server";

type Competency = {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap?: number;
};

const defaultCompetencies: Competency[] = [
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

export async function GET(request: Request) {
  try {
    // Get the current website origin dynamically.
    // This works both locally and on Vercel.
    const origin = new URL(request.url).origin;

    const competencyResponse = await fetch(
      `${origin}/api/competency`,
      {
        cache: "no-store",
      }
    );

    if (!competencyResponse.ok) {
      throw new Error("Failed to fetch competency data.");
    }

    const competencyResult = await competencyResponse.json();

    if (
      !competencyResult.success ||
      !Array.isArray(competencyResult.data)
    ) {
      throw new Error("Invalid competency data received.");
    }

    const competencies: Competency[] =
      competencyResult.data;

    const skillGaps = competencies.map(
      (competency: Competency) => ({
        id: competency.id,
        name: competency.name,
        category: competency.category,
        currentLevel: competency.currentLevel,
        targetLevel: competency.targetLevel,
        gap: Math.max(
          0,
          competency.targetLevel -
            competency.currentLevel
        ),
      })
    );

    // Sort largest skill gap first
    skillGaps.sort(
      (
        a: (typeof skillGaps)[number],
        b: (typeof skillGaps)[number]
      ) => b.gap - a.gap
    );

    return NextResponse.json({
      success: true,
      total: skillGaps.length,
      data: skillGaps,
    });
  } catch (error) {
    console.error(
      "Skill Gap Analysis Error:",
      error
    );

    const fallbackData = defaultCompetencies
      .map((competency: Competency) => ({
        id: competency.id,
        name: competency.name,
        category: competency.category,
        currentLevel: competency.currentLevel,
        targetLevel: competency.targetLevel,
        gap: Math.max(
          0,
          competency.targetLevel -
            competency.currentLevel
        ),
      }))
      .sort(
        (
          a: {
            gap: number;
          },
          b: {
            gap: number;
          }
        ) => b.gap - a.gap
      );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate dynamic skill gap analysis. Showing default competency data.",
        total: fallbackData.length,
        data: fallbackData,
      },
      {
        status: 500,
      }
    );
  }
}