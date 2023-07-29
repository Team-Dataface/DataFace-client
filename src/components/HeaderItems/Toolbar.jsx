import PropTypes from "prop-types";

import RelationButton from "./RelationButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";

function Toolbar({
  isEditMode,
  currentDocIndex,
  setCurrentDocIndex,
  documentsIds,
  setDocumentsIds,
}) {
  return (
    <div className="flex justify-between items-center w-full h-full mr-3 bg-black-bg">
      <RelationButton isEditMode={isEditMode} />
      <DocHandlerButtons
        isEditMode={isEditMode}
        currentDocIndex={currentDocIndex}
        setCurrentDocIndex={setCurrentDocIndex}
        documentsIds={documentsIds}
        setDocumentsIds={setDocumentsIds}
      />
      <SwitchViewButtons isEditMode={isEditMode} />
    </div>
  );
}

Toolbar.propTypes = {
  currentDocIndex: PropTypes.number.isRequired,
  setCurrentDocIndex: PropTypes.func.isRequired,
};

export default Toolbar;
