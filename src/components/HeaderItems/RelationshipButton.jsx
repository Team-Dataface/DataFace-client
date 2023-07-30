import { useNavigate } from "react-router-dom";

import Button from "../shared/Button";

function RelationshipButton({ isEditMode }) {
  const navigate = useNavigate();

  return (
    <Button
      className={`flex flex-row items-center w-[160px] h-9 p-2 rounded-md
      ${isEditMode ? "bg-dark-grey hover:none" : "bg-white hover:bg-yellow"}`}
      disabled={isEditMode}
      onClick={() => navigate("/dashboard/relationship")}
    >
      <img
        className="ml-1"
        src="/assets/relation_icon.svg"
        alt="relation icon"
      />
      <span className="w-full">DB Relation</span>
    </Button>
  );
}

export default RelationshipButton;
