export function SiteNavFallback() {
  return (
    <header className="border-b border-border/60 bg-background/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="font-heading text-sm font-semibold tracking-[0.18em] text-cyan uppercase">
          Rick and Morty
        </span>
        <nav aria-label="Principal" aria-busy="true">
          <ul className="flex items-center gap-1">
            <li>
              <span className="inline-block rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground">
                Episódios
              </span>
            </li>
            <li>
              <span className="inline-block rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground">
                Personagens
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
