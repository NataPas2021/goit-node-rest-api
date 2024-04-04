import Joi from "joi";

import { emailRegepxp } from "../constants/userConstants.js";

export const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(8).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(8).required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});
