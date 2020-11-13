export function validateIntegerFormat(text: string): boolean {
  return /^[+-]?\d+$/.test(text);
}
