export { resolvePageParam } from "@/lib/route-params";
export function resolveSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw.trim();
  return trimmed === "" ? undefined : trimmed;
}
export function buildEpisodesHref(page: number, search?: string): string {
  const params = new URLSearchParams();
  if (search !== undefined) {
    params.set("search", search);
  }
  params.set("page", String(page));
  return `/?${params.toString()}`;
}
