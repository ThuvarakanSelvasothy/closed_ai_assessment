import express, { Application, Request, Response } from "express";
import cors from "cors";
import { getDemoWeather, getWeather } from "./controllers/weather";
import dotenv from "dotenv";
import { getNotFound } from "./controllers/not_found";
import { getGif } from "./controllers/giphy";
import path from "path";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3001;
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "*");
  next();
});

// Routes
app.post("/api/weather", getWeather);
app.post("/api/demo/weather", getDemoWeather);
app.post("/api/giphy", getGif);
app.get("/api/*", getNotFound);

// static View
app.use(express.static("../client/build"));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  // res.sendFile(path.join(__dirname, "./view", "index.html"));
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
