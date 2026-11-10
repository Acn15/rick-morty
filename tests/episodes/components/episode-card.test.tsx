import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EpisodeCard } from "@/app/episodes/components/episode-card";
const episode = {
  id: 1,
  name: "Pilot",
  airDate: "December 2, 2013",
  episode: "S01E01",
};
describe("EpisodeCard", () => {
  it("mostra nome, código, data e link para o detalhe do episódio", () => {
    render(<EpisodeCard episode={episode} />);
    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Pilot" });
    expect(link).toHaveAttribute("href", "/episodes/1");
  });
  it("preserva filtros e página no returnTo", () => {
    render(
      <EpisodeCard
        episode={episode}
        returnTo="/?search=Lawnmower Dog&page=2"
      />,
    );
    const href = screen
      .getByRole("link", { name: "Pilot" })
      .getAttribute("href");
    expect(href).toBeTruthy();
    const params = new URLSearchParams(href!.split("?")[1]);
    expect(params.get("returnTo")).toBe("/?search=Lawnmower Dog&page=2");
  });
});
