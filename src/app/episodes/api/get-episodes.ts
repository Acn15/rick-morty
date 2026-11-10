import "server-only";
import { notFound } from "next/navigation";
import type { EpisodesList, EpisodeSummary } from "@/app/episodes/types";
function isEpisodeSummary(data: unknown): data is EpisodeSummary {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const episode = data as Partial<EpisodeSummary>;
  return (
    typeof episode.id === "number" &&
    typeof episode.name === "string" &&
    typeof episode.airDate === "string" &&
    typeof episode.episode === "string"
  );
}
function isEpisodesList(data: unknown): data is EpisodesList {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const payload = data as Partial<EpisodesList>;
  if (
    payload.info === null ||
    typeof payload.info !== "object" ||
    !Array.isArray(payload.results)
  ) {
    return false;
  }
  const { info } = payload;
  return (
    typeof info.count === "number" &&
    typeof info.pages === "number" &&
    typeof info.currentPage === "number" &&
    (typeof info.nextPage === "number" || info.nextPage === null) &&
    (typeof info.previousPage === "number" || info.previousPage === null) &&
    payload.results.every(isEpisodeSummary)
  );
}
function emptyEpisodesList(page: number): EpisodesList {
  return {
    info: {
      count: 0,
      pages: 0,
      currentPage: page,
      nextPage: null,
      previousPage: null,
    },
    results: [],
  };
}
type GetEpisodesOptions = {
  page: number;
  search?: string;
};
export async function getEpisodes({
  page,
  search,
}: GetEpisodesOptions): Promise<EpisodesList> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }
  const params = new URLSearchParams({ page: String(page) });
  if (search !== undefined) {
    params.set("search", search);
  }
  const response = await fetch(`${baseUrl}/episodes?${params.toString()}`);
  if (response.status === 404) {
    if (search !== undefined) {
      return emptyEpisodesList(page);
    }
    notFound();
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch episodes (status ${response.status})`);
  }
  const data: unknown = await response.json();
  if (!isEpisodesList(data)) {
    throw new Error("Invalid episodes list response from API");
  }
  return data;
}
