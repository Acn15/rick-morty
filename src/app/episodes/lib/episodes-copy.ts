export const EPISODES_PAGE_EMPTY_MESSAGE =
  "Nenhum episódio encontrado nesta página.";
export const EPISODE_CHARACTERS_EMPTY_MESSAGE =
  "Nenhum personagem encontrado para este episódio.";
export function episodesSearchEmptyMessage(search: string): string {
  return `Nenhum episódio encontrado para “${search}”. Tente outro ID ou nome.`;
}
