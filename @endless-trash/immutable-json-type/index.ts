export type JsonPrimitive = null | boolean | number | string;

export type JsonArray = ReadonlyArray<Json>;

export type JsonObject = { readonly [key: string]: Json };

export type Json = JsonPrimitive | JsonArray | JsonObject;
