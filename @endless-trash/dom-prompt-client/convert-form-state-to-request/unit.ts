import { JsonObject } from "@endless-trash/immutable-json-type";
import { Request } from "@endless-trash/prompt";
import { convertFormStateToRequest } from ".";

describe(`convertFormStateToRequest`, () => {
  let channelSend: jasmine.Spy;
  let output: Request;

  beforeAll(() => {
    channelSend = jasmine.createSpy(`channelSend`);

    output = convertFormStateToRequest(
      {
        type: `prompt`,
        prompt: { formGroups: [] },
        formGroups: {},
        mode: `interactive`,
        channelSend,
        metadata: { testMetadataKey: `Test Metadata Value` },
      },
      {
        form: {
          name: `Test Form Name`,
          fields: [
            {
              name: `Test Field A Name`,
              type: `float`,
              label: `Test Label`,
              value: null,
              minimum: null,
              maximum: null,
              required: false,
            },
            {
              type: `subtitle`,
              content: `Test Content`,
              name: `Test Name`,
            },
            {
              name: `Test Field C Name`,
              type: `integer`,
              label: `Test Label`,
              value: null,
              minimum: null,
              maximum: null,
              required: false,
            },
          ],
          submitButtonLabel: `Test Submit Button Label`,
        },
        id: `Test Id`,
        fields: {
          "Test Field A Name": {
            type: `text`,
            id: `Test Id`,
            field: {
              name: `Test Field A Name`,
              type: `float`,
              label: `Test Label`,
              value: null,
              minimum: null,
              maximum: null,
              required: false,
            },
            raw: `   -   12.  5 `,
          },
          "Test Field B Name": {
            type: `static`,
            id: `Test Id`,
            field: {
              type: `subtitle`,
              content: `Test Content`,
              name: `Test Name`,
            },
          },
          "Test Field C Name": {
            type: `text`,
            id: `Test Id`,
            field: {
              name: `Test Field C Name`,
              type: `integer`,
              label: `Test Label`,
              value: null,
              minimum: null,
              maximum: null,
              required: false,
            },
            raw: `    `,
          },
        },
      }
    );
  });

  it(`includes the metadata`, () => {
    expect(output.metadata).toEqual({
      testMetadataKey: `Test Metadata Value`,
    } as JsonObject);
  });

  it(`includes a form submission command`, () => {
    expect(output.command).toEqual({
      type: `formSubmission`,
      formName: `Test Form Name`,
      fields: {
        "Test Field A Name": -12.5,
        "Test Field C Name": null,
      },
    });
  });

  it(`does not send a message through the channel`, () => {
    expect(channelSend).not.toHaveBeenCalled();
  });
});
