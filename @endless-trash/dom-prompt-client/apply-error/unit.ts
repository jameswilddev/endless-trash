import { Action, EffectfulState, State } from "hyperapp-cjs";
import { applyError } from ".";
import { State as DomPromptClientState } from "../state";

describe(`applyError`, () => {
  function scenario(
    description: string,
    input: unknown,
    asString: string
  ): void {
    describe(description, () => {
      describe(`error`, () => {
        let output:
          | State<DomPromptClientState>
          | EffectfulState<DomPromptClientState>
          | Action<DomPromptClientState>;

        beforeAll(() => {
          output = applyError(
            {
              type: `error`,
              error: `Test Previous Error`,
            },
            input
          );
        });

        it(`returns the new message state`, () => {
          expect(output as State<DomPromptClientState>).toEqual({
            type: `error`,
            error: asString,
          });
        });
      });

      describe(`message`, () => {
        let output:
          | State<DomPromptClientState>
          | EffectfulState<DomPromptClientState>
          | Action<DomPromptClientState>;

        beforeAll(() => {
          output = applyError(
            {
              type: `message`,
              content: `Test Previous Content`,
            },
            input
          );
        });

        it(`returns the new message state`, () => {
          expect(output as State<DomPromptClientState>).toEqual({
            type: `error`,
            error: asString,
          });
        });
      });

      describe(`prompt`, () => {
        let channelSend: jasmine.Spy;
        let output:
          | State<DomPromptClientState>
          | EffectfulState<DomPromptClientState>
          | Action<DomPromptClientState>;

        beforeAll(() => {
          channelSend = jasmine.createSpy(`channelSend`);

          output = applyError(
            {
              type: `prompt`,
              prompt: {
                formGroups: [],
              },
              formGroups: {},
              mode: `interactive`,
              channelSend,
            },
            input
          );
        });

        it(`returns the new message state`, () => {
          expect(output as State<DomPromptClientState>).toEqual({
            type: `error`,
            error: asString,
          });
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });
  }

  scenario(`undefined`, undefined, `(no further details are available)`);
  scenario(`null`, null, `(no further details are available)`);
  scenario(`error`, new Error(`Test Error`), `Error: Test Error`);
  scenario(`string`, `Test String`, `Test String`);
});
