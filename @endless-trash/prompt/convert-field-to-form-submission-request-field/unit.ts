import {
  convertFieldToFormSubmissionRequestField,
  Field,
  FormSubmissionRequestField,
} from "..";

describe(`convertFieldToFormSubmissionRequestField`, () => {
  function scenario(
    description: string,
    field: Field,
    expected: undefined | FormSubmissionRequestField
  ): void {
    it(description, () => {
      const actual = convertFieldToFormSubmissionRequestField(field);

      expect(actual).toEqual(expected);
    });
  }

  scenario(
    `checkbox false`,
    {
      type: `checkbox`,
      name: `testName`,
      label: `Test Label`,
      value: false,
    },
    false
  );

  scenario(
    `checkbox true`,
    {
      type: `checkbox`,
      name: `testName`,
      label: `Test Label`,
      value: true,
    },
    true
  );

  scenario(
    `required file with value with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: true,
      maximumBytes: 12,
    },
    `$keep`
  );

  scenario(
    `required file with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: true,
      maximumBytes: 12,
    },
    null
  );

  scenario(
    `nullable file with value with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: false,
      maximumBytes: 12,
    },
    `$keep`
  );

  scenario(
    `nullable file with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: false,
      maximumBytes: 12,
    },
    null
  );

  scenario(
    `required file with value`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: true,
      maximumBytes: null,
    },
    `$keep`
  );

  scenario(
    `required file`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: true,
      maximumBytes: null,
    },
    null
  );

  scenario(
    `nullable file with value`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: false,
      maximumBytes: null,
    },
    `$keep`
  );

  scenario(
    `nullable file`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: false,
      maximumBytes: null,
    },
    null
  );

  scenario(
    `required float with value with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: true,
    },
    5.642
  );

  scenario(
    `required float with value`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: null,
      required: true,
    },
    5.642
  );

  scenario(
    `required float with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required float with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required float with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: true,
    },
    null
  );

  scenario(
    `required float with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required float with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required float with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: true,
    },
    null
  );

  scenario(
    `required float with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required float with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required float`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: true,
    },
    null
  );

  scenario(
    `nullable float with value with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with value`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: null,
      required: false,
    },
    5.642
  );

  scenario(
    `nullable float with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable float with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable float with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: false,
    },
    null
  );

  scenario(
    `nullable float with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable float with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable float with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: false,
    },
    null
  );

  scenario(
    `nullable float with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable float with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable float`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: false,
    },
    null
  );

  scenario(
    `required integer with value with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: null,
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: null,
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `exclusive`],
      required: true,
    },
    6
  );

  scenario(
    `required integer with value with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `inclusive`],
      required: true,
    },
    6
  );

  scenario(
    `required integer with value`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: null,
      required: true,
    },
    6
  );

  scenario(
    `required integer with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required integer with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required integer with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: null,
      required: true,
    },
    null
  );

  scenario(
    `required integer with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required integer with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required integer with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: null,
      required: true,
    },
    null
  );

  scenario(
    `required integer with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `exclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required integer with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `inclusive`],
      required: true,
    },
    null
  );

  scenario(
    `required integer`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: true,
    },

    null
  );

  scenario(
    `nullable integer with value with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: null,
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: null,
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `exclusive`],
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `inclusive`],
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with value`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: null,
      required: false,
    },
    6
  );

  scenario(
    `nullable integer with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: null,
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: null,
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `exclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable integer with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `inclusive`],
      required: false,
    },
    null
  );

  scenario(
    `nullable integer`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: false,
    },
    null
  );

  scenario(
    `paragraph`,
    { type: `paragraph`, content: `Test Content` },
    undefined
  );

  scenario(
    `string with minimum length with maximum length`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: 3,
      maximumLength: 6,
    },
    `Test Value`
  );

  scenario(
    `string with minimum length`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: 3,
      maximumLength: null,
    },
    `Test Value`
  );

  scenario(
    `string with maximum length`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: null,
      maximumLength: 6,
    },
    `Test Value`
  );

  scenario(
    `string`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: null,
      maximumLength: null,
    },
    `Test Value`
  );

  scenario(
    `subtitle`,
    { type: `subtitle`, content: `Test Content` },
    undefined
  );
  scenario(`title`, { type: `title`, content: `Test Content` }, undefined);
});
