import Joi from "joi";

import type { LoginRequestDTO, RegisterRequestDTO } from "../dtos";

const LoginSchema = Joi.object<LoginRequestDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const RegisterSchema = Joi.object<RegisterRequestDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

const authSchema = { LoginSchema, RegisterSchema };

export { authSchema };
