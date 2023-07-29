import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import Modal from "../../shared/Modal";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import LabelArea from "../SharedItems/LabelArea";
import Label from "../SharedItems/Label";
import InputsArea from "../SharedItems/InputsArea";
import InputWrapper from "../SharedItems/InputWrapper";
import CreateDBInputList from "./CreateDBInputList";
import Button from "../../shared/Button";
import Loading from "../../shared/Loading";

import CONSTANT from "../../../constants/constant";

function CreateDBModal({ closeModal, setCurrentDBId, setCurrentDBName }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

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
    const names = [];

    if (!dbName) {
      alert("Database's name cannot be empty");
    }

    fields.forEach(element => {
      names.push(element.fieldName);

      if (!element.fieldName) {
        alert("Field's name cannot be empty");
      }
    });

    const fieldsSet = new Set(names);

    if (fields.length !== fieldsSet.size) {
      alert("Field's name cannot be same");

      return null;
    }

    const newDatabase = {
      dbName,
      fields,
    };

    const response = await fetchData(
      "POST",
      `/users/${userId}/databases`,
      newDatabase,
    );

    return response;
  }

  const { mutate: fetchDatabaseSave, isLoading } = useMutation(
    handleClickSave,
    {
      onSuccess: result => {
        setCurrentDBId(result.data.newDatabase._id);
        setCurrentDBName(result.data.newDatabase.name);

        queryClient.refetchQueries(["userDbList"]);

        navigate("/dashboard/listview");

        closeModal();
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal onClick={closeModal}>
      <ContentWrapper>
        <Title value="Create New Database" />
        <Content>
          <LabelArea>
            <Label value="Database Name" />
            <Label value="Fields Name" />
          </LabelArea>
          <InputsArea>
            <InputWrapper>
              <input
                className="flex w-full h-7 rounded-lg text-center"
                maxLength={CONSTANT.MAX_DATABASE_NAME_LENGTH}
                onChange={event => setdbName(event.target.value)}
              />
            </InputWrapper>
            <CreateDBInputList
              fields={fields}
              updateFieldName={updateFieldName}
              updateFieldType={updateFieldType}
              handleClickDeleteField={handleClickDeleteField}
            />
            <InputWrapper>
              <Button
                className="flex justify-center items-center h-7 p-2"
                onClick={handleClickAddField}
              >
                <img src="/assets/add_icon.svg" alt="add button" />
              </Button>
            </InputWrapper>
          </InputsArea>
        </Content>
        <Button
          className="w-20 h-8 mt-5 rounded-md bg-black-bg text-white hover:bg-dark-grey"
          onClick={fetchDatabaseSave}
        >
          Submit
        </Button>
      </ContentWrapper>
    </Modal>
  );
}

CreateDBModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setCurrentDBId: PropTypes.func.isRequired,
};

export default CreateDBModal;
