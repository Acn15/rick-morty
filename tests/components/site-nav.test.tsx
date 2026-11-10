import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const usePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));
import { SiteNav } from "@/components/site-nav";
describe("SiteNav", () => {
  beforeEach(() => {
    usePathname.mockReset();
  });
  it("marca Episódios como ativo na home", () => {
    usePathname.mockReturnValue("/");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Episódios" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Personagens" }),
    ).not.toHaveAttribute("aria-current");
  });
  it("marca Personagens como ativo em /characters", () => {
    usePathname.mockReturnValue("/characters");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Personagens" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Episódios" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Personagens" })).toHaveAttribute(
      "href",
      "/characters",
    );
  });
  it("marca Personagens como ativo no detalhe /characters/[id]", () => {
    usePathname.mockReturnValue("/characters/1");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Personagens" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Episódios" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
