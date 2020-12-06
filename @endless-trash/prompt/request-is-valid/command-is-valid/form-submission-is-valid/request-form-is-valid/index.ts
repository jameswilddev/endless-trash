import { filterEditableField } from "../../../../filter-editable-field";
import { Form } from "../../../../form";
import { requestFieldIsValid } from "../../../../request-field-is-valid";
import { FormSubmissionCommand } from "../../../../request/command";

export function requestFormIsValid(
  form: Form,
  formSubmissionCommand: FormSubmissionCommand
): boolean {
  if (form.submitButtonLabel === null) {
    return false;
  } else if (formSubmissionCommand.formName !== form.name) {
    return false;
  } else {
    const remainingKeys = Object.keys(formSubmissionCommand.fields);

    for (const field of form.fields) {
      const editableField = filterEditableField(field);

      if (editableField === null) {
        continue;
      } else {
        const index = remainingKeys.indexOf(field.name);

        if (index === -1) {
          return false;
        } else if (
          !requestFieldIsValid(
            editableField,
            formSubmissionCommand.fields[field.name]
          )
        ) {
          return false;
        } else {
          remainingKeys.splice(index, 1);
          continue;
        }
      }
    }

    return remainingKeys.length === 0;
  }
}
