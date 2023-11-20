import { useAtomValue } from "jotai";

import { currentDocIndexAtom } from "../../../atoms/atoms";

import FieldList from "./FieldList";
import Portal from "./Portal";

function Elements({
  draggingElement,
  setDraggingElement,
  relationshipsData,
  setRelationshipsData,
  fetchDeleteRelationship,
  docData,
  primaryField,
  updateFieldValue,
  updateFieldRows,
  setElementScale,
}) {
  const currentDocIndex = useAtomValue(currentDocIndexAtom);

  return (
    <>
      {relationshipsData &&
        relationshipsData.map((relationship, index) => {
          return (
            <Portal
              index={index}
              key={relationship._id}
              relationship={relationship}
              setRelationshipsData={setRelationshipsData}
              setDraggingElement={setDraggingElement}
              handleClickDelete={fetchDeleteRelationship}
              docData={docData}
              primaryField={primaryField}
              relationshipsData={relationshipsData}
              setElementScale={setElementScale}
            />
          );
        })}
      <div className="flex flex-col absolute">
        {docData[currentDocIndex] && (
          <FieldList
            document={docData[currentDocIndex]}
            draggingElement={draggingElement}
            setDraggingElement={setDraggingElement}
            updateFieldValue={updateFieldValue}
            updateFieldRows={updateFieldRows}
            setElementScale={setElementScale}
          />
        )}
      </div>
    </>
  );
}

export default Elements;
