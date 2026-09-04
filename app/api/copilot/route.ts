import { NextResponse } from "next/server";

type CopilotAction = {
  label: string;
  href: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message?.toLowerCase().trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a message.",
        },
        { status: 400 }
      );
    }

    let response = "";
    let actions: CopilotAction[] = [];

    // Learning recommendation
    if (
      message.includes("what should i learn") ||
      message.includes("what to learn") ||
      message.includes("learn first") ||
      message.includes("start learning")
    ) {
      response =
        "Based on your competency analysis, start with your highest-priority skill gap. Focus on the area where your current competency is farthest from your target level.";

      actions = [
        {
          label: "View Learning Path →",
          href: "/learning-path",
        },
        {
          label: "View Skill Gaps →",
          href: "/skill-gap",
        },
      ];
    }

    // Skill gap analysis
    else if (
      message.includes("skill gap") ||
      message.includes("weakest skill") ||
      message.includes("weakness")
    ) {
      response =
        "Your Skill Gap Analysis identifies the competencies that need the most attention. You should prioritize skills with the largest gap between your current and target competency levels.";

      actions = [
        {
          label: "View Skill Gap Analysis →",
          href: "/skill-gap",
        },
      ];
    }

    // Learning path
    else if (
      message.includes("learning path") ||
      message.includes("learning plan") ||
      message.includes("my path")
    ) {
      response =
        "Your personalized learning path is generated based on your competency gaps and priority skills. Start with the highest-priority area and progress step by step.";

      actions = [
        {
          label: "Open Learning Path →",
          href: "/learning-path",
        },
      ];
    }

    // Assessment
    else if (
      message.includes("assessment") ||
      message.includes("quiz") ||
      message.includes("test")
    ) {
      response =
        "You can take an AI-generated assessment based on your learning material. Your results help analyze your competency level and identify skill gaps.";

      actions = [
        {
          label: "Take Assessment →",
          href: "/quiz",
        },
      ];
    }

    // Dashboard
    else if (
      message.includes("dashboard") ||
      message.includes("overview") ||
      message.includes("progress")
    ) {
      response =
        "Your dashboard provides an overview of your overall competency, priority skill gaps, learning progress, and AI recommendations.";

      actions = [
        {
          label: "Go to Dashboard →",
          href: "/dashboard",
        },
      ];
    }

    // Default response
    else {
      response =
        "I can help you understand your competency profile, identify skill gaps, choose what to learn next, explore your learning path, or start an assessment.";

      actions = [
        {
          label: "View Dashboard →",
          href: "/dashboard",
        },
        {
          label: "View Skill Gaps →",
          href: "/skill-gap",
        },
        {
          label: "Learning Path →",
          href: "/learning-path",
        },
        {
          label: "Take Assessment →",
          href: "/quiz",
        },
      ];
    }

    return NextResponse.json({
      success: true,
      response,
      actions,
    });
  } catch (error) {
    console.error("Copilot API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process your request.",
      },
      { status: 500 }
    );
  }
}