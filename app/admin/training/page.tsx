"use client";

import Link from "next/link";

export default function TrainingPage() {
  const courses = [
    {
      name: "Python for Data Analysis",
      enrolled: 142,
      completion: 82,
      improvement: "+24%",
      status: "Excellent",
    },
    {
      name: "Introduction to AI & ML",
      enrolled: 118,
      completion: 74,
      improvement: "+19%",
      status: "Good",
    },
    {
      name: "Cloud Computing Fundamentals",
      enrolled: 96,
      completion: 61,
      improvement: "+15%",
      status: "Needs Attention",
    },
    {
      name: "Advanced Statistical Methods",
      enrolled: 84,
      completion: 88,
      improvement: "+28%",
      status: "Excellent",
    },
  ];

  const engagement = [
    { label: "Active Learners", value: 284, total: 370 },
    { label: "Weekly Learning Activity", value: 246, total: 370 },
    { label: "Assessment Participation", value: 312, total: 370 },
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
            className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
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
                TRAINING ANALYTICS
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Learning Effectiveness & Outcomes 📚
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Measure training engagement, course completion, and competency
                improvement across the organization.
              </p>
            </div>

            <Link
              href="/admin"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-10">

          {/* AI INSIGHT */}
          <div className="rounded-2xl bg-slate-900 p-7 text-white shadow-lg">
            <p className="text-sm font-semibold text-blue-300">
              ✦ AI TRAINING INSIGHT
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-2xl font-bold">
                  Personalized learning paths are improving competency outcomes.
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                  AI analysis shows that officials following personalized
                  learning recommendations demonstrate higher course completion
                  and stronger competency improvement.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-7 py-5 text-center">
                <p className="text-sm text-slate-300">
                  Learning Impact
                </p>

                <p className="mt-1 text-3xl font-bold">
                  +22%
                </p>
              </div>
            </div>
          </div>

          {/* TOP METRICS */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Course Completion
              </p>

              <p className="mt-3 text-3xl font-bold text-blue-600">
                76%
              </p>

              <p className="mt-2 text-xs text-green-600">
                ↑ 8% from previous cycle
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Average Learning Hours
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                18.4
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Hours per official
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Assessment Score
              </p>

              <p className="mt-3 text-3xl font-bold text-green-600">
                78%
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Average organization score
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Competency Growth
              </p>

              <p className="mt-3 text-3xl font-bold text-purple-600">
                +22%
              </p>

              <p className="mt-2 text-xs text-slate-500">
                After recommended training
              </p>
            </div>
          </div>

          {/* ENGAGEMENT + EFFECTIVENESS */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">

            {/* LEARNING ENGAGEMENT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Learning Engagement
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current participation across learning activities.
              </p>

              <div className="mt-8 space-y-7">
                {engagement.map((item) => {
                  const percentage = Math.round(
                    (item.value / item.total) * 100
                  );

                  return (
                    <div key={item.label}>
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-700">
                            {item.label}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.value} of {item.total} officials
                          </p>
                        </div>

                        <p className="font-bold text-blue-600">
                          {percentage}%
                        </p>
                      </div>

                      <div className="mt-3 h-3 rounded-full bg-slate-100">
                        <div
                          className="h-3 rounded-full bg-blue-600 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TRAINING EFFECTIVENESS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Training Effectiveness
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Competency improvement after completing recommended training.
              </p>

              <div className="mt-8 space-y-6">

                <div className="rounded-xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800">
                      Before Training
                    </p>

                    <span className="text-2xl font-bold text-slate-700">
                      58%
                    </span>
                  </div>

                  <div className="mt-3 h-3 rounded-full bg-slate-200">
                    <div
                      className="h-3 w-[58%] rounded-full bg-slate-500"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-green-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800">
                      After Training
                    </p>

                    <span className="text-2xl font-bold text-green-600">
                      80%
                    </span>
                  </div>

                  <div className="mt-3 h-3 rounded-full bg-green-100">
                    <div
                      className="h-3 w-[80%] rounded-full bg-green-500"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm font-bold text-blue-700">
                    🤖 AI Analysis
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Officials who completed personalized learning pathways
                    demonstrated an average competency improvement of 22%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COURSE PERFORMANCE */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Training Program Performance
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Performance of high-priority training programs.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-4 font-medium">
                      Training Program
                    </th>
                    <th className="pb-4 font-medium">
                      Enrolled
                    </th>
                    <th className="pb-4 font-medium">
                      Completion
                    </th>
                    <th className="pb-4 font-medium">
                      Competency Growth
                    </th>
                    <th className="pb-4 font-medium">
                      Performance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course.name}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-5 font-semibold text-slate-800">
                        {course.name}
                      </td>

                      <td className="py-5 text-sm text-slate-600">
                        {course.enrolled}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{
                                width: `${course.completion}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold">
                            {course.completion}%
                          </span>
                        </div>
                      </td>

                      <td className="py-5 font-bold text-green-600">
                        {course.improvement}
                      </td>

                      <td className="py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            course.status === "Excellent"
                              ? "bg-green-50 text-green-600"
                              : course.status === "Good"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* iGOT INTEGRATION */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  iGOT KARMAYOGI INTEGRATION
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Personalized recommendations improve course utilization.
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  StatiqAI connects identified competency gaps with relevant
                  iGOT Karmayogi courses and recommended training programs,
                  helping officials discover the most relevant learning content.
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-white px-6 py-4 text-center shadow-sm">
                <p className="text-xs text-slate-500">
                  Course Utilization
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-600">
                  84%
                </p>
              </div>
            </div>
          </div>

          {/* FINAL AI RECOMMENDATION */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-600">
              ✦ NEXT AI RECOMMENDATION
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Focus the next training cycle on Cloud Computing and AI/ML.
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              These areas show a combination of high competency gaps and
              increasing organizational demand. StatiqAI recommends targeted,
              role-based learning pathways for the most affected officials.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}