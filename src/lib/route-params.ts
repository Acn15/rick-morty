export function resolvePageParam(
  value: string | string[] | undefined,
): number | null {
  if (value === undefined) {
    return 1;
  }
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  if (!Number.isInteger(page) || page < 1) {
    return null;
  }
  return page;
}
export function resolvePositiveIdParam(value: string): number | null {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }
  return id;
}
