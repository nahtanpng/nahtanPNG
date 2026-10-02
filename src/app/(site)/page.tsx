import { About } from "@/components/about/About";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { Contributions } from "@/components/contributions/Contributions";
import { Education } from "@/components/education/Education";
import { Experience } from "@/components/experience/Experience";
import { Profile } from "@/components/profile/Profile";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { PageContainer } from "@/components/ui/PageContainer";

export const revalidate = 3600;

export default function Home() {
  return (
    <PageContainer className="gap-22">
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
