/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  userAtom,
  documentsNumAtom,
  documentsIdsAtom,
  changedDocAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetAllDocuments() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const setDocumentsNum = useSetAtom(documentsNumAtom);
  const setDocumentsIds = useSetAtom(documentsIdsAtom);
  const setChangedDoc = useSetAtom(changedDocAtom);

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { data: documents, isLoading } = useQuery(
    ["DocumentsList", currentDBId],
    getDocumentsList,
    {
      retry: false,
      enabled: !!userId && !!currentDBId,
      onSuccess: result => {
        const documentsId = [];

        const docs = result.documents.map(document => {
          documentsId.push(document._id);

          return { documentId: document._id, fields: [] };
        });

        setChangedDoc(docs);
        setDocumentsIds(documentsId);
        setDocumentsNum(result.documents.length);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return { documents };
}

export default useGetAllDocuments;
