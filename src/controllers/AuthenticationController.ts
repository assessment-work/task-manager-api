import _ from "lodash";

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

import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from "../dtos";
import type { User } from "../models";

async function login(req: Request, res: Response) {
  const validation = validateSchema<LoginRequestDTO>({
    schema: validations.auth.LoginSchema,
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
      statusCode: configs.HTTP_STATUS_CODE.NotFound,
      error: userExist.error,
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

  const token = generateJwt(email);

  sendResponse<LoginResponseDTO>({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data: {
      token,
      user: _.omit(userExist.data.toObject() as User, ["password"]),
    },
  });

  return;
}

async function register(req: Request, res: Response) {
  const validation = validateSchema<RegisterRequestDTO>({
    schema: validations.auth.RegisterSchema,
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
      statusCode: configs.HTTP_STATUS_CODE.InternalServerError,
      error: userCreation.error,
    });
    return;
  }

  const token = generateJwt(email);

  sendResponse<RegisterResponseDTO>({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Created,
    data: {
      token,
      user: _.omit(userCreation.data.toObject() as User, ["password"]),
    },
  });
  return;
}

const authenticationController = {
  login,
  register,
};

export { authenticationController };
