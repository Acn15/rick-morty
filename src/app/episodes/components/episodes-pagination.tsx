import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { buildEpisodesHref } from "@/app/episodes/lib/episodes-query";
import type { EpisodesListInfo } from "@/app/episodes/types";
import { cn } from "@/lib/utils";
type EpisodesPaginationProps = {
  info: Pick<
    EpisodesListInfo,
    "currentPage" | "pages" | "nextPage" | "previousPage"
  >;
  search?: string;
};
export function EpisodesPagination({ info, search }: EpisodesPaginationProps) {
  const { currentPage, pages, nextPage, previousPage } = info;
  if (pages <= 0) {
    return null;
  }
  return (
    <nav
      aria-label="Paginação de episódios"
      className="flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <p className="text-sm text-muted-foreground">
        Página{" "}
        <span className="font-medium text-foreground">{currentPage}</span> de{" "}
        <span className="font-medium text-foreground">{pages}</span>
      </p>

      <div className="flex items-center gap-2">
        {previousPage !== null ? (
          <Link
            href={buildEpisodesHref(previousPage, search)}
            className={buttonVariants({ variant: "outline", size: "sm" })}
            prefetch={true}
          >
            Anterior
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "pointer-events-none opacity-50",
            )}
          >
            Anterior
          </span>
        )}

        {nextPage !== null ? (
          <Link
            href={buildEpisodesHref(nextPage, search)}
            className={buttonVariants({ variant: "outline", size: "sm" })}
            prefetch={true}
          >
            Próxima
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "pointer-events-none opacity-50",
            )}
          >
            Próxima
          </span>
        )}
      </div>
    </nav>
  );
}
