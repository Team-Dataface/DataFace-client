/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { userAtom, currentDBIdAtom } from "../atoms/atoms";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

function useGetForeignDatabases() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  async function getRelationships() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}/relationships`,
    );

    return response.data.foreignDatabases;
  }

  const { data: foreignDatabases, isLoading } = useQuery(
    ["ForeignDocuments", currentDBId],
    () => getRelationships(),
    {
      enabled:
        !!userId &&
        !!currentDBId,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return { foreignDatabases };
}

export default useGetForeignDatabases;
