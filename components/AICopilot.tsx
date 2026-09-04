"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

type CopilotAction = {
  label: string;
  href: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: CopilotAction[];
};

type AICopilotProps = {
  compact?: boolean;
};

export default function AICopilot({
  compact = false,
}: AICopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your StatiqAI Copilot. Ask me what you should learn next, about your skill gaps, or how to improve your readiness.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loadingContext, setLoadingContext] =
    useState(false);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    if (!isOpen || dashboardData) return;

    async function fetchDashboardData() {
      setLoadingContext(true);

      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error(
            "Failed to load competency data."
          );
        }

        const result = await response.json();

        if (result.success && result.data) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error(
          "Failed to load AI Copilot context:",
          error
        );

        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            content:
              "I couldn't load your latest competency data, but you can still ask me general questions about your learning journey.",
          },
        ]);
      } finally {
        setLoadingContext(false);
      }
    }

    fetchDashboardData();
  }, [isOpen, dashboardData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, sending]);

  async function sendMessage(
    customMessage?: string
  ) {
    const userMessage =
      customMessage?.trim() || input.trim();

    if (!userMessage || sending) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          dashboardData,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to get a response from Copilot."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",

          // Supports both versions of your API
          content:
            result.reply ||
            result.response ||
            "I'm ready to help with your learning journey.",

          actions: Array.isArray(result.actions)
            ? result.actions
            : [],
        },
      ]);
    } catch (error) {
      console.error(
        "Failed to send Copilot message:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong while processing your request. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  const suggestedQuestions = [
    "What should I learn first?",
    "Show my skill gaps",
    "How can I improve my readiness score?",
    "Take me to my learning path",
  ];

  return (
    <>
      {/* Floating Copilot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-blue-700 ${
            compact ? "px-4 py-3" : ""
          }`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">
            ✦
          </span>

          {!compact && (
            <span>Ask AI Copilot</span>
          )}
        </button>
      )}

      {/* Copilot Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[650px] w-[calc(100%-3rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg">
                ✦
              </div>

              <div>
                <h3 className="font-bold">
                  StatiqAI Copilot
                </h3>

                <p className="text-xs text-slate-400">
                  Your learning assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close AI Copilot"
            >
              ✕
            </button>
          </div>

          {/* Competency Context */}
          {dashboardData && (
            <div className="grid grid-cols-3 gap-2 border-b border-slate-100 bg-slate-50 p-3">
              <div className="rounded-xl bg-white p-3 text-center">
                <p className="text-[10px] font-semibold text-slate-500">
                  OVERALL
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {dashboardData.overallScore}%
                </p>
              </div>

              <div className="rounded-xl bg-white p-3 text-center">
                <p className="text-[10px] font-semibold text-slate-500">
                  READINESS
                </p>

                <p className="mt-1 font-bold text-blue-600">
                  {dashboardData.readinessScore}%
                </p>
              </div>

              <div className="rounded-xl bg-white p-3 text-center">
                <p className="text-[10px] font-semibold text-slate-500">
                  PRIORITY
                </p>

                <p className="mt-1 truncate text-xs font-bold text-red-500">
                  {
                    dashboardData.highestGapSkill
                      .name
                  }
                </p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {loadingContext && (
              <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-500">
                🤖 Loading your competency profile...
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-blue-600 text-white"
                        : "rounded-bl-md bg-slate-100 text-slate-700"
                    }`}
                  >
                    {message.content}
                  </div>

                  {/* Smart Navigation Actions */}
                  {message.role === "assistant" &&
                    message.actions &&
                    message.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.actions.map(
                          (action) => (
                            <Link
                              key={action.href}
                              href={action.href}
                              onClick={() =>
                                setIsOpen(false)
                              }
                              className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                            >
                              {action.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-500">
                  🤖 StatiqAI is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="border-t border-slate-100 px-4 py-3">
              <p className="mb-2 text-[10px] font-bold text-slate-400">
                TRY ASKING
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() =>
                      sendMessage(question)
                    }
                    disabled={sending}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 border-t border-slate-200 p-4">
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask your AI Copilot..."
              disabled={sending}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 disabled:bg-slate-50"
            />

            <button
              onClick={() => sendMessage()}
              disabled={
                sending || !input.trim()
              }
              className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}