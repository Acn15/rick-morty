import { describe, expect, it } from "vitest";
import {
  EPISODE_CHARACTERS_EMPTY_MESSAGE,
  EPISODES_PAGE_EMPTY_MESSAGE,
  episodesSearchEmptyMessage,
} from "@/app/episodes/lib/episodes-copy";
describe("episodes-copy", () => {
  it("mantém copy específica de busca de episódio (ID ou nome)", () => {
    expect(episodesSearchEmptyMessage("9999")).toBe(
      "Nenhum episódio encontrado para “9999”. Tente outro ID ou nome.",
    );
    expect(episodesSearchEmptyMessage("Pilot")).toContain("Pilot");
    expect(episodesSearchEmptyMessage("x")).not.toContain("personagem");
  });
  it("expõe mensagens de página e de grid do detalhe", () => {
    expect(EPISODES_PAGE_EMPTY_MESSAGE).toBe(
      "Nenhum episódio encontrado nesta página.",
    );
    expect(EPISODE_CHARACTERS_EMPTY_MESSAGE).toBe(
      "Nenhum personagem encontrado para este episódio.",
    );
  });
});
