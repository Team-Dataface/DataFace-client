import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../../utils/axios";

import Button from "../shared/Button";
import Modal from "../shared/Modal";
import CreateDBListSection from "./CreateDBListSection";
import ModalTitle from "./ModalTitle";
import ModalLabel from "./ModalLabel";
import ModalInputArea from "./ModalInputArea";

import CONSTANT from "../../constants/constant";

const { maxDatabaseNameLength } = CONSTANT;

function CreateDBModal({ user, closeModal, setCurrentDBId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dbName, setdbName] = useState(null);
  const [fields, setFields] = useState([
    {
      id: crypto.randomUUID(),
      fieldName: "",
      fieldType: "Text",
    },
  ]);

  function updateFieldName(index, event) {
    const newArr = [...fields];
    newArr[index].fieldName = event.target.value;

    setFields(newArr);
  }

  function updateFieldType(index, event) {
    const newArr = [...fields];
    newArr[index].fieldType = event.target.value;

    setFields(newArr);
  }

  function handleClickAddField() {
    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        fieldName: "",
        fieldType: "Text",
      },
    ]);
  }

  function handleClickDeleteField(index) {
    if (fields.length === 1) {
      return;
    }

    const newArr = [...fields];
    newArr.splice(index, 1);

    setFields(newArr);
  }

  async function handleClickSave() {
    if (!dbName) {
      alert("Database's name cannot be empty");
    }

    fields.forEach(element => {
      if (!element.fieldName) {
        alert("Field's name cannot be empty");
      }
    });

    const newDatabase = {
      dbName,
      fields,
    };

    const response = await fetchData(
      "POST",
      `/users/${user.userId}/databases`,
      newDatabase,
    );

    return response;
  }

  const { mutate: fetchDatabaseSave } = useMutation(handleClickSave, {
    onSuccess: result => {
      setCurrentDBId(result.data.newDatabase._id);

      queryClient.refetchQueries(["userDbList"]);

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
        <ModalTitle value="Create New Database" />
        <div className="flex justify-center">
          <div className="flex flex-col w-auto h-auto">
            <ModalLabel value="Database Name" />
            <ModalLabel value="Fields Name" />
          </div>
          <div className="flex flex-col justify-center items-center h-auto">
            <div className="flex justify-center items-center w-full p-2">
              <ModalInputArea>
                <input
                  className="flex w-full h-7 rounded-lg text-center"
                  maxLength={maxDatabaseNameLength}
                  onChange={event => setdbName(event.target.value)}
                />
              </ModalInputArea>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center">
                <div className="mb-5 p-2">
                  <CreateDBListSection
                    fields={fields}
                    updateFieldName={updateFieldName}
                    updateFieldType={updateFieldType}
                    handleClickDeleteField={handleClickDeleteField}
                  />
                  <ModalInputArea>
                    <Button
                      className="flex justify-center items-center h-7 p-2"
                      onClick={handleClickAddField}
                    >
                      <img src="/assets/add_icon.svg" alt="add button" />
                    </Button>
                  </ModalInputArea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
          onClick={fetchDatabaseSave}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
}

CreateDBModal.propTypes = {
  user: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CreateDBModal;
