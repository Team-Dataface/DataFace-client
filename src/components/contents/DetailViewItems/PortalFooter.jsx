import Button from "../../shared/Button";

function PortalFooter({ relationshipsData, setRelationshipsData, index }) {
  function handleClickSize(size) {
    const newArr = [...relationshipsData];

    newArr[index].portalSize = size;

    setRelationshipsData(newArr);
  }

  return (
    <div className="flex justify-between w-auto h-auto p-1 bg-black-bg">
      <div className="flex">
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => handleClickSize(80)}
        >
          small
        </Button>
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => handleClickSize(150)}
        >
          medium
        </Button>
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => handleClickSize(260)}
        >
          large
        </Button>
      </div>
      <span className="mx-1 text-white text-xs">portal list</span>
    </div>
  );
}

export default PortalFooter;
