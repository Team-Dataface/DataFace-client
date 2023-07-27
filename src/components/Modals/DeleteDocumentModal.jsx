import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetchData from "../../utils/axios";

import Modal from "../shared/Modal";
import Button from "../shared/Button";
import ModalTitle from "./ModalTitle";

function DeleteDocumentModal({
  user,
  closeModal,
  currentDBId,
  currentDocIndex,
  documentsIds,
}) {
  const queryClient = useQueryClient();

  async function deleteDocument() {
    await fetchData(
      "DELETE",
      `/users/${user.userId}/databases/${currentDBId}/documents/${documentsIds[currentDocIndex]}`,
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
      <div className="flex flex-col items-center">
        <ModalTitle value="DELETE DOCUMENT" />
        <h1>Do you really want to DELETE this document?</h1>
        <div className="flex justify-around w-full">
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={closeModal}
          >
            Discard
          </Button>
          <Button
            className="w-20 h-8 rounded-md bg-red text-white hover:bg-red-hover"
            onClick={fetchDeleteDocument}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

DeleteDocumentModal.propTypes = {
  user: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentDBId: PropTypes.string.isRequired,
};

export default DeleteDocumentModal;
