import { socialIcons } from "@/components/icons";
import { socials } from "@/data/socials";

export function SocialLinks() {
  return (
    <div className="flex gap-2">
      {socials.map((social) => {
        const Icon = socialIcons[social.icon];
        const external = social.href.startsWith("http");

        return (
          <a
            key={social.label}
            href={social.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={`${social.label}: ${social.handle}`}
            className="group relative flex size-9 items-center justify-center rounded-[9px] border border-line bg-chip text-muted transition-colors duration-150 hover:bg-hover hover:text-fg"
          >
            <Icon size={18} />
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-fg px-2 py-1 font-mono text-xs whitespace-nowrap text-bg opacity-0 transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              {social.handle}
            </span>
          </a>
        );
      })}
    </div>
  );
}
