import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const expiresIn = "90d";

export const generateToken = (payload: Types.ObjectId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
      const token = jwt.sign({payload}, process.env.JWT_SECRET!, { expiresIn });
  return token;
};