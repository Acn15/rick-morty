import { describe, expect, it } from "vitest";
import {
  buildCharactersHref,
  resolveCharacterIdParam,
  resolveNameParam,
  resolvePageParam,
} from "@/app/characters/lib/characters-query";
describe("characters-query", () => {
  it("resolve name aparando espaços e ignora termo vazio na URL", () => {
    expect(resolveNameParam("  Rick  ")).toBe("Rick");
    expect(resolveNameParam("")).toBeUndefined();
    expect(resolveNameParam("   ")).toBeUndefined();
    expect(resolveNameParam(undefined)).toBeUndefined();
  });
  it("reexporta resolvePageParam compartilhado", () => {
    expect(resolvePageParam(undefined)).toBe(1);
    expect(resolvePageParam("2")).toBe(2);
    expect(resolvePageParam("abc")).toBeNull();
  });
  it("reexporta resolveCharacterIdParam com a regra de id positivo", () => {
    expect(resolveCharacterIdParam("1")).toBe(1);
    expect(resolveCharacterIdParam("42")).toBe(42);
    expect(resolveCharacterIdParam("0")).toBeNull();
    expect(resolveCharacterIdParam("-1")).toBeNull();
    expect(resolveCharacterIdParam("1.5")).toBeNull();
    expect(resolveCharacterIdParam("abc")).toBeNull();
  });
  it("monta href de listagem e de busca", () => {
    expect(buildCharactersHref(2)).toBe("/characters?page=2");
    expect(buildCharactersHref(2, "Rick")).toBe("/characters?name=Rick&page=2");
    expect(buildCharactersHref(1, "Morty Smith")).toBe(
      "/characters?name=Morty+Smith&page=1",
    );
  });
});
