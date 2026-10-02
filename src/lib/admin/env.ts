import { headers } from "next/headers";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function assertDev() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("The admin panel is only available while running `npm run dev`.");
  }
}

export async function isLocalRequest() {
  const host = (await headers()).get("host");
  if (!host) return false;
  try {
    return LOCAL_HOSTNAMES.has(new URL(`http://${host}`).hostname);
  } catch {
    return false;
  }
}

export async function assertLocalRequest() {
  assertDev();
  if (!(await isLocalRequest())) throw new Error("The admin panel only accepts requests from localhost.");
}
