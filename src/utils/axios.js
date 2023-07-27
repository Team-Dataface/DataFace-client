import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

function fetchData(method, url, data) {
  const response = axios({
    method,
    url,
    data,
    baseUrl,
    withCredentials: true,
  });

  return response;
}

export default fetchData;
