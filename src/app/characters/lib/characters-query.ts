export { resolvePageParam } from "@/lib/route-params";
export { resolvePositiveIdParam as resolveCharacterIdParam } from "@/lib/route-params";
export function resolveNameParam(
  value: string | string[] | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw.trim();
  return trimmed === "" ? undefined : trimmed;
}
export function buildCharactersHref(page: number, name?: string): string {
  const params = new URLSearchParams();
  if (name !== undefined) {
    params.set("name", name);
  }
  params.set("page", String(page));
  return `/characters?${params.toString()}`;
}
