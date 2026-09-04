import { NextResponse } from "next/server";

const defaultCompetencies = [
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

export async function GET() {
  try {
    const competencyResponse = await fetch(
      "http://localhost:3000/api/competency",
      {
        cache: "no-store",
      }
    );

    if (!competencyResponse.ok) {
      throw new Error("Failed to fetch competency data.");
    }

    const competencyResult =
      await competencyResponse.json();

    const competencies = competencyResult.data;

    const skillGaps = competencies.map(
      (competency: {
        id: number;
        name: string;
        category: string;
        currentLevel: number;
        targetLevel: number;
        gap: number;
      }) => ({
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
        a: { gap: number },
        b: { gap: number }
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

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate skill gap analysis.",
        data: defaultCompetencies.map(
          (competency) => ({
            ...competency,
            gap:
              competency.targetLevel -
              competency.currentLevel,
          })
        ),
      },
      {
        status: 500,
      }
    );
  }
}