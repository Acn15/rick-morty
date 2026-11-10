"use client";
import { useEffect } from "react";
import "./globals.css";
export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="pt-BR" className="dark h-full antialiased">
      <body className="app-shell flex min-h-full flex-col bg-background text-foreground">
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-16 sm:px-6">
          <div className="portal-panel relative overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-8">
            <title>Falha ao carregar · Rick and Morty</title>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.19_145_/_18%)_0%,transparent_70%)]"
            />
            <p className="font-heading relative text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
              Portal instável
            </p>
            <h1 className="font-heading relative mt-3 text-3xl font-semibold tracking-tight">
              Falha ao carregar
            </h1>
            <p className="relative mt-3 text-muted-foreground text-pretty">
              Ocorreu um erro inesperado. Tente novamente em instantes.
            </p>
            <div className="relative mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => retry()}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Tentar de novo
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
