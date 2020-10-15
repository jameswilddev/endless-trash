export function escapeLike(name: string): string {
  return name.replace(/\\/g, `\\\\`).replace(/%/g, `\\%`).replace(/_/g, `\\_`);
}
