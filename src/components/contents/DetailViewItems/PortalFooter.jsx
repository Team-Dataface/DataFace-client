import Button from "../../shared/Button";

function PortalFooter({ setRelationshipsData }) {
  return (
    <div className="flex justify-between w-auto h-auto p-1 bg-black-bg">
      <div className="flex">
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() =>
            setRelationshipsData(prev => ({ ...prev, portalSize: 100 }))
          }
        >
          small
        </Button>
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() =>
            setRelationshipsData(prev => ({ ...prev, portalSize: 150 }))
          }
        >
          medium
        </Button>
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() =>
            setRelationshipsData(prev => ({ ...prev, portalSize: 200 }))
          }
        >
          large
        </Button>
      </div>
      <span className="mx-1 text-white text-xs">portal list</span>
    </div>
  );
}

export default PortalFooter;
