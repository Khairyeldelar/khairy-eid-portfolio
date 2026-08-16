export type UploadedMedia = { url: string; key: string };

export function applyUploadedMedia<T extends Record<string, unknown>>(
  form: T,
  field: "image" | "thumbnail",
  media: UploadedMedia,
): T {
  if (field === "thumbnail") {
    return { ...form, thumbnailUrl: media.url, thumbnailKey: media.key };
  }
  return { ...form, imageUrl: media.url, imageKey: media.key };
}
