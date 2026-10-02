import { AsciiBanner } from "@/components/ascii/AsciiBanner";
import { ClockIcon, MapPinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { Avatar } from "./Avatar";
import { LocalClock } from "./LocalClock";
import { SocialLinks } from "./SocialLinks";

export function Profile() {
  return (
    <section aria-label="Profile" className="flex flex-col gap-7">
      <div className="flex flex-col">
        <AsciiBanner />
        <div className="flex flex-col gap-4 px-4">
          <Avatar src={profile.avatar} alt={profile.name} />
          <div className="flex flex-col gap-1.5">
            <h1 className="m-0 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em]">{profile.name}</h1>
            <p className="m-0 font-mono text-sm text-muted">
              {profile.role}
              <span className="animate-blink text-fg">_</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <MapPinIcon size={15} />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon size={15} />
              <LocalClock suffix={profile.timezoneLabel} />
            </div>
          </div>
        </div>
      </div>
      <SocialLinks />
    </section>
  );
}
