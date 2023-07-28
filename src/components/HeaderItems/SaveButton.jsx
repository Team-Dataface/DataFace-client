import PropTypes from "prop-types";

import Button from "../shared/Button";

function SaveButton({ isEditMode, onClickSave }) {
  return (
    <div className="flex w-20 justify-center items-center">
      <Button
        className={`w-20 h-8 rounded-md ring-4 bg-white ring-blue hover:bg-blue
        ${isEditMode ? "" : "hidden"}`}
        onClick={() => onClickSave(false)}
      >
        Save
      </Button>
    </div>
  );
}

SaveButton.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  onClickSave: PropTypes.func.isRequired,
};

export default SaveButton;
