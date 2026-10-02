import type { Education, Experience, Project, SkillGroup, Social } from "@/data/types";
import type { ResourceName } from "@/lib/admin/resources";
import type { FormAction } from "@/components/admin/form/ResourceForm";
import { EducationForm } from "./EducationForm";
import { ExperienceForm } from "./ExperienceForm";
import { ProjectForm } from "./ProjectForm";
import { SkillGroupForm } from "./SkillGroupForm";
import { SocialForm } from "./SocialForm";

type ResourceItemFormProps = {
  resource: ResourceName;
  action: FormAction;
  item?: unknown;
};

export function ResourceItemForm({ resource, action, item }: ResourceItemFormProps) {
  switch (resource) {
    case "socials":
      return <SocialForm action={action} item={item as Social | undefined} />;
    case "experience":
      return <ExperienceForm action={action} item={item as Experience | undefined} />;
    case "education":
      return <EducationForm action={action} item={item as Education | undefined} />;
    case "projects":
      return <ProjectForm action={action} item={item as Project | undefined} />;
    case "skills":
      return <SkillGroupForm action={action} item={item as SkillGroup | undefined} />;
  }
}
