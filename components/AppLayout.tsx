"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "▦",
    },
    {
      name: "Competency Profile",
      href: "/competency",
      icon: "◉",
    },
    {
      name: "Skill Gap Analysis",
      href: "/skill-gap",
      icon: "◈",
    },
    {
      name: "Learning Path",
      href: "/learning-path",
      icon: "→",
    },
    {
      name: "Assessments",
      href: "/quiz",
      icon: "✓",
    },
    {
      name: "AI Copilot",
      href: "/copilot",
      icon: "✦",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 lg:flex lg:flex-col lg:justify-between">
        <div>
          {/* Logo */}

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

          {/* Navigation */}

          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive(item.href)
                    ? "bg-blue-50 font-medium text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{item.icon}</span>

                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Section */}

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

      {/* ================= MOBILE HEADER ================= */}

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
        {/* Logo */}

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white">
            ✦
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Statiq<span className="text-blue-600">
                AI
              </span>
            </h1>

            <p className="text-[10px] text-slate-500">
              Skill Intelligence
            </p>
          </div>
        </Link>

        {/* Hamburger Button */}

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-700 transition hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* ================= MOBILE MENU OVERLAY ================= */}

      {mobileMenuOpen && (
        <>
          {/* Backdrop */}

          <div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          />

          {/* Mobile Sidebar */}

          <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col justify-between bg-white p-6 shadow-2xl lg:hidden">
            <div>
              {/* Mobile Logo */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
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

                {/* Close Button */}

                <button
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-700"
                  aria-label="Close navigation menu"
                >
                  ✕
                </button>
              </div>

              {/* Mobile Navigation */}

              <nav className="mt-10 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive(item.href)
                        ? "bg-blue-50 font-medium text-blue-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item.icon}</span>

                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile User Section */}

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
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-slate-600"
              >
                ← Change Workspace
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* ================= PAGE CONTENT ================= */}

      <section className="min-h-screen lg:ml-64">
        {children}
      </section>
    </main>
  );
}