import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useMutation } from "@tanstack/react-query";
import fetchData from "../../utils/axios";

import Button from "../shared/Button";
import CreateFields from "./CreateFields";

import CONSTANT from "../../constants/constant";

const { maxDatabaseNameLength } = CONSTANT;

function CreateDB({ user }) {
  const navigate = useNavigate();
  const [dbName, setdbName] = useState(null);
  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      name: "",
      type: "Text",
    },
  ]);

  function updateFieldName(index, event) {
    const newArr = [...fields];
    newArr[index].name = event.target.value;

    setFields(newArr);
  }

  function updateFieldType(index, event) {
    const newArr = [...fields];
    newArr[index].type = event.target.value;

    setFields(newArr);
  }

  function handleClickAddField() {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        name: "",
        type: "Text",
      },
    ]);
  }

  function handleClickDeleteField(index) {
    if ([...fields].length === 1) {
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
      if (!element.name) {
        alert("Field's name cannot be empty");
      }
    });

    const createDatabaseObj = {
      dbName,
      fields,
    };

    await fetchData("POST", `/users/${user}/databases`, createDatabaseObj);
  }

  const { mutate } = useMutation(handleClickSave, {
    onSuccess: () => {
      navigate("/dashboard/listview");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex text-xl font-bold mb-5">Create New Database</h1>
      <div className="flex justify-center">
        <div className="flex flex-col items-end w-auto h-auto mr-3">
          <div className="flex items-center h-16">
            <span className="flex items-center">Database Name</span>
          </div>
          <div className="flex items-center h-16">
            <span className="h-7">Fields Name</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-auto">
          <div className="flex justify-center items-center w-full h-16 p-3">
            <div className="flex justify-center items-center w-full p-1 px-3 rounded-lg ring-2 ring-grey">
              <input
                className="flex w-full h-7 rounded-lg text-center"
                maxLength={maxDatabaseNameLength}
                onChange={event => setdbName(event.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center p-3">
              <CreateFields
                fields={fields}
                updateFieldName={updateFieldName}
                updateFieldType={updateFieldType}
                handleClickDeleteField={handleClickDeleteField}
              />
              <Button
                className="flex justify-center items-center w-full mb-5 p-1 px-3 rounded-lg ring-2 ring-grey"
                onClick={handleClickAddField}
              >
                <div className="h-7"></div>
                <img src="assets/add_icon.svg" alt="add button" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
          onClick={mutate}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateDB;
