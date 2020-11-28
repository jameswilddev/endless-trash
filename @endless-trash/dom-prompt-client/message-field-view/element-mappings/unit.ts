import { elementMappings } from ".";

describe(`elementMappings`, () => {
  it(`maps title to h1`, () => {
    expect(elementMappings.title).toEqual(`h1`);
  });

  it(`maps subtitle to h2`, () => {
    expect(elementMappings.subtitle).toEqual(`h2`);
  });

  it(`maps paragraph to p`, () => {
    expect(elementMappings.paragraph).toEqual(`p`);
  });
});
