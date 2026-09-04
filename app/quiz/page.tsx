"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import AICopilot from "@/components/AICopilot";

type Question = {
  id: number;
  skill?: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function QuizPage() {
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [extractedCharacters, setExtractedCharacters] = useState(0);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setExtractedCharacters(0);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please select a valid PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }

  async function handleGenerateQuiz() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setQuestions([]);
      setAnswers({});
      setSubmitted(false);
      setExtractedCharacters(0);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

      console.log("Server response:", responseText);

      if (!responseText.trim()) {
        throw new Error(
          `Server returned an empty response. Status: ${response.status}. Check the terminal running npm run dev.`
        );
      }

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
        data?: Question[];
        extractedCharacters?: number;
      };

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error("Invalid server response:", responseText);

        throw new Error(
          "Server returned an invalid response. Check the terminal running npm run dev."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            result.message ||
            `Failed to generate quiz. Status: ${response.status}`
        );
      }

      if (!Array.isArray(result.data) || result.data.length === 0) {
        throw new Error(
          "The server completed the analysis but did not return any questions."
        );
      }

      setQuestions(result.data);

      setExtractedCharacters(result.extractedCharacters ?? 0);

      console.log("Generated questions:", result.data);
    } catch (error) {
      console.error("Quiz generation error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate quiz."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(questionId: number, answer: string) {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  }

  // Submit quiz and save overall + skill-wise results
  async function handleSubmitQuiz() {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Calculate overall score
      const calculatedScore = questions.reduce((total, question) => {
        return answers[question.id] === question.correctAnswer
          ? total + 1
          : total;
      }, 0);

      const calculatedPercentage = Math.round(
        (calculatedScore / questions.length) * 100
      );

      // Group questions by skill
      const skillResults: Record<
        string,
        {
          correct: number;
          total: number;
          percentage: number;
        }
      > = {};

      questions.forEach((question) => {
        const skill = question.skill || "General";

        if (!skillResults[skill]) {
          skillResults[skill] = {
            correct: 0,
            total: 0,
            percentage: 0,
          };
        }

        skillResults[skill].total += 1;

        if (answers[question.id] === question.correctAnswer) {
          skillResults[skill].correct += 1;
        }
      });

      // Calculate percentage for every skill
      Object.keys(skillResults).forEach((skill) => {
        const skillData = skillResults[skill];

        skillData.percentage = Math.round(
          (skillData.correct / skillData.total) * 100
        );
      });

      console.log("Overall Quiz Result:", {
        score: calculatedScore,
        total: questions.length,
        percentage: calculatedPercentage,
      });

      console.log("Skill-wise Results:", skillResults);

      // Save quiz result and skill-wise competency scores
      const response = await fetch("/api/competency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: calculatedScore,
          total: questions.length,
          percentage: calculatedPercentage,
          skillResults,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to save quiz result."
        );
      }

      console.log(
        "Skill-wise quiz result saved successfully:",
        result
      );

      // Save detailed assessment result locally
      const assessmentResult = {
        score: calculatedScore,
        totalQuestions: questions.length,
        percentage: calculatedPercentage,
        completedAt: new Date().toISOString(),
        skillResults,

        questions: questions.map((question) => ({
          id: question.id,
          skill: question.skill || "General",
          question: question.question,
          selectedAnswer: answers[question.id],
          correctAnswer: question.correctAnswer,
          isCorrect:
            answers[question.id] === question.correctAnswer,
        })),
      };

      localStorage.setItem(
        "statiqAI_assessment_result",
        JSON.stringify(assessmentResult)
      );

      console.log(
        "Assessment result saved locally:",
        assessmentResult
      );

      // Show result page
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save quiz result:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save quiz result."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleTryAgain() {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setError("");
    setExtractedCharacters(0);
    setFile(null);
  }

  // Calculate score
  const score = submitted
    ? questions.reduce((total, question) => {
        return answers[question.id] === question.correctAnswer
          ? total + 1
          : total;
      }, 0)
    : 0;

  const percentage =
    questions.length > 0
      ? Math.round((score / questions.length) * 100)
      : 0;

  // Correct questions
  const correctQuestions = submitted
    ? questions.filter(
        (question) =>
          answers[question.id] === question.correctAnswer
      )
    : [];

  // Wrong questions
  const wrongQuestions = submitted
    ? questions.filter(
        (question) =>
          answers[question.id] !== question.correctAnswer
      )
    : [];

  // Performance message
  const performanceMessage =
    percentage >= 80
      ? "Excellent performance! You have a strong understanding of the learning material."
      : percentage >= 60
      ? "Good performance! Review the incorrect answers to strengthen your understanding."
      : percentage >= 40
      ? "You have a basic understanding, but some important concepts need more practice."
      : "You should review the learning material and focus on strengthening the concepts you missed.";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              ✦
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Statiq<span className="text-blue-600">AI</span>
              </h1>

              <p className="text-xs text-slate-500">
                Skill Intelligence
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              ▦ Dashboard
            </Link>

            <Link
              href="/competency"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              ◉ Competency Profile
            </Link>

            <Link
              href="/skill-gap"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              ◈ Skill Gap Analysis
            </Link>

            <Link
              href="/learning-path"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              → Learning Path
            </Link>

            <Link
              href="/quiz"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
            >
              ✓ AI Assessment
            </Link>
          </nav>
        </div>

        <div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Arsh Jain
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Statistical Officer
            </p>
          </div>

          <Link
            href="/portal"
            className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            ← Change Workspace
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="lg:ml-64">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <h2 className="text-2xl font-bold text-slate-900">
            AI Quiz & Assessment 🧠
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload your learning material and let AI generate questions.
          </p>
        </header>

        <div className="p-6 md:p-10">
          {/* Upload Section */}
          {questions.length === 0 && (
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-center">
                <div className="text-5xl">📄</div>

                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  Upload Learning Material
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Upload a PDF. StatiqAI will analyze the content and generate
                  an AI-powered assessment based on the document.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:font-semibold file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed"
                />

                {file && (
                  <div className="mt-5 rounded-xl bg-blue-50 p-4 text-left">
                    <p className="text-sm font-semibold text-slate-900">
                      📎 {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for AI
                      analysis
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerateQuiz}
                disabled={!file || loading}
                className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading
                  ? "🤖 AI is analyzing your PDF..."
                  : "✦ Analyze PDF & Generate Quiz"}
              </button>
            </div>
          )}

          {/* Quiz */}
          {questions.length > 0 && !submitted && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-semibold text-blue-300">
                  ✦ AI-GENERATED ASSESSMENT
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Your personalized quiz is ready.
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  {extractedCharacters > 0
                    ? `AI analyzed approximately ${extractedCharacters.toLocaleString()} characters from your uploaded learning material.`
                    : "AI analyzed your uploaded learning material and generated questions based on it."}
                </p>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-blue-600">
                        QUESTION {index + 1}
                      </p>

                      {question.skill && (
                        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {question.skill}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-slate-900">
                      {question.question}
                    </h3>

                    <div className="mt-5 space-y-3">
                      {question.options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            handleAnswer(question.id, option)
                          }
                          disabled={loading}
                          className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                            answers[question.id] === option
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmitQuiz}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading
                  ? "Saving Assessment Result..."
                  : "Submit Assessment →"}
              </button>
            </div>
          )}

          {/* Results */}
          {submitted && (
            <div className="mx-auto max-w-4xl">
              {/* Score Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="text-6xl">
                  {percentage >= 60 ? "🎉" : "📚"}
                </div>

                <p className="mt-5 text-sm font-semibold text-blue-600">
                  ASSESSMENT COMPLETE
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  Your Score: {score} / {questions.length}
                </h3>

                <p className="mt-3 text-xl font-semibold text-blue-600">
                  {percentage}%
                </p>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                  {performanceMessage}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-green-50 p-5">
                    <p className="text-sm text-green-600">
                      Correct Answers
                    </p>

                    <p className="mt-2 text-3xl font-bold text-green-700">
                      ✓ {correctQuestions.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-red-50 p-5">
                    <p className="text-sm text-red-600">
                      Incorrect Answers
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-700">
                      ✗ {wrongQuestions.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-5">
                    <p className="text-sm text-blue-600">
                      Accuracy
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-700">
                      {percentage}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Question Analysis */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-blue-600">
                  ✦ DETAILED ANALYSIS
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Review Your Answers
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  See exactly which questions you answered correctly and where
                  you need improvement.
                </p>

                <div className="mt-6 space-y-6">
                  {questions.map((question, index) => {
                    const selectedAnswer = answers[question.id];

                    const isCorrect =
                      selectedAnswer === question.correctAnswer;

                    return (
                      <div
                        key={question.id}
                        className={`rounded-2xl border bg-white p-6 shadow-sm ${
                          isCorrect
                            ? "border-green-200"
                            : "border-red-200"
                        }`}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                isCorrect
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              QUESTION {index + 1}
                            </p>

                            <h4 className="mt-2 text-lg font-bold text-slate-900">
                              {question.question}
                            </h4>
                          </div>

                          <span
                            className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${
                              isCorrect
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {isCorrect
                              ? "✓ Correct"
                              : "✗ Incorrect"}
                          </span>
                        </div>

                        <div className="mt-6 space-y-3">
                          {question.options.map((option) => {
                            const isSelected =
                              selectedAnswer === option;

                            const isCorrectOption =
                              question.correctAnswer === option;

                            let optionStyle =
                              "border-slate-200 bg-white text-slate-700";

                            if (isCorrectOption) {
                              optionStyle =
                                "border-green-500 bg-green-50 text-green-800";
                            } else if (
                              isSelected &&
                              !isCorrectOption
                            ) {
                              optionStyle =
                                "border-red-500 bg-red-50 text-red-800";
                            }

                            return (
                              <div
                                key={option}
                                className={`flex items-center justify-between rounded-xl border p-4 text-sm ${optionStyle}`}
                              >
                                <span className="font-medium">
                                  {option}
                                </span>

                                {isCorrectOption && (
                                  <span className="ml-4 font-semibold">
                                    ✓ Correct Answer
                                  </span>
                                )}

                                {isSelected &&
                                  !isCorrectOption && (
                                    <span className="ml-4 font-semibold">
                                      ✗ Your Answer
                                    </span>
                                  )}
                              </div>
                            );
                          })}
                        </div>

                        <div
                          className={`mt-6 rounded-xl p-4 ${
                            isCorrect
                              ? "bg-green-50"
                              : "bg-red-50"
                          }`}
                        >
                          <p
                            className={`text-xs font-bold ${
                              isCorrect
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {isCorrect
                              ? "✓ ANSWER ANALYSIS"
                              : "✗ REVIEW REQUIRED"}
                          </p>

                          <div className="mt-3 space-y-2 text-sm">
                            <p className="text-slate-700">
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {selectedAnswer}
                            </p>

                            {!isCorrect && (
                              <p className="text-slate-700">
                                <span className="font-semibold">
                                  Correct Answer:
                                </span>{" "}
                                <span className="font-semibold text-green-700">
                                  {question.correctAnswer}
                                </span>
                              </p>
                            )}

                            {isCorrect && (
                              <p className="text-green-700">
                                Great job! Your answer is correct.
                              </p>
                            )}

                            {!isCorrect && (
                              <p className="text-red-700">
                                This is an area you should review from the
                                uploaded learning material.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Improvement Summary */}
              {wrongQuestions.length > 0 && (
                <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">
                  <p className="text-sm font-semibold text-orange-700">
                    🎯 LEARNING RECOMMENDATION
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    Focus on the concepts behind your incorrect answers.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    You answered {wrongQuestions.length} out of{" "}
                    {questions.length} questions incorrectly. Review these
                    concepts and strengthen your understanding before taking
                    another assessment.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {wrongQuestions.map((question) => (
                      <span
                        key={question.id}
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm"
                      >
                        Review Question{" "}
                        {questions.findIndex(
                          (item) => item.id === question.id
                        ) + 1}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Perfect Score */}
              {wrongQuestions.length === 0 && (
                <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                  <p className="text-3xl">🏆</p>

                  <h3 className="mt-2 text-xl font-bold text-green-800">
                    Perfect Score!
                  </h3>

                  <p className="mt-2 text-sm text-green-700">
                    Excellent work! You answered every question correctly.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleTryAgain}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Upload Another PDF
                </button>

                <Link
                  href="/competency"
                  className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  View Competency Profile →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <AICopilot compact />
    </main>
  );
}