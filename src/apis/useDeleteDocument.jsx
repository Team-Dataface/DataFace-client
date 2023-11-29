import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

import {
  currentDocIndexAtom,
  userAtom,
  showDeleteDocumentModalAtom,
  currentDBIdAtom,
  documentsIdsAtom,
} from "../atoms/atoms";

function useDeleteDocument() {
  const queryClient = useQueryClient();
  const { userId } = useAtomValue(userAtom);

  const [currentDocIndex, setCurrentDocIndex] = useAtom(currentDocIndexAtom);
  const setShowDeleteDocumentModal = useSetAtom(showDeleteDocumentModalAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const documentsIds = useAtomValue(documentsIdsAtom);

  async function deleteDocument() {
    await fetchData(
      "DELETE",
      `/users/${userId}/databases/${currentDBId}/documents/${documentsIds[currentDocIndex]}`,
    );
  }

  const { mutate: fetchDeleteDocument, isLoading } = useMutation(
    deleteDocument,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["DocumentsList", currentDBId]);
        setCurrentDocIndex(0);
        setShowDeleteDocumentModal(false);
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return fetchDeleteDocument;
}

export default useDeleteDocument;
