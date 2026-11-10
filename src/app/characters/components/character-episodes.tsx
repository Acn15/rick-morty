import type { CharacterEpisodeSummary } from "@/app/characters/types";
import { EpisodeCard } from "@/app/episodes/components/episode-card";
type CharacterEpisodesProps = {
  episodes: CharacterEpisodeSummary[];
  returnTo?: string;
};
export function CharacterEpisodes({
  episodes,
  returnTo,
}: CharacterEpisodesProps) {
  if (episodes.length === 0) {
    return (
      <section
        aria-label="Episódios do personagem"
        className="flex flex-col gap-4"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Episódios
        </h2>
        <p className="text-muted-foreground text-pretty" role="status">
          Este personagem não aparece em nenhum episódio.
        </p>
      </section>
    );
  }
  return (
    <section
      aria-label="Episódios do personagem"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Episódios
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          {episodes.length} episódio{episodes.length === 1 ? "" : "s"} em que
          este personagem aparece.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <li key={episode.id} className="relative">
            <EpisodeCard episode={episode} returnTo={returnTo} />
          </li>
        ))}
      </ul>
    </section>
  );
}
