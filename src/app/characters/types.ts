export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  originName: string;
  locationName: string;
};
export type CharacterEpisodeSummary = {
  id: number;
  name: string;
  episode: string;
  airDate: string;
};
export type CharacterDetail = Character & {
  episodes: CharacterEpisodeSummary[];
};
export type CharactersListInfo = {
  count: number;
  pages: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
};
export type CharactersList = {
  info: CharactersListInfo;
  results: Character[];
};
