import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharacterEpisodes } from "@/app/characters/components/character-episodes";
const episodes = [
  {
    id: 1,
    name: "Pilot",
    episode: "S01E01",
    airDate: "December 2, 2013",
  },
  {
    id: 2,
    name: "Lawnmower Dog",
    episode: "S01E02",
    airDate: "December 9, 2013",
  },
];
describe("CharacterEpisodes", () => {
  it("renderiza episódios com links para o detalhe", () => {
    render(<CharacterEpisodes episodes={episodes} />);
    expect(screen.getByRole("link", { name: "Pilot" })).toHaveAttribute(
      "href",
      "/episodes/1",
    );
    expect(screen.getByRole("link", { name: "Lawnmower Dog" })).toHaveAttribute(
      "href",
      "/episodes/2",
    );
    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
    expect(screen.getByText("S01E02")).toBeInTheDocument();
    expect(screen.getByText("December 9, 2013")).toBeInTheDocument();
  });
  it("preserva o detalhe do personagem como returnTo nos episódios", () => {
    render(
      <CharacterEpisodes
        episodes={episodes}
        returnTo="/characters/1?returnTo=/characters?name=Rick&page=2"
      />,
    );
    const href = screen
      .getByRole("link", { name: "Pilot" })
      .getAttribute("href");
    expect(href).toBeTruthy();
    const params = new URLSearchParams(href!.split("?")[1]);
    expect(params.get("returnTo")).toBe(
      "/characters/1?returnTo=/characters?name=Rick&page=2",
    );
  });
  it("mostra estado vazio quando não há episódios", () => {
    render(<CharacterEpisodes episodes={[]} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Este personagem não aparece em nenhum episódio.",
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
