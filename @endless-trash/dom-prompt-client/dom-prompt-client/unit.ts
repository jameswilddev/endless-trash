import jsdom = require("jsdom");
import { domPromptClient } from "..";

describe(`domPromptClient`, () => {
  let dom: jsdom.JSDOM;
  let channel: jasmine.Spy;

  beforeAll(async () => {
    dom = new jsdom.JSDOM(
      `<html><head></head><body><div id="root">existing content</div><div id="other"></div></body></html>`
    );

    global.document = dom.window.document;

    channel = jasmine.createSpy(`channel`).and.returnValue(
      new Promise(() => {
        // Never resolved.
      })
    );

    domPromptClient(
      channel,
      { formName: `Test Form Name`, fields: {} },
      dom.window.document.getElementById(`root`) as HTMLElement
    );

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
  });

  it(`mounts to the node`, () => {
    expect(dom.serialize()).toEqual(
      `<html><head></head><body><p class="message">Connecting...</p><div id="other"></div></body></html>`
    );
  });

  it(`bootstraps once`, () => {
    expect(channel).toHaveBeenCalledTimes(1);
  });
});
