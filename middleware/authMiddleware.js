import express from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

import User from "../models/userModels.js";

const app = express();
app.use(cookieParser());

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
