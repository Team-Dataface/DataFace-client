/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDocIndexAtom,
  docDataAtom,
  primaryFieldAtom,
  userAtom,
  currentDBIdAtom,
  relationshipsDataAtom,
  foreignDocumentsAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetForeignDocument(index, relationship) {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const docData = useAtomValue(docDataAtom);
  const primaryField = useAtomValue(primaryFieldAtom);
  const relationshipsData = useAtomValue(relationshipsDataAtom);
  const setForeignDocuments = useSetAtom(foreignDocumentsAtom);

  async function getForeignDocuments(relationshipsIndex) {
    let queryValue = "";

    docData[currentDocIndex]?.fields.forEach(element => {
      if (primaryField[relationshipsIndex] === element.fieldName) {
        queryValue = element.fieldValue.trim();
      }
    });

    if (relationship._id) {
      const response = await fetchData(
        "GET",
        `users/${userId}/databases/${currentDBId}/relationships/${relationship._id}?primaryFieldValue=${queryValue}`,
      );

      return response.data.displayedDocuments;
    }

    return [];
  }

  const { data: foreignDocument, isLoading } = useQuery(
    ["ForeignDocuments", currentDBId, currentDocIndex, relationship._id],
    () => getForeignDocuments(index),
    {
      enabled:
        !!userId &&
        !!currentDBId &&
        currentDocIndex !== undefined &&
        !!relationshipsData,
      refetchOnWindowFocus: false,
      onSuccess: result => {
        setForeignDocuments(result);
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return { foreignDocument };
}

export default useGetForeignDocument;
