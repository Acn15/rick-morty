import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getCharacter } from "@/app/characters/api/get-character";
import { CharacterEpisodes } from "@/app/characters/components/character-episodes";
import { CharacterHeader } from "@/app/characters/components/character-header";
import { resolveCharacterIdParam } from "@/app/characters/lib/characters-query";
import {
  buildPathWithReturnTo,
  resolveOptionalReturnTo,
  resolveReturnToParam,
} from "@/lib/return-to";
const CHARACTER_METADATA_FALLBACK: Metadata = {
  title: "Personagem",
  description: "Detalhe de um personagem de Rick and Morty.",
};
export async function generateMetadata({
  params,
}: PageProps<"/characters/[id]">): Promise<Metadata> {
  const { id } = await params;
  const characterId = resolveCharacterIdParam(id);
  if (characterId === null) {
    return CHARACTER_METADATA_FALLBACK;
  }
  try {
    const character = await getCharacter(characterId);
    return {
      title: character.name,
      description: `${character.name} — ${character.status}, ${character.species}.`,
    };
  } catch {
    return CHARACTER_METADATA_FALLBACK;
  }
}
export default async function CharacterPage({
  params,
  searchParams,
}: PageProps<"/characters/[id]">) {
  const { id } = await params;
  const characterId = resolveCharacterIdParam(id);
  if (characterId === null) {
    notFound();
  }
  const resolvedSearchParams = await searchParams;
  const optionalReturnTo = resolveOptionalReturnTo(
    resolvedSearchParams.returnTo,
  );
  const backHref = resolveReturnToParam(
    resolvedSearchParams.returnTo,
    "/characters",
  );
  const characterHref = buildPathWithReturnTo(
    `/characters/${characterId}`,
    optionalReturnTo,
  );
  const character = await getCharacter(characterId);
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
          Voltar aos personagens
        </Link>
      </div>

      <CharacterHeader character={character} />
      <CharacterEpisodes
        episodes={character.episodes}
        returnTo={characterHref}
      />
    </main>
  );
}
