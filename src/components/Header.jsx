import { useAtomValue } from "jotai";
import PropTypes from "prop-types";

import { currentDBNameAtom } from "../atoms/atoms";

import LogoutButton from "./HeaderItems/LogoutButton";
import Toolbar from "./HeaderItems/Toolbar";
import SaveButton from "./HeaderItems/SaveButton";

function Header({
  clickHandleLogout,
  isEditMode,
  setIsEditMode,
  documentsIds,
  setDocumentsIds,
  setIsOnSave,
  isRelationship,
  setIsRelationship,
}) {
  const currentDBName = useAtomValue(currentDBNameAtom);

  return (
    <div className="flex flex-col w-full h-min-[120px] bg-black-bg">
      <div className="flex flex-row justify-between items-center h-[50px] p-3 bg-black-bg">
        <img
          className="w-10"
          src="/assets/dataface_logo.png"
          alt="dataface logo"
        />
        <span className="text-white">{currentDBName}</span>
        <LogoutButton clickHandleLogout={clickHandleLogout} />
      </div>

      <div className="flex flex-row justify-between items-center h-[70px] p-3 bg-black-bg">
        {currentDBName && (
          <Toolbar
            isEditMode={isEditMode}
            documentsIds={documentsIds}
            setDocumentsIds={setDocumentsIds}
            isRelationship={isRelationship}
            setIsRelationship={setIsRelationship}
          />
        )}
        {currentDBName && (
          <SaveButton
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            setIsOnSave={setIsOnSave}
            isRelationship={isRelationship}
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
};

export default Header;
