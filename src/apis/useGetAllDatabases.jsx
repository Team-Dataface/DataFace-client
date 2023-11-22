/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import {
  databasesAtom,
  currentDBIdAtom,
  currentDBNameAtom,
  isInitialAtom,
  userAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetAllDatabases() {
  const { userId } = useAtomValue(userAtom);

  const [isInitial, setIsInitial] = useAtom(isInitialAtom);

  const setDatabases = useSetAtom(databasesAtom);
  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response.data.databases;
  }

  const { isLoading } = useQuery(["userDbList"], getDatabaseList, {
    enabled: !!userId,
    onSuccess: result => {
      if (result.length && isInitial) {
        setCurrentDBId(result[0]._id);
        setCurrentDBName(result[0].name);
        setIsInitial(false);
      }

      setDatabases(result);
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
}

export default useGetAllDatabases;
