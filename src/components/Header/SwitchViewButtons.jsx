import Button from "../shared/Button";

function SwitchViewButtons() {
  return (
    <div className="flex">
      <Button className="mx-4">list</Button>
      <Button className="mx-4">detail</Button>
    </div>
  );
}

export default SwitchViewButtons;
