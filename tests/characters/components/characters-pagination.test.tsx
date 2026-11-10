import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharactersPagination } from "@/app/characters/components/characters-pagination";
describe("CharactersPagination", () => {
  it("mostra a página atual e total e navega com ?page=N", () => {
    render(
      <CharactersPagination
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
      "/characters?page=1",
    );
    expect(screen.getByRole("link", { name: "Próxima" })).toHaveAttribute(
      "href",
      "/characters?page=3",
    );
  });
  it("preserva name ao navegar entre páginas", () => {
    render(
      <CharactersPagination
        info={{
          currentPage: 1,
          pages: 2,
          nextPage: 2,
          previousPage: null,
        }}
        name="Rick"
      />,
    );
    expect(screen.getByRole("link", { name: "Próxima" })).toHaveAttribute(
      "href",
      "/characters?name=Rick&page=2",
    );
  });
  it("desabilita Anterior na primeira página", () => {
    render(
      <CharactersPagination
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
      "/characters?page=2",
    );
  });
  it("desabilita Próxima na última página", () => {
    render(
      <CharactersPagination
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
      "/characters?page=2",
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
      <CharactersPagination
        info={{
          currentPage: 1,
          pages: 0,
          nextPage: null,
          previousPage: null,
        }}
        name="xyz"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
