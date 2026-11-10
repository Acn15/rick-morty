import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import GlobalError from "@/app/global-error";
describe("GlobalError", () => {
  it("define html/body próprios e ação de retry", () => {
    const markup = renderToStaticMarkup(
      <GlobalError error={new Error("boom")} retry={vi.fn()} />,
    );
    expect(markup).toContain("<html");
    expect(markup).toContain("<body");
    expect(markup).toContain("Falha ao carregar");
    expect(markup).toContain("Tentar de novo");
    expect(markup).toContain('type="button"');
  });
});
