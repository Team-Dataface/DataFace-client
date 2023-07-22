import Button from "../shared/Button";

function RelationButton() {
  return (
    <Button className="flex flex-row items-center w-[160px] h-9 p-2 rounded-md bg-white hover:bg-yellow active:bg-yellow">
      <img
        className="ml-1"
        src="/assets/relation_icon.svg"
        alt="relation icon"
      />
      <span className="w-full">DB Relation</span>
    </Button>
  );
}

export default RelationButton;
