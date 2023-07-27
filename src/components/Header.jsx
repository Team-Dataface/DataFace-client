import PropTypes from "prop-types";

import LogoutButton from "./HeaderItems/LogoutButton";
import Toolbar from "./HeaderItems/Toolbar";
import SaveButton from "./HeaderItems/SaveButton";

function Header({
  clickHandleLogout,
  isEditMode,
  onClickSave,
  currentDocIndex,
  clickHandleNavigator,
  documentsIds,
}) {
  return (
    <div className="flex flex-col w-full h-min-[120px] bg-black-bg">
      <div className="flex flex-row justify-between items-center h-[50px] p-3 bg-black-bg">
        <img
          className="w-10"
          src="/assets/dataface_logo.png"
          alt="dataface logo"
        />
        <h1 className="text-white">Page Name</h1>
        <LogoutButton clickHandleLogout={clickHandleLogout} />
      </div>

      <div className="flex flex-row justify-between items-center h-[70px] p-3 bg-black-bg">
        <Toolbar
          currentDocIndex={currentDocIndex}
          clickHandleNavigator={clickHandleNavigator}
          documentsIds={documentsIds}
        />
        <SaveButton isEditMode={isEditMode} onClickSave={onClickSave} />
      </div>
    </div>
  );
}

Header.propTypes = {
  clickHandleLogout: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onClickSave: PropTypes.func.isRequired,
  currentDocIndex: PropTypes.number.isRequired,
  clickHandleNavigator: PropTypes.func.isRequired,
};

export default Header;
