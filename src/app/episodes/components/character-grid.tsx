import { CharacterCard } from "@/app/episodes/components/character-card";
import { EPISODE_CHARACTERS_EMPTY_MESSAGE } from "@/app/episodes/lib/episodes-copy";
import type { EpisodeCharacter } from "@/app/episodes/types";
type CharacterGridProps = {
  characters: EpisodeCharacter[];
  returnTo?: string;
};
export function CharacterGrid({ characters, returnTo }: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <p
        className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-muted-foreground text-pretty"
        role="status"
      >
        {EPISODE_CHARACTERS_EMPTY_MESSAGE}
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
