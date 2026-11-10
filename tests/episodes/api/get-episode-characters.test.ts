import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));
import { getEpisodeCharacters } from "@/app/episodes/api/get-episode-characters";
const validDetail = {
  id: 1,
  name: "Pilot",
  airDate: "December 2, 2013",
  episode: "S01E01",
  characters: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      originName: "Earth (C-137)",
      locationName: "Citadel of Ricks",
    },
  ],
};
describe("getEpisodeCharacters", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("API_BASE_URL", "http://api.test");
    notFound.mockClear();
    vi.spyOn(globalThis, "fetch").mockReset();
  });
  it("busca o detalhe no endpoint Nest correto", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validDetail,
    } as Response);
    await expect(getEpisodeCharacters(1)).resolves.toEqual(validDetail);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/episodes/1/characters",
    );
  });
  it("aceita lista de personagens vazia", async () => {
    const emptyCharacters = { ...validDetail, characters: [] };
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => emptyCharacters,
    } as Response);
    await expect(getEpisodeCharacters(1)).resolves.toEqual(emptyCharacters);
  });
  it("chama notFound quando o episódio não existe", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);
    await expect(getEpisodeCharacters(9999)).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
  it("lança erro quando a API falha", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({}),
    } as Response);
    await expect(getEpisodeCharacters(1)).rejects.toThrow(
      "Failed to fetch episode characters (status 502)",
    );
  });
  it("lança erro quando a rede falha", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network down"));
    await expect(getEpisodeCharacters(1)).rejects.toThrow("Network down");
  });
  it("lança erro quando um personagem do payload é inválido", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        ...validDetail,
        characters: [{ id: "bad", name: "Rick" }],
      }),
    } as Response);
    await expect(getEpisodeCharacters(1)).rejects.toThrow(
      "Invalid episode characters response from API",
    );
  });
  it("lança erro quando a resposta é inválida", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 1, name: "Pilot", characters: "nope" }),
    } as Response);
    await expect(getEpisodeCharacters(1)).rejects.toThrow(
      "Invalid episode characters response from API",
    );
  });
  it("lança erro quando API_BASE_URL não está configurada", async () => {
    vi.unstubAllEnvs();
    delete process.env.API_BASE_URL;
    await expect(getEpisodeCharacters(1)).rejects.toThrow(
      "API_BASE_URL is not configured",
    );
  });
});
