export function generateBase64Pattern(bytes: null | number): string {
  if (bytes === null) {
    return `^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$`;
  } else {
    const remainder = bytes % 3;
    const loops = (bytes - remainder) / 3;

    // todo: there's some simple optimizations we can perform here (remove quad groups if < 4, remove repeat statement if < 8)

    const options: string[] = [`^(?:[A-Za-z0-9+\/]{4}){0,${loops}}$`];

    if (bytes >= 1) {
      options.push(
        `^(?:[A-Za-z0-9+\/]{4}){0,${
          remainder >= 1 ? loops : loops - 1
        }}[A-Za-z0-9+\/]{2}==$`
      );
    }

    if (bytes >= 2) {
      options.push(
        `^(?:[A-Za-z0-9+\/]{4}){0,${
          remainder >= 2 ? loops : loops - 1
        }}[A-Za-z0-9+\/]{3}=$`
      );
    }

    return options.join(`|`);
  }
}
