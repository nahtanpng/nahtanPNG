import { About } from "@/components/about/About";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { Contributions } from "@/components/contributions/Contributions";
import { Education } from "@/components/education/Education";
import { Experience } from "@/components/experience/Experience";
import { Profile } from "@/components/profile/Profile";
import { Projects } from "@/components/projects/Projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skills } from "@/components/skills/Skills";
import { PageContainer } from "@/components/ui/PageContainer";
import { personJsonLd } from "@/lib/site";

export const revalidate = 3600;

export default function Home() {
  return (
    <PageContainer className="gap-22">
      <JsonLd data={personJsonLd()} />
      <Profile />
      <About />
      <Contributions />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <BlogPreview />
    </PageContainer>
  );
}
