import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => {
    return <img alt={alt} src={src} />;
  },
}));
import { CharacterGrid } from "@/app/episodes/components/character-grid";
import { EPISODE_CHARACTERS_EMPTY_MESSAGE } from "@/app/episodes/lib/episodes-copy";
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
describe("CharacterGrid", () => {
  it("mostra estado vazio acessível quando não há personagens", () => {
    render(<CharacterGrid characters={[]} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      EPISODE_CHARACTERS_EMPTY_MESSAGE,
    );
  });
  it("renderiza cards quando há personagens", () => {
    render(<CharacterGrid characters={[character]} />);
    expect(screen.getByRole("link", { name: "Rick Sanchez" })).toHaveAttribute(
      "href",
      "/characters/1",
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
