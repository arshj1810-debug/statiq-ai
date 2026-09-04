"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AICopilot from "@/components/AICopilot";

type LearningModule = {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
};

type LearningPathItem = {
  step: number;
  skill: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  modules: LearningModule[];
};

export default function LearningPathPage() {
  const [learningPath, setLearningPath] = useState<
    LearningPathItem[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLearningPath() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/learning-path",
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to generate learning path."
          );
        }

        if (Array.isArray(result.data)) {
          setLearningPath(result.data);
        } else {
          throw new Error(
            "Invalid learning path data received."
          );
        }
      } catch (error) {
        console.error(
          "Learning Path Error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to connect to the Learning Path Engine."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchLearningPath();
  }, []);

  const priorityStyles: Record<string, string> = {
    Critical:
      "border-red-200 bg-red-50 text-red-700",

    High:
      "border-orange-200 bg-orange-50 text-orange-700",

    Medium:
      "border-yellow-200 bg-yellow-50 text-yellow-700",

    Low:
      "border-green-200 bg-green-50 text-green-700",
  };

  const totalModules = learningPath.reduce(
    (total, skill) =>
      total + skill.modules.length,
    0
  );

  const highestPrioritySkill =
    learningPath.length > 0
      ? learningPath[0]
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
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
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

        {/* User */}
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
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Personalized Learning Path 🚀
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                AI-generated learning recommendations
                based on your competency gaps.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {loading
                ? "AI Generating..."
                : "AI Learning Path Ready"}
            </span>
          </div>
        </header>

        <div className="p-6 md:p-10">

          {/* Loading State */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="text-5xl">
                🤖
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                AI is creating your learning path...
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Analyzing your competency gaps and
                prioritizing the right learning modules.
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-600">
                {error}
              </p>

              <p className="mt-2 text-sm text-red-500">
                Please check whether the Learning Path
                API is running correctly.
              </p>

              <Link
                href="/skill-gap"
                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
              >
                ← Back to Skill Gap Analysis
              </Link>
            </div>
          )}

          {/* Learning Path */}
          {!loading && !error && (
            <>
              {/* AI Summary */}
              <div className="rounded-2xl bg-slate-900 p-7 text-white shadow-lg">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-300">
                      ✦ AI LEARNING STRATEGY
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {highestPrioritySkill
                        ? `Start with ${highestPrioritySkill.skill}.`
                        : "Your learning path is ready."}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                      StatiqAI has analyzed your
                      competency gaps and organized your
                      learning journey from the highest
                      priority development area to the
                      lowest.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white/10 px-5 py-4 text-center">
                      <p className="text-xs text-slate-300">
                        Skills
                      </p>

                      <p className="mt-1 text-3xl font-bold">
                        {learningPath.length}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 px-5 py-4 text-center">
                      <p className="text-xs text-slate-300">
                        Modules
                      </p>

                      <p className="mt-1 text-3xl font-bold">
                        {totalModules}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Journey */}
              <div className="mt-10">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    YOUR LEARNING JOURNEY
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    Recommended Development Roadmap
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Follow the steps in priority order
                    to reduce your competency gaps.
                  </p>
                </div>

                {/* Learning Path Items */}
                <div className="mt-8 space-y-8">
                  {learningPath.length > 0 ? (
                    learningPath.map((skill) => (
                      <div
                        key={skill.step}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                      >
                        {/* Skill Header */}
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-5">
                            {/* Step Number */}
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                              {skill.step}
                            </div>

                            <div>
                              <p className="text-xs font-bold text-blue-600">
                                STEP {skill.step}
                              </p>

                              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                {skill.skill}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {skill.category} Competency
                              </p>
                            </div>
                          </div>

                          <span
                            className={`w-fit rounded-full border px-4 py-2 text-sm font-bold ${
                              priorityStyles[
                                skill.priority
                              ]
                            }`}
                          >
                            {skill.priority} Priority
                          </span>
                        </div>

                        {/* Competency Progress */}
                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                          <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs text-slate-500">
                              Current Level
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-900">
                              {skill.currentLevel}%
                            </p>
                          </div>

                          <div className="rounded-xl bg-blue-50 p-4">
                            <p className="text-xs text-slate-500">
                              Target Level
                            </p>

                            <p className="mt-1 text-2xl font-bold text-blue-700">
                              {skill.targetLevel}%
                            </p>
                          </div>

                          <div className="rounded-xl bg-orange-50 p-4">
                            <p className="text-xs text-slate-500">
                              Skill Gap
                            </p>

                            <p className="mt-1 text-2xl font-bold text-orange-600">
                              {skill.gap}%
                            </p>
                          </div>
                        </div>

                        {/* Gap Progress */}
                        <div className="mt-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                              Development Required
                            </span>

                            <span className="font-semibold text-slate-900">
                              {skill.gap}% Gap
                            </span>
                          </div>

                          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  skill.gap,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Learning Modules */}
                        <div className="mt-8 border-t border-slate-100 pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Recommended Learning Modules
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                Complete these modules to
                                strengthen your competency.
                              </p>
                            </div>

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {skill.modules.length} Modules
                            </span>
                          </div>

                          <div className="mt-5 grid gap-4 md:grid-cols-2">
                            {skill.modules.length > 0 ? (
                              skill.modules.map((module) => (
                                <div
                                  key={`${skill.skill}-${module.id}`}
                                  className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
                                      📚
                                    </div>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                      {module.level}
                                    </span>
                                  </div>

                                  <h4 className="mt-4 font-bold text-slate-900">
                                    {module.title}
                                  </h4>

                                  <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {module.description}
                                  </p>

                                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="text-xs font-medium text-slate-500">
                                      ⏱ {module.duration}
                                    </span>

                                    <button className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                                      Start Learning →
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
                                No learning modules are
                                currently available for this
                                competency.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                      <div className="text-5xl">
                        🎯
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-slate-900">
                        No Learning Gaps Found
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Your competency profile currently
                        does not contain any development
                        gaps.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    CONTINUOUS DEVELOPMENT
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Track your progress with another assessment.
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Complete learning modules and take
                    another AI assessment to update your
                    competency profile.
                  </p>
                </div>

                <Link
                  href="/quiz"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Take Assessment →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <AICopilot compact />
    </main>
  );
}