import { describe, expect, it } from "vitest";
import {
  CHARACTER_CARD_IMAGE_SIZES,
  CHARACTER_HEADER_IMAGE_SIZES,
} from "@/lib/character-image";
describe("character-image sizes", () => {
  it("cobre os breakpoints do grid 1/2/3/4 colunas dentro de max-w-6xl", () => {
    expect(CHARACTER_CARD_IMAGE_SIZES).toContain("(max-width: 639px)");
    expect(CHARACTER_CARD_IMAGE_SIZES).toContain("(max-width: 1023px)");
    expect(CHARACTER_CARD_IMAGE_SIZES).toContain("(max-width: 1279px)");
    expect(CHARACTER_CARD_IMAGE_SIZES).toContain("72rem");
    expect(CHARACTER_CARD_IMAGE_SIZES).toContain("/ 4)");
  });
  it("usa 14rem para o retrato do header", () => {
    expect(CHARACTER_HEADER_IMAGE_SIZES).toContain("14rem");
  });
});
