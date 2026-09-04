import { NextResponse } from "next/server";

const quizzes = [
  {
    id: 1,
    skill: "Python",
    question: "Which data type is used to store a sequence of values in Python?",
    options: ["List", "Integer", "Boolean", "Float"],
    correctAnswer: "List",
  },
  {
    id: 2,
    skill: "Python",
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "func", "define"],
    correctAnswer: "def",
  },
  {
    id: 3,
    skill: "Python",
    question: "Which library is commonly used for data analysis in Python?",
    options: ["Pandas", "Express", "Laravel", "Spring"],
    correctAnswer: "Pandas",
  },
  {
    id: 4,
    skill: "Python",
    question: "What does len() return in Python?",
    options: [
      "The length of an object",
      "The data type",
      "The memory size",
      "The last value",
    ],
    correctAnswer: "The length of an object",
  },
  {
    id: 5,
    skill: "Python",
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/*", "--"],
    correctAnswer: "#",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: quizzes.length,
    data: quizzes,
  });
}