import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

import { isEditModeAtom } from "../../atoms/atoms";
import Button from "../shared/Button";

function RelationshipButton({ isRelationship, setIsRelationship }) {
  const navigate = useNavigate();
  const isEditMode = useAtomValue(isEditModeAtom);

  function clickHandleRelationship() {
    setIsRelationship(true);
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
      <span className="w-full">{isRelationship ? "Back" : "Relationship"}</span>
    </Button>
  );
}

export default RelationshipButton;
