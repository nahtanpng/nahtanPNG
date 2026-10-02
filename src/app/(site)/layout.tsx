import { CommandPaletteProvider } from "@/components/command-palette/CommandPaletteProvider";
import { Header } from "@/components/header/Header";
import { getPosts } from "@/lib/posts";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts();

  return (
    <CommandPaletteProvider
      posts={posts.map(({ slug, title, date, summary, tags }) => ({ slug, title, date, summary, tags }))}
    >
      <Header />
      {children}
    </CommandPaletteProvider>
  );
}
