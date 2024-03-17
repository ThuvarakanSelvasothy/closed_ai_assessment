"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const weather_1 = require("./controllers/weather");
const dotenv_1 = __importDefault(require("dotenv"));
const not_found_1 = require("./controllers/not_found");
const giphy_1 = require("./controllers/giphy");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", "*");
    next();
});
// Routes
app.post("/api/weather", weather_1.getWeather);
app.post("/api/demo/weather", weather_1.getDemoWeather);
app.post("/api/giphy", giphy_1.getGif);
app.get("/api/*", not_found_1.getNotFound);
// static View
app.use(express_1.default.static("../client/build"));
console.log(path_1.default.join(__dirname, "../client/build", "index.html"));
app.use((req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
    // res.sendFile(path.join(__dirname, "./view", "index.html"));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
