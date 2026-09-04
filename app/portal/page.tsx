"use client";

import Link from "next/link";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* TOP NAVBAR */}
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
            ✦
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Statiq<span className="text-blue-600">AI</span>
            </h1>

            <p className="text-xs text-slate-500">
              Skill Intelligence Platform
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* MAIN CONTENT */}
      <section className="mx-auto flex min-h-[calc(100vh-84px)] max-w-6xl flex-col items-center justify-center px-6 py-16">
        {/* HEADING */}
        <div className="max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white shadow-lg">
            ✦
          </div>

          <p className="text-sm font-bold tracking-widest text-blue-600">
            STATIQAI WORKSPACE
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Choose your workspace
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 md:text-lg">
            Access your personalized learning environment or manage
            organization-wide workforce intelligence and training insights.
          </p>
        </div>

        {/* ROLE CARDS */}
        <div className="mt-14 grid w-full max-w-5xl gap-8 md:grid-cols-2">

          {/* LEARNER */}
          <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              👤
            </div>

            <p className="mt-7 text-sm font-bold tracking-wider text-blue-600">
              LEARNER PORTAL
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              Continue as Learner
            </h3>

            <p className="mt-4 leading-7 text-slate-500">
              Discover your competencies, identify skill gaps, receive
              personalized learning recommendations, and test your knowledge
              using AI-generated assessments.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Competency Profile",
                "AI Skill Gap Analysis",
                "Personalized Learning Path",
                "AI Quiz & Assessment",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="mt-9 flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Enter Learner Portal →
            </Link>
          </div>

          {/* ADMIN */}
          <div className="group rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              👨‍💼
            </div>

            <p className="mt-7 text-sm font-bold tracking-wider text-blue-300">
              ADMINISTRATION
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Continue as Administrator
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Monitor workforce competencies, identify organization-wide skill
              gaps, analyze training effectiveness, and receive AI-powered
              workforce insights.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Workforce Analytics",
                "Skill Gap Insights",
                "Training Analytics",
                "AI Workforce Intelligence",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs text-blue-300">
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/admin"
              className="mt-9 flex items-center justify-center rounded-xl bg-white px-6 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Enter Admin Portal →
            </Link>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-center">
          <p className="text-sm text-slate-600">
            🤖 Powered by <span className="font-semibold text-blue-700">AI-driven competency intelligence</span> to build a future-ready statistical workforce.
          </p>
        </div>
      </section>
    </main>
  );
}