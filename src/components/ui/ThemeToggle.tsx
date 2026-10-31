"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/*
 * Switches between light and dark. The label names the theme it switches
 * to. Where View Transitions are supported the change crossfades over
 * duration-base; elsewhere it is instant. The icons are driven by the .dark
 * class, so they render correctly before hydration.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- mount detection to avoid hydration mismatch with next-themes
  useEffect(() => setMounted(true), []);

  const next = resolvedTheme === "dark" ? "light" : "dark";
  const label = mounted ? `Switch to ${next} theme` : "Switch theme";

  function applyTheme() {
    flushSync(() => setTheme(next));
    // next-themes applies the class in an effect; make sure the DOM has the
    // new theme before the view transition takes its "after" snapshot.
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    root.style.colorScheme = next;
  }

  function handleClick() {
    const doc = document as ViewTransitionDocument;
    // The crossfade is opacity only, so it stays under reduced motion.
    if (doc.startViewTransition) {
      doc.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  }

  const iconBase =
    "absolute inset-0 m-auto size-5 transition duration-base motion-reduce:transition-none";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!mounted}
      className="press relative inline-flex size-11 items-center justify-center rounded-md text-text-secondary transition-colors duration-fast hover:bg-accent-subtle hover:text-text-primary"
      aria-label={label}
    >
      {/* Moon: shown in light theme */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`${iconBase} opacity-100 dark:rotate-90 dark:opacity-0`}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      {/* Sun: shown in dark theme */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`${iconBase} -rotate-90 opacity-0 dark:rotate-0 dark:opacity-100`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </button>
  );
}
