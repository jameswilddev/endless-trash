export function removeWhiteSpace(value: string): null | string {
  return value.replace(/\s/g, ``) || null;
}
