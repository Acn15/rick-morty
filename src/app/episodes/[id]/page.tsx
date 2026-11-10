import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getEpisodeCharacters } from "@/app/episodes/api/get-episode-characters";
import { CharacterGrid } from "@/app/episodes/components/character-grid";
import { EpisodeHeader } from "@/app/episodes/components/episode-header";
import { resolvePositiveIdParam } from "@/lib/route-params";
import {
  buildPathWithReturnTo,
  resolveOptionalReturnTo,
  resolveReturnToParam,
} from "@/lib/return-to";
const EPISODE_METADATA_FALLBACK: Metadata = {
  title: "Episódio",
  description: "Detalhe de um episódio de Rick and Morty.",
};
export async function generateMetadata({
  params,
}: PageProps<"/episodes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const episodeId = resolvePositiveIdParam(id);
  if (episodeId === null) {
    return EPISODE_METADATA_FALLBACK;
  }
  try {
    const episode = await getEpisodeCharacters(episodeId);
    return {
      title: episode.name,
      description: `Personagens do episódio ${episode.episode}: ${episode.name}.`,
    };
  } catch {
    return EPISODE_METADATA_FALLBACK;
  }
}
export default async function EpisodePage({
  params,
  searchParams,
}: PageProps<"/episodes/[id]">) {
  const { id } = await params;
  const episodeId = resolvePositiveIdParam(id);
  if (episodeId === null) {
    notFound();
  }
  const resolvedSearchParams = await searchParams;
  const optionalReturnTo = resolveOptionalReturnTo(
    resolvedSearchParams.returnTo,
  );
  const backHref = resolveReturnToParam(resolvedSearchParams.returnTo, "/");
  const episodeHref = buildPathWithReturnTo(
    `/episodes/${episodeId}`,
    optionalReturnTo,
  );
  const episode = await getEpisodeCharacters(episodeId);
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12">
      <div>
        <Link
          href={backHref}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-cyan hover:text-cyan",
          })}
        >
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Voltar à busca
        </Link>
      </div>

      <EpisodeHeader episode={episode} />
      <CharacterGrid characters={episode.characters} returnTo={episodeHref} />
    </main>
  );
}
