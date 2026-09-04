"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  strongestSkill: Skill;
  weakestSkill: Skill;
  highestGapSkill: Skill;
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
          throw new Error(
            "Failed to fetch dashboard data."
          );
        }

        const result = await response.json();

        if (result.success && result.data) {
          setDashboardData(result.data);
        } else {
          setError(
            "Unable to load dashboard intelligence."
          );
        }
      } catch (error) {
        console.error(
          "Dashboard fetch error:",
          error
        );

        setError(
          "Failed to connect to the StatiqAI intelligence engine."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const getPriorityLevel = (gap: number) => {
    if (gap >= 30) return "Critical Gap";
    if (gap >= 20) return "High Priority";
    if (gap >= 10) return "Medium Priority";
    return "Low Priority";
  };

  const getProgressColor = (gap: number) => {
    if (gap >= 30) return "bg-red-500";
    if (gap >= 20) return "bg-orange-500";
    if (gap >= 10) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getRecommendation = (
    skill: Skill | undefined
  ) => {
    if (!skill) {
      return {
        title: "Continue Learning",
        match: 0,
        level: "Personalized",
        duration: "Learning Path",
      };
    }

    if (skill.name === "Python") {
      return {
        title: "Python for Data Analysis",
        match: 94,
        level: "Beginner",
        duration: "12 Hours",
      };
    }

    if (skill.name === "SQL & Databases") {
      return {
        title: "SQL & Database Fundamentals",
        match: 92,
        level: "Beginner",
        duration: "10 Hours",
      };
    }

    if (skill.name === "AI & Machine Learning") {
      return {
        title: "Introduction to AI & Machine Learning",
        match: 96,
        level: "Beginner",
        duration: "14 Hours",
      };
    }

    if (skill.name === "Data Visualization") {
      return {
        title: "Data Visualization Fundamentals",
        match: 90,
        level: "Intermediate",
        duration: "8 Hours",
      };
    }

    if (skill.name === "Statistical Analysis") {
      return {
        title: "Advanced Statistical Analysis",
        match: 91,
        level: "Intermediate",
        duration: "10 Hours",
      };
    }

    if (skill.name === "Digital Governance") {
      return {
        title: "Digital Governance Fundamentals",
        match: 89,
        level: "Beginner",
        duration: "8 Hours",
      };
    }

    return {
      title: `${skill.name} Learning Path`,
      match: 90,
      level: "Personalized",
      duration: "10 Hours",
    };
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-5xl">✦</div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            StatiqAI is analyzing your profile...
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Loading your competency intelligence dashboard.
          </p>
        </div>
      </main>
    );
  }

  if (error || !dashboardData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-red-600">
            Dashboard Error
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            {error ||
              "Unable to load dashboard data."}
          </p>

          <Link
            href="/skill-gap"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            View Skill Analysis →
          </Link>
        </div>
      </main>
    );
  }

  const recommendation = getRecommendation(
    dashboardData.highestGapSkill
  );

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
                <span className="text-blue-600">AI</span>
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
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              href="/competency"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              <span>◉</span>
              Competency Profile
            </Link>

            <Link
              href="/skill-gap"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              <span>◈</span>
              Skill Gap Analysis
            </Link>

            <Link
              href="/learning-path"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              <span>→</span>
              Learning Path
            </Link>

            <Link
              href="/quiz"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
            >
              <span>✓</span>
              Assessments
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
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Good evening, Arsh 👋
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s your real-time learning and competency overview.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
            AJ
          </div>
        </header>

        <div className="p-6 md:p-10">

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* Overall Competency */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Overall Competency
              </p>

              <div className="mt-4 flex items-end justify-between">
                <h3 className="text-4xl font-bold text-slate-900">
                  {dashboardData.overallScore}%
                </h3>

                <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                  AI Score
                </span>
              </div>

              <div className="mt-5 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${dashboardData.overallScore}%`,
                  }}
                />
              </div>
            </div>

            {/* Priority Skills */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Priority Skill Gaps
              </p>

              <div className="mt-4 flex items-end justify-between">
                <h3 className="text-4xl font-bold text-slate-900">
                  {dashboardData.prioritySkills.length}
                </h3>

                <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                  Needs Attention
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {dashboardData.prioritySkills
                  .map((skill) => skill.name)
                  .join(", ")}
              </p>
            </div>

            {/* Readiness Score */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Professional Readiness
              </p>

              <div className="mt-4 flex items-end justify-between">
                <h3 className="text-4xl font-bold text-slate-900">
                  {dashboardData.readinessScore}%
                </h3>

                <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                  On Track
                </span>
              </div>

              <div className="mt-5 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${dashboardData.readinessScore}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Intelligence Summary */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {/* Strongest Skill */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <p className="text-sm font-semibold text-green-600">
                ✦ STRONGEST COMPETENCY
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {dashboardData.strongestSkill.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Current competency level:{" "}
                <span className="font-bold">
                  {dashboardData.strongestSkill.currentLevel}%
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Only {dashboardData.strongestSkill.gap}% away
                from the target level.
              </p>
            </div>

            {/* Weakest Skill */}
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="text-sm font-semibold text-red-600">
                ✦ HIGHEST DEVELOPMENT PRIORITY
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {dashboardData.highestGapSkill.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Current competency level:{" "}
                <span className="font-bold">
                  {dashboardData.highestGapSkill.currentLevel}%
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Competency gap:{" "}
                {dashboardData.highestGapSkill.gap}%
              </p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">

            {/* Dynamic Skill Gaps */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
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
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All →
                </Link>
              </div>

              <div className="mt-6 space-y-5">
                {dashboardData.prioritySkills.map(
                  (skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {skill.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {getPriorityLevel(skill.gap)}
                          </p>
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          {skill.gap}% Gap
                        </span>
                      </div>

                      <div className="mt-3 h-2 rounded-full bg-slate-100">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            skill.gap
                          )}`}
                          style={{
                            width: `${Math.min(
                              skill.gap,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Dynamic AI Recommendation */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl">
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

                <h4 className="mt-2 text-2xl font-bold">
                  {recommendation.title}
                </h4>

                <p className="mt-2 text-sm text-slate-300">
                  Focus area:{" "}
                  {dashboardData.highestGapSkill.name}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-semibold text-blue-300">
                    {recommendation.match}% Match
                  </span>

                  <span className="text-sm text-slate-300">
                    {recommendation.level} •{" "}
                    {recommendation.duration}
                  </span>
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

          {/* Dynamic AI Insight */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  ✦ STATIQ AI COPILOT
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Your Personalized AI Insight
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  {dashboardData.aiInsight}
                </p>
              </div>

              <Link
                href="/learning-path"
                className="whitespace-nowrap rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Start Learning →
              </Link>
            </div>
          </div>

        </div>
      </section>

      
      <AICopilot />
    </main>
  );
}