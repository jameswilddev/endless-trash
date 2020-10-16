export function escapeName(name: string): string {
  return `'${name.replace(/'/g, "''")}'`;
}
