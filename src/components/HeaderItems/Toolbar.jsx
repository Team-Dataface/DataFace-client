import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  isListViewAtom,
  isEditModeAtom,
  isRelationshipAtom,
} from "../../atoms/atoms";

import RelationshipButton from "./RelationshipButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";
import Button from "../shared/Button";

function Toolbar({ documentsIds, setDocumentsIds }) {
  const navigate = useNavigate();

  const [isRelationship, setIsRelationship] = useAtom(isRelationshipAtom);
  const setIsListView = useSetAtom(isListViewAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  function clickHandelBackButton() {
    setIsRelationship(false);
    setIsListView(true);
    navigate("/dashboard/listview");
  }

  return (
    <>
      <Button
        className={`flex flex-row justify-center items-center w-[100px] h-9 p-2 rounded-md bg-white
        ${!isRelationship && "hidden"}`}
        onClick={clickHandelBackButton}
        disabled={isEditMode}
      >
        Back
      </Button>
      <div
        className={`flex justify-between items-center w-full h-full mr-3 bg-black-bg
        ${isRelationship && "hidden"}`}
      >
        <RelationshipButton />
        <DocHandlerButtons
          documentsIds={documentsIds}
          setDocumentsIds={setDocumentsIds}
        />
        <SwitchViewButtons />
      </div>
    </>
  );
}

export default Toolbar;
