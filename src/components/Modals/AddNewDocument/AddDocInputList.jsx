import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useAtom } from "jotai";

import fetchData from "../../../utils/axios";
import getTodaysDate from "../../../utils/getTodaysDate";

import { currentDBIdAtom, userAtom, fieldsAtom } from "../../../atoms/atoms";

import InputWrapper from "../SharedItems/InputWrapper";
import Loading from "../../shared/Loading";

function AddDocInputList() {
  const [fields, setFields] = useAtom(fieldsAtom);
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  function adjustTextareaHeight(event) {
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  function updateFieldValue(index, event) {
    const newFields = [...fields];

    newFields[index].fieldValue = event.target.value;

    setFields(newFields);
    adjustTextareaHeight(event);
  }

  async function getDatabase() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents[0];
  }

  const { data, isLoading } = useQuery(["userDb", currentDBId], getDatabase, {
    enabled: !!userId && !!currentDBId,
    onSuccess: result => {
      setFields(result.fields);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return data.fields.map((element, index) => {
    return (
      <div key={element._id} className="flex w-[500px]">
        <span
          className="flex justify-end items-center w-[150px] mr-3 text-right"
          type="text"
        >
          {element.fieldName}
        </span>
        <InputWrapper>
          {element.fieldType === "Text" ? (
            <textarea
              className="flex w-full h-7 rounded-md text-center"
              onChange={event => updateFieldValue(index, event)}
            />
          ) : (
            <input
              className="flex w-full h-7 rounded-md text-center"
              type={element.fieldType}
              onChange={event => updateFieldValue(index, event)}
              defaultValue={
                element.fieldType === "Date modified" ||
                element.fieldType === "Date created"
                  ? getTodaysDate()
                  : ""
              }
              disabled={
                element.fieldType === "Date modified" ||
                element.fieldType === "Date created"
              }
            />
          )}
        </InputWrapper>
      </div>
    );
  });
}

export default AddDocInputList;
