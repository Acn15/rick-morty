import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EpisodeCharacter } from "@/app/episodes/types";
import { CHARACTER_CARD_IMAGE_SIZES } from "@/lib/character-image";
import { characterStatusClassName } from "@/lib/character-status";
import { buildPathWithReturnTo } from "@/lib/return-to";
type CharacterCardProps = {
  character: EpisodeCharacter;
  returnTo?: string;
};
export function CharacterCard({ character, returnTo }: CharacterCardProps) {
  const typeLabel = character.type.trim() || "—";
  return (
    <Card
      size="sm"
      className="character-card interactive-card relative h-full border-border/80 bg-card/90 hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden">
        <Image
          src={character.image}
          alt={`Retrato de ${character.name}`}
          width={300}
          height={300}
          sizes={CHARACTER_CARD_IMAGE_SIZES}
          className="aspect-square w-full object-cover transition-transform duration-300"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-card to-transparent"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-heading text-base leading-snug">
          <Link
            href={buildPathWithReturnTo(
              `/characters/${character.id}`,
              returnTo,
            )}
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
          >
            {character.name}
          </Link>
        </CardTitle>
        <CardDescription>
          <span className={characterStatusClassName(character.status)}>
            {character.status}
          </span>
          <span className="text-muted-foreground"> · {character.species}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-2.5 text-sm">
          <div className="grid gap-0.5">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Gênero
            </dt>
            <dd>{character.gender}</dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Tipo
            </dt>
            <dd>{typeLabel}</dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Origem
            </dt>
            <dd>{character.originName}</dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Localização
            </dt>
            <dd>{character.locationName}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
