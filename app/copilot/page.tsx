"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function CopilotPage() {
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I am your StatiqAI Copilot. I can help you understand your skill gaps, decide what to learn next, and guide your learning journey.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error(
            "Failed to fetch dashboard data."
          );
        }

        const result = await response.json();

        if (result.success && result.data) {
          setDashboardData(result.data);
        } else {
          throw new Error(
            "Dashboard data is unavailable."
          );
        }
      } catch (error) {
        console.error(
          "Failed to load Copilot context:",
          error
        );

        setError(
          "Unable to load your competency data."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  async function sendMessage(
    customMessage?: string
  ) {
    const userMessage =
      customMessage || input.trim();

    if (
      !userMessage ||
      sending ||
      !dashboardData
    ) {
      return;
    }

    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
    };

    setMessages((previous) => [
      ...previous,
      newUserMessage,
    ]);

    setInput("");
    setSending(true);

    try {
      const response = await fetch(
        "/api/copilot",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            dashboardData,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to get AI response."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: result.reply,
        },
      ]);
    } catch (error) {
      console.error(
        "Copilot message error:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that request. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  const suggestedQuestions = [
    "What should I learn first?",
    "Why is my weakest skill important?",
    "How can I improve my readiness score?",
    "Create a learning plan for me.",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 lg:flex lg:flex-col lg:justify-between">
        <div>
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

            <Link
              href="/copilot"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-700"
            >
              ✦ AI Copilot
            </Link>
          </nav>
        </div>

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
        <header className="border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <p className="text-sm font-semibold text-blue-600">
            ✦ STATIQAI COPILOT
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Your Personal Learning Assistant
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Ask questions about your skills,
            competency gaps, and learning journey.
          </p>
        </header>

        <div className="mx-auto max-w-5xl p-6 md:p-10">
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="text-4xl">
                🤖
              </div>

              <p className="mt-4 font-semibold text-slate-800">
                Loading your AI learning context...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
              <p className="font-semibold text-red-600">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            dashboardData && (
              <>
                {/* Context Summary */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500">
                      OVERALL COMPETENCY
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {dashboardData.overallScore}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500">
                      READINESS SCORE
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-600">
                      {dashboardData.readinessScore}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500">
                      TOP PRIORITY
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {
                        dashboardData.highestGapSkill
                          .name
                      }
                    </p>

                    <p className="mt-1 text-sm text-red-500">
                      {
                        dashboardData.highestGapSkill
                          .gap
                      }
                      % gap
                    </p>
                  </div>
                </div>

                {/* Chat */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="h-[500px] space-y-5 overflow-y-auto p-6">
                    {messages.map(
                      (message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-6 ${
                              message.role ===
                              "user"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      )
                    )}

                    {sending && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-500">
                          🤖 StatiqAI is thinking...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggested Questions */}
                  {messages.length === 1 && (
                    <div className="border-t border-slate-100 px-6 py-4">
                      <p className="mb-3 text-xs font-semibold text-slate-500">
                        TRY ASKING
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map(
                          (question) => (
                            <button
                              key={question}
                              onClick={() =>
                                sendMessage(
                                  question
                                )
                              }
                              className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                            >
                              {question}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="flex gap-3 border-t border-slate-200 p-4">
                    <input
                      type="text"
                      value={input}
                      onChange={(event) =>
                        setInput(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter"
                        ) {
                          sendMessage();
                        }
                      }}
                      placeholder="Ask about your learning journey..."
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />

                    <button
                      onClick={() =>
                        sendMessage()
                      }
                      disabled={
                        sending || !input.trim()
                      }
                      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}
        </div>
      </section>
    </main>
  );
}