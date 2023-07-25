import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";
import Modal from "../shared/Modal";
import ModalTitle from "./ModalTitle";
import AddDocumentListSection from "./AddDocumentListSection";

function AddDocumentModal({ user, closeModal }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    { field_id: "asdfb1jg", name: "악기 이름", value: "" },
    { field_id: "asdfb2cd", name: "연습 횟수", value: "" },
    { field_id: "asdfb2ad", name: "시작 시간", value: "" },
  ]);

  const databaseId = "abc";

  function updateFieldValue(index, event) {
    const newArr = [...fields];
    newArr[index].value = event.target.value;

    setFields(newArr);
  }

  async function handleClickSave() {
    const newDatabase = {
      fields,
    };

    await fetchData(
      "POST",
      `/users/${user}/databases/${databaseId}/documents`,
      newDatabase,
    );
  }

  const { mutate: fetchDocumentSave } = useMutation(handleClickSave, {
    onSuccess: () => {
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
                fields={fields}
                updateFieldValue={updateFieldValue}
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
  user: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddDocumentModal;
