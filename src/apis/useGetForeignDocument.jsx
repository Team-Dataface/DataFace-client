/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import { currentDocIndexAtom, userAtom, currentDBIdAtom } from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetForeignDocument(index, relationship, documents) {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const currentDocIndex = useAtomValue(currentDocIndexAtom);

  async function getForeignDocuments() {
    const { primaryFieldName } = relationship;
    let queryValue = "";

    documents[currentDocIndex]?.fields.forEach(element => {
      if (primaryFieldName === element.fieldName) {
        queryValue = element.fieldValue.trim();
      }
    });

    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}/relationships/${relationship._id}?primaryFieldValue=${queryValue}`,
    );

    return response.data.displayedDocuments;
  }

  const { data: foreignDocument, isLoading } = useQuery(
    [
      "ForeignDocuments",
      currentDBId,
      currentDocIndex,
      relationship._id,
      documents.length,
    ],
    () => getForeignDocuments(index),
    {
      enabled:
        !!userId &&
        !!currentDBId &&
        currentDocIndex !== undefined &&
        !!relationship,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return { foreignDocument };
}

export default useGetForeignDocument;
