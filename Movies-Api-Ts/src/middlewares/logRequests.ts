import { Request, Response, NextFunction } from "express";

export const logRequests = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};
