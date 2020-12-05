import { Field, EditableField, filterEditableField } from "..";

describe(`filterEditableField`, () => {
  function accepts(description: string, editableField: EditableField): void {
    describe(`accepts ${description}`, () => {
      let result: null | EditableField;

      beforeAll(() => {
        result = filterEditableField(editableField);
      });

      it(`returns the editable field`, () => {
        expect(result).toEqual(editableField);
      });
    });
  }

  function rejects(description: string, field: Field): void {
    describe(`rejects ${description}`, () => {
      let result: null | EditableField;

      beforeAll(() => {
        result = filterEditableField(field);
      });

      it(`returns null`, () => {
        expect(result).toBeNull();
      });
    });
  }

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
    name: `Test Name`,
  });

  rejects(`subtitle`, {
    type: `subtitle`,
    content: `Test Content`,
    name: `Test Name`,
  });

  rejects(`title`, {
    type: `title`,
    content: `Test Content`,
    name: `Test Name`,
  });

  rejects(`video`, {
    type: `video`,
    sources: [
      {
        mimeType: `Test Source A Mime Type`,
        url: `Test Source A Url`,
      },
      {
        mimeType: `Test Source B Mime Type`,
        url: `Test Source B Url`,
      },
      {
        mimeType: `Test Source C Mime Type`,
        url: `Test Source C Url`,
      },
    ],
    name: `Test Name`,
    autoplay: true,
    loop: false,
  });

  rejects(`image`, {
    type: `image`,
    url: `Test Url`,
    name: `Test Name`,
    description: `Test Description`,
  });

  rejects(`audio`, {
    type: `audio`,
    sources: [
      {
        mimeType: `Test Source A Mime Type`,
        url: `Test Source A Url`,
      },
      {
        mimeType: `Test Source B Mime Type`,
        url: `Test Source B Url`,
      },
      {
        mimeType: `Test Source C Mime Type`,
        url: `Test Source C Url`,
      },
    ],
    name: `Test Name`,
    autoplay: true,
    loop: false,
  });
});
