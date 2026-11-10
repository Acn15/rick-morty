import { Skeleton } from "@/components/ui/skeleton";
export function EpisodesSectionFallback() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      aria-label="Carregando episódios"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-40 rounded-lg bg-muted/80" />
        <Skeleton className="h-4 w-72 max-w-full rounded-md bg-muted/70" />
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="overflow-hidden rounded-xl border border-border/70 bg-card/70 p-4"
          >
            <Skeleton className="mb-3 h-3 w-16 rounded-md bg-cyan/20" />
            <Skeleton className="mb-4 h-5 w-3/4 rounded-md bg-muted/80" />
            <Skeleton className="h-3 w-20 rounded-md bg-muted/60" />
            <Skeleton className="mt-2 h-4 w-36 rounded-md bg-muted/70" />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-32 rounded-md bg-muted/70" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-lg bg-muted/70" />
          <Skeleton className="h-7 w-20 rounded-lg bg-muted/70" />
        </div>
      </div>

      <span className="sr-only">Carregando episódios…</span>
    </section>
  );
}
