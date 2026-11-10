import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EpisodeSearchForm } from "@/app/episodes/components/episode-search-form";
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));
describe("EpisodeSearchForm", () => {
  beforeEach(() => {
    push.mockClear();
  });
  it("usa formulário GET para / com campo search", () => {
    render(<EpisodeSearchForm />);
    const form = screen.getByRole("form", { name: "Busca de episódio" });
    expect(form).toHaveAttribute("action", "/");
    expect(form).toHaveAttribute("method", "get");
    expect(screen.getByLabelText("Número ou nome do episódio")).toHaveAttribute(
      "name",
      "search",
    );
  });
  it("aceita letras e números no campo de busca", async () => {
    const user = userEvent.setup();
    render(<EpisodeSearchForm />);
    const input = screen.getByLabelText("Número ou nome do episódio");
    await user.type(input, "Pilot 1");
    expect(input).toHaveValue("Pilot 1");
  });
  it("bloqueia envio vazio ou só com espaços e mostra mensagem acessível", async () => {
    const user = userEvent.setup();
    render(<EpisodeSearchForm />);
    const input = screen.getByLabelText("Número ou nome do episódio");
    const submit = screen.getByRole("button", { name: "Buscar" });
    await user.click(submit);
    const emptyAlert = screen.getByRole("alert");
    expect(emptyAlert).toHaveTextContent("Informe um ID ou nome de episódio.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", emptyAlert.id);
    expect(push).not.toHaveBeenCalled();
    await user.type(input, "   ");
    await user.click(submit);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informe um ID ou nome de episódio.",
    );
    expect(push).not.toHaveBeenCalled();
  });
  it("navega para /?search= com o termo aparado e encoded", async () => {
    const user = userEvent.setup();
    render(<EpisodeSearchForm />);
    await user.type(
      screen.getByLabelText("Número ou nome do episódio"),
      "  Pilot  ",
    );
    await user.click(screen.getByRole("button", { name: "Buscar" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/?search=Pilot");
  });
  it("navega com encoding para termos com espaços e inicia na página 1", async () => {
    const user = userEvent.setup();
    render(<EpisodeSearchForm />);
    await user.type(
      screen.getByLabelText("Número ou nome do episódio"),
      "Lawnmower Dog",
    );
    await user.click(screen.getByRole("button", { name: "Buscar" }));
    expect(push).toHaveBeenCalledWith("/?search=Lawnmower%20Dog");
    expect(push.mock.calls[0]?.[0]).not.toContain("page=");
  });
  it("mostra ação de limpar busca quando há busca ativa", () => {
    render(<EpisodeSearchForm initialSearch="Pilot" />);
    const clear = screen.getByRole("link", { name: "Limpar busca" });
    expect(clear).toHaveAttribute("href", "/");
    expect(screen.getByLabelText("Número ou nome do episódio")).toHaveValue(
      "Pilot",
    );
  });
  it("não mostra limpar quando não há busca ativa", () => {
    render(<EpisodeSearchForm />);
    expect(
      screen.queryByRole("link", { name: "Limpar busca" }),
    ).not.toBeInTheDocument();
  });
});
