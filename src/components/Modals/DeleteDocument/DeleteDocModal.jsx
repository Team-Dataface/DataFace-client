import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import fetchData from "../../../utils/axios";

import {
  currentDBIdAtom,
  currentDocIndexAtom,
  documentsIdsAtom,
  userAtom,
  showDeleteDocumentModalAtom,
  isLastDocumentAtom,
} from "../../../atoms/atoms";

import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";

function DeleteDocModal() {
  const queryClient = useQueryClient();
  const { userId } = useAtomValue(userAtom);

  const [currentDocIndex, setCurrentDocIndex] = useAtom(currentDocIndexAtom);
  const [isLastDocument, setIsLastDocument] = useAtom(isLastDocumentAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const documentsIds = useAtomValue(documentsIdsAtom);
  const setShowDeleteDocumentModal = useSetAtom(showDeleteDocumentModalAtom);

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
        queryClient.refetchQueries(["dbDocumentList", currentDBId]);
        setCurrentDocIndex(0);
        setShowDeleteDocumentModal(false);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  function clickHandleCancel() {
    setShowDeleteDocumentModal(false);
    setIsLastDocument(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal onClick={() => setShowDeleteDocumentModal(false)}>
      <ContentWrapper>
        <Content>
          <Message>
            {!isLastDocument
              ? "Are you sure you want to permanently delete this document?"
              : "Please ensure that the database contains at least one document before proceeding"}
          </Message>
        </Content>
        <div className="flex justify-evenly items-center w-full">
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={clickHandleCancel}
          >
            Cancel
          </Button>
          {!isLastDocument && (
            <Button
              className="w-20 h-8 rounded-md bg-red text-white hover:bg-red-hover"
              onClick={fetchDeleteDocument}
            >
              Delete
            </Button>
          )}
        </div>
      </ContentWrapper>
    </Modal>
  );
}

export default DeleteDocModal;
