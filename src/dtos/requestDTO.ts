import type { ObjectId } from "mongoose";
import type { TASK_STATUS } from "../models";

interface LoginRequestDTO {
  email: string;
  password: string;
}

interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
}

interface CreateTaskRequestDTO {
  title: string;
  description: string;
  status?: TASK_STATUS;
}

type EditTaskRequestParamsDTO = { id: ObjectId };

type GetTaskByIdRequestParamsDTO = { id: ObjectId };

type DeleteTaskByIdRequestParamsDTO = { id: ObjectId };

interface EditTaskRequestDTO {
  title: string;
  description: string;
  status: TASK_STATUS;
}

export type {
  LoginRequestDTO,
  RegisterRequestDTO,
  CreateTaskRequestDTO,
  EditTaskRequestParamsDTO,
  EditTaskRequestDTO,
  GetTaskByIdRequestParamsDTO,
  DeleteTaskByIdRequestParamsDTO,
};
