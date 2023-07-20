import axios from "axios";
import CONSTANT from "../constants/constant";

const { baseURL } = CONSTANT;

async function fetchData(method, url, data) {
  try {
    const response = await axios({
      method,
      url,
      data,
      baseURL,
    });

    return response;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export default fetchData;
