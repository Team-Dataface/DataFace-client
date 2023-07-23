import axios from "axios";
import CONSTANT from "../constants/constant";

const { baseURL } = CONSTANT;

function fetchData(method, url, data) {
  const response = axios({
    method,
    url,
    data,
    baseURL,
    withCredentials: true,
  });

  return response;
}

export default fetchData;
