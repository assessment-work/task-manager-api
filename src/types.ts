import type { ValidationError } from "joi";

type ValidationSchemaResult<T> = {
  value?: T;
  error?: ValidationError;
  errorMessage?: string;
};

type ServiceResponse<T> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: string;
    };

export type { ValidationSchemaResult, ServiceResponse };
