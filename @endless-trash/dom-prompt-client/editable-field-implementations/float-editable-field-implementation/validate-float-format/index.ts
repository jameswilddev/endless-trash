export function validateFloatFormat(text: string): boolean {
  return /^[+-]?(?:\d+|\d+\.|\.\d+|\d+\.\d+)$/.test(text);
}
