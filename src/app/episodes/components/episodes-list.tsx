import { EpisodeCard } from "@/app/episodes/components/episode-card";
import { EPISODES_PAGE_EMPTY_MESSAGE } from "@/app/episodes/lib/episodes-copy";
import type { EpisodeSummary } from "@/app/episodes/types";
type EpisodesListProps = {
  episodes: EpisodeSummary[];
  emptyMessage?: string;
  returnTo?: string;
};
export function EpisodesList({
  episodes,
  emptyMessage = EPISODES_PAGE_EMPTY_MESSAGE,
  returnTo,
}: EpisodesListProps) {
  if (episodes.length === 0) {
    return (
      <p className="text-muted-foreground text-pretty" role="status">
        {emptyMessage}
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <li key={episode.id} className="relative">
          <EpisodeCard episode={episode} returnTo={returnTo} />
        </li>
      ))}
    </ul>
  );
}
