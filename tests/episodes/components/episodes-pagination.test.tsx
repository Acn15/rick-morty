import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EpisodesPagination } from "@/app/episodes/components/episodes-pagination";
describe("EpisodesPagination", () => {
  it("mostra a página atual e total e navega com ?page=N", () => {
    render(
      <EpisodesPagination
        info={{
          currentPage: 2,
          pages: 3,
          nextPage: 3,
          previousPage: 1,
        }}
      />,
    );
    expect(screen.getByText(/Página/)).toHaveTextContent("Página 2 de 3");
    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute(
      "href",
      "/?page=1",
    );
    expect(screen.getByRole("link", { name: "Próxima" })).toHaveAttribute(
      "href",
      "/?page=3",
    );
  });
  it("preserva search ao navegar entre páginas", () => {
    render(
      <EpisodesPagination
        info={{
          currentPage: 1,
          pages: 2,
          nextPage: 2,
          previousPage: null,
        }}
        search="Pilot"
      />,
    );
    expect(screen.getByRole("link", { name: "Próxima" })).toHaveAttribute(
      "href",
      "/?search=Pilot&page=2",
    );
  });
  it("desabilita Anterior na primeira página", () => {
    render(
      <EpisodesPagination
        info={{
          currentPage: 1,
          pages: 3,
          nextPage: 2,
          previousPage: null,
        }}
      />,
    );
    expect(
      screen.queryByRole("link", { name: "Anterior" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Anterior")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("link", { name: "Próxima" })).toHaveAttribute(
      "href",
      "/?page=2",
    );
  });
  it("desabilita Próxima na última página", () => {
    render(
      <EpisodesPagination
        info={{
          currentPage: 3,
          pages: 3,
          nextPage: null,
          previousPage: 2,
        }}
      />,
    );
    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute(
      "href",
      "/?page=2",
    );
    expect(
      screen.queryByRole("link", { name: "Próxima" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Próxima")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
  it("não renderiza paginação quando não há páginas", () => {
    const { container } = render(
      <EpisodesPagination
        info={{
          currentPage: 1,
          pages: 0,
          nextPage: null,
          previousPage: null,
        }}
        search="9999"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
