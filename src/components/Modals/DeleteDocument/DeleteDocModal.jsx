import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import PropTypes from "prop-types";

import fetchData from "../../../utils/axios";

import {
  currentDBIdAtom,
  currentDocIndexAtom,
  documentsIdsAtom,
} from "../../../atoms/atoms";
import UserContext from "../../../context/UserContext";
import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";

function DeleteDocModal({ closeModal, isLastDocument, setIsLastDocument }) {
  const queryClient = useQueryClient();
  const { userId } = useContext(UserContext);

  const [currentDocIndex, setCurrentDocIndex] = useAtom(currentDocIndexAtom);
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
        queryClient.refetchQueries(["dbDocumentList", currentDBId]);
        setCurrentDocIndex(0);
        closeModal();
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  function clickHandleCancel() {
    closeModal();
    setIsLastDocument(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal onClick={closeModal}>
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

DeleteDocModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default DeleteDocModal;
