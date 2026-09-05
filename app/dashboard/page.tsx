"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import AICopilot from "@/components/AICopilot";

type Skill = {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
};

type DashboardData = {
  overallScore: number;
  readinessScore: number;
  strongestSkill: Skill | null;
  weakestSkill: Skill | null;
  highestGapSkill: Skill | null;
  prioritySkills: Skill[];
  competencies: Skill[];
  aiInsight: string;
  totalSkills: number;
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const result = await response.json();

        if (result.success && result.data) {
          setDashboardData(result.data);
        } else {
          setError("Unable to load dashboard data.");
        }
      } catch (error) {
        console.error(
          "Dashboard fetch error:",
          error
        );

        setError(
          "Failed to connect to the StatiqAI dashboard engine."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const getPriority = (gap: number) => {
    if (gap >= 30) {
      return {
        label: "Critical Gap",
        color: "bg-red-500",
        badge: "bg-red-50 text-red-600",
      };
    }

    if (gap >= 20) {
      return {
        label: "High Priority",
        color: "bg-orange-500",
        badge: "bg-orange-50 text-orange-600",
      };
    }

    if (gap >= 10) {
      return {
        label: "Medium Priority",
        color: "bg-yellow-500",
        badge: "bg-yellow-50 text-yellow-700",
      };
    }

    return {
      label: "Low Priority",
      color: "bg-green-500",
      badge: "bg-green-50 text-green-600",
    };
  };

  return (
    <AppLayout>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-5 py-5 sm:px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Good evening, Arsh 👋
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s your real-time learning and competency overview.
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
            AJ
          </div>
        </div>
      </header>

      <div className="p-5 sm:p-6 md:p-10">
        {/* Loading State */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">🤖</div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              Loading your learning intelligence...
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              StatiqAI is analyzing your competency data.
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-600">
              {error}
            </p>

            <Link
              href="/skill-gap"
              className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Skill Analysis →
            </Link>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && !error && dashboardData && (
          <>
            {/* Stats Cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {/* Overall Competency */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm font-medium text-slate-500">
                  Overall Competency
                </p>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    {dashboardData.overallScore}%
                  </h3>

                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 sm:text-sm">
                    AI Score
                  </span>
                </div>

                <div className="mt-5 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        dashboardData.overallScore,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Priority Skills */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm font-medium text-slate-500">
                  Priority Skill Gaps
                </p>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    {dashboardData.prioritySkills.length}
                  </h3>

                  <span className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 sm:text-sm">
                    Needs Attention
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  {dashboardData.prioritySkills.length > 0
                    ? dashboardData.prioritySkills
                        .map((skill) => skill.name)
                        .join(", ")
                    : "No major skill gaps detected."}
                </p>
              </div>

              {/* Professional Readiness */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 sm:p-6 xl:col-span-1">
                <p className="text-sm font-medium text-slate-500">
                  Professional Readiness
                </p>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    {dashboardData.readinessScore}%
                  </h3>

                  <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 sm:text-sm">
                    On Track
                  </span>
                </div>

                <div className="mt-5 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        dashboardData.readinessScore,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Intelligence Summary */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* Strongest Skill */}
              <div className="rounded-2xl border border-green-100 bg-green-50 p-5 sm:p-6">
                <p className="text-sm font-semibold text-green-600">
                  ✦ STRONGEST COMPETENCY
                </p>

                <h3 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
                  {dashboardData.strongestSkill?.name ||
                    "No data available"}
                </h3>

                {dashboardData.strongestSkill && (
                  <>
                    <p className="mt-2 text-sm text-slate-600">
                      Current competency level:{" "}
                      <span className="font-bold">
                        {
                          dashboardData.strongestSkill
                            .currentLevel
                        }
                        %
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Only{" "}
                      {dashboardData.strongestSkill.gap}%
                      away from the target level.
                    </p>
                  </>
                )}
              </div>

              {/* Highest Development Priority */}
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5 sm:p-6">
                <p className="text-sm font-semibold text-red-600">
                  ✦ HIGHEST DEVELOPMENT PRIORITY
                </p>

                <h3 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
                  {dashboardData.highestGapSkill?.name ||
                    "No priority skill identified"}
                </h3>

                {dashboardData.highestGapSkill && (
                  <>
                    <p className="mt-2 text-sm text-slate-600">
                      Current competency level:{" "}
                      <span className="font-bold">
                        {
                          dashboardData.highestGapSkill
                            .currentLevel
                        }
                        %
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Competency gap:{" "}
                      {dashboardData.highestGapSkill.gap}%
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Main Grid */}
            <div className="mt-8 grid gap-6 xl:grid-cols-2 xl:gap-8">
              {/* Priority Skill Gaps */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Priority Skill Gaps
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      AI identified areas requiring attention.
                    </p>
                  </div>

                  <Link
                    href="/skill-gap"
                    className="w-fit text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View All →
                  </Link>
                </div>

                <div className="mt-6 space-y-5">
                  {dashboardData.prioritySkills.length >
                  0 ? (
                    dashboardData.prioritySkills.map(
                      (skill) => {
                        const priority = getPriority(
                          skill.gap
                        );

                        return (
                          <div key={skill.id}>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-semibold text-slate-800">
                                  {skill.name}
                                </p>

                                <span
                                  className={`mt-1 inline-block rounded-md px-2 py-1 text-xs font-medium ${priority.badge}`}
                                >
                                  {priority.label}
                                </span>
                              </div>

                              <span className="shrink-0 text-sm font-semibold text-slate-700">
                                {skill.gap}% Gap
                              </span>
                            </div>

                            <div className="mt-3 h-2 rounded-full bg-slate-100">
                              <div
                                className={`h-2 rounded-full ${priority.color}`}
                                style={{
                                  width: `${Math.min(
                                    skill.gap,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <p className="text-sm text-slate-500">
                      No priority skill gaps found.
                    </p>
                  )}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-lg sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl">
                    ✦
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      AI Recommended for You
                    </h3>

                    <p className="text-sm text-slate-400">
                      Based on your competency profile
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">
                    TOP RECOMMENDATION
                  </p>

                  <h4 className="mt-2 text-xl font-bold sm:text-2xl">
                    {dashboardData.highestGapSkill?.name ||
                      "Personalized Learning"}
                  </h4>

                  {dashboardData.highestGapSkill && (
                    <p className="mt-2 text-sm text-slate-300">
                      Focus on improving this competency to
                      reduce your highest identified skill gap.
                    </p>
                  )}

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="w-fit rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-semibold text-blue-300">
                      Highest Priority
                    </span>

                    {dashboardData.highestGapSkill && (
                      <span className="text-sm text-slate-300">
                        Current:{" "}
                        {
                          dashboardData.highestGapSkill
                            .currentLevel
                        }
                        % • Target:{" "}
                        {
                          dashboardData.highestGapSkill
                            .targetLevel
                        }
                        %
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href="/learning-path"
                  className="mt-6 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold transition hover:bg-blue-500"
                >
                  View Learning Path →
                </Link>
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    ✦ STATIQ AI INSIGHT
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                    Your personalized development strategy
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    {dashboardData.aiInsight}
                  </p>
                </div>

                <Link
                  href="/copilot"
                  className="w-full shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700 md:w-auto"
                >
                  Ask AI Copilot →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AI Copilot available on Dashboard */}
      <AICopilot />
    </AppLayout>
  );
}