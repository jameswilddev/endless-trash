import { Field, EditableField } from "../field";

export function filterEditableField(field: Field): null | EditableField {
  switch (field.type) {
    case `float`:
    case `integer`:
    case `string`:
      return field;

    case `paragraph`:
    case `subtitle`:
    case `title`:
    case `audio`:
    case `image`:
    case `video`:
      return null;
  }
}
