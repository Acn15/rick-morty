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
import { CharacterCard } from "@/app/episodes/components/character-card";
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
describe("Episode CharacterCard", () => {
  it("abre o perfil do personagem ao clicar no card", () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByRole("link", { name: "Rick Sanchez" })).toHaveAttribute(
      "href",
      "/characters/1",
    );
    expect(
      screen.getByRole("img", { name: "Retrato de Rick Sanchez" }),
    ).toHaveAttribute("sizes", CHARACTER_CARD_IMAGE_SIZES);
  });
  it("usa o detalhe do episódio como returnTo", () => {
    render(
      <CharacterCard
        character={character}
        returnTo="/episodes/1?returnTo=/?search=Pilot&page=1"
      />,
    );
    const href = screen
      .getByRole("link", { name: "Rick Sanchez" })
      .getAttribute("href");
    expect(href).toBeTruthy();
    const params = new URLSearchParams(href!.split("?")[1]);
    expect(params.get("returnTo")).toBe(
      "/episodes/1?returnTo=/?search=Pilot&page=1",
    );
  });
});
