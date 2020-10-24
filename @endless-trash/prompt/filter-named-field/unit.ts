import { Field, NamedField, filterNamedField } from "..";

describe(`filterNamedField`, () => {
  function accepts(description: string, namedField: NamedField): void {
    describe(`accepts ${description}`, () => {
      let result: null | NamedField;

      beforeAll(() => {
        result = filterNamedField(namedField);
      });

      it(`returns the named field`, () => {
        expect(result).toEqual(namedField);
      });
    });
  }

  function rejects(description: string, field: Field): void {
    describe(`rejects ${description}`, () => {
      let result: null | NamedField;

      beforeAll(() => {
        result = filterNamedField(field);
      });

      it(`returns null`, () => {
        expect(result).toBeNull();
      });
    });
  }

  accepts(`checkbox`, {
    type: `checkbox`,
    value: false,
    label: `Test Label`,
    name: `Test Name`,
  });

  accepts(`file`, {
    name: `Test Name`,
    type: `file`,
    label: `Test Label`,
    url: null,
    required: false,
    maximumBytes: null,
  });

  accepts(`float`, {
    type: `float`,
    name: `Test Name`,
    label: `Test Label`,
    value: null,
    minimum: null,
    maximum: null,
    required: false,
  });

  accepts(`integer`, {
    type: `integer`,
    name: `Test Name`,
    label: `Test Label`,
    value: null,
    minimum: null,
    maximum: null,
    required: false,
  });

  accepts(`string`, {
    type: `string`,
    name: `Test Name`,
    label: `Test Label`,
    value: ``,
    minimumLength: null,
    maximumLength: null,
  });

  rejects(`paragraph`, {
    type: `paragraph`,
    content: `Test Content`,
  });

  rejects(`subtitle`, {
    type: `subtitle`,
    content: `Test Content`,
  });

  rejects(`title`, {
    type: `title`,
    content: `Test Content`,
  });
});
