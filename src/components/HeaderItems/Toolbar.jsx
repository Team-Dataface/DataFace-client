import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import { isListViewAtom } from "../../atoms/atoms";

import RelationshipButton from "./RelationshipButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";
import Button from "../shared/Button";

function Toolbar({
  isEditMode,
  documentsIds,
  setDocumentsIds,
  isRelationship,
  setIsRelationship,
}) {
  const navigate = useNavigate();

  const setIsListView = useSetAtom(isListViewAtom);

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
        <RelationshipButton
          isEditMode={isEditMode}
          isRelationship={isRelationship}
          setIsRelationship={setIsRelationship}
        />
        <DocHandlerButtons
          isEditMode={isEditMode}
          documentsIds={documentsIds}
          setDocumentsIds={setDocumentsIds}
        />
        <SwitchViewButtons isEditMode={isEditMode} />
      </div>
    </>
  );
}

export default Toolbar;
