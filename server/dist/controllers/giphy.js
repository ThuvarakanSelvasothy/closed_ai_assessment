"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGif = void 0;
const axios_1 = __importDefault(require("axios"));
const getGif = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("getGif");
    const { q } = req.body;
    const apiKey = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.GIPHY_API_KEY) || "";
    const config = {
        method: "get",
        url: `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}&limit=15`,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    };
    axios_1.default
        .request(config)
        .then((response) => {
        var _a, _b;
        const transformedData = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map((item) => {
            var _a, _b;
            return ((_b = (_a = item === null || item === void 0 ? void 0 : item.images) === null || _a === void 0 ? void 0 : _a.original) === null || _b === void 0 ? void 0 : _b.webp) ||
                "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVsN3FpNXlnZWsxaWpudzZsdW4zdWF5dmgyMWF6bHY2a29wcGI3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BGDQxDCZDFHW5Ne/giphy.gif";
        });
        res.json({
            response: transformedData,
            statusCode: 200,
            message: "success",
        });
    })
        .catch((error) => {
        console.error(error);
        res.status(500).json({
            response: error,
            statusCode: 500,
            message: "Internal Server Error",
        });
    });
});
exports.getGif = getGif;
