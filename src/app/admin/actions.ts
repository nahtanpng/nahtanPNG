"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Profile } from "@/data/types";
import { assertLocalRequest } from "@/lib/admin/env";
import { readData, writeData } from "@/lib/admin/files";
import { parseForm, rules, withoutEmpty, type FormState } from "@/lib/admin/form";
import { isResourceName, resources } from "@/lib/admin/resources";

function resourceOrThrow(name: string) {
  if (!isResourceName(name)) throw new Error(`Unknown resource: ${name}`);
  return resources[name];
}

function isIndexOf(items: unknown[], index: unknown): index is number {
  return Number.isInteger(index) && (index as number) >= 0 && (index as number) < items.length;
}

function refresh(path: string) {
  revalidatePath("/", "layout");
  revalidatePath(path);
}

export async function saveItem(
  name: string,
  index: number | null,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertLocalRequest();
  const resource = resourceOrThrow(name);
  const parsed = parseForm(formData, resource.shape);
  if (!parsed.ok) return parsed.state;

  const items = await readData<unknown[]>(resource.file);
  const item = withoutEmpty(parsed.data);

  if (index === null) items.push(item);
  else if (isIndexOf(items, index)) items[index] = item;
  else return { status: "error", message: "Item não encontrado. Recarregue a página." };

  await writeData(resource.file, items);
  refresh(`/admin/${name}`);
  redirect(`/admin/${name}`);
}

export async function deleteItem(name: string, index: number) {
  await assertLocalRequest();
  const resource = resourceOrThrow(name);
  const items = await readData<unknown[]>(resource.file);
  if (!isIndexOf(items, index)) return;
  items.splice(index, 1);
  await writeData(resource.file, items);
  refresh(`/admin/${name}`);
}

export async function moveItem(name: string, index: number, direction: "up" | "down") {
  await assertLocalRequest();
  const resource = resourceOrThrow(name);
  const items = await readData<unknown[]>(resource.file);
  if (direction !== "up" && direction !== "down") return;
  const target = direction === "up" ? index - 1 : index + 1;
  if (!isIndexOf(items, index) || !isIndexOf(items, target)) return;

  [items[index], items[target]] = [items[target], items[index]];
  await writeData(resource.file, items);
  refresh(`/admin/${name}`);
}

const profileShape = {
  name: rules.text("Nome"),
  role: rules.text("Cargo"),
  location: rules.text("Localização"),
  timezoneLabel: rules.text("Fuso"),
  avatar: rules.link("Foto"),
  githubLogin: rules.text("Usuário do GitHub"),
  bioLead: rules.text("Primeiro parágrafo"),
  bioRest: rules.optionalText(),
};

export async function saveProfile(_state: FormState, formData: FormData): Promise<FormState> {
  await assertLocalRequest();
  const parsed = parseForm(formData, profileShape);
  if (!parsed.ok) return parsed.state;

  const { bioLead, bioRest, ...rest } = parsed.data;
  const profile: Profile = { ...rest, bio: { lead: bioLead, rest: bioRest } };
  await writeData("profile", profile);
  refresh("/admin/profile");
  return { status: "success", message: "Perfil salvo." };
}
