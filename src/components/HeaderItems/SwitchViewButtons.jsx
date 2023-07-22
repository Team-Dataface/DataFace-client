import Button from "../shared/Button";

function SwitchViewButtons() {
  return (
    <div className="flex">
      <Button className="flex flex-row items-center w-[120px] h-9 mr-1 p-2 rounded-md bg-white hover:bg-yellow active:bg-yellow">
        <img className="ml-1" src="/assets/list_icon.svg" alt="list icon" />
        <span className="w-full">List View</span>
      </Button>
      <Button className="flex flex-row items-center w-[130px] h-9 mr-1 p-2 rounded-md bg-white hover:bg-yellow active:bg-yellow">
        <img className="ml-1" src="/assets/detail_icon.svg" alt="detail icon" />
        <span className="w-full">Detail View</span>
      </Button>
    </div>
  );
}

export default SwitchViewButtons;
