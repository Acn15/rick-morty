"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const links = [
  {
    href: "/",
    label: "Episódios",
    match: (pathname: string) =>
      pathname === "/" || pathname.startsWith("/episodes"),
  },
  {
    href: "/characters",
    label: "Personagens",
    match: (pathname: string) =>
      pathname === "/characters" || pathname.startsWith("/characters/"),
  },
] as const;
export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-[0.18em] text-cyan uppercase"
        >
          Rick and Morty
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = link.match(pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
