/* eslint-disable consistent-return */
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  currentDBNameAtom,
  isInitialAtom,
  userAtom,
  currentDocIndexAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetAllDatabases() {
  const navigate = useNavigate();
  const { userId } = useAtomValue(userAtom);

  const [isInitial, setIsInitial] = useAtom(isInitialAtom);

  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response.data.databases;
  }

  const { data: databases, isLoading } = useQuery(
    ["userDbList"],
    getDatabaseList,
    {
      enabled: !!userId,
      onSuccess: result => {
        if (result.length && isInitial) {
          setCurrentDBId(result[0]._id);
          setCurrentDBName(result[0].name);
          setIsInitial(false);
        }

        if (!result.length) {
          setCurrentDocIndex(0);
          setCurrentDBName("");
          navigate("/dashboard/nodatabase");
          return;
        }

        navigate("/dashboard/listview");
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return { databases };
}

export default useGetAllDatabases;
