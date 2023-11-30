/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  userAtom,
  documentsIdsAtom,
  changedDocAtom,
  docDataAtom,
  primaryFieldAtom,
  relationshipsDataAtom,
  addDocfieldsAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetSingleDatabase() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const setDocumentsIds = useSetAtom(documentsIdsAtom);
  const setChangedDoc = useSetAtom(changedDocAtom);
  const setDocData = useSetAtom(docDataAtom);
  const setPrimaryField = useSetAtom(primaryFieldAtom);
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
        setDocData(result.documents);
        setChangedDoc(docs);
        setDocumentsIds(documentsId);

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

  return { singleDatabase };
}

export default useGetSingleDatabase;
