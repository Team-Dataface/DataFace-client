/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  userAtom,
  documentsIdsAtom,
  changedDocAtom,
  documentsDataAtom,
  relationshipsDataAtom,
  addDocfieldsAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetSingleDatabase() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const setDocumentsIds = useSetAtom(documentsIdsAtom);
  const setChangedDoc = useSetAtom(changedDocAtom);
  const setDocumentsData = useSetAtom(documentsDataAtom);
  const setRelationshipsData = useSetAtom(relationshipsDataAtom);
  const setAddDocFields = useSetAtom(addDocfieldsAtom);

  async function getSingleDatabase() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { data: singleDatabase, isLoading } = useQuery(
    ["SingleDatabase", currentDBId],
    getSingleDatabase,
    {
      retry: false,
      enabled: !!userId && !!currentDBId,
      onSuccess: result => {
        const documentsId = [];

        const docs = result.documents.map(document => {
          documentsId.push(document._id);

          return { documentId: document._id, fields: [] };
        });

        const fieldsWithEmptyValue = result.documents[0].fields.map(field => {
          return {
            ...field,
            fieldValue: "",
          };
        });

        setAddDocFields(fieldsWithEmptyValue);
        setDocumentsData(result.documents);
        setChangedDoc(docs);
        setDocumentsIds(documentsId);

        if (result.relationships?.length) {
          setRelationshipsData(result.relationships);

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

  return { singleDatabase };
}

export default useGetSingleDatabase;
