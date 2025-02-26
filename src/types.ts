import type { ValidationError } from "joi";

type ValidationSchemaResult<T> = {
  value?: T;
  error?: ValidationError;
  errorMessage?: string;
};

export type { ValidationSchemaResult };
