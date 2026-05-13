export function extractSlug(link: string): string {
  const parts = link.split("/").filter(Boolean);

  return parts[parts.length - 1];
}
