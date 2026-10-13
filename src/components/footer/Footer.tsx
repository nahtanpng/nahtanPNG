import { AsciiBanner } from "@/components/ascii/AsciiBanner";
import { SocialLinks } from "@/components/profile/SocialLinks";
import { profile } from "@/data/profile";

const TOP_FADE = "[mask-image:linear-gradient(to_bottom,transparent,black_40%)]";

export function Footer() {
  return (
    <footer className="mt-auto w-full">
      <AsciiBanner maskClassName={TOP_FADE} className="h-72">
        <div className="flex flex-col items-center gap-4 px-5 text-center">
          <div className="flex flex-col gap-1">
            <p className="m-0 text-base font-semibold tracking-[-0.01em]">{profile.name}</p>
            <p className="m-0 font-mono text-xs text-muted">
              {profile.role} · {profile.location}
            </p>
          </div>
          <SocialLinks />
          <p className="m-0 font-mono text-xs text-muted">
            © {new Date().getFullYear()}
          </p>
        </div>
      </AsciiBanner>
    </footer>
  );
}
