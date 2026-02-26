import experienceData from "@/content/experience.json";
import type { ExperienceData } from "@/types/experience";

export function getExperience(): ExperienceData {
  return experienceData as ExperienceData;
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  return `${start} — ${end}`;
}

function formatMonthYear(dateStr: string): string {
  if (dateStr.length === 4) return dateStr;

  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function getDuration(startDate: string, endDate?: string): string {
  const start = parseDate(startDate);
  const end = endDate ? parseDate(endDate) : new Date();

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 1) months = 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}

function parseDate(dateStr: string): Date {
  if (dateStr.length === 4) return new Date(parseInt(dateStr), 0);
  const [year, month] = dateStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1);
}
