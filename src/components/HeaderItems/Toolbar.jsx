import PropTypes from "prop-types";

import RelationButton from "./RelationButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";

function Toolbar({ currentDocIndex, clickHandleNavigator }) {
  return (
    <div className="flex justify-between items-center w-full h-full mr-3 bg-black-bg">
      <RelationButton />
      <DocHandlerButtons
        currentDocIndex={currentDocIndex}
        clickHandleNavigator={clickHandleNavigator}
      />
      <SwitchViewButtons />
    </div>
  );
}

Toolbar.propTypes = {
  currentDocIndex: PropTypes.number.isRequired,
  clickHandleNavigator: PropTypes.func.isRequired,
};

export default Toolbar;
