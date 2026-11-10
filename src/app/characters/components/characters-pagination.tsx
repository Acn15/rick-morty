import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { buildCharactersHref } from "@/app/characters/lib/characters-query";
import type { CharactersListInfo } from "@/app/characters/types";
import { cn } from "@/lib/utils";
type CharactersPaginationProps = {
  info: Pick<
    CharactersListInfo,
    "currentPage" | "pages" | "nextPage" | "previousPage"
  >;
  name?: string;
};
export function CharactersPagination({
  info,
  name,
}: CharactersPaginationProps) {
  const { currentPage, pages, nextPage, previousPage } = info;
  if (pages <= 0) {
    return null;
  }
  return (
    <nav
      aria-label="Paginação de personagens"
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
            href={buildCharactersHref(previousPage, name)}
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
            href={buildCharactersHref(nextPage, name)}
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
