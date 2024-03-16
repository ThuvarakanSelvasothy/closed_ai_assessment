import axios from "axios";
import { Request, Response } from "express";

export const getNotFound = (req: Request, res: Response) => {
  const apiKey = process.env.ACCUWEATHER_API_KEY;
  const error = new Error("Not Found");
  res.status(404).json({
    statusCode: 404,
    message: error.message,
  });
};
