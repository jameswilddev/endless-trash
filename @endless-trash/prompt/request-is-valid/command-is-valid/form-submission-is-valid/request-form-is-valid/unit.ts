import { requestFormIsValid } from ".";
import { Form } from "../../../..";
import { FormSubmissionCommand } from "../../../../request/command";

describe(`requestFormIsValid`, () => {
  describe(`when the form does not have a submit button`, () => {
    let output: boolean;

    beforeAll(() => {
      output = requestFormIsValid(
        {
          name: `Test Form Name`,
          fields: [
            {
              name: `testFieldAName`,
              type: `string`,
              value: `Test Field A Existing Value`,
              label: `Test Field A Label`,
              minimumLength: 4,
              maximumLength: null,
            },
            {
              name: `testFieldBName`,
              type: `string`,
              value: `Test Field B Existing Value`,
              label: `Test Field B Label`,
              minimumLength: null,
              maximumLength: 20,
            },
            {
              name: `testFieldCName`,
              type: `subtitle`,
              content: `Test Field C Content`,
            },
            {
              name: `testFieldDName`,
              type: `string`,
              value: `Test Field D Existing Value`,
              label: `Test Field D Label`,
              minimumLength: null,
              maximumLength: 25,
            },
          ],
          submitButtonLabel: null,
        },
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {
            testFieldAName: `Test Field A Value`,
            testFieldBName: ``,
            testFieldDName: `Test Field D Value`,
          },
        }
      );
    });

    it(`returns false`, () => {
      expect(output).toBeFalse();
    });
  });

  describe(`when the form has a submit button`, () => {
    let form: Form;

    beforeAll(() => {
      form = {
        name: `Test Form Name`,
        fields: [
          {
            name: `testFieldAName`,
            type: `string`,
            value: `Test Field A Existing Value`,
            label: `Test Field A Label`,
            minimumLength: 4,
            maximumLength: null,
          },
          {
            name: `testFieldBName`,
            type: `string`,
            value: `Test Field B Existing Value`,
            label: `Test Field B Label`,
            minimumLength: null,
            maximumLength: 20,
          },
          {
            name: `testFieldCName`,
            type: `subtitle`,
            content: `Test Field C Content`,
          },
          {
            name: `testFieldDName`,
            type: `string`,
            value: `Test Field D Existing Value`,
            label: `Test Field D Label`,
            minimumLength: null,
            maximumLength: 25,
          },
        ],
        submitButtonLabel: `Test Submit Button Label`,
      };
    });

    describe(`when the request is valid`, () => {
      let output: boolean;

      beforeAll(() => {
        output = requestFormIsValid(form, {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {
            testFieldAName: `Test Field A Value`,
            testFieldBName: ``,
            testFieldDName: `Test Field D Value`,
          },
        });
      });

      it(`returns true`, () => {
        expect(output).toBeTrue();
      });
    });

    function rejects(description: string, value: FormSubmissionCommand): void {
      describe(description, () => {
        let output: boolean;

        beforeAll(() => {
          output = requestFormIsValid(form, value);
        });

        it(`returns false`, () => {
          expect(output).toBeFalse();
        });
      });
    }

    rejects(`formName invalid`, {
      type: `formSubmission`,
      formName: `Test Invalid Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: ``,
        testFieldDName: `Test Field D Value`,
      },
    });

    rejects(`fields missing properties`, {
      type: `formSubmission`,
      formName: `Test Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldDName: `Test Field D Value`,
      },
    });

    rejects(`fields unexpected properties`, {
      type: `formSubmission`,
      formName: `Test Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: ``,
        testFieldDName: `Test Field D Value`,
        testUnexpectedKey: `Test Unexpected Value`,
      },
    });

    rejects(`field invalid`, {
      type: `formSubmission`,
      formName: `Test Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: null,
        testFieldDName: `Test Field D Value`,
      },
    });
  });
});
