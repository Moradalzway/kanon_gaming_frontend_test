import { Response } from "express";
import axios from "axios";
import { isEmpty } from "../utils/custom_validtor";
import "dotenv/config";

// this function for search country by  name
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const seachCountry = async (req: any, res: Response) => {
  const { countryName } = req.body;

  // check if country name empty
  if (isEmpty(countryName)) {
    const responseCode = 400;
    const response = {
      code: responseCode,
      message: "you should fill the faild {countryName}",
    };
    return res.status(responseCode).json(response);
  }

  // get access token and base url from .env (in the root of folder), you can change these to yours
  const accessToken = process.env.COUNTRY_LAYER_API_KEY;
  const baseURL = process.env.COUNTRY_LAYER_API + "/name/";

  // send request to countrylayer.com
  await axios
    .get(baseURL + countryName + "?access_key=" + accessToken)
    .then((result: any) => {
      if (result.status === 200) {
        const response = {
          code: result.status,
          result: result.data[0],
        };

        return res.status(result.status).json(response);
      } else {
        const response = {
          code: result.status,
          message: result.statusText,
        };
        return res.status(result.status).json(response);
      }
    })
    .catch((error) => {
      const response = {
        code: error.response.status,
        result: error.response.statusText,
        message: error.response.statusText,
      };
      return res.status(error.response.status).json(response);
    });
};

// this function to return all countries
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getAllCountries = async (req: any, res: Response) => {
  // get access token and base url from .env (in the root of folder), you can change these to yours
  const accessToken = process.env.COUNTRY_LAYER_API_KEY;
  const baseURL = process.env.COUNTRY_LAYER_API + "/all";

  // send request to countrylayer.com
  await axios
    .get(baseURL + "?access_key=" + accessToken)
    .then((result: any) => {
      if (result.status === 200) {
        const response = {
          code: result.status,
          result: result.data,
        };

        return res.status(result.status).json(response);
      } else {
        const response = {
          code: result.status,
          message: result.statusText,
        };
        return res.status(result.status).json(response);
      }
    })
    .catch((error) => {
      const response = {
        code: error.response.status,
        result: error.response.statusText,
        message: error.response.statusText,
      };
      return res.status(error.response.status).json(response);
    });

  // return res.status(responseCode).json(response);
};

export { seachCountry, getAllCountries };
