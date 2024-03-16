import axios from "axios";
import { Request, Response } from "express";

export const getGif = async (req: Request, res: Response) => {
  console.log("getGif");
  const { q } = req.body;
  const apiKey = process.env?.GIPHY_API_KEY || "";
  const config = {
    method: "get",
    url: `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}&limit=15`,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };
  axios
    .request(config)
    .then((response) => {
      const transformedData = response?.data?.data?.map(
        (item: any) =>
          item?.images?.original?.webp ||
          "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVsN3FpNXlnZWsxaWpudzZsdW4zdWF5dmgyMWF6bHY2a29wcGI3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BGDQxDCZDFHW5Ne/giphy.gif"
      );
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
};
