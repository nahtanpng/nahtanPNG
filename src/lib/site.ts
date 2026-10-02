import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nathanferreira.dev").replace(/\/$/, "");

export const SITE_HOST = new URL(SITE_URL).host;

export const SITE_TITLE = `${profile.name} — ${profile.role}`;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function personJsonLd() {
  return {
    "@type": "Person",
    name: profile.name,
    alternateName: profile.githubLogin,
    jobTitle: profile.role,
    description: profile.bio.lead,
    url: SITE_URL,
    image: absoluteUrl(profile.avatar),
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    sameAs: socials.filter((social) => social.href.startsWith("http")).map((social) => social.href),
  };
}
