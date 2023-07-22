import Button from "../shared/Button";

function SaveButton() {
  return (
    <div className="flex w-20 justify-center items-center">
      <Button className="w-20 h-8 rounded-md ring-4 bg-white ring-blue hover:bg-blue">
        Save
      </Button>
    </div>
  );
}

export default SaveButton;
