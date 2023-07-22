import Button from "../shared/Button";

function DocHandlerButtons() {
  return (
    <div className="flex items-center">
      <Button className="flex justify-center items-center w-8 h-8 mr-1 rounded-md hover:bg-dark-grey">
        <img src="/assets/left_icon.svg" alt="left icon" />
      </Button>
      <span className="flex justify-center items-center w-20 h-8 mr-1 rounded-md bg-white">
        0 / 0
      </span>
      <Button className="flex justify-center items-center w-8 h-8 mr-1 rounded-md hover:bg-dark-grey">
        <img src="/assets/right_icon.svg" alt="right icon" />
      </Button>
      <Button className="flex justify-center items-center w-8 h-8 mr-1 rounded-md bg-white hover:bg-yellow">
        <img src="/assets/plus.svg" alt="plus icon" />
      </Button>
      <Button className="flex justify-center items-center w-8 h-8 rounded-md bg-white hover:bg-yellow">
        <img src="/assets/minus.svg" alt="minus icon" />
      </Button>
    </div>
  );
}

export default DocHandlerButtons;
