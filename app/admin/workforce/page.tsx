"use client";

import Link from "next/link";

export default function WorkforcePage() {
  const competencyData = [
    { name: "Advanced", value: 18, description: "Highly skilled officials" },
    { name: "Proficient", value: 32, description: "Strong competency level" },
    { name: "Developing", value: 35, description: "Requires targeted training" },
    { name: "Beginner", value: 15, description: "Requires foundational training" },
  ];

  const departments = [
    {
      name: "Data Collection",
      officials: 124,
      competency: 72,
      progress: 78,
      status: "Developing",
    },
    {
      name: "Data Processing",
      officials: 98,
      competency: 68,
      progress: 71,
      status: "Needs Attention",
    },
    {
      name: "Statistical Analysis",
      officials: 86,
      competency: 81,
      progress: 84,
      status: "Strong",
    },
    {
      name: "Digital Infrastructure",
      officials: 62,
      competency: 59,
      progress: 65,
      status: "Needs Attention",
    },
  ];

  const learningStats = [
    {
      title: "Active Learners",
      value: "284",
      description: "Officials currently enrolled",
    },
    {
      title: "Courses Completed",
      value: "1,248",
      description: "Across all learning programs",
    },
    {
      title: "Average Learning Hours",
      value: "18.4",
      description: "Hours per official",
    },
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
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            ▦ Admin Dashboard
          </Link>

          <Link
            href="/admin/workforce"
            className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
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
                WORKFORCE ANALYTICS
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Organization Competency Overview 👥
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor workforce skills, competency distribution, and learning progress.
              </p>
            </div>

            <Link
              href="/admin"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-10">

          {/* TOP METRICS */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total Workforce
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                370
              </p>

              <p className="mt-2 text-xs text-green-600">
                ↑ 12 new officials
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
                Organization-wide score
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Active Learners
              </p>

              <p className="mt-3 text-3xl font-bold text-green-600">
                284
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Currently learning
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Training Completion
              </p>

              <p className="mt-3 text-3xl font-bold text-purple-600">
                76%
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Overall completion rate
              </p>
            </div>
          </div>

          {/* AI INSIGHT */}
          <div className="mt-8 rounded-2xl bg-slate-900 p-7 text-white shadow-lg">
            <p className="text-sm font-semibold text-blue-300">
              ✦ AI WORKFORCE INSIGHT
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-2xl font-bold">
                  50% of the workforce requires technical upskilling.
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                  AI analysis indicates a growing demand for Python, SQL,
                  AI/ML, and cloud computing skills across multiple departments.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-7 py-5 text-center">
                <p className="text-sm text-slate-300">
                  Trend Confidence
                </p>

                <p className="mt-1 text-3xl font-bold">
                  92%
                </p>
              </div>
            </div>
          </div>

          {/* COMPETENCY DISTRIBUTION + LEARNING OVERVIEW */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">

            {/* COMPETENCY DISTRIBUTION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Competency Distribution
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of officials based on competency levels.
              </p>

              <div className="mt-8 space-y-6">
                {competencyData.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <span className="text-lg font-bold text-blue-600">
                        {item.value}%
                      </span>
                    </div>

                    <div className="mt-3 h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LEARNING ACTIVITY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Learning Activity
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current learning engagement across the organization.
              </p>

              <div className="mt-8 space-y-5">
                {learningStats.map((stat) => (
                  <div
                    key={stat.title}
                    className="rounded-xl bg-slate-50 p-5"
                  >
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DEPARTMENT PERFORMANCE */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Department-wise Performance
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Compare workforce competency and training progress.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                AI Updated
              </span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-4 font-medium">Department</th>
                    <th className="pb-4 font-medium">Officials</th>
                    <th className="pb-4 font-medium">Competency</th>
                    <th className="pb-4 font-medium">Learning Progress</th>
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
                        {department.officials}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{
                                width: `${department.competency}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold">
                            {department.competency}%
                          </span>
                        </div>
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-green-500"
                              style={{
                                width: `${department.progress}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold">
                            {department.progress}%
                          </span>
                        </div>
                      </td>

                      <td className="py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            department.status === "Strong"
                              ? "bg-green-50 text-green-600"
                              : department.status === "Developing"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {department.status}
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
                  NEXT ANALYSIS
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Identify the most critical workforce skill gaps.
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Explore which competencies require immediate intervention and
                  AI-recommended training programs.
                </p>
              </div>

              <Link
                href="/admin/skill-gaps"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                View Skill Gap Insights →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}