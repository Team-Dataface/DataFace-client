/* eslint-disable no-else-return */
import { useState } from "react";
import { useAtomValue, useAtom, useSetAtom } from "jotai";

import {
  currentDBIdAtom,
  relationshipsAtom,
  deleteTargetRelationshipAtom,
  showDeleteRelationshipModalAtom,
} from "../../../atoms/atoms";

import Button from "../../shared/Button";
import DeleteRelationshipModal from "../../Modals/DeleteRelationship/DeleteRelationshipModal";

function DatabaseFields({ fields, databaseName, databaseId, dbIndex }) {
  const currentDBId = useAtomValue(currentDBIdAtom);
  const relationships = useAtomValue(relationshipsAtom);

  const setDeleteTargetRelationship = useSetAtom(deleteTargetRelationshipAtom);
  const [showDeleteRelationshipModal, setShowDeleteRelationshipModal] = useAtom(
    showDeleteRelationshipModalAtom,
  );
  const [fieldNames, setFieldNames] = useState([]);
  const [updatedFields, setUpdatedFields] = useState(() => {
    if (currentDBId === databaseId) {
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

    setDeleteTargetRelationship(_id);

    if (selectedFieldIndex !== -1) {
      const updatedFieldsCopy = [...fields];
      const selectedField = updatedFieldsCopy.splice(selectedFieldIndex, 1)[0];

      updatedFieldsCopy.unshift(selectedField);

      return updatedFieldsCopy;
    } else {
      return fields;
    }
  });

  function handleClickDelete() {
    setShowDeleteRelationshipModal(true);
  }

  return (
    <div
      className={`
        relative group flex flex-col justify-center items-center w-64 mb-20
        ${currentDBId === databaseId ? "rounded-md p-1 ring-4 ring-blue" : ""}
        ${
          currentDBId !== databaseId
            ? "hover:rounded-md p-1 hover:ring-4 ring-red"
            : ""
        }
        ${databaseId !== currentDBId && dbIndex === 0 ? "mt-8" : ""}
      `}
    >
      <div className="flex flex-col w-full mb-2 border-2 rounded-md items-center bg-blue bg-opacity-50">
        <span className="flex font-bold py-1">{databaseName}</span>
      </div>
      <Button
        className={`absolute -top-3 -right-3 w-6 h-6 hidden ${
          currentDBId !== databaseId ? "group-hover:flex" : ""
        }`}
        onClick={() => handleClickDelete()}
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
      {showDeleteRelationshipModal && <DeleteRelationshipModal />}
    </div>
  );
}

export default DatabaseFields;
