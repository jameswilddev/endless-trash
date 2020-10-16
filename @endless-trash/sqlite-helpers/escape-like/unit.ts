import { escapeLike } from "..";

describe(`escapeLike`, () => {
  it(`escapes as expected`, () => {
    expect(escapeLike(`Test Value % Which _ Has Been \\ Escaped`)).toEqual(
      `Test Value \\% Which \\_ Has Been \\\\ Escaped`
    );
  });
});
