import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      score,
      totalQuestions,
      percentage,
      questions,
    } = body;

    if (
      typeof score !== "number" ||
      typeof totalQuestions !== "number" ||
      typeof percentage !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid assessment result data.",
        },
        { status: 400 }
      );
    }

    // Analyze correct and incorrect answers
    const correctAnswers =
      questions?.filter(
        (question: {
          selectedAnswer: string;
          correctAnswer: string;
        }) =>
          question.selectedAnswer === question.correctAnswer
      ) || [];

    const incorrectAnswers =
      questions?.filter(
        (question: {
          selectedAnswer: string;
          correctAnswer: string;
        }) =>
          question.selectedAnswer !== question.correctAnswer
      ) || [];

    console.log("Assessment Result Received:");

    console.log({
      score,
      totalQuestions,
      percentage,
      correctAnswers: correctAnswers.length,
      incorrectAnswers: incorrectAnswers.length,
    });

    // Temporary competency calculation
    const competencyLevel = percentage;

    let performanceLevel = "";

    if (percentage >= 80) {
      performanceLevel = "Advanced";
    } else if (percentage >= 60) {
      performanceLevel = "Intermediate";
    } else if (percentage >= 40) {
      performanceLevel = "Developing";
    } else {
      performanceLevel = "Beginner";
    }

    return NextResponse.json({
      success: true,

      data: {
        score,
        totalQuestions,
        percentage,

        competencyLevel,

        performanceLevel,

        correctAnswers: correctAnswers.length,

        incorrectAnswers: incorrectAnswers.length,

        message:
          percentage >= 80
            ? "Excellent performance! Your competency level has been updated."
            : percentage >= 60
            ? "Good performance! Continue learning to strengthen your skills."
            : "More learning is recommended to improve your competency.",
      },
    });
  } catch (error) {
    console.error("Assessment result error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process assessment result.",
      },
      {
        status: 500,
      }
    );
  }
}