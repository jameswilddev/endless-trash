export type DeleteOrKeepUnsetRequestFileField = null;
export type KeepSetRequestFileField = `$keep`;
export type ReplaceWithBase64RequestFileField = string;

export type RequestRequiredFileFieldWithValue =
  | KeepSetRequestFileField
  | ReplaceWithBase64RequestFileField;

export type RequestRequiredFileField = ReplaceWithBase64RequestFileField;

export type RequestNullableFileFieldWithValue =
  | DeleteOrKeepUnsetRequestFileField
  | KeepSetRequestFileField
  | ReplaceWithBase64RequestFileField;

export type RequestNullableFileField =
  | DeleteOrKeepUnsetRequestFileField
  | ReplaceWithBase64RequestFileField;

export type RequestFileField =
  | RequestRequiredFileFieldWithValue
  | RequestRequiredFileField
  | RequestNullableFileFieldWithValue
  | RequestNullableFileField;
