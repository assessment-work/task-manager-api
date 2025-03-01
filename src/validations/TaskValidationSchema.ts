import * as Joi from "joi";
import { CreateTaskRequestDTO, EditTaskRequestDTO } from "../dtos";
import { TaskStatus } from "../models";

const CreateTaskValidationSchema = Joi.object<CreateTaskRequestDTO>({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const EditTaskValidationSchema = Joi.object<EditTaskRequestDTO>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid(TaskStatus.COMPLETED, TaskStatus.NOT_COMPLETED)
    .required(),
});

const taskValidationSchema = {
  create: CreateTaskValidationSchema,
  edit: EditTaskValidationSchema,
};

export { taskValidationSchema };
