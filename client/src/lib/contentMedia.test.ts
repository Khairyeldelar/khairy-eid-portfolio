import { describe, expect, it } from "vitest";
import { applyUploadedMedia } from "./contentMedia";

describe("content media fields", () => {
  it("writes both thumbnail URL and storage key for a thumbnail upload", () => {
    const result = applyUploadedMedia({ titleAr: "مقال" }, "thumbnail", { url: "/manus-storage/thumb.webp", key: "portfolio/1/thumb.webp" });
    expect(result).toMatchObject({ thumbnailUrl: "/manus-storage/thumb.webp", thumbnailKey: "portfolio/1/thumb.webp" });
  });

  it("keeps main image fields separate from thumbnail fields", () => {
    const result = applyUploadedMedia({ thumbnailUrl: "old-thumb", thumbnailKey: "old-key" }, "image", { url: "/manus-storage/main.webp", key: "portfolio/1/main.webp" });
    expect(result).toMatchObject({ imageUrl: "/manus-storage/main.webp", imageKey: "portfolio/1/main.webp", thumbnailUrl: "old-thumb", thumbnailKey: "old-key" });
  });
});
