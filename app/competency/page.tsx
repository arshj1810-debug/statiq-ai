"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AICopilot from "@/components/AICopilot";

type Competency = {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
};

type QuizResult = {
  score: number;
  totalQuestions?: number;
  total?: number;
  percentage: number;
  completedAt: string;
  skillResults: Record<
    string,
    {
      correct: number;
      total: number;
      percentage: number;
    }
  >;
};

export default function CompetencyPage() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompetency() {
      try {
        // Get base competency data
        const response = await fetch("/api/competency");

        if (!response.ok) {
          throw new Error("Failed to load competency data.");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Failed to load competency data.");
        }

        let updatedCompetencies: Competency[] = result.data;

        // Get latest quiz result from browser storage
        // This matches the key used in your quiz page
        const savedQuizResult = localStorage.getItem(
          "statiqAI_assessment_result"
        );

        if (savedQuizResult) {
          try {
            const quizResult: QuizResult =
              JSON.parse(savedQuizResult);

            // Update competency levels using quiz performance
            updatedCompetencies = result.data.map(
              (skill: Competency) => {
                const quizSkill =
                  quizResult.skillResults?.[skill.name];

                // If this skill was not included in the quiz,
                // keep the original competency value
                if (!quizSkill) {
                  return skill;
                }

                const updatedCurrentLevel =
                  quizSkill.percentage;

                const updatedGap = Math.max(
                  0,
                  skill.targetLevel - updatedCurrentLevel
                );

                return {
                  ...skill,
                  currentLevel: updatedCurrentLevel,
                  gap: updatedGap,
                };
              }
            );

            console.log(
              "Competency updated using quiz results:",
              updatedCompetencies
            );
          } catch (error) {
            console.error(
              "Failed to read saved quiz result:",
              error
            );
          }
        }

        setCompetencies(updatedCompetencies);
      } catch (error) {
        console.error(
          "Failed to fetch competency data:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCompetency();
  }, []);

  // Calculate Overall Competency Score
  const overallScore =
    competencies.length > 0
      ? Math.round(
          competencies.reduce(
            (total, skill) =>
              total + skill.currentLevel,
            0
          ) / competencies.length
        )
      : 0;

  // Find Strongest Competency
  const strongestSkill =
    competencies.length > 0
      ? competencies.reduce(
          (strongest, current) =>
            current.currentLevel >
            strongest.currentLevel
              ? current
              : strongest
        )
      : null;

  // Find Priority Development Area
  const prioritySkill =
    competencies.length > 0
      ? competencies.reduce(
          (largestGap, current) =>
            current.gap > largestGap.gap
              ? current
              : largestGap
        )
      : null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 lg:flex lg:flex-col lg:justify-between">
        <div>
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              ✦
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Statiq
                <span className="text-blue-600">
                  AI
                </span>
              </h1>

              <p className="text-xs text-slate-500">
                Skill Intelligence
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              ▦ Dashboard
            </Link>

            <Link
              href="/competency"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
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
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              ✓ Assessments
            </Link>
          </nav>
        </div>

        {/* User Section */}
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
            Competency Profile 🧠
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your AI-generated competency intelligence overview.
          </p>
        </header>

        <div className="p-6 md:p-10">
          {/* Top Section */}
          <div className="grid gap-8 xl:grid-cols-3">
            {/* Overall Competency Score */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Overall Competency Score
              </p>

              <div className="mt-8 flex justify-center">
                <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-[14px] border-blue-600">
                  <span className="text-5xl font-bold text-slate-900">
                    {loading
                      ? "..."
                      : `${overallScore}%`}
                  </span>

                  <span className="mt-1 text-sm text-slate-500">
                    Competency
                  </span>
                </div>
              </div>

              {/* AI Insight */}
              <div className="mt-8 rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-700">
                  AI Insight ✦
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {loading
                    ? "AI is analyzing your competency profile..."
                    : prioritySkill
                    ? `Your biggest development area is ${prioritySkill.name}. Focus on reducing the ${prioritySkill.gap}% competency gap.`
                    : "Competency analysis will appear here."}
                </p>
              </div>
            </div>

            {/* Competency DNA */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Your Competency DNA
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    AI analysis across your key competency areas.
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  AI Generated
                </span>
              </div>

              {/* Competency List */}
              <div className="mt-8 space-y-7">
                {loading ? (
                  <div className="py-10 text-center text-slate-500">
                    🤖 AI is analyzing your competency profile...
                  </div>
                ) : competencies.length > 0 ? (
                  competencies.map((skill) => (
                    <div key={skill.id}>
                      {/* Skill Title */}
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {skill.name}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500">
                            {skill.category} Competency
                          </p>
                        </div>

                        <div className="text-sm font-semibold">
                          <span className="text-blue-600">
                            {skill.currentLevel}%
                          </span>

                          <span className="text-slate-400">
                            {" / "}
                            {skill.targetLevel}%
                          </span>
                        </div>
                      </div>

                      {/* Current Level */}
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-xs text-slate-500">
                          <span>
                            Current Level
                          </span>

                          <span>
                            {skill.currentLevel}%
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  skill.currentLevel
                                )
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Target Level */}
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-xs text-slate-500">
                          <span>
                            Target Level
                          </span>

                          <span>
                            {skill.targetLevel}%
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-3 rounded-full bg-slate-400"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  skill.targetLevel
                                )
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Skill Gap */}
                      <div className="mt-2 text-right">
                        <span className="text-xs font-medium text-orange-600">
                          {skill.gap}% Skill Gap
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center text-slate-500">
                    No competency data available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Strongest Competency */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Strongest Competency
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                {loading
                  ? "Analyzing..."
                  : strongestSkill?.name ?? "N/A"}
              </h3>

              <p className="mt-2 text-sm text-green-600">
                {loading
                  ? "Please wait..."
                  : `${strongestSkill?.currentLevel ?? 0}% Competency`}
              </p>
            </div>

            {/* Priority Development Area */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Priority Development Area
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                {loading
                  ? "Analyzing..."
                  : prioritySkill?.name ?? "N/A"}
              </h3>

              <p className="mt-2 text-sm text-orange-600">
                {loading
                  ? "Please wait..."
                  : `${prioritySkill?.gap ?? 0}% Skill Gap`}
              </p>
            </div>

            {/* Next AI Action */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <p className="text-sm text-slate-400">
                Next AI Action
              </p>

              <h3 className="mt-3 text-xl font-bold">
                Analyze Skill Gaps
              </h3>

              <Link
                href="/skill-gap"
                className="mt-5 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold transition hover:bg-blue-500"
              >
                View AI Analysis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AICopilot compact />
    </main>
  );
}