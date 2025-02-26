import type { ObjectSchema, ValidationErrorItem } from "joi";
import type { ValidationSchemaResult } from "./types";

function validateSchema<T>(args: {
  schema: ObjectSchema<T>;
  data: T;
}): ValidationSchemaResult<T> {
  const { error, value } = args.schema.validate(args.data, {
    abortEarly: false,
  });

  let errorMessages = undefined;

  if (error) {
    errorMessages = mergeValidationErrors(error.details);
  }

  return {
    value: value,
    error: error,
    errorMessage: errorMessages,
  };
}

function mergeValidationErrors(errors: ValidationErrorItem[]): string {
  return errors.map((error) => error.message).join(", ");
}

export { validateSchema };
