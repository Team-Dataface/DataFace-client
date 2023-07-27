import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import UserContext from "../../context/UserContext";
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import ModalTitle from "./ModalTitle";
import AddDocumentListSection from "./AddDocumentListSection";

function AddDocumentModal({ closeModal, currentDBId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const [fields, setFields] = useState([]);

  function updateFieldValue(index, event) {
    const newArr = [...fields];
    newArr[index].fieldValue = event.target.value;
    setFields(newArr);
  }

  async function handleClickSave() {
    await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/documents`,
      fields,
    );
  }

  const { mutate: fetchDocumentSave } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList"]);
      navigate("/dashboard/listview");
      closeModal();
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
  currentDBId: PropTypes.string.isRequired,
};

export default AddDocumentModal;
