import { h, text, VDOM } from "hyperapp-cjs";
import { State } from "../state";
import { StaticFieldState } from "../field-state/static-field-state";

export function staticFieldView(
  staticFieldState: StaticFieldState
): VDOM<State> {
  switch (staticFieldState.field.type) {
    case `title`:
      return h(
        `h1`,
        {
          class: [`title`, `field`],
          id: staticFieldState.id,
          key: staticFieldState.id,
        },
        text(staticFieldState.field.content)
      );

    case `subtitle`:
      return h(
        `h2`,
        {
          class: [`subtitle`, `field`],
          id: staticFieldState.id,
          key: staticFieldState.id,
        },
        text(staticFieldState.field.content)
      );

    case `paragraph`:
      return h(
        `p`,
        {
          class: [`paragraph`, `field`],
          id: staticFieldState.id,
          key: staticFieldState.id,
        },
        text(staticFieldState.field.content)
      );

    case `video`:
      return h(
        `div`,
        {
          class: [`video`, `field`],
          id: staticFieldState.id,
          key: staticFieldState.id,
        },
        h(
          `video`,
          {
            controls: true,
            autoplay: staticFieldState.field.autoplay,
            loop: staticFieldState.field.loop,
          },
          staticFieldState.field.sources.map((source) =>
            h(`source`, {
              src: source.url,
              key: source.mimeType,
              type: source.mimeType,
            })
          )
        )
      );

    case `audio`:
      return h(
        `div`,
        {
          class: [`audio`, `field`],
          id: staticFieldState.id,
          key: staticFieldState.id,
        },
        h(
          `audio`,
          {
            controls: true,
            autoplay: staticFieldState.field.autoplay,
            loop: staticFieldState.field.loop,
          },
          staticFieldState.field.sources.map((source) =>
            h(`source`, {
              src: source.url,
              key: source.mimeType,
              type: source.mimeType,
            })
          )
        )
      );

    case `image`:
      return h(
        `div`,
        {
          class: [`image`, `field`],
          id: staticFieldState.id,
          key: staticFieldState.id,
        },
        h(`img`, {
          src: staticFieldState.field.url,
          alt: staticFieldState.field.description,
        })
      );
  }
}
