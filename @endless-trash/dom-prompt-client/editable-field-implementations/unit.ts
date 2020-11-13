import { editableFieldImplementations } from ".";
import { floatEditableFieldImplementation } from "./float-editable-field-implementation";
import { integerEditableFieldImplementation } from "./integer-editable-field-implementation";
import { stringEditableFieldImplementation } from "./string-editable-field-implementation";

describe(`editableFieldImplementations`, () => {
  it(`maps floats`, () => {
    expect(editableFieldImplementations.float).toBe(
      floatEditableFieldImplementation
    );
  });

  it(`maps integers`, () => {
    expect(editableFieldImplementations.integer).toBe(
      integerEditableFieldImplementation
    );
  });

  it(`maps strings`, () => {
    expect(editableFieldImplementations.string).toBe(
      stringEditableFieldImplementation
    );
  });
});
