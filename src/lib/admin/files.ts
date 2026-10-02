import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { assertDev } from "./env";

export type DataFile = "profile" | "socials" | "experience" | "education" | "projects" | "skills";

const DATA_DIR = path.join(process.cwd(), "content", "data");

export function toJson(data: unknown) {
  return `${JSON.stringify(data, null, 2)}\n`;
}

export async function readData<T>(file: DataFile): Promise<T> {
  return JSON.parse(await readFile(path.join(DATA_DIR, `${file}.json`), "utf8")) as T;
}

export async function writeData(file: DataFile, data: unknown) {
  assertDev();
  await writeFile(path.join(DATA_DIR, `${file}.json`), toJson(data));
}
