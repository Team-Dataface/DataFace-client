import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../utils/axios";

import UserContext from "../context/UserContext";
import Loading from "./shared/Loading";

function ContentsContainer() {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response;
  }

  const { isLoading } = useQuery(["userDbList"], getDatabaseList, {
    enabled: !!userId,
    onSuccess: result => {
      if (!result.length) {
        navigate("/dashboard/nodatabase");
        return;
      }

      navigate("/dashboard/listview");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center w-full p-3 bg-grey">
      <Outlet />
    </div>
  );
}

export default ContentsContainer;
