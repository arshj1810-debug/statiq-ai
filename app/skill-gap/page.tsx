"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AICopilot from "@/components/AICopilot";

type SkillGap = {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
};

export default function SkillGapPage() {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSkillGaps() {
      try {
        const response = await fetch("/api/skill-gap");

        if (!response.ok) {
          throw new Error("Failed to fetch skill gap data");
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setSkillGaps(result.data);
        } else {
          setError("Unable to load skill gap analysis.");
        }
      } catch (error) {
        console.error("Failed to fetch skill gaps:", error);
        setError("Failed to connect to the AI Skill Gap Engine.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkillGaps();
  }, []);

  const priorityStyles: Record<string, string> = {
    Critical: "bg-red-50 text-red-600 border-red-100",
    High: "bg-orange-50 text-orange-600 border-orange-100",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Low: "bg-green-50 text-green-600 border-green-100",
  };

  const getPriority = (gap: number) => {
    if (gap >= 30) return "Critical";
    if (gap >= 20) return "High";
    if (gap >= 10) return "Medium";
    return "Low";
  };

  const biggestGap =
    skillGaps.length > 0
      ? skillGaps.reduce((largest, current) =>
          current.gap > largest.gap ? current : largest
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
                Statiq<span className="text-blue-600">AI</span>
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
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
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
                AI Skill Gap Analysis ✦
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Identify the difference between your current and required
                competencies.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {loading ? "AI Analyzing..." : "AI Analysis Complete"}
            </span>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {/* Loading State */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="text-4xl">🤖</div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                AI is analyzing your competency gaps...
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Comparing your current competencies with role requirements.
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
              <p className="font-semibold text-red-600">{error}</p>

              <p className="mt-2 text-sm text-red-500">
                Please check whether /api/skill-gap is running correctly.
              </p>
            </div>
          )}

          {/* Main Analysis */}
          {!loading && !error && (
            <>
              {/* AI Summary */}
              <div className="rounded-2xl bg-slate-900 p-7 text-white shadow-lg">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-300">
                      ✦ AI INSIGHT
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {biggestGap
                        ? `Your biggest development opportunity is ${biggestGap.name}.`
                        : "Your competency analysis is complete."}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                      Based on your role and competency profile, the AI engine
                      has compared your current skill levels with the required
                      competency levels and identified your highest-priority
                      development areas.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 px-7 py-5 text-center">
                    <p className="text-sm text-slate-300">
                      Skill Gaps Found
                    </p>

                    <p className="mt-1 text-4xl font-bold">
                      {skillGaps.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Process */}
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <p className="text-sm font-semibold text-blue-700">
                  HOW THE AI ENGINE ANALYZES YOUR SKILLS
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-4">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Step 1</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      Analyze Profile
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Step 2</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      Map Competencies
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Step 3</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      Compare With Role
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Step 4</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      Generate Learning Plan
                    </p>
                  </div>
                </div>
              </div>

              {/* Skill Gap Cards */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  Identified Skill Gaps
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Prioritized based on competency gap and role requirements.
                </p>

                <div className="mt-6 grid gap-6 xl:grid-cols-3">
                  {skillGaps.length > 0 ? (
                    skillGaps.map((skill) => {
                      const priority = getPriority(skill.gap);

                      return (
                        <div
                          key={skill.id}
                          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-xl font-bold text-slate-900">
                                {skill.name}
                              </h4>

                              <p className="mt-1 text-sm text-slate-500">
                                {skill.category}
                              </p>
                            </div>

                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                                priorityStyles[priority]
                              }`}
                            >
                              {priority}
                            </span>
                          </div>

                          {/* Scores */}
                          <div className="mt-6 grid grid-cols-2 gap-4">
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
                                Required Level
                              </p>

                              <p className="mt-1 text-2xl font-bold text-blue-700">
                                {skill.targetLevel}%
                              </p>
                            </div>
                          </div>

                          {/* Gap */}
                          <div className="mt-5">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">
                                Competency Gap
                              </span>

                              <span className="font-bold text-slate-900">
                                {skill.gap}%
                              </span>
                            </div>

                            <div className="mt-2 h-3 rounded-full bg-slate-100">
                              <div
                                className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                                style={{
                                  width: `${Math.min(skill.gap, 100)}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* AI Insight */}
                          <div className="mt-6 border-t border-slate-100 pt-5">
                            <p className="text-xs font-bold text-blue-600">
                              ✦ AI INSIGHT
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              Your current competency level is{" "}
                              {skill.currentLevel}%, while your role requires{" "}
                              {skill.targetLevel}%. This creates a{" "}
                              {skill.gap}% competency gap that should be
                              addressed through focused learning and training.
                            </p>
                          </div>

                          {/* Recommendation */}
                          <div className="mt-5 rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-bold text-slate-500">
                              RECOMMENDED NEXT STEP
                            </p>

                            <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                              {skill.gap >= 30
                                ? `Prioritize training in ${skill.name} immediately.`
                                : skill.gap >= 20
                                ? `Focus on strengthening your ${skill.name} skills through structured training.`
                                : skill.gap >= 10
                                ? `Continue developing your ${skill.name} competency through targeted learning modules.`
                                : `Maintain and continuously improve your ${skill.name} competency.`}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                      No skill gap data available.
                    </div>
                  )}
                </div>
              </div>

              {/* Next Step */}
              <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    NEXT STEP
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Your personalized learning pathway is ready.
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Start with the highest-priority skill and build your
                    competencies step by step.
                  </p>
                </div>

                <Link
                  href="/learning-path"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Learning Path →
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