import { NextResponse } from "next/server";

type Competency = {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
};

export async function GET(request: Request) {
  try {
    // Get the current website origin
    const origin = new URL(request.url).origin;

    // Fetch dynamic competency data
    const response = await fetch(
      `${origin}/api/competency`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch competency data."
      );
    }

    const result = await response.json();

    const competencies: Competency[] =
      result.data || [];

    if (competencies.length === 0) {
      return NextResponse.json({
        success: false,
        message:
          "No competency data available.",
      });
    }

    // Calculate overall competency score
    const overallScore = Math.round(
      competencies.reduce(
        (total, skill) =>
          total + skill.currentLevel,
        0
      ) / competencies.length
    );

    // Strongest skill
    const strongestSkill = competencies.reduce(
      (strongest, current) =>
        current.currentLevel >
        strongest.currentLevel
          ? current
          : strongest
    );

    // Weakest skill
    const weakestSkill = competencies.reduce(
      (weakest, current) =>
        current.currentLevel <
        weakest.currentLevel
          ? current
          : weakest
    );

    // Highest skill gap
    const highestGapSkill = competencies.reduce(
      (highest, current) =>
        current.gap > highest.gap
          ? current
          : highest
    );

    // Sort skills by highest gap
    const prioritySkills = [...competencies]
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3);

    // Calculate average target level
    const averageTargetLevel =
      competencies.reduce(
        (total, skill) =>
          total + skill.targetLevel,
        0
      ) / competencies.length;

    // Professional readiness score
    const readinessScore = Math.round(
      (overallScore / averageTargetLevel) *
        100
    );

    // Prevent score above 100
    const finalReadinessScore = Math.min(
      readinessScore,
      100
    );

    // AI Insight
    let aiInsight = "";

    if (highestGapSkill.gap >= 30) {
      aiInsight = `Your highest-priority development area is ${highestGapSkill.name}. Your current competency level is ${highestGapSkill.currentLevel}%, while your target level is ${highestGapSkill.targetLevel}%. Focused learning in this area can significantly improve your professional readiness.`;
    } else if (highestGapSkill.gap >= 15) {
      aiInsight = `You have a moderate competency gap in ${highestGapSkill.name}. Strengthening this skill should be your next learning priority.`;
    } else {
      aiInsight =
        "Your competency profile is well balanced. Continue focused learning to close the remaining skill gaps.";
    }

    return NextResponse.json({
      success: true,

      data: {
        overallScore,

        readinessScore:
          finalReadinessScore,

        strongestSkill,

        weakestSkill,

        highestGapSkill,

        prioritySkills,

        competencies,

        aiInsight,

        totalSkills:
          competencies.length,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate dashboard data.",
      },
      {
        status: 500,
      }
    );
  }
}