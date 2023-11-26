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
  docDataAtom,
  primaryFieldAtom,
  relationshipsDataAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetAllDocuments() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const setDocumentsNum = useSetAtom(documentsNumAtom);
  const setDocumentsIds = useSetAtom(documentsIdsAtom);
  const setChangedDoc = useSetAtom(changedDocAtom);
  const setDocData = useSetAtom(docDataAtom);
  const setPrimaryField = useSetAtom(primaryFieldAtom);
  const setRelationshipsData = useSetAtom(relationshipsDataAtom);

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

        setDocData(result.documents);
        setChangedDoc(docs);
        setDocumentsIds(documentsId);
        setDocumentsNum(result.documents.length);

        if (result.relationships?.length) {
          setRelationshipsData(result.relationships);

          const primaryFieldsList = result.relationships.map(element => {
            return element.primaryFieldName;
          });

          setPrimaryField(primaryFieldsList);

          return;
        }

        setRelationshipsData(null);
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
