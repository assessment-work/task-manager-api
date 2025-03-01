import Joi from "joi";

import type { LoginRequestDTO, RegisterRequestDTO } from "../dtos";

const LoginValidationSchema = Joi.object<LoginRequestDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const RegisterValidationSchema = Joi.object<RegisterRequestDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

const authValidationSchema = {
  login: LoginValidationSchema,
  register: RegisterValidationSchema,
};

export { authValidationSchema };
