import { profile } from "@/data/profile";
import { OG_SIZE, profileImage } from "@/lib/og";

export const alt = `Blog — ${profile.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return profileImage({ ...profile, role: "Blog · notes on building software" });
}
