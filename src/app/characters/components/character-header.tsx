import Image from "next/image";
import type { CharacterDetail } from "@/app/characters/types";
import { CHARACTER_HEADER_IMAGE_SIZES } from "@/lib/character-image";
import { characterStatusClassName } from "@/lib/character-status";
type CharacterHeaderProps = {
  character: Pick<
    CharacterDetail,
    | "name"
    | "status"
    | "species"
    | "gender"
    | "image"
    | "originName"
    | "locationName"
    | "episodes"
  >;
};
export function CharacterHeader({ character }: CharacterHeaderProps) {
  const episodeCount = character.episodes.length;
  return (
    <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-start sm:gap-8">
      <div className="relative mx-auto w-full max-w-56 shrink-0 overflow-hidden rounded-xl border border-border/80 sm:mx-0">
        <Image
          src={character.image}
          alt={`Retrato de ${character.name}`}
          width={300}
          height={300}
          sizes={CHARACTER_HEADER_IMAGE_SIZES}
          className="aspect-square w-full object-cover"
          priority
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
            Personagem
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {character.name}
          </h1>
          <p className="text-base text-muted-foreground">
            <span className={characterStatusClassName(character.status)}>
              {character.status}
            </span>
            <span> · {character.species}</span>
          </p>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Gênero</dt>
            <dd className="font-medium text-foreground">{character.gender}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Origem</dt>
            <dd className="font-medium text-foreground">
              {character.originName}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Localização</dt>
            <dd className="font-medium text-foreground">
              {character.locationName}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Episódios</dt>
            <dd className="font-medium text-foreground">
              <span className="text-portal">{episodeCount}</span>{" "}
              {episodeCount === 1 ? "episódio" : "episódios"}
            </dd>
          </div>
        </dl>

        <div
          aria-hidden="true"
          className="h-px w-24 bg-linear-to-r from-nebula via-cyan to-transparent"
        />
      </div>
    </header>
  );
}
