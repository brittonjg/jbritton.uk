import experienceData from "@/content/experience.json";
import type { ExperienceData } from "@/types/experience";

export { formatDateRange, formatYearRange, getDuration } from "@/lib/dates";

export function getExperience(): ExperienceData {
  return experienceData as ExperienceData;
}
