import { FloatField } from "@endless-trash/prompt";
import { validateFloatValue } from ".";

describe(`validateFloatValue`, () => {
  function scenario(
    description: string,
    field: FloatField,
    valid: ReadonlyArray<readonly [string, null | number]>,
    invalid: ReadonlyArray<readonly [string, null | number]>
  ): void {
    describe(description, () => {
      for (const subScenario of valid) {
        describe(subScenario[0], () => {
          let result: boolean;

          beforeAll(() => {
            result = validateFloatValue(field, subScenario[1]);
          });

          it(`returns true`, () => {
            expect(result).toBeTrue();
          });
        });
      }

      for (const subScenario of invalid) {
        describe(subScenario[0], () => {
          let result: boolean;

          beforeAll(() => {
            result = validateFloatValue(field, subScenario[1]);
          });

          it(`returns false`, () => {
            expect(result).toBeFalse();
          });
        });
      }
    });
  }

  scenario(
    `nullable`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: false,
    },
    [
      [`null`, null],
      [`value`, 36],
    ],
    []
  );

  scenario(
    `nullable with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: null,
      maximum: null,
      required: false,
    },
    [
      [`null`, null],
      [`value`, 36],
    ],
    []
  );

  scenario(
    `nullable with inclusive minimum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `inclusive`],
      maximum: null,
      required: false,
    },
    [
      [`null`, null],
      [`minimum`, 26],
      [`above minimum`, 27],
    ],
    [[`below minimum`, 25]]
  );

  scenario(
    `nullable with inclusive minimum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `inclusive`],
      maximum: null,
      required: false,
    },
    [
      [`null`, null],
      [`minimum`, 26],
      [`above minimum`, 27],
    ],
    [[`below minimum`, 25]]
  );

  scenario(
    `nullable with exclusive minimum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `exclusive`],
      maximum: null,
      required: false,
    },
    [
      [`null`, null],
      [`above minimum`, 27],
    ],
    [
      [`below minimum`, 25],
      [`minimum`, 26],
    ]
  );

  scenario(
    `nullable with exclusive minimum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `exclusive`],
      maximum: null,
      required: false,
    },
    [
      [`null`, null],
      [`above minimum`, 27],
    ],
    [
      [`below minimum`, 25],
      [`minimum`, 26],
    ]
  );

  scenario(
    `nullable with inclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [44, `inclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`value`, 36],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [[`above maximum`, 45]]
  );

  scenario(
    `nullable with inclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: null,
      maximum: [44, `inclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`value`, 36],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [[`above maximum`, 45]]
  );

  scenario(
    `nullable with inclusive minimum with inclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `inclusive`],
      maximum: [44, `inclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`below minimum`, 25],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with inclusive minimum with inclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `inclusive`],
      maximum: [44, `inclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`below minimum`, 25],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with exclusive minimum with inclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `exclusive`],
      maximum: [44, `inclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`below minimum`, 25],
      [`minimum`, 26],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with exclusive minimum with inclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `exclusive`],
      maximum: [44, `inclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`below minimum`, 25],
      [`minimum`, 26],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with exclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [44, `exclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`value`, 36],
      [`below maximum`, 43],
    ],
    [
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with exclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: null,
      maximum: [44, `exclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`value`, 36],
      [`below maximum`, 43],
    ],
    [
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with inclusive minimum with exclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `inclusive`],
      maximum: [44, `exclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`below minimum`, 25],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with inclusive minimum with exclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `inclusive`],
      maximum: [44, `exclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`below minimum`, 25],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with exclusive minimum with exclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `exclusive`],
      maximum: [44, `exclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`below minimum`, 25],
      [`minimum`, 26],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `nullable with exclusive minimum with exclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `exclusive`],
      maximum: [44, `exclusive`],
      required: false,
    },
    [
      [`null`, null],
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`below minimum`, 25],
      [`minimum`, 26],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: true,
    },
    [[`value`, 36]],
    [[`null`, null]]
  );

  scenario(
    `required with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: null,
      maximum: null,
      required: true,
    },
    [[`value`, 36]],
    [[`null`, null]]
  );

  scenario(
    `required with inclusive minimum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `inclusive`],
      maximum: null,
      required: true,
    },
    [
      [`minimum`, 26],
      [`above minimum`, 27],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
    ]
  );

  scenario(
    `required with inclusive minimum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `inclusive`],
      maximum: null,
      required: true,
    },
    [
      [`minimum`, 26],
      [`above minimum`, 27],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
    ]
  );

  scenario(
    `required with exclusive minimum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `exclusive`],
      maximum: null,
      required: true,
    },
    [[`above minimum`, 27]],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`minimum`, 26],
    ]
  );

  scenario(
    `required with exclusive minimum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `exclusive`],
      maximum: null,
      required: true,
    },
    [[`above minimum`, 27]],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`minimum`, 26],
    ]
  );

  scenario(
    `required with inclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [44, `inclusive`],
      required: true,
    },
    [
      [`value`, 36],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`null`, null],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with inclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: null,
      maximum: [44, `inclusive`],
      required: true,
    },
    [
      [`value`, 36],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`null`, null],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with inclusive minimum with inclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `inclusive`],
      maximum: [44, `inclusive`],
      required: true,
    },
    [
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with inclusive minimum with inclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `inclusive`],
      maximum: [44, `inclusive`],
      required: true,
    },
    [
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with exclusive minimum with inclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `exclusive`],
      maximum: [44, `inclusive`],
      required: true,
    },
    [
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`minimum`, 26],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with exclusive minimum with inclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `exclusive`],
      maximum: [44, `inclusive`],
      required: true,
    },
    [
      [`above minimum`, 27],
      [`below maximum`, 43],
      [`maximum`, 44],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`minimum`, 26],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with exclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [44, `exclusive`],
      required: true,
    },
    [
      [`value`, 36],
      [`below maximum`, 43],
    ],
    [
      [`null`, null],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with exclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: null,
      maximum: [44, `exclusive`],
      required: true,
    },
    [
      [`value`, 36],
      [`below maximum`, 43],
    ],
    [
      [`null`, null],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with inclusive minimum with exclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `inclusive`],
      maximum: [44, `exclusive`],
      required: true,
    },
    [
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with inclusive minimum with exclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `inclusive`],
      maximum: [44, `exclusive`],
      required: true,
    },
    [
      [`minimum`, 26],
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with exclusive minimum with exclusive maximum`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: null,
      minimum: [26, `exclusive`],
      maximum: [44, `exclusive`],
      required: true,
    },
    [
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`minimum`, 26],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );

  scenario(
    `required with exclusive minimum with exclusive maximum with value`,
    {
      name: `Test Name`,
      type: `float`,
      label: `Test Label`,
      value: 29,
      minimum: [26, `exclusive`],
      maximum: [44, `exclusive`],
      required: true,
    },
    [
      [`above minimum`, 27],
      [`below maximum`, 43],
    ],
    [
      [`null`, null],
      [`below minimum`, 25],
      [`minimum`, 26],
      [`maximum`, 44],
      [`above maximum`, 45],
    ]
  );
});
