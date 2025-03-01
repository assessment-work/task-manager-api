import type { Request, Response } from "express";
import type { ParamsDictionary, Query } from "express-serve-static-core";
import type { ValidationError } from "joi";
import type { ObjectId } from "mongoose";

type ValidationSchemaResult<T> = {
  value?: T;
  error?: ValidationError;
  errorMessage?: string;
};

type ServiceResponseError = {
  message: string;
  statusCode: number;
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
      error: ServiceResponseError;
    };

type SendResponse<T> =
  | {
      res: Response;
      statusCode: number;
      data?: null;
      error: string;
    }
  | {
      res: Response;
      statusCode: number;
      data: T;
      error?: null;
    };

type AuthTokenData = {
  _id: ObjectId;
  email: string;
};

interface AuthRequest<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Query,
  Locals extends Record<string, unknown> = Record<string, unknown>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user: AuthTokenData;
}

export type {
  ValidationSchemaResult,
  ServiceResponse,
  SendResponse,
  AuthTokenData,
  AuthRequest,
};
