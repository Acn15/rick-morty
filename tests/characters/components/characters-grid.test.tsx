import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => {
    return <img alt={alt} src={src} />;
  },
}));
import { CharactersGrid } from "@/app/characters/components/characters-grid";
import {
  CHARACTERS_PAGE_EMPTY_MESSAGE,
  charactersSearchEmptyMessage,
} from "@/app/characters/lib/characters-copy";
const characters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    originName: "Earth (C-137)",
    locationName: "Citadel of Ricks",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    originName: "unknown",
    locationName: "Citadel of Ricks",
  },
];
describe("CharactersGrid", () => {
  it("renderiza um card por personagem com link para o detalhe", () => {
    render(<CharactersGrid characters={characters} />);
    expect(screen.getByRole("link", { name: "Rick Sanchez" })).toHaveAttribute(
      "href",
      "/characters/1",
    );
    expect(screen.getByRole("link", { name: "Morty Smith" })).toHaveAttribute(
      "href",
      "/characters/2",
    );
  });
  it("mostra mensagem padrão quando a página não tem personagens", () => {
    render(<CharactersGrid characters={[]} />);
    expect(screen.getByText(CHARACTERS_PAGE_EMPTY_MESSAGE)).toBeInTheDocument();
  });
  it("mostra estado vazio amigável para busca sem resultados", () => {
    render(
      <CharactersGrid
        characters={[]}
        emptyMessage={charactersSearchEmptyMessage("xyz")}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      charactersSearchEmptyMessage("xyz"),
    );
  });
});
