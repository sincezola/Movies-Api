import type { NextFunction, Request, Response } from "express";

export const validateCreateMovie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, duration } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Invalid or missing 'name'." });
  }

  if (!category || typeof category !== "string") {
    return res.status(400).json({ message: "Invalid or missing 'category'." });
  }

  if (typeof duration !== "number") {
    return res.status(400).json({ message: "'duration' must be a number." });
  }

  next();
};
