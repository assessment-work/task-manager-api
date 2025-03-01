import { Router } from "express";
import { taskController } from "../controllers";

function taskRouter() {
  const router = Router();

  router.post("/", taskController.create);
  router.get("/", taskController.getAll);
  router.get("/:id", taskController.getById);
  router.put("/:id", taskController.edit);
  router.delete("/:id", taskController.delete);

  return router;
}

export { taskRouter };
