import { Json } from "@endless-trash/immutable-json-type";
import { requestFormIsValid } from ".";
import { Form } from "../..";

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

    function rejects(description: string, value: Json): void {
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

    rejects(`formName missing`, {
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: ``,
        testFieldDName: `Test Field D Value`,
      },
    });

    rejects(`formName invalid`, {
      formName: `Test Invalid Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: ``,
        testFieldDName: `Test Field D Value`,
      },
    });

    rejects(`fields missing`, {
      formName: `Test Form Name`,
    });

    rejects(`fields missing properties`, {
      formName: `Test Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldDName: `Test Field D Value`,
      },
    });

    rejects(`fields unexpected properties`, {
      formName: `Test Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: ``,
        testFieldDName: `Test Field D Value`,
        testUnexpectedKey: `Test Unexpected Value`,
      },
    });

    rejects(`fields null`, {
      formName: `Test Form Name`,
      fields: null,
    });

    rejects(`fields false`, {
      formName: `Test Form Name`,
      fields: false,
    });

    rejects(`fields true`, {
      formName: `Test Form Name`,
      fields: true,
    });

    rejects(`fields number`, {
      formName: `Test Form Name`,
      fields: 56.2342,
    });

    rejects(`fields string`, {
      formName: `Test Form Name`,
      fields: `Test String`,
    });

    rejects(`fields array`, {
      formName: `Test Form Name`,
      fields: [],
    });

    rejects(`unexpected properties`, {
      formName: `Test Form Name`,
      fields: {
        testFieldAName: `Test Field A Value`,
        testFieldBName: ``,
        testFieldDName: `Test Field D Value`,
      },
      testUnexpectedKey: `Test Unexpected Value`,
    });

    rejects(`null`, null);

    rejects(`arrays`, []);

    rejects(`false`, false);

    rejects(`true`, true);

    rejects(`numbers`, 5.21);

    rejects(`strings`, `Test String`);
  });
});
