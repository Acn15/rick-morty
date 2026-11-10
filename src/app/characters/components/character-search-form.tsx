"use client";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useId, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
type CharacterSearchFormProps = {
  initialName?: string;
};
export function CharacterSearchForm({
  initialName = "",
}: CharacterSearchFormProps) {
  const router = useRouter();
  const inputId = useId();
  const errorId = useId();
  const [term, setTerm] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const hasActiveSearch = initialName.trim() !== "";
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
      setError("Informe um nome de personagem.");
      return;
    }
    setError(null);
    router.push(`/characters?name=${encodeURIComponent(trimmed)}`);
  }
  return (
    <form
      action="/characters"
      method="get"
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-2.5"
      noValidate
      aria-label="Busca de personagem"
    >
      <Label htmlFor={inputId} className="text-sm text-foreground">
        Nome do personagem
      </Label>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          id={inputId}
          name="name"
          type="search"
          placeholder="Ex.: Rick"
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
              href="/characters"
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
