import type { EpisodeCharacters } from "@/app/episodes/types";
type EpisodeHeaderProps = {
  episode: Pick<
    EpisodeCharacters,
    "name" | "episode" | "airDate" | "characters"
  >;
};
export function EpisodeHeader({ episode }: EpisodeHeaderProps) {
  const characterCount = episode.characters.length;
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8">
      <p className="font-heading text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
        {episode.episode}
      </p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        {episode.name}
      </h1>
      <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
          <dt className="text-muted-foreground">Exibido em</dt>
          <dd className="font-medium text-foreground">{episode.airDate}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
          <dt className="text-muted-foreground">Personagens</dt>
          <dd className="font-medium text-foreground">
            <span className="text-portal">{characterCount}</span>{" "}
            {characterCount === 1 ? "personagem" : "personagens"}
          </dd>
        </div>
      </dl>
      <div
        aria-hidden="true"
        className="h-px w-24 bg-linear-to-r from-nebula via-cyan to-transparent"
      />
    </header>
  );
}
