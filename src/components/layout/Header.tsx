"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { navItems } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import MobileMenu, { MenuButton } from "./MobileMenu";

const MENU_ID = "site-menu";
const SCROLL_THRESHOLD = 8;

// Scroll position as an external store: true once the page has scrolled 8px.
function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);

  // Escape closes the menu and returns focus to the menu button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Widening past the mobile breakpoint closes the menu.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`header sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md ${
        scrolled ? "is-scrolled" : ""
      } ${menuOpen ? "is-menu-open" : ""}`}
    >
      {/*
        One row of flex items. The source order (mark, menu button, nav, call
        to action, theme toggle) gives a sensible Tab order at every width:
        from the menu button, Tab goes straight into the open panel. The
        order-* classes only change where things sit visually.
      */}
      <div className="mx-auto flex max-w-reading flex-wrap items-center gap-x-2 px-6">
        <Link
          href="/"
          className="order-1 inline-flex h-17 min-w-11 items-center justify-center font-display text-mark text-text-primary hover:text-accent sm:mr-4"
        >
          JB
        </Link>

        <div className="order-3 sm:hidden">
          <MenuButton
            open={menuOpen}
            controls={MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
            buttonRef={menuButtonRef}
          />
        </div>

        {/* The only copy of the nav: inline from 640px, a panel below it. */}
        <MobileMenu
          id={MENU_ID}
          open={menuOpen}
          className="order-5 basis-full sm:order-2 sm:mr-auto sm:basis-auto"
        >
          <nav aria-label="Main">
            <ul className="flex flex-col px-2 pb-4 sm:flex-row sm:items-center sm:gap-6 sm:px-0 sm:pb-0">
              {navItems.map((item) => {
                const current = pathname === item.href;
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : active ? "true" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`group/nav inline-flex min-h-11 min-w-11 items-center justify-start text-nav transition-colors duration-fast hover:text-accent sm:justify-center ${
                        active ? "text-accent" : "text-text-secondary"
                      }`}
                    >
                      {/* Underline sits on the label, so it matches the text width */}
                      <span
                        className={`relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-accent-decor after:transition-transform after:duration-fast ${
                          active ? "after:scale-x-100" : "after:scale-x-0 group-hover/nav:after:scale-x-100"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </MobileMenu>

        <div className="order-2 ml-auto sm:order-3 sm:ml-0">
          <Button href="/#contact" size="sm">
            Get in touch
          </Button>
        </div>

        <div className="order-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
