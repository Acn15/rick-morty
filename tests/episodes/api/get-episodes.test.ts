import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));
import { getEpisodes } from "@/app/episodes/api/get-episodes";
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
      name: "Pilot",
      airDate: "December 2, 2013",
      episode: "S01E01",
    },
  ],
};
describe("getEpisodes", () => {
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
    await expect(getEpisodes({ page: 2 })).resolves.toEqual(validList);
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/episodes?page=2");
  });
  it("inclui o filtro search na query com encoding", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validList,
    } as Response);
    await getEpisodes({ page: 1, search: "Lawnmower Dog" });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/episodes?page=1&search=Lawnmower+Dog",
    );
  });
  it("retorna lista vazia quando a busca não encontra resultados (404)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);
    await expect(getEpisodes({ page: 1, search: "9999" })).resolves.toEqual({
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
    await expect(getEpisodes({ page: 999 })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
  it("lança erro quando a API falha", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({}),
    } as Response);
    await expect(getEpisodes({ page: 1 })).rejects.toThrow(
      "Failed to fetch episodes (status 502)",
    );
  });
  it("lança erro quando a rede falha", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network down"));
    await expect(getEpisodes({ page: 1 })).rejects.toThrow("Network down");
  });
  it("lança erro quando a resposta é inválida", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ info: {}, results: [{ id: "bad" }] }),
    } as Response);
    await expect(getEpisodes({ page: 1 })).rejects.toThrow(
      "Invalid episodes list response from API",
    );
  });
  it("lança erro quando API_BASE_URL não está configurada", async () => {
    vi.unstubAllEnvs();
    delete process.env.API_BASE_URL;
    await expect(getEpisodes({ page: 1 })).rejects.toThrow(
      "API_BASE_URL is not configured",
    );
  });
});
