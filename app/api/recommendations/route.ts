import { NextResponse } from "next/server";

const recommendations = [
  {
    id: 1,
    skill: "AI & Machine Learning",
    priority: "Critical",
    reason: "Large competency gap detected in a high-demand emerging technology.",
    courses: [
      {
        title: "Introduction to Artificial Intelligence",
        provider: "iGOT Karmayogi",
        duration: "8 Hours",
        level: "Beginner",
      },
      {
        title: "Machine Learning Fundamentals",
        provider: "iGOT Karmayogi",
        duration: "12 Hours",
        level: "Intermediate",
      },
    ],
  },
  {
    id: 2,
    skill: "Python",
    priority: "High",
    reason: "Python skills are required for modern statistical analysis and automation.",
    courses: [
      {
        title: "Python for Data Analysis",
        provider: "iGOT Karmayogi",
        duration: "10 Hours",
        level: "Beginner",
      },
      {
        title: "Data Analysis with Python",
        provider: "TPAC Recommended Program",
        duration: "15 Hours",
        level: "Intermediate",
      },
    ],
  },
  {
    id: 3,
    skill: "SQL & Databases",
    priority: "Medium",
    reason: "Improving database skills will support efficient data management and analysis.",
    courses: [
      {
        title: "SQL Fundamentals",
        provider: "iGOT Karmayogi",
        duration: "6 Hours",
        level: "Beginner",
      },
    ],
  },
  {
    id: 4,
    skill: "Data Visualization",
    priority: "Medium",
    reason: "Visualization skills improve statistical communication and decision-making.",
    courses: [
      {
        title: "Data Visualization Principles",
        provider: "iGOT Karmayogi",
        duration: "5 Hours",
        level: "Intermediate",
      },
    ],
  },
];

export async function GET() {
  const totalCourses = recommendations.reduce(
    (total, item) => total + item.courses.length,
    0
  );

  return NextResponse.json({
    success: true,
    summary: {
      totalSkillGaps: recommendations.length,
      totalRecommendedCourses: totalCourses,
      personalizedFor: "Statistical Officer",
    },
    data: recommendations,
  });
}