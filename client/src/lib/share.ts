export type ShareLinks = { facebook: string; x: string; whatsapp: string };

export function articleUrl(origin: string, pathname: string, slug?: string) {
  const base = `${origin}${pathname}`;
  return slug ? `${base}#article-${encodeURIComponent(slug)}` : base;
}

export async function copyText(text: string, writeText: (value: string) => Promise<void>, fallback: (value: string) => void) {
  try {
    await writeText(text);
    return "clipboard" as const;
  } catch {
    fallback(text);
    return "fallback" as const;
  }
}

export function buildShareLinks(url: string, title: string): ShareLinks {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };
}
