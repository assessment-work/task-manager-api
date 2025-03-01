import type { ObjectId } from "mongoose";
import type { Request, Response } from "express";

import { sendResponse, validateSchema } from "../utils";
import { validations } from "../validations";
import { configs } from "../configs";
import { taskService } from "../services";

import type {
  CreateTaskRequestDTO,
  DeleteTaskByIdRequestParamsDTO,
  EditTaskRequestDTO,
  EditTaskRequestParamsDTO,
  GetTaskByIdRequestParamsDTO,
} from "../dtos";
import type { AuthRequest, SendResponse } from "../types";
import type { Task } from "../models";

async function createTask(
  req: AuthRequest<null, SendResponse<Task>, CreateTaskRequestDTO>,
  res: Response
) {
  const validation = validateSchema({
    schema: validations.task.create,
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

  const { success, data, error } = await taskService.create(
    validation.value,
    req.user._id
  );

  if (!success) {
    sendResponse({
      res,
      statusCode: error.statusCode,
      error: error.message,
    });

    return;
  }

  sendResponse({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Created,
    data,
  });

  return;
}

async function editTask(
  req: Request<
    EditTaskRequestParamsDTO,
    SendResponse<Task>,
    EditTaskRequestDTO
  >,
  res: Response
) {
  const taskId = req.params.id;

  const validation = validateSchema({
    schema: validations.task.edit,
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

  const { success, data, error } = await taskService.edit(
    taskId,
    validation.value
  );

  if (!success) {
    sendResponse({
      res,
      statusCode: error.statusCode,
      error: error.message,
    });

    return;
  }

  sendResponse({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data,
  });

  return;
}

async function getAllTask(
  req: AuthRequest<EditTaskRequestParamsDTO, SendResponse<Array<Task>>, null>,
  res: Response
) {
  const userId: ObjectId = req.user._id;

  const { success, data, error } = await taskService.getAll(userId);

  if (!success) {
    sendResponse({
      res,
      statusCode: error.statusCode,
      error: error.message,
    });

    return;
  }

  sendResponse({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data,
  });

  return;
}

async function getTaskById(
  req: AuthRequest<GetTaskByIdRequestParamsDTO, SendResponse<Task>, null>,
  res: Response
) {
  const taskId: ObjectId = req.params.id;

  const { success, data, error } = await taskService.getById(taskId);

  if (!success) {
    sendResponse({
      res,
      statusCode: error.statusCode,
      error: error.message,
    });

    return;
  }

  sendResponse({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data,
  });

  return;
}

async function deleteTask(
  req: AuthRequest<DeleteTaskByIdRequestParamsDTO, SendResponse<Task>, null>,
  res: Response
) {
  const taskId: ObjectId = req.params.id;
  const userId: ObjectId = req.user._id;

  const { success, data, error } = await taskService.delete(taskId, userId);

  if (!success) {
    sendResponse({
      res,
      statusCode: error.statusCode,
      error: error.message,
    });

    return;
  }

  sendResponse({
    res,
    statusCode: configs.HTTP_STATUS_CODE.Ok,
    data,
  });

  return;
}

const taskController = {
  create: createTask,
  edit: editTask,
  getAll: getAllTask,
  getById: getTaskById,
  delete: deleteTask,
};

export { taskController };
