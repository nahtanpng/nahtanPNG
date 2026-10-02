import { ASCII_KINDS, type AsciiKind } from "@/lib/ascii/covers";
import { SLUG_PATTERN } from "@/lib/slugify";

export type FieldErrors = Record<string, string>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
};

export const initialFormState: FormState = { status: "idle" };

type Result<T> = { ok: true; value: T } | { ok: false; error: string };
export type Rule<T> = (raw: FormDataEntryValue | null) => Result<T>;
type Shape = Record<string, Rule<unknown>>;
type Infer<S extends Shape> = { [K in keyof S]: S[K] extends Rule<infer T> ? T : never };

const ok = <T>(value: T): Result<T> => ({ ok: true, value });
const fail = (error: string): Result<never> => ({ ok: false, error });
const asText = (raw: FormDataEntryValue | null) => (typeof raw === "string" ? raw.trim() : "");

export const rules = {
  text: (label: string): Rule<string> => (raw) => (asText(raw) ? ok(asText(raw)) : fail(`${label} é obrigatório.`)),

  optionalText: (): Rule<string> => (raw) => ok(asText(raw)),

  link: (label: string): Rule<string> => (raw) => {
    const value = asText(raw);
    if (!value) return fail(`${label} é obrigatório.`);
    return /^(https?:\/\/|mailto:|\/)/.test(value) ? ok(value) : fail("Use http(s)://, mailto: ou um caminho /.");
  },

  optionalLink: (): Rule<string | undefined> => (raw) => {
    const value = asText(raw);
    if (!value) return ok(undefined);
    return /^(https?:\/\/|\/)/.test(value) ? ok(value) : fail("Use http(s):// ou um caminho /.");
  },

  oneOf: <const T extends string>(values: readonly T[], label: string): Rule<T> => (raw) => {
    const value = asText(raw);
    return (values as readonly string[]).includes(value) ? ok(value as T) : fail(`${label} inválido.`);
  },

  cover: (): Rule<AsciiKind> => rules.oneOf(ASCII_KINDS, "Capa"),

  tags: (): Rule<string[]> => (raw) =>
    ok(
      asText(raw)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    ),

  date: (label: string): Rule<string> => (raw) =>
    /^\d{4}-\d{2}-\d{2}$/.test(asText(raw)) ? ok(asText(raw)) : fail(`${label} inválida.`),

  slug: (): Rule<string> => (raw) =>
    SLUG_PATTERN.test(asText(raw)) ? ok(asText(raw)) : fail("Use letras minúsculas, números e hífens."),

  checkbox: (): Rule<boolean> => (raw) => ok(raw === "on"),

  raw: (): Rule<string> => (raw) => ok(typeof raw === "string" ? raw : ""),
};

export function parseForm<S extends Shape>(formData: FormData, shape: S) {
  const data: Record<string, unknown> = {};
  const fieldErrors: FieldErrors = {};

  for (const [key, rule] of Object.entries(shape)) {
    const result = rule(formData.get(key));
    if (result.ok) data[key] = result.value;
    else fieldErrors[key] = result.error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      state: { status: "error", message: "Revise os campos destacados.", fieldErrors } satisfies FormState,
    };
  }
  return { ok: true as const, data: data as Infer<S> };
}

export function withoutEmpty<T extends object>(item: T): T {
  return Object.fromEntries(Object.entries(item).filter(([, value]) => value !== undefined)) as T;
}
