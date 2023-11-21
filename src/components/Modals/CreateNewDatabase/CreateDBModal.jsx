import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom, useAtomValue, useAtom } from "jotai";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../../../utils/axios";
import {
  currentDBIdAtom,
  isListViewAtom,
  currentDBNameAtom,
  userAtom,
  showCreateDBModalAtom,
  dbFieldsAtom,
} from "../../../atoms/atoms";

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

function CreateDBModal() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useAtomValue(userAtom);

  const [dbName, setdbName] = useState(null);
  const [fields, setFields] = useAtom(dbFieldsAtom);

  const [isDBNameEmpty, setIsDBNameEmpty] = useState(false);
  const [isFieldNameEmpty, setIsFieldNameEmpty] = useState(false);
  const [isFieldNameDuplicate, setIsFieldNameDuplicate] = useState(false);

  const setIsListView = useSetAtom(isListViewAtom);
  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setShowCreateDBModal = useSetAtom(showCreateDBModalAtom);

  function updateFieldName(index, event) {
    const newFields = [...fields];
    newFields[index].fieldName = event.target.value;

    setIsDBNameEmpty(false);
    setIsFieldNameEmpty(false);
    setIsFieldNameDuplicate(false);

    setFields(newFields);
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

  async function fetchDatabase(newDatabase) {
    const response = await fetchData(
      "POST",
      `/users/${userId}/databases`,
      newDatabase,
    );

    return response;
  }

  const { mutate: fetchDatabaseSave, isLoading } = useMutation(fetchDatabase, {
    onSuccess: result => {
      setCurrentDBId(result.data.newDatabase._id);
      setCurrentDBName(result.data.newDatabase.name);
      setIsListView(true);

      queryClient.refetchQueries(["userDbList"]);

      navigate("/dashboard/listview");

      setShowCreateDBModal(false);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  function handleClickSave() {
    const names = [];
    let allNamesFilled = true;

    if (!dbName) {
      setIsDBNameEmpty(true);
      allNamesFilled = false;

      return;
    }

    fields.forEach(element => {
      if (!element.fieldName) {
        setIsFieldNameEmpty(true);

        allNamesFilled = false;
      }

      names.push(element.fieldName);
    });

    if (allNamesFilled) {
      const fieldsSet = new Set(names);

      if (fields.length !== fieldsSet.size) {
        setIsFieldNameDuplicate(true);

        return;
      }

      const newDatabase = {
        dbName,
        fields,
      };

      fetchDatabaseSave(newDatabase);
    }
  }

  function handleOnDBNameChange(event) {
    setIsDBNameEmpty(false);
    setIsFieldNameEmpty(false);
    setIsFieldNameDuplicate(false);

    setdbName(event.target.value);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal onClick={() => setShowCreateDBModal(false)}>
      <ContentWrapper>
        <Title>Create New Database</Title>
        <Content>
          <LabelArea>
            <Label>Database Name</Label>
            <Label>Fields Name</Label>
          </LabelArea>
          <InputsArea>
            <InputWrapper>
              <input
                className="flex w-full h-7 rounded-lg text-center"
                maxLength={CONSTANT.MAX_DATABASE_NAME_LENGTH}
                onChange={event => handleOnDBNameChange(event)}
              />
            </InputWrapper>
            {isDBNameEmpty && (
              <p className="text-red text-sm">
                {`Database's name cannot be empty.`}
              </p>
            )}
            <CreateDBInputList updateFieldName={updateFieldName} />
            {isFieldNameEmpty && (
              <p className="text-red text-sm">{`Field's name cannot be empty.`}</p>
            )}
            {isFieldNameDuplicate && (
              <p className="text-red text-sm">
                {`Field's name cannot be same.`}
              </p>
            )}
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
          onClick={handleClickSave}
        >
          Submit
        </Button>
      </ContentWrapper>
    </Modal>
  );
}

export default CreateDBModal;
