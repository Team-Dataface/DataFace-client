/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";

function FieldWizard({
  fields,
  databaseName,
  relationData,
  setRelationData,
  fieldsName,
  setFieldsName,
  status,
}) {
  const [isSelected, setIsSelected] = useState("");
  const [updatedFields, setUpdatedFields] = useState(fields);

  function moveToFirstIndex(id) {
    const selectedFieldIndex = updatedFields.findIndex(
      field => field._id === id,
    );

    if (selectedFieldIndex !== -1) {
      const updatedFieldsCopy = [...updatedFields];
      const selectedField = updatedFieldsCopy.splice(selectedFieldIndex, 1)[0];

      updatedFieldsCopy.unshift(selectedField);
      setUpdatedFields(updatedFieldsCopy);
    }
  }

  function handleOnClick(id, name) {
    if (status === "base") {
      setRelationData({
        ...relationData,
        primaryFieldId: id,
      });

      setFieldsName({
        ...fieldsName,
        primaryFieldName: name,
      });
    }

    if (status === "target") {
      setRelationData({
        ...relationData,
        foreignFieldId: id,
      });

      setFieldsName({
        ...fieldsName,
        foreignFieldName: name,
      });
    }

    setIsSelected(id);
    moveToFirstIndex(id);
  }

  return (
    <div className="flex flex-col justify-center items-center w-[160px] my-10">
      <div className="flex flex-col w-full mb-2 border-2 rounded-md items-center bg-blue bg-opacity-50">
        <span className="flex font-bold py-1">{databaseName}</span>
      </div>
      <div className="flex flex-col items-center w-full max-h-[120px] border-2 rounded-md overflow-y-scroll">
        <ul className="w-full h-auto text-center">
          {updatedFields.map((field, index) => (
            <li
              key={field._id}
              onClick={() => handleOnClick(field._id, field.fieldName)}
              className={`w-full py-1 border-b-2 border-grey
              ${isSelected === field._id ? "bg-yellow" : ""}
              ${index === updatedFields.length - 1 ? "border-b-0" : ""}`}
            >
              {field.fieldName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FieldWizard;
