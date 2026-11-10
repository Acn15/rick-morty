"use client";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useId, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
type EpisodeSearchFormProps = {
  initialSearch?: string;
};
export function EpisodeSearchForm({
  initialSearch = "",
}: EpisodeSearchFormProps) {
  const router = useRouter();
  const inputId = useId();
  const errorId = useId();
  const [term, setTerm] = useState(initialSearch);
  const [error, setError] = useState<string | null>(null);
  const hasActiveSearch = initialSearch.trim() !== "";
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    if (error) {
      setError(null);
    }
  }
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = term.trim();
    if (trimmed === "") {
      setError("Informe um ID ou nome de episódio.");
      return;
    }
    setError(null);
    router.push(`/?search=${encodeURIComponent(trimmed)}`);
  }
  return (
    <form
      action="/"
      method="get"
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-2.5"
      noValidate
      aria-label="Busca de episódio"
    >
      <Label htmlFor={inputId} className="text-sm text-foreground">
        Número ou nome do episódio
      </Label>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          id={inputId}
          name="search"
          type="search"
          placeholder="Ex.: 1 ou Pilot"
          value={term}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          autoComplete="off"
          className="h-10 min-w-0 flex-1 bg-background/60 text-base md:text-sm"
        />
        <div className="flex shrink-0 items-center gap-2">
          <Button type="submit" size="default" className="h-10 sm:px-4">
            <Search data-icon="inline-start" aria-hidden="true" />
            Buscar
          </Button>
          {hasActiveSearch ? (
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "h-10",
              )}
              aria-label="Limpar busca"
            >
              <X data-icon="inline-start" aria-hidden="true" />
              Limpar
            </Link>
          ) : null}
        </div>
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}
