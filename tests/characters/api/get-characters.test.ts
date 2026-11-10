import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));
import { getCharacters } from "@/app/characters/api/get-characters";
const validList = {
  info: {
    count: 1,
    pages: 1,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  },
  results: [
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
describe("getCharacters", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("API_BASE_URL", "http://api.test");
    notFound.mockClear();
    vi.spyOn(globalThis, "fetch").mockReset();
  });
  it("busca a listagem paginada com URLSearchParams", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validList,
    } as Response);
    await expect(getCharacters({ page: 2 })).resolves.toEqual(validList);
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/characters?page=2");
  });
  it("inclui o filtro name na query", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validList,
    } as Response);
    await getCharacters({ page: 1, name: "Rick Sanchez" });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/characters?page=1&name=Rick+Sanchez",
    );
  });
  it("retorna lista vazia quando a busca por nome não encontra resultados (404)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);
    await expect(
      getCharacters({ page: 1, name: "xyz-no-match" }),
    ).resolves.toEqual({
      info: {
        count: 0,
        pages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
      },
      results: [],
    });
    expect(notFound).not.toHaveBeenCalled();
  });
  it("chama notFound quando a página sem filtro não existe", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);
    await expect(getCharacters({ page: 999 })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(notFound).toHaveBeenCalled();
  });
  it("lança erro quando a API falha", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({}),
    } as Response);
    await expect(getCharacters({ page: 1 })).rejects.toThrow(
      "Failed to fetch characters (status 502)",
    );
  });
  it("lança erro quando a resposta é inválida", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ info: {}, results: [{ id: "bad" }] }),
    } as Response);
    await expect(getCharacters({ page: 1 })).rejects.toThrow(
      "Invalid characters list response from API",
    );
  });
  it("lança erro quando API_BASE_URL não está configurada", async () => {
    vi.unstubAllEnvs();
    delete process.env.API_BASE_URL;
    await expect(getCharacters({ page: 1 })).rejects.toThrow(
      "API_BASE_URL is not configured",
    );
  });
});
