import { configs } from "../configs";
import { UserModel } from "../models";

import type { User } from "../models";
import type { ServiceResponse } from "../types";

async function isUserExist(email: string): Promise<ServiceResponse<User>> {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      success: false,
      data: null,
      error: {
        message: "User not found",
        statusCode: configs.HTTP_STATUS_CODE.NotFound,
      },
    };
  }

  return { success: true, data: user, error: null };
}

async function createUser(user: Partial<User>): Promise<ServiceResponse<User>> {
  try {
    const newUser = await UserModel.create(user);

    return { success: true, data: newUser, error: null };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      data: null,
      error: {
        message: err.message,
        statusCode: configs.HTTP_STATUS_CODE.InternalServerError,
      },
    };
  }
}

const userService = {
  isUserExist,
  createUser,
};

export { userService };
