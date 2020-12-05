import { Json } from "@endless-trash/immutable-json-type";
import { EditableField, requestFieldIsValid } from "..";

describe(`requestFieldIsValid`, () => {
  function scenario(
    description: string,
    editableField: EditableField,
    accepts: ReadonlyArray<readonly [string, Json]>,
    rejects: ReadonlyArray<readonly [string, Json]>
  ): void {
    describe(description, () => {
      for (const subScenario of accepts) {
        describe(subScenario[0], () => {
          let output: boolean;

          beforeAll(() => {
            output = requestFieldIsValid(editableField, subScenario[1]);
          });

          it(`is accepted`, () => {
            expect(output).toBeTrue();
          });
        });
      }

      for (const subScenario of rejects) {
        describe(subScenario[0], () => {
          let output: boolean;

          beforeAll(() => {
            output = requestFieldIsValid(editableField, subScenario[1]);
          });

          it(`is rejected`, () => {
            expect(output).toBeFalse();
          });
        });
      }
    });
  }

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
    [[`number between minimum and maximum`, 3.01]],
    [
      [`null`, null],

      [`number below minimum`, 2.03],

      [`number at minimum`, 2.14],

      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
    ],
    [
      [`null`, null],
      [`number below minimum`, 2.03],

      [`number at minimum`, 2.14],

      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`number above minimum`, 3.01]],
    [
      [`null`, null],

      [`number below minimum`, 2.03],

      [`number at minimum`, 2.14],

      [`string`, `Test String`],

      [`array`, []],
      [`object`, {}],

      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],

      [`number between minimum and maximum`, 3.01],
    ],
    [
      [`null`, null],

      [`number below minimum`, 2.03],

      [`number at maximum`, 7.21],

      [`number above maximum`, 7.24],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],

      [`number between minimum and maximum`, 3.01],

      [`number at maximum`, 7.21],
    ],
    [
      [`null`, null],

      [`number below minimum`, 2.03],

      [`number above maximum`, 7.24],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],

      [`number above minimum`, 3.01],
    ],
    [
      [`null`, null],

      [`number below minimum`, 2.03],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [[`number below maximum`, 3.01]],
    [
      [`null`, null],

      [`number at maximum`, 7.21],

      [`number above maximum`, 7.24],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`number below maximum`, 3.01],
      [`number at maximum`, 7.21],
    ],
    [
      [`null`, null],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`number`, 3.01]],
    [
      [`null`, null],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`number between minimum and maximum`, 3.01]],
    [
      [`null`, null],
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
    ],
    [
      [`null`, null],
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`number above minimum`, 3.01]],
    [
      [`null`, null],
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number between minimum and maximum`, 3.01],
    ],
    [
      [`null`, null],
      [`number below minimum`, 2.03],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
    ],
    [
      [`null`, null],
      [`number below minimum`, 2.03],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number above minimum`, 3.01],
    ],
    [
      [`null`, null],
      [`number below minimum`, 2.03],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`number below maximum`, 3.01]],
    [
      [`null`, null],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number below maximum`, 3.01],
      [`number at maximum`, 7.21],
    ],
    [
      [`null`, null],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`number`, 3.01]],
    [
      [`null`, null],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number between minimum and maximum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number above minimum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number between minimum and maximum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number above minimum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number below maximum`, 3.01],
      [`null`, null],
    ],
    [
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number below maximum`, 3.01],
      [`number at maximum`, 7.21],
      [`null`, null],
    ],
    [
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number`, 3.01],
      [`null`, null],
    ],
    [
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number between minimum and maximum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number above minimum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at minimum`, 2.14],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number between minimum and maximum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number between minimum and maximum`, 3.01],
      [`number at maximum`, 7.21],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number at minimum`, 2.14],
      [`number above minimum`, 3.01],
      [`null`, null],
    ],
    [
      [`number below minimum`, 2.03],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number below maximum`, 3.01],
      [`null`, null],
    ],
    [
      [`number at maximum`, 7.21],
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number below maximum`, 3.01],
      [`number at maximum`, 7.21],
      [`null`, null],
    ],
    [
      [`number above maximum`, 7.24],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`number`, 3.01],
      [`null`, null],
    ],
    [
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer between minimum and maximum`, 6]],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer above minimum`, 4]],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer between minimum and maximum`, 6],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer above minimum`, 4],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer below maximum`, 7]],
    [
      [`null`, null],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer below maximum`, 7],
      [`integer at maximum`, 8],
    ],
    [
      [`null`, null],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer`, 6]],
    [
      [`null`, null],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer between minimum and maximum`, 6]],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer above minimum`, 4]],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer between minimum and maximum`, 6],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer above minimum`, 4],
    ],
    [
      [`null`, null],
      [`integer below minimum`, 2],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer below maximum`, 7]],
    [
      [`null`, null],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer below maximum`, 7],
      [`integer at maximum`, 8],
    ],
    [
      [`null`, null],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`integer`, 6]],
    [
      [`null`, null],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer between minimum and maximum`, 6],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer above minimum`, 4],

      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],

      [`integer at minimum`, 3],

      [`float`, 5.321],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],

      [`integer between minimum and maximum`, 6],

      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],

      [`integer at maximum`, 8],

      [`integer above maximum`, 9],

      [`float`, 5.321],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],

      [`integer between minimum and maximum`, 6],

      [`integer at maximum`, 8],

      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],

      [`integer above maximum`, 9],

      [`float`, 5.321],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],

      [`integer above minimum`, 4],

      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],

      [`float`, 5.321],

      [`string`, `Test String`],

      [`array`, []],

      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`integer below maximum`, 7],
      [`null`, null],
    ],
    [
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer below maximum`, 7],
      [`integer at maximum`, 8],
      [`null`, null],
    ],
    [
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],

      [`false`, false],

      [`true`, true],
    ]
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
    [
      [`integer`, 6],
      [`null`, null],
    ],
    [
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer between minimum and maximum`, 6],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`integer above maximum`, 9],

      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer above minimum`, 4],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer at minimum`, 3],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer between minimum and maximum`, 6],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer between minimum and maximum`, 6],
      [`integer at maximum`, 8],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer at minimum`, 3],
      [`integer above minimum`, 4],
      [`null`, null],
    ],
    [
      [`integer below minimum`, 2],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer below maximum`, 7],
      [`null`, null],
    ],
    [
      [`integer at maximum`, 8],
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer below maximum`, 7],
      [`integer at maximum`, 8],
      [`null`, null],
    ],
    [
      [`integer above maximum`, 9],
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`integer`, 6],
      [`null`, null],
    ],
    [
      [`float`, 5.321],
      [`string`, `Test String`],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`string at minimum length`, `Tes`],
      [`string at maximum length`, `Test S`],
      [`string between minimum and maximum lengths`, `Tests`],
    ],
    [
      [`string below minimum length`, `Te`],
      [`string above maximum length`, `Test Str`],
      [`null`, null],
      [`number`, 5.321],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`string at minimum length`, `Tes`],
      [`string above minimum length`, `Test`],
    ],
    [
      [`string below minimum length`, `Te`],
      [`null`, null],
      [`number`, 5.321],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [
      [`string below maximum length`, `Tes`],
      [`string at maximum length`, `Test S`],
    ],
    [
      [`string above maximum length`, `Test Str`],
      [`null`, null],
      [`number`, 5.321],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
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
    [[`string`, `Test String`]],
    [
      [`null`, null],
      [`number`, 5.321],
      [`array`, []],
      [`object`, {}],
      [`false`, false],
      [`true`, true],
    ]
  );
});
