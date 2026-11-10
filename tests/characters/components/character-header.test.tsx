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
import { CharacterHeader } from "@/app/characters/components/character-header";
import { CHARACTER_HEADER_IMAGE_SIZES } from "@/lib/character-image";
const character = {
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  originName: "Earth (C-137)",
  locationName: "Citadel of Ricks",
  episodes: [
    {
      id: 1,
      name: "Pilot",
      episode: "S01E01",
      airDate: "December 2, 2013",
    },
  ],
};
describe("CharacterHeader", () => {
  it("mostra imagem, nome, status, espécie, gênero, origem e localização", () => {
    render(<CharacterHeader character={character} />);
    const image = screen.getByRole("img", { name: "Retrato de Rick Sanchez" });
    expect(image).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    );
    expect(image).toHaveAttribute("sizes", CHARACTER_HEADER_IMAGE_SIZES);
    expect(
      screen.getByRole("heading", { name: "Rick Sanchez" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
    expect(screen.getByText("episódio")).toBeInTheDocument();
  });
});
