import { describe, expect, it } from "vitest";
import {
  buildEpisodesHref,
  resolvePageParam,
  resolveSearchParam,
} from "@/app/episodes/lib/episodes-query";
describe("episodes-query", () => {
  it("resolve search aparando espaços", () => {
    expect(resolveSearchParam("  Pilot  ")).toBe("Pilot");
    expect(resolveSearchParam("   ")).toBeUndefined();
    expect(resolveSearchParam(undefined)).toBeUndefined();
  });
  it("reexporta resolvePageParam compartilhado", () => {
    expect(resolvePageParam(undefined)).toBe(1);
    expect(resolvePageParam("2")).toBe(2);
    expect(resolvePageParam("abc")).toBeNull();
  });
  it("monta href de listagem e de busca", () => {
    expect(buildEpisodesHref(2)).toBe("/?page=2");
    expect(buildEpisodesHref(2, "Pilot")).toBe("/?search=Pilot&page=2");
    expect(buildEpisodesHref(1, "Lawnmower Dog")).toBe(
      "/?search=Lawnmower+Dog&page=1",
    );
  });
});
