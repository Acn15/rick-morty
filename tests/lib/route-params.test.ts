import { describe, expect, it } from "vitest";
import { resolvePageParam, resolvePositiveIdParam } from "@/lib/route-params";
describe("route-params", () => {
  it("resolve page com as mesmas regras para episódios e personagens", () => {
    expect(resolvePageParam(undefined)).toBe(1);
    expect(resolvePageParam("2")).toBe(2);
    expect(resolvePageParam(["3"])).toBe(3);
    expect(resolvePageParam("abc")).toBeNull();
    expect(resolvePageParam("0")).toBeNull();
    expect(resolvePageParam("-1")).toBeNull();
  });
  it("resolve id positivo inteiro para detalhe de episódio ou personagem", () => {
    expect(resolvePositiveIdParam("1")).toBe(1);
    expect(resolvePositiveIdParam("42")).toBe(42);
    expect(resolvePositiveIdParam("0")).toBeNull();
    expect(resolvePositiveIdParam("-1")).toBeNull();
    expect(resolvePositiveIdParam("1.5")).toBeNull();
    expect(resolvePositiveIdParam("abc")).toBeNull();
  });
});
