import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";

function DeleteDocModal({ closeModal, currentDocIndex, documentsIds }) {
  const queryClient = useQueryClient();
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function deleteDocument() {
    await fetchData(
      "DELETE",
      `/users/${userId}/databases/${currentDBId}/documents/${documentsIds[currentDocIndex]}`,
    );
  }

  const { mutate: fetchDeleteDocument } = useMutation(deleteDocument, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <Modal onClick={closeModal}>
      <ContentWrapper>
        <Content>
          <Message>
            Are you sure you want to permanently delete this document?
          </Message>
        </Content>
        <div className="flex justify-evenly items-center  w-full">
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className="w-20 h-8 rounded-md bg-red text-white hover:bg-red-hover"
            onClick={fetchDeleteDocument}
          >
            Delete
          </Button>
        </div>
      </ContentWrapper>
    </Modal>
  );
}

DeleteDocModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  currentDocIndex: PropTypes.number.isRequired,
};

export default DeleteDocModal;
