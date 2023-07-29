import PropTypes from "prop-types";

import LogoutButton from "./HeaderItems/LogoutButton";
import Toolbar from "./HeaderItems/Toolbar";
import SaveButton from "./HeaderItems/SaveButton";

function Header({
  clickHandleLogout,
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  setCurrentDocIndex,
  documentsIds,
  setDocumentsIds,
  setIsOnSave,
  currentDBName,
}) {
  return (
    <div className="flex flex-col w-full h-min-[120px] bg-black-bg">
      <div className="flex flex-row justify-between items-center h-[50px] p-3 bg-black-bg">
        <img
          className="w-10"
          src="/assets/dataface_logo.png"
          alt="dataface logo"
        />
        <h1 className="text-white">{currentDBName}</h1>
        <LogoutButton clickHandleLogout={clickHandleLogout} />
      </div>

      <div className="flex flex-row justify-between items-center h-[70px] p-3 bg-black-bg">
        {currentDBName && (
          <Toolbar
            isEditMode={isEditMode}
            currentDocIndex={currentDocIndex}
            setCurrentDocIndex={setCurrentDocIndex}
            documentsIds={documentsIds}
            setDocumentsIds={setDocumentsIds}
          />
        )}
        {currentDBName && (
          <SaveButton
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            setIsOnSave={setIsOnSave}
          />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  clickHandleLogout: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  currentDocIndex: PropTypes.number.isRequired,
  setCurrentDocIndex: PropTypes.func.isRequired,
};

export default Header;
