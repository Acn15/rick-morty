import { notFound } from "next/navigation";
import { getEpisodes } from "@/app/episodes/api/get-episodes";
import { EpisodesList } from "@/app/episodes/components/episodes-list";
import { EpisodesPagination } from "@/app/episodes/components/episodes-pagination";
import { episodesSearchEmptyMessage } from "@/app/episodes/lib/episodes-copy";
import {
  buildEpisodesHref,
  resolvePageParam,
  resolveSearchParam,
} from "@/app/episodes/lib/episodes-query";
type EpisodesSectionProps = {
  searchParams: PageProps<"/">["searchParams"];
};
export async function EpisodesSection({ searchParams }: EpisodesSectionProps) {
  const params = await searchParams;
  const search = resolveSearchParam(params.search);
  const page = resolvePageParam(params.page);
  if (page === null) {
    notFound();
  }
  const episodes = await getEpisodes({ page, search });
  const isSearch = search !== undefined;
  const hasResults = episodes.results.length > 0;
  const emptyMessage = isSearch
    ? episodesSearchEmptyMessage(search)
    : undefined;
  const returnTo = buildEpisodesHref(page, search);
  return (
    <section
      aria-label={isSearch ? "Resultados da busca" : "Listagem de episódios"}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {isSearch ? "Resultados da busca" : "Episódios"}
        </h2>
        {isSearch && !hasResults ? null : (
          <p className="text-sm text-muted-foreground text-pretty">
            {isSearch
              ? `${episodes.info.count} resultado${episodes.info.count === 1 ? "" : "s"} para “${search}”. Abra um card para ver os personagens.`
              : `${episodes.info.count} episódios no total. Abra um card para ver os personagens.`}
          </p>
        )}
      </div>

      <EpisodesList
        episodes={episodes.results}
        emptyMessage={emptyMessage}
        returnTo={returnTo}
      />
      <EpisodesPagination info={episodes.info} search={search} />
    </section>
  );
}
