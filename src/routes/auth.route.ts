import { Router } from "express";
import { authenticationController } from "../controllers";
import { middleware } from "../middlewares";

function authRouter() {
  const router = Router();

  router.post("/login", authenticationController.login);
  router.post("/signup", authenticationController.register);
  router.get(
    "/refresh",
    middleware.isAuthorized,
    authenticationController.generateRefreshToken
  );

  return router;
}

export { authRouter };
