import { ActionTransform, h, text, VDOM } from "hyperapp-cjs";
import { errorView } from ".";
import { State } from "../state";

describe(`errorView`, () => {
  describe(`before interaction`, () => {
    let output: VDOM<State>;
    let locationReload: jasmine.Spy;

    beforeAll(() => {
      locationReload = jasmine.createSpy(`locationReload`);

      global.location = ({
        reload: locationReload,
      } as unknown) as Location;

      output = errorView({
        type: `error`,
        error: `Test Error`,
      });
    });

    it(`renders as expected`, () => {
      expect(output).toEqual(
        h(`div`, { class: `error` }, [
          h(`p`, text(`A communication error has occurred:\n\nTest Error`)),
          h(
            `button`,
            {
              type: `button`,
              onclick: (jasmine.any(Function) as unknown) as ActionTransform<
                State,
                Event
              >,
            },
            text(`Reload`)
          ),
        ]) as VDOM<State>
      );
    });

    it(`does not reload`, () => {
      expect(locationReload).not.toHaveBeenCalled();
    });
  });

  describe(`on clicking "Reload"`, () => {
    let output: State;
    let locationReload: jasmine.Spy;

    beforeAll(() => {
      locationReload = jasmine.createSpy(`locationReload`);

      global.location = ({
        reload: locationReload,
      } as unknown) as Location;

      const dom = errorView({
        type: `error`,
        error: `Test Error`,
      }).children[1] as VDOM<State>;

      const onclick = dom.props.onclick as ActionTransform<State>;

      output = onclick({
        type: `error`,
        error: `Test Error`,
      }) as State;
    });

    it(`reloads once`, () => {
      expect(locationReload).toHaveBeenCalledTimes(1);
    });

    it(`returns the state`, () => {
      expect(output).toEqual({
        type: `error`,
        error: `Test Error`,
      });
    });
  });
});
