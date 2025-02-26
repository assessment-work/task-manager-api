import { model, Schema } from "mongoose";
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete";

interface User extends SoftDeleteModel {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    id: { type: String, required: true },
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
