import "server-only";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { EpisodeCharacter, EpisodeCharacters } from "@/app/episodes/types";
function isEpisodeCharacter(data: unknown): data is EpisodeCharacter {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const character = data as Partial<EpisodeCharacter>;
  return (
    typeof character.id === "number" &&
    typeof character.name === "string" &&
    typeof character.status === "string" &&
    typeof character.species === "string" &&
    typeof character.type === "string" &&
    typeof character.gender === "string" &&
    typeof character.image === "string" &&
    typeof character.originName === "string" &&
    typeof character.locationName === "string"
  );
}
function isEpisodeCharacters(data: unknown): data is EpisodeCharacters {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const episode = data as Partial<EpisodeCharacters>;
  return (
    typeof episode.id === "number" &&
    typeof episode.name === "string" &&
    typeof episode.airDate === "string" &&
    typeof episode.episode === "string" &&
    Array.isArray(episode.characters) &&
    episode.characters.every(isEpisodeCharacter)
  );
}
export const getEpisodeCharacters = cache(async function getEpisodeCharacters(
  id: number,
): Promise<EpisodeCharacters> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }
  const response = await fetch(`${baseUrl}/episodes/${id}/characters`);
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error(
      `Failed to fetch episode characters (status ${response.status})`,
    );
  }
  const data: unknown = await response.json();
  if (!isEpisodeCharacters(data)) {
    throw new Error("Invalid episode characters response from API");
  }
  return data;
});
