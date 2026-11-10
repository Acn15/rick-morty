export const CHARACTERS_PAGE_EMPTY_MESSAGE =
  "Nenhum personagem encontrado nesta página.";
export function charactersSearchEmptyMessage(name: string): string {
  return `Nenhum personagem encontrado para “${name}”. Tente outro nome.`;
}
