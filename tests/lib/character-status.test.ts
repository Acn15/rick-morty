import { describe, expect, it } from "vitest";
import { characterStatusClassName } from "@/lib/character-status";
describe("characterStatusClassName", () => {
  it("mapeia Alive, Dead e demais para as classes CSS do tema", () => {
    expect(characterStatusClassName("Alive")).toBe("status-alive");
    expect(characterStatusClassName("alive")).toBe("status-alive");
    expect(characterStatusClassName("Dead")).toBe("status-dead");
    expect(characterStatusClassName("unknown")).toBe("status-unknown");
    expect(characterStatusClassName("")).toBe("status-unknown");
  });
});
