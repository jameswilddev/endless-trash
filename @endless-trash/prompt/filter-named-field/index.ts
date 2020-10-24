import { Field, NamedField } from "../field";

export function filterNamedField(field: Field): null | NamedField {
  switch (field.type) {
    case `checkbox`:
    case `file`:
    case `float`:
    case `integer`:
    case `string`:
      return field;

    case `paragraph`:
    case `subtitle`:
    case `title`:
      return null;
  }
}
