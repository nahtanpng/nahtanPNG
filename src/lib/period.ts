export type Period = "morning" | "afternoon" | "night";

export function getPeriod(date: Date = new Date()): Period {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  return "night";
}

export const greetings: Record<Period, string> = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  night: "Good evening",
};
