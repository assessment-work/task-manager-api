import type { Response, NextFunction } from "express";

import { sendResponse, verifyJwt } from "./utils";
import { configs } from "./configs";

import type { AuthRequest, AuthTokenData } from "./types";

const BEARER = "Bearer ";

async function isAuthorized(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    sendResponse({
      res,
      statusCode: configs.HTTP_STATUS_CODE.Unauthorized,
      data: null,
      error: "Not Authorized",
    });

    return;
  }

  const token: string = authorization.split(BEARER)[1];

  try {
    const decodedToken = verifyJwt(token);

    const user: AuthTokenData = decodedToken["data"] as AuthTokenData;

    req.user = user;

    next();
    return;
  } catch (error: unknown) {
    const err = error as Error;

    sendResponse({
      res,
      statusCode: configs.HTTP_STATUS_CODE.Unauthorized,
      data: null,
      error: err.message,
    });
    return;
  }
}

const middleware = {
  isAuthorized,
};

export { middleware };
