import { describe, expect, it } from "vitest";
import {
  buildPathWithReturnTo,
  isSafeInternalPath,
  resolveOptionalReturnTo,
  resolveReturnToParam,
} from "@/lib/return-to";
describe("return-to", () => {
  it("aceita caminhos relativos internos com query", () => {
    expect(isSafeInternalPath("/")).toBe(true);
    expect(isSafeInternalPath("/characters")).toBe(true);
    expect(isSafeInternalPath("/?search=Pilot&page=2")).toBe(true);
    expect(isSafeInternalPath("/characters?name=Morty+Smith&page=1")).toBe(
      true,
    );
    expect(isSafeInternalPath("/characters?name=José&page=2")).toBe(true);
  });
  it("rejeita URLs absolutas, protocol-relative e barras invertidas", () => {
    expect(isSafeInternalPath("https://evil.example")).toBe(false);
    expect(isSafeInternalPath("http://evil.example/path")).toBe(false);
    expect(isSafeInternalPath("//evil.example")).toBe(false);
    expect(isSafeInternalPath("/\\evil")).toBe(false);
    expect(isSafeInternalPath("\\characters")).toBe(false);
    expect(isSafeInternalPath("/path://weird")).toBe(false);
  });
  it("resolve returnTo seguro ou cai no fallback", () => {
    expect(resolveReturnToParam("/?search=Pilot&page=2", "/")).toBe(
      "/?search=Pilot&page=2",
    );
    expect(resolveReturnToParam(undefined, "/")).toBe("/");
    expect(resolveReturnToParam(undefined, "/characters")).toBe("/characters");
    expect(resolveReturnToParam("https://evil.example", "/")).toBe("/");
    expect(resolveReturnToParam("//evil.example", "/characters")).toBe(
      "/characters",
    );
    expect(resolveOptionalReturnTo("//evil")).toBeUndefined();
    expect(resolveOptionalReturnTo("")).toBeUndefined();
  });
  it("codifica returnTo preservando busca, espaços, acentos e &", () => {
    const origin = "/?search=José & Morty&page=2";
    const href = buildPathWithReturnTo("/episodes/1", origin);
    expect(href.startsWith("/episodes/1?returnTo=")).toBe(true);
    expect(href).toContain("returnTo=");
    expect(href).toContain("%26");
    const params = new URLSearchParams(href.slice("/episodes/1?".length));
    expect(params.get("returnTo")).toBe(origin);
  });
  it("omite returnTo quando não há origem", () => {
    expect(buildPathWithReturnTo("/episodes/1")).toBe("/episodes/1");
    expect(buildPathWithReturnTo("/characters/1", undefined)).toBe(
      "/characters/1",
    );
  });
});
