import FieldFooter from "./FieldFooter";

/* eslint-disable jsx-a11y/no-static-element-interactions */
function FieldList({
  document,
  isEditMode,
  updateFieldValue,
  setIsEditMode,
  draggingElement,
  setDraggingElement,
  updateFieldRows,
  setElementScale,
}) {
  return document.fields.map((element, index) => {
    return (
      <div
        key={element.fieldName}
        className={`absolute w-[350px]
          ${isEditMode && draggingElement && "drop-shadow-md ring-2 opacity-80"}
        `}
        style={{
          top: `${element.yCoordinate}px`,
          left: `${element.xCoordinate}px`,
        }}
      >
        <div className="flex w-full h-full p-2">
          <span
            className={`flex justify-end mr-3 w-[140px] select-none
            ${isEditMode && "hover:cursor-move"}`}
            onMouseDown={event => {
              setDraggingElement(`field-${index}`);
              setElementScale([
                event.target.clientWidth,
                event.target.clientHeight,
              ]);
            }}
            onMouseUp={() => {
              setDraggingElement(null);
              setElementScale([]);
            }}
          >
            {element.fieldName}
          </span>
          {element.fieldType === "Text" ? (
            <div className="flex flex-col w-full">
              <textarea
                className={`flex w-full mr-3 ring-2 rounded-md ring-light-grey text-center resize-none focus:outline-none peer ${
                  isEditMode &&
                  !draggingElement &&
                  "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
                }`}
                rows={element.rows}
                onDoubleClick={() => setIsEditMode(true)}
                onChange={event => updateFieldValue(index, event)}
                value={element.fieldValue}
                readOnly={!isEditMode}
              />
              <div className="hidden peer-hover:flex hover:flex">
                {isEditMode && !draggingElement && (
                  <FieldFooter
                    index={index}
                    updateFieldRows={updateFieldRows}
                  />
                )}
              </div>
            </div>
          ) : (
            <input
              className={`flex w-full mr-3 ring-2 rounded-md ring-light-grey text-center focus:outline-none ${
                isEditMode &&
                !draggingElement &&
                "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
              }`}
              type={element.fieldType}
              onDoubleClick={() => setIsEditMode(true)}
              onChange={event => updateFieldValue(index, event)}
              value={element.fieldValue}
              disabled={
                element.fieldType === "Date modified" ||
                element.fieldType === "Date created" ||
                !isEditMode
              }
            />
          )}
        </div>
      </div>
    );
  });
}

export default FieldList;
