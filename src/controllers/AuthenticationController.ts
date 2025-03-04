import lodash from "lodash";

import type { Request, Response } from "express";

import {
  comparePassword,
  encryptPassword,
  generateJwt,
  sendResponse,
  validateSchema,
} from "../utils";
import { validations } from "../validations";
import { userService } from "../services";
import { configs } from "../configs";
import { User } from "../models";

import {
  GenerateRefreshTokenResponseDTO,
  type LoginRequestDTO,
  type LoginResponseDTO,
  type RegisterRequestDTO,
  type RegisterResponseDTO,
} from "../dtos";
import type { AuthRequest, AuthTokenData } from "../types";

async function login(req: Request, res: Response) {
  const validation = validateSchema<LoginRequestDTO>({
    schema: validations.auth.login,
    data: req.body,
  });

  if (validation.error) {
    sendResponse({
      res,
      statusCode: configs.HTTP_STATUS_CODE.BadRequest,
      error: validation.errorMessage,
    });

    return;
  }

  const email = validation.value.email;
  const password = validation.value.password;

  const userExist = await userService.isUserExist(email);

  if (!userExist.success) {
    sendResponse({
      res,
      statusCode: userExist.error.statusCode,
      error: userExist.error.message,
    });
    return;
  }

  const isValidPassword: boolean = await comparePassword(
    password,
    userExist.data.password
  );

  if (!isValidPassword) {
    sendResponse({
      res,
      statusCode: configs.HTTP_STATUS_CODE.Unauthorized,
      error: "Email/Password is not valid",
    });
    return;
  }

  const token = generateJwt({ _id: userExist.data._id, email });
  const refreshToken = generateJwt(
    { _id: userExist.data._id, email },
    configs.AUTH.JWT_REFRESH_EXPIRES_IN
  );

  sendResponse<LoginResponseDTO>({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data: {
      token,
      refreshToken,
      // @ts-expect-error .toObject not defined in types of mongoose-smart-delete plugin
      user: lodash.omit(userExist.data.toObject() as User, ["password"]),
    },
  });

  return;
}

async function register(req: Request, res: Response) {
  const validation = validateSchema<RegisterRequestDTO>({
    schema: validations.auth.register,
    data: req.body,
  });

  if (validation.error) {
    sendResponse({
      res,
      statusCode: configs.HTTP_STATUS_CODE.BadRequest,
      error: validation.errorMessage,
    });

    return;
  }

  const email = validation.value.email;
  const password = validation.value.password;
  const name = validation.value.name;

  const userExist = await userService.isUserExist(email);

  if (userExist.success) {
    sendResponse({
      res,
      statusCode: configs.HTTP_STATUS_CODE.NotFound,
      error: "User already exist",
    });
    return;
  }

  const encryptedPassword = await encryptPassword(password);

  const userCreation = await userService.createUser({
    email,
    password: encryptedPassword,
    name,
  });

  if (!userCreation.success) {
    sendResponse({
      res,
      statusCode: userCreation.error.statusCode,
      error: userCreation.error.message,
    });
    return;
  }

  const token = generateJwt({ _id: userCreation.data._id, email });
  const refreshToken = generateJwt(
    { _id: userCreation.data._id, email },
    configs.AUTH.JWT_REFRESH_EXPIRES_IN
  );

  sendResponse<RegisterResponseDTO>({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Created,
    data: {
      token,
      refreshToken,
      // @ts-expect-error .toObject not defined in types of mongoose-smart-delete plugin
      user: lodash.omit(userCreation.data.toObject() as User, ["password"]),
    },
  });
  return;
}

async function generateRefreshToken(req: AuthRequest, res: Response) {
  const user: AuthTokenData = req.user;

  const token = generateJwt({ _id: user._id, email: user.email });
  const refreshToken = generateJwt(
    { _id: user._id, email: user.email },
    configs.AUTH.JWT_REFRESH_EXPIRES_IN
  );

  sendResponse<GenerateRefreshTokenResponseDTO>({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data: {
      token,
      refreshToken,
    },
  });

  return;
}

const authenticationController = {
  login,
  register,
  generateRefreshToken,
};

export { authenticationController };
