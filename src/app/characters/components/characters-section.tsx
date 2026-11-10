import { notFound } from "next/navigation";
import { getCharacters } from "@/app/characters/api/get-characters";
import { CharactersGrid } from "@/app/characters/components/characters-grid";
import { CharactersPagination } from "@/app/characters/components/characters-pagination";
import { charactersSearchEmptyMessage } from "@/app/characters/lib/characters-copy";
import {
  buildCharactersHref,
  resolveNameParam,
  resolvePageParam,
} from "@/app/characters/lib/characters-query";
type CharactersSectionProps = {
  searchParams: PageProps<"/characters">["searchParams"];
};
export async function CharactersSection({
  searchParams,
}: CharactersSectionProps) {
  const params = await searchParams;
  const name = resolveNameParam(params.name);
  const page = resolvePageParam(params.page);
  if (page === null) {
    notFound();
  }
  const characters = await getCharacters({ page, name });
  const isSearch = name !== undefined;
  const hasResults = characters.results.length > 0;
  const emptyMessage = isSearch
    ? charactersSearchEmptyMessage(name)
    : undefined;
  const returnTo = buildCharactersHref(page, name);
  return (
    <section
      aria-label={isSearch ? "Resultados da busca" : "Listagem de personagens"}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {isSearch ? "Resultados da busca" : "Personagens"}
        </h2>
        {isSearch && !hasResults ? null : (
          <p className="text-sm text-muted-foreground text-pretty">
            {isSearch
              ? `${characters.info.count} resultado${characters.info.count === 1 ? "" : "s"} para “${name}”.`
              : `${characters.info.count} personagens no total.`}
          </p>
        )}
      </div>

      <CharactersGrid
        characters={characters.results}
        emptyMessage={emptyMessage}
        returnTo={returnTo}
      />
      <CharactersPagination info={characters.info} name={name} />
    </section>
  );
}
