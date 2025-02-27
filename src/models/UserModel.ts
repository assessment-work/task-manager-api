import { model, Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

import type { ObjectId } from "mongoose";
import type { SoftDeleteDocument } from "mongoose-delete";

interface User extends SoftDeleteDocument {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(MongooseDelete, { deletedBy: true, deletedByType: String });

const UserModel = model<User>("User", userSchema);

export type { User };
export { UserModel };
