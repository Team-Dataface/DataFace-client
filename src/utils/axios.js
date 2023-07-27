import axios from "axios";
import CONSTANT from "../constants/constant";

const { BASE_URL } = CONSTANT;

function fetchData(method, url, data) {
  const response = axios({
    method,
    url,
    data,
    BASE_URL,
    withCredentials: true,
  });

  return response;
}

export default fetchData;
