"use client";

import { useSyncExternalStore } from "react";
import { getDuration } from "@/lib/dates";

interface DurationProps {
  startDate: string;
  endDate?: string;
  /** Duration calculated at build time, shown until the browser recalculates. */
  initial: string;
}

const subscribe = () => () => {};
// Month resolution is enough and keeps the snapshot a stable primitive.
const getMonthKey = () => {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
};
const getServerMonthKey = () => null;

/**
 * Role length. "Present" roles are recalculated in the browser, because the
 * static export would otherwise freeze the duration at the last build date.
 */
export default function Duration({ startDate, endDate, initial }: DurationProps) {
  const monthKey = useSyncExternalStore(subscribe, getMonthKey, getServerMonthKey);

  if (endDate || monthKey === null) return <>{initial}</>;

  const now = new Date(Math.floor(monthKey / 12), monthKey % 12);
  return <>{getDuration(startDate, endDate, now)}</>;
}
