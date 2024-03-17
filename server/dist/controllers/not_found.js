"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotFound = void 0;
const getNotFound = (req, res) => {
    const apiKey = process.env.ACCUWEATHER_API_KEY;
    const error = new Error("Not Found");
    res.status(404).json({
        statusCode: 404,
        message: error.message,
    });
};
exports.getNotFound = getNotFound;
