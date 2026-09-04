"use client";

import Link from "next/link";

export default function SkillGapsPage() {
  const skillGaps = [
    {
      skill: "Python",
      affected: 68,
      priority: "Critical",
      description: "Required for data processing, automation, and analysis.",
    },
    {
      skill: "AI / Machine Learning",
      affected: 61,
      priority: "Critical",
      description: "Growing requirement for modern statistical systems.",
    },
    {
      skill: "Cloud Computing",
      affected: 54,
      priority: "High",
      description: "Important for scalable government data infrastructure.",
    },
    {
      skill: "SQL & Databases",
      affected: 47,
      priority: "High",
      description: "Essential for efficient data management and querying.",
    },
    {
      skill: "Data Visualization",
      affected: 39,
      priority: "Medium",
      description: "Improves communication and interpretation of statistics.",
    },
  ];

  const domains = [
    { name: "Statistical Competencies", score: 78 },
    { name: "Technical Competencies", score: 62 },
    { name: "Digital Governance", score: 71 },
    { name: "Behavioural & Managerial", score: 82 },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 lg:block">
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

        <p className="mb-3 px-4 text-xs font-bold tracking-wider text-slate-400">
          ADMINISTRATION
        </p>

        <nav className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100"
          >
            ▦ Admin Dashboard
          </Link>

          <Link
            href="/admin/workforce"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100"
          >
            👥 Workforce Analytics
          </Link>

          <Link
            href="/admin/skill-gaps"
            className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
          >
            ◈ Skill Gap Insights
          </Link>

          <Link
            href="/admin/training"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100"
          >
            📚 Training Analytics
          </Link>

          <Link
            href="/dashboard"
            className="mt-8 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-slate-600 hover:bg-slate-100"
          >
            ← Learner Portal
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                AI SKILL GAP ANALYSIS
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Workforce Skill Gap Insights 🔍
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Identify critical competency gaps and prioritize training
                interventions.
              </p>
            </div>

            <Link
              href="/admin"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {/* AI INSIGHT */}
          <div className="rounded-2xl bg-slate-900 p-7 text-white shadow-lg">
            <p className="text-sm font-semibold text-blue-300">
              ✦ AI PRIORITY ANALYSIS
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Technical skills represent the largest competency gap.
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              StatiqAI analyzed workforce competency data and identified
              Python, AI/ML, and Cloud Computing as the highest-priority
              areas for capacity building.
            </p>
          </div>

          {/* TOP SUMMARY */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Critical Gaps
              </p>

              <p className="mt-3 text-4xl font-bold text-red-600">
                2
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Require immediate intervention
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                High Priority
              </p>

              <p className="mt-3 text-4xl font-bold text-orange-500">
                2
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Recommended for next training cycle
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Most Affected Area
              </p>

              <p className="mt-3 text-2xl font-bold text-blue-600">
                Technical
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Average competency: 62%
              </p>
            </div>
          </div>

          {/* SKILL GAPS + DOMAIN ANALYSIS */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            {/* PRIORITY GAPS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Priority Skill Gaps
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Percentage of officials requiring competency improvement.
              </p>

              <div className="mt-6 space-y-5">
                {skillGaps.map((item) => (
                  <div
                    key={item.skill}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {item.skill}
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                          item.priority === "Critical"
                            ? "bg-red-50 text-red-600"
                            : item.priority === "High"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${item.affected}%` }}
                        />
                      </div>

                      <span className="text-sm font-bold text-slate-700">
                        {item.affected}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPETENCY DOMAINS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Competency Domain Analysis
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current competency strength across major domains.
              </p>

              <div className="mt-8 space-y-7">
                {domains.map((domain) => (
                  <div key={domain.name}>
                    <div className="flex justify-between">
                      <p className="font-semibold text-slate-700">
                        {domain.name}
                      </p>

                      <p className="font-bold text-slate-900">
                        {domain.score}%
                      </p>
                    </div>

                    <div className="mt-3 h-4 rounded-full bg-slate-100">
                      <div
                        className={`h-4 rounded-full ${
                          domain.score >= 80
                            ? "bg-green-500"
                            : domain.score >= 70
                            ? "bg-blue-600"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${domain.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl bg-blue-50 p-5">
                <p className="text-sm font-bold text-blue-700">
                  🤖 AI Recommendation
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Prioritize technical competency development while maintaining
                  strong performance in statistical and managerial domains.
                </p>
              </div>
            </div>
          </div>

          {/* RECOMMENDED ACTION PLAN */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              AI Recommended Training Actions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Suggested interventions based on identified competency gaps.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                <p className="text-xs font-bold text-red-600">
                  STEP 01 · IMMEDIATE
                </p>

                <h4 className="mt-2 font-bold text-slate-900">
                  Python & Data Analytics
                </h4>

                <p className="mt-2 text-sm text-slate-600">
                  Launch targeted learning programs for officials with
                  foundational technical gaps.
                </p>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
                <p className="text-xs font-bold text-orange-600">
                  STEP 02 · NEXT PHASE
                </p>

                <h4 className="mt-2 font-bold text-slate-900">
                  AI & Machine Learning
                </h4>

                <p className="mt-2 text-sm text-slate-600">
                  Build workforce readiness for AI-enabled statistical systems.
                </p>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-xs font-bold text-blue-600">
                  STEP 03 · CONTINUOUS
                </p>

                <h4 className="mt-2 font-bold text-slate-900">
                  Personalized Learning Paths
                </h4>

                <p className="mt-2 text-sm text-slate-600">
                  Continuously recommend relevant iGOT and training programs.
                </p>
              </div>
            </div>
          </div>

          {/* NEXT STEP */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  NEXT MODULE
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Analyze training effectiveness and learning outcomes.
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Monitor course completion, learning engagement, and the impact
                  of training programs.
                </p>
              </div>

              <Link
                href="/admin/training"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                View Training Analytics →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}