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
exports.getDemoWeather = exports.getData = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const data_services_1 = require("../service/data_service/data_services");
const getWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getWeather");
    const { q } = req.body;
    const apiKey = process.env.ACCUWEATHER_API_KEY;
    const config = {
        method: "get",
        url: `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${q}`,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    };
    axios_1.default
        .request(config)
        .then((response) => {
        var _a;
        // res.json(response.data);
        const key = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.key) || 22889;
        (0, exports.getData)(key)
            .then((data) => {
            var _a, _b, _c, _d;
            const resData = {
                locationData: {
                    key: (_a = response.data) === null || _a === void 0 ? void 0 : _a.key,
                    LocalizedName: (_b = response.data) === null || _b === void 0 ? void 0 : _b.LocalizedName,
                    country: (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.Country) === null || _d === void 0 ? void 0 : _d.LocalizedName,
                },
                weatherData: data === null || data === void 0 ? void 0 : data.response,
            };
            res.json({ response: resData, statusCode: 200, message: "success" });
        })
            .catch((error) => {
            res.status(500).json({
                response: error,
                statusCode: 500,
                message: "Internal Server Error",
            });
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
exports.getWeather = getWeather;
const getData = (param) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const apiKey = process.env.ACCUWEATHER_API_KEY;
            const cityId = param; // Example city ID
            const urls = [
                `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${apiKey}`,
                `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityId}?apikey=${apiKey}`,
                `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${apiKey}`,
            ];
            const responses = yield Promise.all(urls.map((url) => axios_1.default.request({
                method: "get",
                url: url,
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            })));
            const responseData = responses.map((response) => response.data);
            const combinedResponse = {
                currentConditions: responseData[0],
                hourlyForecast: responseData[1],
                dailyForecast: responseData[2],
            };
            resolve({
                message: "Success",
                code: 200,
                response: combinedResponse,
            });
        }
        catch (error) {
            console.error(error);
            reject({ message: "Internal Server Error", code: 500, response: error });
        }
    }));
});
exports.getData = getData;
const getDemoWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getDummyWeather");
    setTimeout(() => {
        res.json({
            response: data_services_1.dummyWeatherResponce,
            statusCode: 200,
            message: "success",
        });
    }, 1000);
});
exports.getDemoWeather = getDemoWeather;
