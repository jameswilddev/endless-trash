import { h, text, VDOM } from "hyperapp-cjs";
import { staticFieldView } from ".";
import { State } from "../state";

describe(`staticFieldView`, () => {
  describe(`title`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = staticFieldView({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `title`,
          content: `Test Content`,
          name: `Test Name`,
        },
      });
    });

    it(`generates the expected HTML`, () => {
      expect(output).toEqual(
        h(
          `h1`,
          {
            class: [`title`, `field`],
            id: `Test Id`,
          },
          text(`Test Content`)
        ) as VDOM<State>
      );
    });
  });

  describe(`subtitle`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = staticFieldView({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `subtitle`,
          content: `Test Content`,
          name: `Test Name`,
        },
      });
    });

    it(`generates the expected HTML`, () => {
      expect(output).toEqual(
        h(
          `h2`,
          {
            class: [`subtitle`, `field`],
            id: `Test Id`,
          },
          text(`Test Content`)
        ) as VDOM<State>
      );
    });
  });

  describe(`paragraph`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = staticFieldView({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `paragraph`,
          content: `Test Content`,
          name: `Test Name`,
        },
      });
    });

    it(`generates the expected HTML`, () => {
      expect(output).toEqual(
        h(
          `p`,
          {
            class: [`paragraph`, `field`],
            id: `Test Id`,
          },
          text(`Test Content`)
        ) as VDOM<State>
      );
    });
  });

  describe(`video`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = staticFieldView({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `video`,
          sources: [
            {
              mimeType: `Test Source A Mime Type`,
              url: `Test Source A Url`,
            },
            {
              mimeType: `Test Source B Mime Type`,
              url: `Test Source B Url`,
            },
            {
              mimeType: `Test Source C Mime Type`,
              url: `Test Source C Url`,
            },
          ],
          name: `Test Name`,
          autoplay: true,
          loop: false,
        },
      });
    });

    it(`generates the expected HTML`, () => {
      expect(output).toEqual(
        h(
          `div`,
          {
            class: [`video`, `field`],
            id: `Test Id`,
          },
          h(`video`, { controls: true, autoplay: true, loop: false }, [
            h(`source`, {
              key: `Test Source A Mime Type`,
              type: `Test Source A Mime Type`,
              src: `Test Source A Url`,
            }),
            h(`source`, {
              key: `Test Source B Mime Type`,
              type: `Test Source B Mime Type`,
              src: `Test Source B Url`,
            }),
            h(`source`, {
              key: `Test Source C Mime Type`,
              type: `Test Source C Mime Type`,
              src: `Test Source C Url`,
            }),
          ])
        ) as VDOM<State>
      );
    });
  });

  describe(`audio`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = staticFieldView({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `audio`,
          sources: [
            {
              mimeType: `Test Source A Mime Type`,
              url: `Test Source A Url`,
            },
            {
              mimeType: `Test Source B Mime Type`,
              url: `Test Source B Url`,
            },
            {
              mimeType: `Test Source C Mime Type`,
              url: `Test Source C Url`,
            },
          ],
          name: `Test Name`,
          autoplay: true,
          loop: false,
        },
      });
    });

    it(`generates the expected HTML`, () => {
      expect(output).toEqual(
        h(
          `div`,
          {
            class: [`audio`, `field`],
            id: `Test Id`,
          },
          h(`audio`, { controls: true, autoplay: true, loop: false }, [
            h(`source`, {
              key: `Test Source A Mime Type`,
              type: `Test Source A Mime Type`,
              src: `Test Source A Url`,
            }),
            h(`source`, {
              key: `Test Source B Mime Type`,
              type: `Test Source B Mime Type`,
              src: `Test Source B Url`,
            }),
            h(`source`, {
              key: `Test Source C Mime Type`,
              type: `Test Source C Mime Type`,
              src: `Test Source C Url`,
            }),
          ])
        ) as VDOM<State>
      );
    });
  });

  describe(`image`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = staticFieldView({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `image`,
          name: `Test Name`,
          url: `Test Url`,
          description: `Test Description`,
        },
      });
    });

    it(`generates the expected HTML`, () => {
      expect(output).toEqual(
        h(
          `div`,
          {
            class: [`image`, `field`],
            id: `Test Id`,
          },
          h(`img`, { src: `Test Url`, alt: `Test Description` })
        ) as VDOM<State>
      );
    });
  });
});
