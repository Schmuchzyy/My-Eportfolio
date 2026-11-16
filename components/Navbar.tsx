"use client";

import { useState, useEffect } from "react";
import { Home, User, Zap, Code2, Briefcase, Workflow, Award, Hash } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "Home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "Experience", label: "Experience", icon: Zap },
  { id: "Skills", label: "Skills", icon: Code2 },
  { id: "Projects", label: "Projects", icon: Briefcase },
  { id: "Automations", label: "Workflow Automation", icon: Workflow },
  { id: "Certs", label: "Certificates", icon: Award },
  { id: "ContactMe", label: "Contact Me", icon: Hash },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "Home";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the mobile menu is open: Escape closes it, and the page behind it doesn't scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    setMobileOpen(false);
    // let the body scroll lock release before scrolling
    requestAnimationFrame(() => el?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-4 z-50 border-r border-[var(--border-color)] bg-[var(--surface)] overflow-y-auto">
        <div className="flex flex-col items-center gap-1 w-full">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={label}
                title={label}
                className={`group relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-[#1e90ff] text-white"
                    : "text-[var(--text-muted)] hover:bg-[#1e90ff]/15 hover:text-[#1e90ff]"
                  }`}
              >
                <Icon size={18} />
                {/* Tooltip */}
                <span className="absolute left-14 bg-[var(--surface-2)] text-[var(--text-primary)] text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-[var(--border-color)] z-50">
                  {label}
                </span>
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-8 h-px bg-[var(--border-color)] my-2" />

          {/* Theme toggle always visible with nav items */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-50 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
        <button onClick={() => scrollTo("Home")} className="text-[#1e90ff] font-bold text-lg py-2" aria-label="Back to top">
          SA
        </button>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 text-[var(--text-primary)]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu: tap outside or press Escape to close */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-14 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <nav
            id="mobile-menu"
            className="md:hidden fixed top-14 left-0 right-0 z-40 bg-[var(--surface)] border-b border-[var(--border-color)] p-3 grid grid-cols-2 gap-1.5 max-h-[calc(100svh-3.5rem)] overflow-y-auto shadow-xl"
          >
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-current={activeSection === id ? "true" : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-left transition-colors
                  ${activeSection === id ? "text-[#1e90ff] bg-[#1e90ff]/10" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="leading-tight">{label}</span>
              </button>
            ))}
          </nav>
        </>
      )}
    </>
  );
}
