import { CommandPaletteProvider } from "@/components/command-palette/CommandPaletteProvider";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getPosts } from "@/lib/posts";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts();

  return (
    <CommandPaletteProvider
      posts={posts.map(({ slug, title, date, summary, tags }) => ({ slug, title, date, summary, tags }))}
    >
      <div className="flex min-h-dvh flex-col">
        <Header />
        {children}
        <Footer />
      </div>
      <ScrollToTop />
    </CommandPaletteProvider>
  );
}
