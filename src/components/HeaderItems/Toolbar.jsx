import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";

import { currentViewAtom, isEditModeAtom } from "../../atoms/atoms";

import RelationshipButton from "./RelationshipButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";
import Button from "../shared/Button";

function Toolbar() {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useAtom(currentViewAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  function clickHandelBackButton() {
    setCurrentView("list");
    navigate("/dashboard/listview");
  }

  return (
    <>
      <Button
        className={`flex flex-row justify-center items-center w-[100px] h-9 p-2 rounded-md bg-white
        ${currentView !== "relationship" && "hidden"}`}
        onClick={clickHandelBackButton}
        disabled={isEditMode}
      >
        Back
      </Button>
      <div
        className={`flex justify-between items-center w-full h-full mr-3 bg-black-bg
        ${currentView === "relationship" && "hidden"}`}
      >
        <RelationshipButton />
        <DocHandlerButtons />
        <SwitchViewButtons />
      </div>
    </>
  );
}

export default Toolbar;
