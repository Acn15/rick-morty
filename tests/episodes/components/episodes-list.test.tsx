import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EpisodesList } from "@/app/episodes/components/episodes-list";
import {
  EPISODES_PAGE_EMPTY_MESSAGE,
  episodesSearchEmptyMessage,
} from "@/app/episodes/lib/episodes-copy";
const episodes = [
  {
    id: 1,
    name: "Pilot",
    airDate: "December 2, 2013",
    episode: "S01E01",
  },
  {
    id: 2,
    name: "Lawnmower Dog",
    airDate: "December 9, 2013",
    episode: "S01E02",
  },
];
describe("EpisodesList", () => {
  it("renderiza um card por episódio com link para o detalhe", () => {
    render(<EpisodesList episodes={episodes} />);
    expect(screen.getByRole("link", { name: "Pilot" })).toHaveAttribute(
      "href",
      "/episodes/1",
    );
    expect(screen.getByRole("link", { name: "Lawnmower Dog" })).toHaveAttribute(
      "href",
      "/episodes/2",
    );
    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("S01E02")).toBeInTheDocument();
  });
  it("propaga returnTo com filtros e página para os cards", () => {
    render(
      <EpisodesList episodes={episodes} returnTo="/?search=Pilot&page=2" />,
    );
    const href = screen
      .getByRole("link", { name: "Pilot" })
      .getAttribute("href");
    expect(href).toBeTruthy();
    const params = new URLSearchParams(href!.split("?")[1]);
    expect(params.get("returnTo")).toBe("/?search=Pilot&page=2");
  });
  it("mostra mensagem padrão quando a página não tem episódios", () => {
    render(<EpisodesList episodes={[]} />);
    expect(screen.getByText(EPISODES_PAGE_EMPTY_MESSAGE)).toBeInTheDocument();
  });
  it("mostra estado vazio amigável para busca sem resultados", () => {
    render(
      <EpisodesList
        episodes={[]}
        emptyMessage={episodesSearchEmptyMessage("9999")}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      episodesSearchEmptyMessage("9999"),
    );
  });
  it("renderiza o episódio retornado por busca de ID", () => {
    render(
      <EpisodesList
        episodes={[
          {
            id: 1,
            name: "Pilot",
            airDate: "December 2, 2013",
            episode: "S01E01",
          },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Pilot" })).toHaveAttribute(
      "href",
      "/episodes/1",
    );
    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
  });
  it("renderiza resultados de busca textual", () => {
    render(
      <EpisodesList
        episodes={[
          {
            id: 1,
            name: "Pilot",
            airDate: "December 2, 2013",
            episode: "S01E01",
          },
          {
            id: 28,
            name: "The Ricklantis Mixup",
            airDate: "September 10, 2017",
            episode: "S03E07",
          },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Pilot" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "The Ricklantis Mixup" }),
    ).toBeInTheDocument();
  });
});
