import { CharacterCard } from "@/app/characters/components/character-card";
import { CHARACTERS_PAGE_EMPTY_MESSAGE } from "@/app/characters/lib/characters-copy";
import type { Character } from "@/app/characters/types";
type CharactersGridProps = {
  characters: Character[];
  emptyMessage?: string;
  returnTo?: string;
};
export function CharactersGrid({
  characters,
  emptyMessage = CHARACTERS_PAGE_EMPTY_MESSAGE,
  returnTo,
}: CharactersGridProps) {
  if (characters.length === 0) {
    return (
      <p className="text-muted-foreground text-pretty" role="status">
        {emptyMessage}
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} returnTo={returnTo} />
        </li>
      ))}
    </ul>
  );
}
