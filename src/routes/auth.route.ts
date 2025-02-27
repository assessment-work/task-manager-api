import { Router } from "express";
import { authenticationController } from "../controllers";

function authRouter() {
  const router = Router();

  router.post("/login", authenticationController.login);
  router.post("/signup", authenticationController.register);

  return router;
}

export { authRouter };
