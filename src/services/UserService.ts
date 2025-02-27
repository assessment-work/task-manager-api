import { UserModel } from "../models";

import type { User } from "../models";
import type { ServiceResponse } from "../types";

async function isUserExist(email: string): Promise<ServiceResponse<User>> {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return { success: false, data: null, error: "User not found" };
  }

  return { success: true, data: user, error: null };
}

async function createUser(user: Partial<User>): Promise<ServiceResponse<User>> {
  try {
    const newUser = await UserModel.create(user);

    return { success: true, data: newUser, error: null };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, data: null, error: err.message };
  }
}

const userService = {
  isUserExist,
  createUser,
};

export { userService };
