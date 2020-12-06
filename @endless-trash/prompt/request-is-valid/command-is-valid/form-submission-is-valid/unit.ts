import { JsonObject } from "@endless-trash/immutable-json-type";
import { Prompt } from "../../../prompt";
import { formSubmissionIsValid } from ".";

describe(`formSubmissionIsValid`, () => {
  let prompt: Prompt;

  beforeAll(() => {
    prompt = {
      formGroups: [
        {
          name: `Test Form Group A Name`,
          forms: [
            {
              name: `Test Form F Name`,
              fields: [
                {
                  name: `testFieldFAName`,
                  type: `string`,
                  value: `Test Field F A Existing Value`,
                  label: `Test Field F A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label F`,
            },
          ],
        },
        {
          name: `Test Form Group B Name`,
          forms: [
            {
              name: `Test Form A Name`,
              fields: [
                {
                  name: `testFieldAAName`,
                  type: `string`,
                  value: `Test Field A A Existing Value`,
                  label: `Test Field A A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label A`,
            },
            {
              name: `Test Form B Name`,
              fields: [
                {
                  name: `testFieldBAName`,
                  type: `string`,
                  value: `Test Field B A Existing Value`,
                  label: `Test Field B A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: null,
            },
            {
              name: `Test Form C Name`,
              fields: [
                {
                  name: `testFieldCAName`,
                  type: `string`,
                  value: `Test Field C A Existing Value`,
                  label: `Test Field C A Label`,
                  minimumLength: 4,
                  maximumLength: null,
                },
                {
                  name: `testFieldCBName`,
                  type: `string`,
                  value: `Test Field C B Existing Value`,
                  label: `Test Field C B Label`,
                  minimumLength: null,
                  maximumLength: 20,
                },
                {
                  name: `testFieldCCName`,
                  type: `string`,
                  value: `Test Field C C Existing Value`,
                  label: `Test Field C C Label`,
                  minimumLength: null,
                  maximumLength: 25,
                },
              ],
              submitButtonLabel: `Test Submit Button Label C`,
            },
            {
              name: `Test Form D Name`,
              fields: [
                {
                  name: `testFieldDAName`,
                  type: `string`,
                  value: `Test Field D A Existing Value`,
                  label: `Test Field D A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label D`,
            },
          ],
        },
        {
          name: `Test Form Group C Name`,
          forms: [
            {
              name: `Test Form G Name`,
              fields: [
                {
                  name: `testFieldGAName`,
                  type: `string`,
                  value: `Test Field G A Existing Value`,
                  label: `Test Field G A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label G`,
            },
          ],
        },
      ],
    };
  });

  function rejects(description: string, command: JsonObject): void {
    describe(description, () => {
      let output: boolean;

      beforeAll(() => {
        output = formSubmissionIsValid(prompt, command);
      });

      it(`returns false`, () => {
        expect(output).toBeFalse();
      });
    });
  }

  rejects(`formName missing`, {
    type: `formSubmission`,
    fields: {
      testFieldCAName: `Test Field C A Value`,
      testFieldCBName: `Test Field C B Value`,
      testFieldCCName: `Test Field C C Value`,
    },
  });

  rejects(`fields missing`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
  });

  rejects(`fields null`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: null,
  });

  rejects(`fields array`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: [],
  });

  rejects(`fields false`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: false,
  });

  rejects(`fields true`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: true,
  });

  rejects(`fields number`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: 5.21,
  });

  rejects(`fields string`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: `Test String`,
  });

  rejects(`unexpected properties`, {
    type: `formSubmission`,
    formName: `Test Form C Name`,
    fields: {
      testFieldCAName: `Test Field C A Value`,
      testFieldCBName: `Test Field C B Value`,
      testFieldCCName: `Test Field C C Value`,
    },
    testUnexpectedKey: `Test Unexpected Value`,
  });

  rejects(`no form matches`, {
    type: `formSubmission`,
    formName: `Test Form H Name`,
    fields: {},
  });

  describe(`when valid`, () => {
    let output: boolean;

    beforeAll(() => {
      output = formSubmissionIsValid(prompt, {
        type: `formSubmission`,
        formName: `Test Form C Name`,
        fields: {
          testFieldCAName: `Test Field C A Value`,
          testFieldCBName: `Test Field C B Value`,
          testFieldCCName: `Test Field C C Value`,
        },
      });
    });

    it(`returns true`, () => {
      expect(output).toBeTrue();
    });
  });
});
