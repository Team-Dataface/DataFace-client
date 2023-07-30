import { useNavigate } from "react-router-dom";

import Button from "../shared/Button";

function SwitchViewButtons({ isListView, setIsListView, isEditMode }) {
  const navigate = useNavigate();

  function switchToListView() {
    setIsListView(true);
    navigate("/dashboard/listview");
  }

  function switchToDetailView() {
    setIsListView(false);
    navigate("/dashboard/detailview");
  }

  return (
    <div className="flex">
      <Button
        className={`flex flex-row items-center w-[120px] h-9 mr-1 p-2 rounded-md
        ${isListView && isEditMode && "bg-dark-grey"}
        ${isListView && !isEditMode && "bg-yellow"}
        ${!isListView && isEditMode && "bg-dark-grey"}
        ${!isListView && !isEditMode && "bg-white"}`}
        onClick={switchToListView}
        disabled={isEditMode}
      >
        <img className="ml-1" src="/assets/list_icon.svg" alt="list icon" />
        <span className="w-full">List View</span>
      </Button>
      <Button
        className={`flex flex-row items-center w-[130px] h-9 mr-1 p-2 rounded-md
        ${!isListView && isEditMode && "bg-dark-grey"}
        ${!isListView && !isEditMode && "bg-yellow"}
        ${isListView && isEditMode && "bg-dark-grey"}
        ${isListView && !isEditMode && "bg-white"}`}
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
