import express from "express";
import authControllers from "../controllers/authControllers.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignUpSchema),
  authControllers.signup
);
authRouter.post("/login", authControllers.signin);

export default authRouter;
