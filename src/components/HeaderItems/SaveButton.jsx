import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  isEditModeAtom,
  isOnSaveAtom,
  isRelationshipAtom,
} from "../../atoms/atoms";

import Button from "../shared/Button";

function SaveButton() {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const setIsOnSave = useSetAtom(isOnSaveAtom);
  const isRelationship = useAtomValue(isRelationshipAtom);

  return (
    <div
      className={`flex w-20 justify-center items-center
    ${isRelationship && "hidden"}`}
    >
      <Button
        className={`w-20 h-8 rounded-md bg-white
        ${isEditMode ? "ring-4 ring-blue hover:bg-blue" : ""}`}
        onClick={() => {
          setIsOnSave(true);
          setIsEditMode(!isEditMode);
        }}
      >
        {isEditMode ? "Save" : "Edit"}
      </Button>
    </div>
  );
}

export default SaveButton;
