import type { Metadata } from "next";
import { Suspense } from "react";
import { CharacterSearchForm } from "@/app/characters/components/character-search-form";
import { CharactersSection } from "@/app/characters/components/characters-section";
import { CharactersSectionFallback } from "@/app/characters/components/characters-section-fallback";
import { resolveNameParam } from "@/app/characters/lib/characters-query";
export const metadata: Metadata = {
  title: "Personagens",
  description: "Busque personagens de Rick and Morty pelo nome.",
};
async function CharactersSearchForm({
  searchParams,
}: {
  searchParams: PageProps<"/characters">["searchParams"];
}) {
  const params = await searchParams;
  const name = resolveNameParam(params.name) ?? "";
  return <CharacterSearchForm key={name} initialName={name} />;
}
export default function CharactersPage({
  searchParams,
}: PageProps<"/characters">) {
  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16">
      <div className="flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Personagens
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Busque um personagem pelo nome ou explore a lista abaixo.
          </p>
        </div>

        <Suspense fallback={<CharacterSearchForm />}>
          <CharactersSearchForm searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<CharactersSectionFallback />}>
        <CharactersSection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
