import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";

import { currentViewAtom, isEditModeAtom } from "../../atoms/atoms";

import Button from "../shared/Button";

function SwitchViewButtons() {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useAtom(currentViewAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  function switchToListView() {
    setCurrentView("list");
    navigate("/dashboard/listview");
  }

  function switchToDetailView() {
    setCurrentView("detail");
    navigate("/dashboard/detailview");
  }

  console.log(currentView);

  return (
    <div className="flex">
      <Button
        className={`flex flex-row items-center w-[120px] h-9 mr-1 p-2 rounded-md
        ${!isEditMode && currentView === "list" && "bg-yellow"}
        ${!isEditMode && currentView !== "list" && "bg-white"}
        ${isEditMode && "bg-dark-grey"}`}
        onClick={switchToListView}
        disabled={isEditMode}
      >
        <img className="ml-1" src="/assets/list_icon.svg" alt="list icon" />
        <span className="w-full">List View</span>
      </Button>
      <Button
        className={`flex flex-row items-center w-[130px] h-9 mr-1 p-2 rounded-md
        ${!isEditMode && currentView === "detail" && "bg-yellow"}
        ${!isEditMode && currentView !== "detail" && "bg-white"}
        ${isEditMode && "bg-dark-grey"}`}
        onClick={switchToDetailView}
        disabled={isEditMode}
      >
        <img className="ml-1" src="/assets/detail_icon.svg" alt="detail icon" />
        <span className="w-full">Detail View</span>
      </Button>
    </div>
  );
}

export default SwitchViewButtons;
