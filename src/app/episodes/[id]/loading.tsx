import { Skeleton } from "@/components/ui/skeleton";
export default function EpisodeLoading() {
  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-8 w-28 rounded-lg bg-muted/80" />

      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <Skeleton className="h-4 w-24 rounded-md bg-cyan/20" />
        <Skeleton className="h-10 w-2/3 max-w-md rounded-lg bg-muted/80" />
        <div className="flex flex-wrap gap-6">
          <Skeleton className="h-4 w-40 rounded-md bg-muted/70" />
          <Skeleton className="h-4 w-32 rounded-md bg-muted/70" />
        </div>
        <Skeleton className="h-px w-24 rounded-full bg-nebula/40" />
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className="overflow-hidden rounded-xl border border-border/70 bg-card/70"
          >
            <Skeleton className="aspect-square w-full rounded-none bg-muted/60" />
            <div className="flex flex-col gap-3 p-3">
              <Skeleton className="h-5 w-3/4 rounded-md bg-muted/80" />
              <Skeleton className="h-4 w-1/2 rounded-md bg-portal/20" />
              <Skeleton className="h-20 w-full rounded-md bg-muted/50" />
            </div>
          </li>
        ))}
      </ul>

      <span className="sr-only">Carregando episódio…</span>
    </main>
  );
}
