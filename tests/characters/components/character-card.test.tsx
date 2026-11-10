import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    sizes,
  }: {
    alt: string;
    src: string;
    sizes?: string;
  }) => {
    return <img alt={alt} src={src} sizes={sizes} />;
  },
}));
import { CharacterCard } from "@/app/characters/components/character-card";
import { CHARACTER_CARD_IMAGE_SIZES } from "@/lib/character-image";
const character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  originName: "Earth (C-137)",
  locationName: "Citadel of Ricks",
};
describe("CharacterCard", () => {
  it("mostra imagem, nome, status, espécie, gênero e localização", () => {
    render(<CharacterCard character={character} />);
    const image = screen.getByRole("img", { name: "Retrato de Rick Sanchez" });
    expect(image).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    );
    expect(image).toHaveAttribute("sizes", CHARACTER_CARD_IMAGE_SIZES);
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
  });
  it("abre o detalhe do personagem ao clicar no nome", () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByRole("link", { name: "Rick Sanchez" })).toHaveAttribute(
      "href",
      "/characters/1",
    );
  });
  it("preserva filtros e página no returnTo", () => {
    render(
      <CharacterCard
        character={character}
        returnTo="/characters?name=Rick&page=3"
      />,
    );
    const href = screen
      .getByRole("link", { name: "Rick Sanchez" })
      .getAttribute("href");
    expect(href).toBeTruthy();
    const params = new URLSearchParams(href!.split("?")[1]);
    expect(params.get("returnTo")).toBe("/characters?name=Rick&page=3");
  });
});
