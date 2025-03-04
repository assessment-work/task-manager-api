import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { JwtPayload } from "jsonwebtoken";
import type { ObjectSchema, ValidationErrorItem } from "joi";

import { configs } from "./configs";

import type {
  AuthTokenData,
  SendResponse,
  ValidationSchemaResult,
} from "./types";

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

async function encryptPassword(password: string): Promise<string> {
  const encryptedPassword: string = await bcrypt.hash(
    password,
    parseInt(configs.AUTH.PASSWORD_SALT_ROUNDS, 10)
  );

  return encryptedPassword;
}

async function comparePassword(
  password: string,
  encryptedPassword: string
): Promise<boolean> {
  const isValidPassword: boolean = await bcrypt.compare(
    password,
    encryptedPassword
  );

  return isValidPassword;
}

function generateJwt(data: AuthTokenData, expiresIn?: string): string {
  const token = jwt.sign(
    {
      data,
      exp:
        Math.floor(Date.now() / 1000) +
        parseInt(expiresIn ?? configs.AUTH.JWT_EXPIRES_IN, 10),
    },
    configs.AUTH.JWT_SECRET
  );

  return token;
}

function verifyJwt(token: string): string | JwtPayload {
  const decoded = jwt.verify(token, configs.AUTH.JWT_SECRET);

  return decoded;
}

function sendResponse<T>(args: SendResponse<T>) {
  args.res.status(args.statusCode).json({
    success: !args.error,
    data: args.data ?? null,
    error: args.error ?? null,
  });
}

export {
  validateSchema,
  mergeValidationErrors,
  encryptPassword,
  comparePassword,
  generateJwt,
  verifyJwt,
  sendResponse,
};
