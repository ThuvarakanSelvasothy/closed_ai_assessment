import express, { Application, Request, Response } from "express";
import cors from "cors";
import { getWeather } from "./controllers/weather";
import dotenv from "dotenv";
import { getNotFound } from "./controllers/not_found";
import { getGif } from "./controllers/giphy";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/api/weather", getWeather);
app.post("/api/giphy", getGif);
app.get("/api/*", getNotFound);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
