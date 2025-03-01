import { authValidationSchema } from "./AuthValidationSchema";
import { taskValidationSchema } from "./TaskValidationSchema";

const validations = {
  auth: authValidationSchema,
  task: taskValidationSchema,
};

export { validations };
