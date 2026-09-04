"use client";

import Link from "next/link";

export default function AdminPage() {
  const departments = [
    {
      name: "Data Collection",
      employees: 124,
      competency: 72,
    },
    {
      name: "Data Processing",
      employees: 98,
      competency: 68,
    },
    {
      name: "Statistical Analysis",
      employees: 86,
      competency: 81,
    },
    {
      name: "Digital Infrastructure",
      employees: 62,
      competency: 59,
    },
  ];

  const skillGaps = [
    { skill: "Python", percentage: 68 },
    { skill: "AI / Machine Learning", percentage: 61 },
    { skill: "Cloud Computing", percentage: 54 },
    { skill: "SQL", percentage: 47 },
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
            className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
          >
            ▦ Admin Dashboard
          </Link>

          <Link
            href="/admin/workforce"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            👥 Workforce Analytics
          </Link>

          <Link
            href="/admin/skill-gaps"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            ◈ Skill Gap Insights
          </Link>

          <Link
            href="/admin/training"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            📚 Training Analytics
          </Link>

          <Link
            href="/dashboard"
            className="mt-8 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            ← Learner Portal
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            System Administrator
          </p>

          <p className="mt-1 text-xs text-slate-500">
            MoSPI Organization Portal
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="lg:ml-64">
        {/* HEADER */}
        <header className="border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                ADMINISTRATOR PORTAL
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Workforce Skill Intelligence 📊
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                AI-powered insights into organizational competencies and
                capacity-building needs.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              ✦ AI Insights Active
            </span>
          </div>
        </header>

        <div className="p-6 md:p-10">

          {/* AI INSIGHT BANNER */}
          <div className="rounded-2xl bg-slate-900 p-7 text-white shadow-lg">
            <p className="text-sm font-semibold text-blue-300">
              ✦ ORGANIZATIONAL AI INSIGHT
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-2xl font-bold">
                  Technical competency gaps are increasing across the workforce.
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                  StatiqAI has identified Python, AI/ML, and Cloud Computing as
                  the highest-priority skills for workforce development.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-7 py-5 text-center">
                <p className="text-sm text-slate-300">
                  AI Confidence
                </p>

                <p className="mt-1 text-3xl font-bold">
                  94%
                </p>
              </div>
            </div>
          </div>

          {/* KEY METRICS */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total Officials
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                370
              </p>

              <p className="mt-2 text-xs font-medium text-green-600">
                ↑ 12 new learners
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Average Competency
              </p>

              <p className="mt-3 text-3xl font-bold text-blue-600">
                70%
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Across all competency domains
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Critical Skill Gaps
              </p>

              <p className="mt-3 text-3xl font-bold text-red-600">
                3
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Require immediate training
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Training Completion
              </p>

              <p className="mt-3 text-3xl font-bold text-green-600">
                76%
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Overall learning progress
              </p>
            </div>

          </div>

          {/* MIDDLE SECTION */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">

            {/* SKILL GAP DISTRIBUTION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Highest Priority Skill Gaps
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Percentage of workforce requiring training.
                </p>
              </div>

              <div className="mt-7 space-y-6">
                {skillGaps.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-700">
                        {skill.skill}
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        {skill.percentage}%
                      </p>
                    </div>

                    <div className="mt-2 h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-blue-600"
                        style={{
                          width: `${skill.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/admin/skill-gaps"
                className="mt-8 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View Detailed Skill Gap Analysis →
              </Link>
            </div>

            {/* AI RECOMMENDATIONS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                AI Recommended Actions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Suggested interventions based on workforce data.
              </p>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                  <p className="text-sm font-bold text-red-600">
                    🔴 HIGH PRIORITY
                  </p>

                  <h4 className="mt-2 font-bold text-slate-900">
                    Launch Python & Data Analytics Training
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    68% of officials require improvement in Python and
                    data-processing skills.
                  </p>
                </div>

                <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
                  <p className="text-sm font-bold text-orange-600">
                    🟠 EMERGING REQUIREMENT
                  </p>

                  <h4 className="mt-2 font-bold text-slate-900">
                    Prepare Workforce for AI Adoption
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    AI/ML competency requirements are expected to increase
                    across statistical operations.
                  </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm font-bold text-blue-600">
                    🔵 OPTIMIZATION
                  </p>

                  <h4 className="mt-2 font-bold text-slate-900">
                    Increase iGOT Course Utilization
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Personalized recommendations can improve course discovery
                    and training completion rates.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* DEPARTMENT OVERVIEW */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Department Competency Overview
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Compare competency levels across organizational units.
                </p>
              </div>

              <Link
                href="/admin/workforce"
                className="text-sm font-semibold text-blue-600"
              >
                View Workforce Analytics →
              </Link>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-4 font-medium">Department</th>
                    <th className="pb-4 font-medium">Officials</th>
                    <th className="pb-4 font-medium">
                      Average Competency
                    </th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {departments.map((department) => (
                    <tr
                      key={department.name}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-5 font-semibold text-slate-800">
                        {department.name}
                      </td>

                      <td className="py-5 text-sm text-slate-600">
                        {department.employees}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-28 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{
                                width: `${department.competency}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold text-slate-700">
                            {department.competency}%
                          </span>
                        </div>
                      </td>

                      <td className="py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            department.competency >= 75
                              ? "bg-green-50 text-green-600"
                              : department.competency >= 65
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {department.competency >= 75
                            ? "Strong"
                            : department.competency >= 65
                            ? "Developing"
                            : "Needs Attention"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NEXT ACTION */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  NEXT INSIGHT
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Explore detailed workforce competency analytics.
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Analyze competency trends, workforce distribution, and
                  emerging skill requirements.
                </p>
              </div>

              <Link
                href="/admin/workforce"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                View Workforce Analytics →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}