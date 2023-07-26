import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";
import Modal from "../shared/Modal";
import ModalTitle from "./ModalTitle";
import AddDocumentListSection from "./AddDocumentListSection";

function AddDocumentModal({ user, closeModal, currentDBId }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);

  function updateFieldValue(index, event) {
    const newArr = [...fields];
    newArr[index].value = event.target.value;

    setFields(newArr);
  }

  async function handleClickSave() {
    await fetchData(
      "POST",
      `/users/${user}/databases/${currentDBId}/documents`,
      fields,
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

  async function getDatabase() {
    const response = await fetchData(
      "GET",
      `users/${user}/databases/${currentDBId}`,
    );

    return response;
  }

  const { data, isLoading } = useQuery(["userDb"], getDatabase, {
    enabled: !!user,
    onSuccess: () => {
      const newArr = [];
      data.data.database.fields.map(element => {
        return newArr.push({
          field_id: element._id,
          name: element.name,
          value: "",
        });
      });
      setFields(newArr);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>querying userDb... LOADING</h1>;
  }

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
  currentDBId: PropTypes.string.isRequired,
};

export default AddDocumentModal;
