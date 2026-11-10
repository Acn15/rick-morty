import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CharacterSearchForm } from "@/app/characters/components/character-search-form";
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));
describe("CharacterSearchForm", () => {
  beforeEach(() => {
    push.mockClear();
  });
  it("usa formulário GET para /characters com campo name", () => {
    render(<CharacterSearchForm />);
    const form = screen.getByRole("form", { name: "Busca de personagem" });
    expect(form).toHaveAttribute("action", "/characters");
    expect(form).toHaveAttribute("method", "get");
    const input = screen.getByLabelText("Nome do personagem");
    expect(input).toHaveAttribute("name", "name");
  });
  it("usa id único no campo e associa o label", () => {
    render(<CharacterSearchForm />);
    const input = screen.getByLabelText("Nome do personagem");
    expect(input).toHaveAttribute("id");
    expect(input.getAttribute("id")).not.toBe("character-name");
    expect(input.id.length).toBeGreaterThan(0);
  });
  it("preenche o valor inicial da busca ativa", () => {
    render(<CharacterSearchForm initialName="Rick" />);
    expect(screen.getByLabelText("Nome do personagem")).toHaveValue("Rick");
  });
  it("bloqueia envio vazio ou só com espaços e mostra mensagem acessível", async () => {
    const user = userEvent.setup();
    render(<CharacterSearchForm />);
    const input = screen.getByLabelText("Nome do personagem");
    const submit = screen.getByRole("button", { name: "Buscar" });
    await user.click(submit);
    const emptyAlert = screen.getByRole("alert");
    expect(emptyAlert).toHaveTextContent("Informe um nome de personagem.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", emptyAlert.id);
    expect(push).not.toHaveBeenCalled();
    await user.type(input, "   ");
    await user.click(submit);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informe um nome de personagem.",
    );
    expect(push).not.toHaveBeenCalled();
  });
  it("navega para /characters?name= com o termo aparado e encoded", async () => {
    const user = userEvent.setup();
    render(<CharacterSearchForm />);
    await user.type(screen.getByLabelText("Nome do personagem"), "  Rick  ");
    await user.click(screen.getByRole("button", { name: "Buscar" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/characters?name=Rick");
  });
  it("navega com encoding para nomes com espaços e inicia na página 1", async () => {
    const user = userEvent.setup();
    render(<CharacterSearchForm />);
    await user.type(screen.getByLabelText("Nome do personagem"), "Morty Smith");
    await user.click(screen.getByRole("button", { name: "Buscar" }));
    expect(push).toHaveBeenCalledWith("/characters?name=Morty%20Smith");
    expect(push.mock.calls[0]?.[0]).not.toContain("page=");
  });
  it("mostra ação de limpar busca quando há busca ativa", () => {
    render(<CharacterSearchForm initialName="Rick" />);
    const clear = screen.getByRole("link", { name: "Limpar busca" });
    expect(clear).toHaveAttribute("href", "/characters");
  });
  it("não mostra limpar quando não há busca ativa", () => {
    render(<CharacterSearchForm />);
    expect(
      screen.queryByRole("link", { name: "Limpar busca" }),
    ).not.toBeInTheDocument();
  });
});
