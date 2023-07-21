import Button from "../shared/Button";

function DocHandlerButtons() {
  return (
    <div className="flex">
      <Button className="mx-4">Left</Button>
      <h1>index</h1>
      <Button className="mx-4">Right</Button>
      <Button className="+ mx-4">+</Button>
      <Button className="- mx-4">-</Button>
    </div>
  );
}

export default DocHandlerButtons;
