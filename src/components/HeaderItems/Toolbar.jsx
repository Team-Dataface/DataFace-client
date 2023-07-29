import PropTypes from "prop-types";

import RelationButton from "./RelationButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";

function Toolbar({
  currentDocIndex,
  setCurrentDocIndex,
  documentsIds,
  setDocumentsIds,
}) {
  return (
    <div className="flex justify-between items-center w-full h-full mr-3 bg-black-bg">
      <RelationButton />
      <DocHandlerButtons
        currentDocIndex={currentDocIndex}
        setCurrentDocIndex={setCurrentDocIndex}
        documentsIds={documentsIds}
        setDocumentsIds={setDocumentsIds}
      />
      <SwitchViewButtons />
    </div>
  );
}

Toolbar.propTypes = {
  currentDocIndex: PropTypes.number.isRequired,
  setCurrentDocIndex: PropTypes.func.isRequired,
};

export default Toolbar;
