import { escapeName } from ".";

describe(`escapeName`, () => {
  it(`escapes single quotes as expected`, () => {
    expect(
      escapeName(`A 'string' to escape with many single quotes ''''.`)
    ).toEqual(`'A ''string'' to escape with many single quotes ''''''''.'`);
  });
});
