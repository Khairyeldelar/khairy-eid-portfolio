import { describe, expect, it } from "vitest";
import { articleUrl, buildShareLinks, copyText } from "./share";

describe("article sharing", () => {
  it("builds a stable hash URL for a published article", () => {
    expect(articleUrl("https://example.com", "/portfolio/", "my article")).toBe("https://example.com/share/my%20article");
  });

  it("copies through the clipboard when available", async () => {
    const fallback = { called: false };
    const result = await copyText("https://example.com", async () => undefined, () => { fallback.called = true; });
    expect(result).toBe("clipboard");
    expect(fallback.called).toBe(false);
  });

  it("falls back when clipboard access fails", async () => {
    let copied = "";
    const result = await copyText("https://example.com", async () => { throw new Error("blocked"); }, value => { copied = value; });
    expect(result).toBe("fallback");
    expect(copied).toBe("https://example.com");
  });

  it("encodes the title and URL for social platforms", () => {
    const links = buildShareLinks("https://example.com/#article-one", "عنوان المقال");
    expect(links.facebook).toContain("sharer.php?u=https%3A%2F%2Fexample.com%2F%23article-one");
    expect(links.x).toContain("text=%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%D8%A7%D9%84%D9%85%D9%82%D8%A7%D9%84");
    expect(links.whatsapp).toContain("wa.me/?text=");
  });
});
