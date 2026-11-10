import { Suspense } from "react";
import { EpisodeSearchForm } from "@/app/episodes/components/episode-search-form";
import { EpisodesSection } from "@/app/episodes/components/episodes-section";
import { EpisodesSectionFallback } from "@/app/episodes/components/episodes-section-fallback";
import { resolveSearchParam } from "@/app/episodes/lib/episodes-query";
async function HomeSearchForm({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const params = await searchParams;
  const search = resolveSearchParam(params.search) ?? "";
  return <EpisodeSearchForm key={search} initialSearch={search} />;
}
export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16">
      <div className="flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Universo de Rick and Morty
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Encontre episódios pelo nome, número ou explore a lista abaixo. Abra
            um episódio para ver seus personagens.
          </p>
        </div>

        <Suspense fallback={<EpisodeSearchForm />}>
          <HomeSearchForm searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<EpisodesSectionFallback />}>
        <EpisodesSection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
