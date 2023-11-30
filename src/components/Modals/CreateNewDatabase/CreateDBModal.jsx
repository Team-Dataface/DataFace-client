import { useState } from "react";
import { useSetAtom, useAtom } from "jotai";

import {
  showCreateDBModalAtom,
  createDBFieldsAtom,
} from "../../../atoms/atoms";
import usePostDB from "../../../apis/usePostDB";

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

import CONSTANT from "../../../constants/constant";

function CreateDBModal() {
  const fetchNewDatabase = usePostDB();
  const [DBName, setDBName] = useState(null);
  const [createDBFields, setCreateDBFields] = useAtom(createDBFieldsAtom);

  const [isDBNameEmpty, setIsDBNameEmpty] = useState(false);
  const [isFieldNameEmpty, setIsFieldNameEmpty] = useState(false);
  const [isFieldNameDuplicate, setIsFieldNameDuplicate] = useState(false);

  const setShowCreateDBModal = useSetAtom(showCreateDBModalAtom);

  function updateFieldName(index, event) {
    const newFields = [...createDBFields];
    newFields[index].fieldName = event.target.value;

    setIsDBNameEmpty(false);
    setIsFieldNameEmpty(false);
    setIsFieldNameDuplicate(false);

    setCreateDBFields(newFields);
  }

  function handleClickAddField() {
    setCreateDBFields([
      ...createDBFields,
      {
        id: crypto.randomUUID(),
        fieldName: "",
        fieldType: "Text",
      },
    ]);
  }

  function handleClickSave() {
    const names = [];
    let allNamesFilled = true;

    if (!DBName) {
      setIsDBNameEmpty(true);
      allNamesFilled = false;

      return;
    }

    createDBFields.forEach(element => {
      if (!element.fieldName) {
        setIsFieldNameEmpty(true);

        allNamesFilled = false;
      }

      names.push(element.fieldName);
    });

    if (allNamesFilled) {
      const fieldsSet = new Set(names);

      if (createDBFields.length !== fieldsSet.size) {
        setIsFieldNameDuplicate(true);

        return;
      }

      const newDatabase = {
        DBName,
        fields: createDBFields,
      };

      fetchNewDatabase(newDatabase);
    }
  }

  function handleOnDBNameChange(event) {
    setIsDBNameEmpty(false);
    setIsFieldNameEmpty(false);
    setIsFieldNameDuplicate(false);

    setDBName(event.target.value);
  }

  return (
    <Modal onClick={() => setShowCreateDBModal(false)}>
      <ContentWrapper>
        <Title>Create New Database</Title>
        <Content>
          <LabelArea>
            <Label>Database Name</Label>
            <Label>Field Name</Label>
          </LabelArea>
          <InputsArea>
            <InputWrapper>
              <input
                id="Database Name"
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
