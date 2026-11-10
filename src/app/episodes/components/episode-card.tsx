import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EpisodeSummary } from "@/app/episodes/types";
import { buildPathWithReturnTo } from "@/lib/return-to";
type EpisodeCardProps = {
  episode: EpisodeSummary;
  returnTo?: string;
};
export function EpisodeCard({ episode, returnTo }: EpisodeCardProps) {
  return (
    <Card
      size="sm"
      className="interactive-card relative h-full border-border/80 bg-card/90 hover:-translate-y-0.5"
    >
      <CardHeader>
        <CardDescription className="font-heading text-xs font-semibold tracking-[0.18em] text-cyan uppercase">
          {episode.episode}
        </CardDescription>
        <CardTitle className="font-heading text-base leading-snug">
          <Link
            href={buildPathWithReturnTo(`/episodes/${episode.id}`, returnTo)}
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
          >
            {episode.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-0.5 text-sm">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">
            Exibido em
          </dt>
          <dd>{episode.airDate}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
