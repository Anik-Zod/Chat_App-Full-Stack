import User from "../models/user.model.js";
import { createError } from "./createError.js";
import jwt from "jsonwebtoken";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return next(createError(400, "Not authorized"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unothorized" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
