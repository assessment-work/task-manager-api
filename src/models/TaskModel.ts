import mongoose, { model, Schema } from "mongoose";

import type { ObjectId } from "mongoose";
import MongooseSmartDelete from "mongoose-smart-delete";

import { UserModel } from "./UserModel";

type TASK_STATUS = "COMPLETED" | "NOT_COMPLETED";

enum TaskStatus {
  COMPLETED = "COMPLETED",
  NOT_COMPLETED = "NOT_COMPLETED",
}

interface Task {
  _id: ObjectId;
  title: string;
  description: string;
  name: string;
  createdBy: mongoose.Types.ObjectId;
  deletedBy: mongoose.Types.ObjectId;
  status: TASK_STATUS;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: UserModel },
    // deletedBy: { type: Schema.Types.ObjectId, ref: UserModel, default: null },
    status: {
      type: String,
      enum: ["COMPLETED", "NOT_COMPLETED"],
      default: "NOT_COMPLETED",
    },
  },
  { timestamps: true }
);

TaskSchema.plugin(MongooseSmartDelete, {
  deletedAt: true,
  deletedBy: {
    field: "deletedBy",
    ref: "User",
  },
});

const TaskModel = model<Task>("Task", TaskSchema);

export type { Task, TASK_STATUS };
export { TaskModel, TaskStatus };
