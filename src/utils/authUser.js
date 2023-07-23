import fetchData from "./axios";

async function authUser() {
  const response = await fetchData("GET", "auth/check");

  return response;
}

export default authUser;
