import { describe, expect, it } from "vitest";
import {
  CHARACTERS_PAGE_EMPTY_MESSAGE,
  charactersSearchEmptyMessage,
} from "@/app/characters/lib/characters-copy";
describe("characters-copy", () => {
  it("mantém copy específica de busca de personagem (somente nome)", () => {
    expect(charactersSearchEmptyMessage("xyz")).toBe(
      "Nenhum personagem encontrado para “xyz”. Tente outro nome.",
    );
    expect(charactersSearchEmptyMessage("Rick")).not.toContain("ID");
    expect(charactersSearchEmptyMessage("Rick")).not.toContain("episódio");
  });
  it("expõe mensagem padrão de página vazia", () => {
    expect(CHARACTERS_PAGE_EMPTY_MESSAGE).toBe(
      "Nenhum personagem encontrado nesta página.",
    );
  });
});
