import FieldList from "./FieldList";
import Portal from "./Portal";

function Elements({
  draggingElement,
  setDraggingElement,
  relationshipsData,
  setRelationshipsData,
  isEditMode,
  setIsEditMode,
  fetchDeleteRelationship,
  docData,
  currentDocIndex,
  primaryField,
  updateFieldValue,
  updateFieldRows,
  setElementScale,
}) {
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
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              handleClickDelete={fetchDeleteRelationship}
              docData={docData}
              currentDocIndex={currentDocIndex}
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
            isEditMode={isEditMode}
            updateFieldValue={updateFieldValue}
            updateFieldRows={updateFieldRows}
            setIsEditMode={setIsEditMode}
            setElementScale={setElementScale}
          />
        )}
      </div>
    </>
  );
}

export default Elements;
