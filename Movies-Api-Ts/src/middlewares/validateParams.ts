import { Request, Response, NextFunction } from "express";

export const validateParams = (paramNames: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingParams = paramNames.filter((param) => !req.params[param]);

    if (missingParams.length > 0) {
      return res.status(400).json({
        message: `Missing required parameters: ${missingParams.join(", ")}`,
      });
    }

    next();
  };
};
