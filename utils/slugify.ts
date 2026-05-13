export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // hapus simbol
    .replace(/\s+/g, "-") // spasi jadi -
    .replace(/--+/g, "-"); // double - jadi single
}
