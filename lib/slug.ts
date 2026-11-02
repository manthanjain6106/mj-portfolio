export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/[\s_-]+/g, "-") // Collapse whitespace and underscores to a dash
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
}
