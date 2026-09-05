import { NextRequest, NextResponse } from "next/server";

type SkillGap = {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
};

type LearningModule = {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
};

const learningResources: Record<string, LearningModule[]> = {
  "Statistical Analysis": [
    {
      id: 1,
      title: "Statistical Foundations",
      description:
        "Strengthen your understanding of descriptive statistics, probability, and data interpretation.",
      level: "Beginner",
      duration: "2 Hours",
    },
    {
      id: 2,
      title: "Advanced Statistical Methods",
      description:
        "Learn hypothesis testing, regression, correlation, and advanced analytical techniques.",
      level: "Intermediate",
      duration: "4 Hours",
    },
  ],

  Python: [
    {
      id: 1,
      title: "Python Programming Fundamentals",
      description:
        "Learn Python syntax, variables, data types, conditions, loops, and functions.",
      level: "Beginner",
      duration: "3 Hours",
    },
    {
      id: 2,
      title: "Python for Data Analysis",
      description:
        "Use Python for data processing, analysis, and automation.",
      level: "Intermediate",
      duration: "5 Hours",
    },
  ],

  "SQL & Databases": [
    {
      id: 1,
      title: "SQL Fundamentals",
      description:
        "Learn SELECT queries, filtering, sorting, and database fundamentals.",
      level: "Beginner",
      duration: "3 Hours",
    },
    {
      id: 2,
      title: "Advanced SQL Queries",
      description:
        "Practice joins, aggregations, subqueries, and complex database operations.",
      level: "Intermediate",
      duration: "4 Hours",
    },
  ],

  "Data Visualization": [
    {
      id: 1,
      title: "Data Visualization Fundamentals",
      description:
        "Learn how to transform data into meaningful charts and visual insights.",
      level: "Beginner",
      duration: "2 Hours",
    },
    {
      id: 2,
      title: "Advanced Data Storytelling",
      description:
        "Learn dashboard design, storytelling, and communicating insights effectively.",
      level: "Intermediate",
      duration: "4 Hours",
    },
  ],

  "AI & Machine Learning": [
    {
      id: 1,
      title: "Introduction to Artificial Intelligence",
      description:
        "Understand the foundations of AI, machine learning, and intelligent systems.",
      level: "Beginner",
      duration: "3 Hours",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      description:
        "Learn supervised learning, model training, evaluation, and prediction.",
      level: "Intermediate",
      duration: "5 Hours",
    },
  ],

  "Digital Governance": [
    {
      id: 1,
      title: "Digital Governance Fundamentals",
      description:
        "Understand digital public services, governance frameworks, and technology-enabled administration.",
      level: "Beginner",
      duration: "3 Hours",
    },
    {
      id: 2,
      title: "Digital Transformation in Government",
      description:
        "Explore digital transformation strategies and technology-driven public service delivery.",
      level: "Intermediate",
      duration: "4 Hours",
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    // Get the current website URL dynamically.
    // This works both locally and after deployment on Vercel.
    const host = request.headers.get("host");

    if (!host) {
      throw new Error("Unable to determine application host.");
    }

    const protocol =
      process.env.NODE_ENV === "development"
        ? "http"
        : "https";

    const baseUrl = `${protocol}://${host}`;

    // Fetch dynamic skill gap data
    const skillGapResponse = await fetch(
      `${baseUrl}/api/skill-gap`,
      {
        cache: "no-store",
      }
    );

    if (!skillGapResponse.ok) {
      throw new Error(
        "Failed to fetch skill gap analysis."
      );
    }

    const skillGapResult =
      await skillGapResponse.json();

    const skillGaps: SkillGap[] =
      Array.isArray(skillGapResult.data)
        ? skillGapResult.data
        : [];

    // Only include skills with a gap
    const prioritySkills = skillGaps
      .filter((skill) => skill.gap > 0)
      .sort((a, b) => b.gap - a.gap);

    // Generate personalized learning path
    const learningPath = prioritySkills.map(
      (skill, index) => ({
        step: index + 1,

        skill: skill.name,

        category: skill.category,

        currentLevel: skill.currentLevel,

        targetLevel: skill.targetLevel,

        gap: skill.gap,

        priority:
          skill.gap >= 30
            ? "Critical"
            : skill.gap >= 20
            ? "High"
            : skill.gap >= 10
            ? "Medium"
            : "Low",

        modules:
          learningResources[skill.name] || [],
      })
    );

    return NextResponse.json({
      success: true,

      totalSkills: learningPath.length,

      data: learningPath,
    });
  } catch (error) {
    console.error(
      "Learning Path Generation Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to generate personalized learning path.",
      },
      {
        status: 500,
      }
    );
  }
}