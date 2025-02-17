import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function handleError(res: Response, error: unknown) {
  if (error instanceof Error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "An unexpected error occurred." });
  }
}
