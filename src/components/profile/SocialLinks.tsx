import { socialIcons } from "@/components/icons";
import { ExternalLinkCard } from "@/components/ui/ExternalLinkCard";
import { socials } from "@/data/socials";

export function SocialLinks() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-3">
      {socials.map((social) => (
        <ExternalLinkCard
          key={social.label}
          href={social.href}
          title={social.label}
          subtitle={social.handle}
          icon={socialIcons[social.icon]}
        />
      ))}
    </div>
  );
}
