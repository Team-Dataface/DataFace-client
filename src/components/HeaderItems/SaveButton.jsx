import PropTypes from "prop-types";

import Button from "../shared/Button";

function SaveButton({
  isEditMode,
  setIsEditMode,
  setIsOnSave,
  isRelationship,
}) {
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

SaveButton.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

export default SaveButton;
