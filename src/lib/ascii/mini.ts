import type { Period } from "@/lib/period";

const MINI: Record<Period, string[]> = {
  morning: ["  \\ | /", "-- .-. --", "__(   )__"],
  afternoon: ["  \\  |  /", "--  ( )  --", "  /  |  \\"],
  night: ["*    _.._", "   .' .-'`    .", "  /  /", "  |  |      *", "  \\  '.___.;", "   '._  _.'"],
};

export function mini(period: Period) {
  return MINI[period].join("\n");
}
