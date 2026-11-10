import { Skeleton } from "@/components/ui/skeleton";
export default function CharacterLoading() {
  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-8 w-40 rounded-lg bg-muted/80" />

      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:gap-8">
        <Skeleton className="mx-auto aspect-square w-full max-w-56 rounded-xl bg-muted/60 sm:mx-0" />
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="h-4 w-28 rounded-md bg-cyan/20" />
          <Skeleton className="h-10 w-2/3 max-w-md rounded-lg bg-muted/80" />
          <Skeleton className="h-5 w-40 rounded-md bg-muted/70" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-10 w-full rounded-md bg-muted/60" />
            <Skeleton className="h-10 w-full rounded-md bg-muted/60" />
            <Skeleton className="h-10 w-full rounded-md bg-muted/60" />
            <Skeleton className="h-10 w-full rounded-md bg-muted/60" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-36 rounded-lg bg-muted/80" />
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
      </div>

      <span className="sr-only">Carregando personagem…</span>
    </main>
  );
}
