import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CharactersNotFound from "@/app/characters/not-found";
import RootNotFound from "@/app/not-found";
describe("not-found pages", () => {
  it("mantém o not-found raiz neutro entre episódios e personagens", () => {
    render(<RootNotFound />);
    expect(
      screen.getByRole("heading", { name: "Página não encontrada" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Não encontramos essa página. Confira o endereço e tente novamente.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar ao início" }),
    ).toHaveAttribute("href", "/");
    expect(screen.queryByText(/episódios/i)).not.toBeInTheDocument();
  });
  it("oferece retorno útil no not-found de personagens", () => {
    render(<CharactersNotFound />);
    expect(
      screen.getByRole("heading", { name: "Página não encontrada" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/página de personagens/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar aos personagens" }),
    ).toHaveAttribute("href", "/characters");
  });
});
