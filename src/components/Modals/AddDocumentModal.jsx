import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import UserContext from "../../context/UserContext";
import CurrentDBIdContext from "../../context/CurrentDBIdContext";
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import ModalTitle from "./ModalTitle";
import AddDocumentListSection from "./AddDocumentListSection";

function AddDocumentModal({
  closeModal,
  setDocumentsIds,
  setCurrentDocIndex,
  documentsIds,
}) {
  const queryClient = useQueryClient();

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const [fields, setFields] = useState([]);

  function updateFieldValue(index, event) {
    const newArr = [...fields];
    newArr[index].fieldValue = event.target.value;
    setFields(newArr);
  }

  function addNewDocumentId(newId) {
    const newArr = [...documentsIds];

    newArr.push(newId);
    setDocumentsIds(newArr);
  }

  async function handleClickSave() {
    const response = await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/documents`,
      fields,
    );

    return response.data.newDocument._id;
  }

  const { mutate: fetchDocumentSave } = useMutation(handleClickSave, {
    onSuccess: result => {
      queryClient.refetchQueries(["dbDocumentList"]);
      closeModal();

      addNewDocumentId(result);
      setCurrentDocIndex(documentsIds.length);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <Modal onClick={closeModal}>
      <div className="flex flex-col items-center">
        <ModalTitle value="Add New Document" />
        <div className="flex flex-col justify-center items-center h-auto">
          <div className="flex">
            <div className="flex flex-col items-center p-3">
              <AddDocumentListSection
                updateFieldValue={updateFieldValue}
                currentDBId={currentDBId}
                setFields={setFields}
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={fetchDocumentSave}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AddDocumentModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddDocumentModal;
