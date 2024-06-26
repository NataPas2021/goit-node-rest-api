import express from "express";
import authControllers from "../controllers/authControllers.js";
import {
  updateSubscriptionSchema,
  userSignInSchema,
  userSignUpSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignUpSchema),
  authControllers.signup
);
authRouter.post(
  "/login",
  validateBody(userSignInSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authControllers.updateSubscription
);
authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  authControllers.updateAvatar
);

export default authRouter;
