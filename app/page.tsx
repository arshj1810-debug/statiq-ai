"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const roles = [
    {
      title: "Learner",
      description:
        "Discover your skills, identify gaps, and follow a personalized learning path.",
      icon: "👤",
    },
    {
      title: "Trainer",
      description:
        "Upload learning materials and generate AI-powered quizzes and MCQs.",
      icon: "👨‍🏫",
    },
    {
      title: "Administrator",
      description:
        "Monitor workforce competencies, skill gaps, and training insights.",
      icon: "🛡️",
    },
  ];

  const handleContinue = () => {
    if (selectedRole === "Learner") {
      router.push("/dashboard");
    } else if (selectedRole === "Trainer") {
      router.push("/quiz");
    } else if (selectedRole === "Administrator") {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
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

        <div className="flex items-center gap-4">
          <Link
            href="/portal"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Get Started →
          </Link>

          <div className="hidden md:block">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              AI-Powered Learning
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-16 text-center">
        <div className="mb-6 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Smart India Hackathon 2026
        </div>

        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Build Skills.
          <span className="text-blue-600"> Bridge Gaps.</span>
          Grow Smarter.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          An AI-powered skill intelligence platform that identifies competency
          gaps and creates personalized learning pathways for a future-ready
          workforce.
        </p>

        {/* Primary Call to Action */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/portal"
            className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Get Started →
          </Link>
        </div>

        {/* Role Selection */}
        <div className="mt-14 w-full">
          <h3 className="text-2xl font-bold text-slate-900">
            How would you like to continue?
          </h3>

          <p className="mt-2 text-slate-500">
            Select your role to access your personalized workspace.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.title}
                onClick={() => setSelectedRole(role.title)}
                className={`group rounded-2xl border p-7 text-left transition-all duration-300 ${
                  selectedRole === role.title
                    ? "border-blue-600 bg-blue-50 shadow-lg shadow-blue-100"
                    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-3xl transition group-hover:bg-blue-100">
                  {role.icon}
                </div>

                <h4 className="text-xl font-bold text-slate-900">
                  {role.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {role.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Select role
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Continue Button & Quick Navigation */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {selectedRole && (
              <button
                onClick={handleContinue}
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Continue as {selectedRole} →
              </button>
            )}

            <Link
              href="/portal"
              className="rounded-xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore All Workspaces →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-5 text-center text-sm text-slate-500">
        AI-Enabled Skill Intelligence & Learning Platform
      </footer>
    </main>
  );
}