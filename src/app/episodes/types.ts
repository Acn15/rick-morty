export type EpisodeCharacter = {
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
export type EpisodeCharacters = {
  id: number;
  name: string;
  airDate: string;
  episode: string;
  characters: EpisodeCharacter[];
};
export type EpisodeSummary = {
  id: number;
  name: string;
  airDate: string;
  episode: string;
};
export type EpisodesListInfo = {
  count: number;
  pages: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
};
export type EpisodesList = {
  info: EpisodesListInfo;
  results: EpisodeSummary[];
};
