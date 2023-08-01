/* eslint-disable no-else-return */
import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import Button from "../../shared/Button";

function DatabaseFields({
  fields,
  databaseName,
  primaryDbId,
  databaseId,
  dbIndex,
  relationships,
}) {
  const queryClient = useQueryClient();
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const [fieldNames, setFieldNames] = useState([]);
  const [relationId, setRelationId] = useState("");
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
    const foreignFieldName = relation?.foreignFieldName;
    const foreignDbId = relation?.foreignDbId;
    const _id = relation?._id;

    const selectedFieldIndex = fields.findIndex(
      field =>
        field.fieldName === foreignFieldName && databaseId === foreignDbId,
    );

    setRelationId(_id);

    if (selectedFieldIndex !== -1) {
      const updatedFieldsCopy = [...fields];
      const selectedField = updatedFieldsCopy.splice(selectedFieldIndex, 1)[0];

      updatedFieldsCopy.unshift(selectedField);

      return updatedFieldsCopy;
    } else {
      return fields;
    }
  });

  async function deleteRelationship() {
    await fetchData(
      "DELETE",
      `/users/${userId}/databases/${currentDBId}/relationships/${relationId}`,
    );
  }

  const { mutate: fetchDeleteRelationship } = useMutation(deleteRelationship, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList", currentDBId]);
      queryClient.refetchQueries(["dbRelationShips", currentDBId]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <div
      className={`relative group flex flex-col justify-center items-center w-72 mb-20
      ${primaryDbId === databaseId ? "rounded-md p-1" : ""}
      ${primaryDbId === databaseId ? "ring-4 ring-blue" : ""}
      ${primaryDbId !== databaseId ? "hover:rounded-md p-1" : ""}
      ${primaryDbId !== databaseId ? "hover:ring-4 ring-red" : ""}
      }
      ${databaseId !== primaryDbId && dbIndex === 0 ? "mt-8" : ""}`}
    >
      <div className="flex flex-col w-full mb-2 border-2 rounded-md items-center bg-blue bg-opacity-50">
        <span className="flex font-bold py-1">{databaseName}</span>
      </div>
      <Button
        className={`absolute -top-3 -right-3 flex w-6 h-6 hidden ${
          primaryDbId !== databaseId ? "group-hover:block" : ""
        }`}
        onClick={fetchDeleteRelationship}
      >
        <img className="" src="/assets/close_icon.svg" alt="close button" />
      </Button>
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
