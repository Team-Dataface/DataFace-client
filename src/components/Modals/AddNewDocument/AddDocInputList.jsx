import { useAtom } from "jotai";

import getTodaysDate from "../../../utils/getTodaysDate";

import { fieldsAtom } from "../../../atoms/atoms";

import InputWrapper from "../SharedItems/InputWrapper";
import useGetSingleDatabase from "../../../apis/useGetSingleDatabase";

function AddDocInputList() {
  const [fields, setFields] = useAtom(fieldsAtom);

  useGetSingleDatabase();

  function adjustTextareaHeight(event) {
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  function updateFieldValue(index, event) {
    const newFields = [...fields];

    newFields[index].fieldValue = event.target.value;

    setFields(newFields);
    adjustTextareaHeight(event);
  }

  return fields.map((element, index) => {
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
