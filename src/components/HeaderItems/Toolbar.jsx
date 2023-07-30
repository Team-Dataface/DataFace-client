import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import RelationshipButton from "./RelationshipButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";
import Button from "../shared/Button";

function Toolbar({
  isListView,
  setIsListView,
  isEditMode,
  currentDocIndex,
  setCurrentDocIndex,
  documentsIds,
  setDocumentsIds,
  isRelationship,
  setIsRelationship,
}) {
  const navigate = useNavigate();

  function clickHandelBackButton() {
    setIsRelationship(false);
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
          currentDocIndex={currentDocIndex}
          setCurrentDocIndex={setCurrentDocIndex}
          documentsIds={documentsIds}
          setDocumentsIds={setDocumentsIds}
        />
        <SwitchViewButtons
          isEditMode={isEditMode}
          isListView={isListView}
          setIsListView={setIsListView}
        />
      </div>
    </>
  );
}

Toolbar.propTypes = {
  currentDocIndex: PropTypes.number.isRequired,
  setCurrentDocIndex: PropTypes.func.isRequired,
};

export default Toolbar;
