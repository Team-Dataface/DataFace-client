import { useAtom, useAtomValue } from "jotai";

import { isEditModeAtom, isRelationshipAtom } from "../../atoms/atoms";
import usePutSaveChangedData from "../../apis/usePutSaveChangedData";

import Button from "../shared/Button";

function SaveButton() {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const isRelationship = useAtomValue(isRelationshipAtom);
  const fetchSaveChangedData = usePutSaveChangedData();

  return (
    <div
      className={`flex w-20 justify-center items-center
    ${isRelationship && "hidden"}`}
    >
      <Button
        className={`w-20 h-8 rounded-md bg-white
        ${isEditMode ? "ring-4 ring-blue hover:bg-blue" : ""}`}
        onClick={() => {
          if (isEditMode) {
            fetchSaveChangedData();
          }
          setIsEditMode(!isEditMode);
        }}
      >
        {isEditMode ? "Save" : "Edit"}
      </Button>
    </div>
  );
}

export default SaveButton;
