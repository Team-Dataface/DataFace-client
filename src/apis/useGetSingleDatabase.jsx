/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import { currentDBIdAtom, userAtom, fieldsAtom } from "../atoms/atoms";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

function useGetSingleDatabase() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const setFields = useSetAtom(fieldsAtom);

  async function getDatabase() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents[0];
  }

  const { isLoading } = useQuery(["userDb", currentDBId], getDatabase, {
    enabled: !!userId && !!currentDBId,
    onSuccess: result => {
      setFields(result.fields);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }
}

export default useGetSingleDatabase;
