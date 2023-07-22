import Button from "../shared/Button";

function SwitchViewButtons() {
  return (
    <div className="flex">
      <Button className="flex flex-row items-center w-[80px] h-9 mr-1 p-2 rounded-md bg-white hover:bg-yellow active:bg-yellow">
        <img className="ml-1" src="/assets/list_icon.svg" alt="list icon" />
        <span className="w-full">list</span>
      </Button>
      <Button className="flex flex-row items-center w-[80px] h-9 mr-1 p-2 rounded-md bg-white hover:bg-yellow active:bg-yellow">
        <img className="ml-1" src="/assets/detail_icon.svg" alt="detail icon" />
        <span className="w-full">detail</span>
      </Button>
    </div>
  );
}

export default SwitchViewButtons;
