import { Router } from "express";
import { validations } from "../validations";
import { validateSchema } from "../utils";
import { LoginRequestDTO } from "../dtos";
import { UserModel } from "../models/UserModel";

function authRouter() {
  const router = Router();

  router.post("/login", async (req, res) => {
    const { value, error, errorMessage } = validateSchema<LoginRequestDTO>({
      schema: validations.auth.LoginSchema,
      data: req.body,
    });

    if (error) {
      res.status(400).json({ error: errorMessage });
    }

    const email = value.email;
    const password = value.password;

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      res.status(200).json(isUserExist);
    }

    res.status(200).json({ email, password, success: false });
  });

  return router;
}

export { authRouter };
