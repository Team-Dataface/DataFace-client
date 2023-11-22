import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtomValue, useAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  currentDocIndexAtom,
  userAtom,
  showAddDocumentModalAtom,
  fieldsAtom,
  documentsIdsAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useMutatePostDocument() {
  const queryClient = useQueryClient();

  const { userId } = useAtomValue(userAtom);
  const fields = useAtomValue(fieldsAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);
  const setShowAddDocumentModal = useSetAtom(showAddDocumentModalAtom);
  const [documentsIds, setDocumentsIds] = useAtom(documentsIdsAtom);

  function addNewDocumentId(newId) {
    const newFields = [...documentsIds];

    newFields.push(newId);
    setDocumentsIds(newFields);
  }

  async function handleClickSave() {
    const response = await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/documents`,
      fields,
    );

    return response.data.newDocument._id;
  }

  const { mutate: fetchNewDocument, isLoading } = useMutation(handleClickSave, {
    onSuccess: result => {
      addNewDocumentId(result);
      setCurrentDocIndex(documentsIds.length);

      queryClient.refetchQueries(["dbDocumentList", currentDBId]);
      setShowAddDocumentModal(false);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return fetchNewDocument;
}

export default useMutatePostDocument;
