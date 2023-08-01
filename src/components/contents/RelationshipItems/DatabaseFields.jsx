/* eslint-disable no-else-return */
import { useState } from "react";

function DatabaseFields({
  fields,
  databaseName,
  primaryDbId,
  databaseId,
  dbIndex,
  relationships,
}) {
  const [fieldNames, setFieldNames] = useState([]);
  const [updatedFields, setUpdatedFields] = useState(() => {
    if (primaryDbId === databaseId) {
      const primaryFieldNames = relationships.map(
        relation => relation.primaryFieldName,
      );
      const updatedFieldsCopy = fields.filter(
        field => !primaryFieldNames.includes(field.fieldName),
      );
      const primaryField = fields.filter(field =>
        primaryFieldNames.includes(field.fieldName),
      );

      primaryField.forEach(fieldNmae => updatedFieldsCopy.unshift(fieldNmae));

      setFieldNames(primaryFieldNames);

      return updatedFieldsCopy;
    }

    const relation = relationships.find(
      item => item.foreignDbId === databaseId,
    );
    const { foreignFieldName, foreignDbId } = relation;

    const selectedFieldIndex = fields.findIndex(
      field =>
        field.fieldName === foreignFieldName && databaseId === foreignDbId,
    );

    if (selectedFieldIndex !== -1) {
      const updatedFieldsCopy = [...fields];
      const selectedField = updatedFieldsCopy.splice(selectedFieldIndex, 1)[0];

      updatedFieldsCopy.unshift(selectedField);

      return updatedFieldsCopy;
    } else {
      return fields;
    }
  });

  return (
    <div
      className={`flex flex-col justify-center items-center w-72
      ${primaryDbId === databaseId ? "rounded-md p-1" : ""} ${
        primaryDbId === databaseId ? "border-4 border-blue" : ""
      }
      ${databaseId !== primaryDbId && dbIndex === 0 ? "mt-8" : ""}`}
    >
      <div className="flex flex-col w-full mb-2 border-2 rounded-md items-center bg-blue bg-opacity-50">
        <span className="flex font-bold py-1">{databaseName}</span>
      </div>
      <div className="flex flex-col items-center w-full max-h-56 border-2 rounded-md overflow-y-scroll">
        <ul className="w-full h-auto text-center">
          {updatedFields?.map((field, index) => (
            <li
              key={field._id}
              className={`w-full py-1 border-b-2 border-grey
              ${fieldNames.includes(field.fieldName) ? "bg-yellow" : ""}
              ${index === 0 ? "bg-yellow" : ""}
              ${index === fields.length - 1 ? "border-b-0" : ""}`}
            >
              {field.fieldName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DatabaseFields;
