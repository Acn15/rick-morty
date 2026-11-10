import "server-only";
import { notFound } from "next/navigation";
import { cache } from "react";
import type {
  CharacterDetail,
  CharacterEpisodeSummary,
} from "@/app/characters/types";
function isCharacterEpisodeSummary(
  data: unknown,
): data is CharacterEpisodeSummary {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const episode = data as Partial<CharacterEpisodeSummary>;
  return (
    typeof episode.id === "number" &&
    typeof episode.name === "string" &&
    typeof episode.episode === "string" &&
    typeof episode.airDate === "string"
  );
}
function isCharacterDetail(data: unknown): data is CharacterDetail {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const character = data as Partial<CharacterDetail>;
  return (
    typeof character.id === "number" &&
    typeof character.name === "string" &&
    typeof character.status === "string" &&
    typeof character.species === "string" &&
    typeof character.type === "string" &&
    typeof character.gender === "string" &&
    typeof character.image === "string" &&
    typeof character.originName === "string" &&
    typeof character.locationName === "string" &&
    Array.isArray(character.episodes) &&
    character.episodes.every(isCharacterEpisodeSummary)
  );
}
export const getCharacter = cache(async function getCharacter(
  id: number,
): Promise<CharacterDetail> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }
  const response = await fetch(`${baseUrl}/characters/${id}`);
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch character (status ${response.status})`);
  }
  const data: unknown = await response.json();
  if (!isCharacterDetail(data)) {
    throw new Error("Invalid character detail response from API");
  }
  return data;
});
