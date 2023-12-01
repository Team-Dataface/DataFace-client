import { useAtom } from "jotai";

import getTodaysDate from "../../../utils/getTodaysDate";

import { addDocumentFieldsAtom } from "../../../atoms/atoms";

import InputWrapper from "../SharedItems/InputWrapper";

function AddDocInputList() {
  const [addDocumentFields, setAddDocumentFields] = useAtom(
    addDocumentFieldsAtom,
  );

  function adjustTextareaHeight(event) {
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  function updateFieldValue(index, event) {
    const newAddDocumentFields = [...addDocumentFields];

    newAddDocumentFields[index].fieldValue = event.target.value;

    setAddDocumentFields(newAddDocumentFields);
    adjustTextareaHeight(event);
  }

  return addDocumentFields.map((element, index) => {
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
