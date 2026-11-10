export function isSafeInternalPath(path: string): boolean {
  if (path.length === 0 || !path.startsWith("/") || path.startsWith("//")) {
    return false;
  }
  if (
    path.includes("\\") ||
    path.includes("\0") ||
    path.includes("\n") ||
    path.includes("\r") ||
    path.includes("://")
  ) {
    return false;
  }
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    return false;
  }
  if (!decoded.startsWith("/") || decoded.startsWith("//")) {
    return false;
  }
  if (
    decoded.includes("\\") ||
    decoded.includes("\0") ||
    decoded.includes("\n") ||
    decoded.includes("\r") ||
    decoded.includes("://")
  ) {
    return false;
  }
  return true;
}
export function resolveOptionalReturnTo(
  value: string | string[] | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw.trim() === "") {
    return undefined;
  }
  if (!isSafeInternalPath(raw)) {
    return undefined;
  }
  return raw;
}
export function resolveReturnToParam(
  value: string | string[] | undefined,
  fallback: string,
): string {
  return resolveOptionalReturnTo(value) ?? fallback;
}
export function buildPathWithReturnTo(
  pathname: string,
  returnTo?: string,
): string {
  if (returnTo === undefined) {
    return pathname;
  }
  const params = new URLSearchParams();
  params.set("returnTo", returnTo);
  const separator = pathname.includes("?") ? "&" : "?";
  return `${pathname}${separator}${params.toString()}`;
}
