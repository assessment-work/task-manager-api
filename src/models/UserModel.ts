import { model, Schema } from "mongoose";
import MongooseSmartDelete from "mongoose-smart-delete";

import type { ObjectId } from "mongoose";

interface User {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(MongooseSmartDelete, {
  deletedAt: true,
  deletedBy: {
    field: "deletedBy",
    ref: "User",
  },
});

const UserModel = model<User>("User", userSchema);

export type { User };
export { UserModel };
