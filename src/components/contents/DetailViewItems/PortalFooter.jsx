import { useAtom } from "jotai";

import { relationshipsDataAtom } from "../../../atoms/atoms";

import Button from "../../shared/Button";

function PortalFooter({ index }) {
  const [relationshipsData, setRelationshipsData] = useAtom(
    relationshipsDataAtom,
  );

  function handleClickSize(size) {
    const newRelationshipData = [...relationshipsData];

    newRelationshipData[index].portalSize = size;

    setRelationshipsData(newRelationshipData);
  }

  return (
    <div className="flex justify-between w-full h-auto p-1 bg-black-bg">
      <div className="flex">
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => handleClickSize(83)}
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
