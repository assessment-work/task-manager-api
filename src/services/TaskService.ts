import type { ObjectId } from "mongoose";

import { TaskModel } from "../models";
import { configs } from "../configs";

import type { Task } from "../models";
import type { ServiceResponse } from "../types";

async function createTask(
  task: Partial<Task>,
  createdBy: ObjectId
): Promise<ServiceResponse<Task>> {
  try {
    const newTask = await TaskModel.create({
      title: task.title,
      description: task.description,
      createdBy,
    });

    return {
      success: true,
      data: newTask,
      error: null,
    };
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

async function getAllTask(
  userId: ObjectId
): Promise<ServiceResponse<Array<Task>>> {
  try {
    const tasks = await TaskModel.find({
      createdBy: userId,
    }).populate({
      path: "createdBy",
    });

    return {
      success: true,
      data: tasks,
      error: null,
    };
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

async function getTaskById(taskId: ObjectId): Promise<ServiceResponse<Task>> {
  try {
    const filter = { _id: taskId };

    const task = await TaskModel.findOne(filter);

    return {
      success: true,
      data: task,
      error: null,
    };
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

async function editTask(
  taskId: ObjectId,
  task: Partial<Task>
): Promise<ServiceResponse<Partial<Task>>> {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, task, {
      new: true,
    });

    return {
      success: true,
      data: updatedTask,
      error: null,
    };
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

async function deleteTask(
  taskId: ObjectId,
  userId: ObjectId
): Promise<ServiceResponse<Task>> {
  try {
    const filter = { deletedBy: userId };

    const deletedTask = await TaskModel.findByIdAndDelete(taskId, filter);

    return {
      success: true,
      data: deletedTask,
      error: null,
    };
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

const taskService = {
  create: createTask,
  getAll: getAllTask,
  getById: getTaskById,
  edit: editTask,
  delete: deleteTask,
};

export { taskService };
