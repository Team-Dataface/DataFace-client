import { useSetAtom, useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

import { isEditModeAtom, currentViewAtom } from "../../atoms/atoms";
import Button from "../shared/Button";

function RelationshipButton() {
  const navigate = useNavigate();
  const setCurrentView = useSetAtom(currentViewAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  function clickHandleRelationship() {
    setCurrentView("relationship");
    navigate("/dashboard/relationship");
  }

  return (
    <Button
      className={`flex flex-row items-center w-[160px] h-9 p-2 rounded-md
      ${isEditMode ? "bg-dark-grey hover:none" : "bg-white hover:bg-yellow"}`}
      disabled={isEditMode}
      onClick={clickHandleRelationship}
    >
      <img
        className="ml-1"
        src="/assets/relation_icon.svg"
        alt="relation icon"
      />
      <span className="w-full">Relationship</span>
    </Button>
  );
}

export default RelationshipButton;
