export function characterStatusClassName(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === "alive") {
    return "status-alive";
  }
  if (normalized === "dead") {
    return "status-dead";
  }
  return "status-unknown";
}
