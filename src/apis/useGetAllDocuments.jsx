/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { currentDBIdAtom, userAtom, documentsNumAtom } from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetAllDocuments() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const setDocumentsNum = useSetAtom(documentsNumAtom);

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { isLoading } = useQuery(
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      retry: false,
      enabled: !!userId && !!currentDBId,
      onSuccess: result => {
        setDocumentsNum(result.documents.length);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  if (isLoading && currentDBId) {
    return <Loading />;
  }
}

export default useGetAllDocuments;
