import "server-only";
import { notFound } from "next/navigation";
import type { Character, CharactersList } from "@/app/characters/types";
function isCharacter(data: unknown): data is Character {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const character = data as Partial<Character>;
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
function isCharactersList(data: unknown): data is CharactersList {
  if (data === null || typeof data !== "object") {
    return false;
  }
  const payload = data as Partial<CharactersList>;
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
    payload.results.every(isCharacter)
  );
}
function emptyCharactersList(page: number): CharactersList {
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
type GetCharactersOptions = {
  page: number;
  name?: string;
};
export async function getCharacters({
  page,
  name,
}: GetCharactersOptions): Promise<CharactersList> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }
  const params = new URLSearchParams({ page: String(page) });
  if (name !== undefined) {
    params.set("name", name);
  }
  const response = await fetch(`${baseUrl}/characters?${params.toString()}`);
  if (response.status === 404) {
    if (name !== undefined) {
      return emptyCharactersList(page);
    }
    notFound();
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch characters (status ${response.status})`);
  }
  const data: unknown = await response.json();
  if (!isCharactersList(data)) {
    throw new Error("Invalid characters list response from API");
  }
  return data;
}
