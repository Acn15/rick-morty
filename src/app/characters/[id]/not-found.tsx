import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function CharacterNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <div className="portal-panel relative overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.19_145_/_18%)_0%,transparent_70%)]"
        />
        <p className="font-heading relative text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
          Dimensão errada
        </p>
        <h1 className="font-heading relative mt-3 text-3xl font-semibold tracking-tight">
          Personagem não encontrado
        </h1>
        <p className="relative mt-3 text-muted-foreground text-pretty">
          Não encontramos um personagem com esse ID. Confira o número e tente
          novamente.
        </p>
        <div className="relative mt-8 flex justify-center">
          <Link href="/characters" className={buttonVariants({ size: "lg" })}>
            Voltar aos personagens
          </Link>
        </div>
      </div>
    </main>
  );
}
