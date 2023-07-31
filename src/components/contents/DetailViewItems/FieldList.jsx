import FieldFooter from "./FieldFooter";

/* eslint-disable jsx-a11y/no-static-element-interactions */
function FieldList({
  document,
  isEditMode,
  updateFieldValue,
  setIsEditMode,
  isDragging,
  startDraggingField,
  endDraggingField,
  updateFieldRows,
}) {
  return document.fields.map((element, index) => {
    return (
      <div
        key={element.fieldName}
        className={`absolute w-[350px]
          ${isEditMode && isDragging && "drop-shadow-md"}
        `}
        style={{
          top: `${element.yCoordinate}px`,
          left: `${element.xCoordinate}px`,
        }}
      >
        <div className="flex w-full h-full p-2">
          <span
            className={`flex justify-end mr-3 w-[100px] select-none
            ${isEditMode && "hover:cursor-move"}`}
            onMouseDown={event => startDraggingField(index, event)}
            onMouseUp={() => endDraggingField(index)}
          >
            {element.fieldName}
          </span>
          {element.fieldType === "Text" ? (
            <div className="flex flex-col w-full">
              <textarea
                className={`flex w-full mr-3 ring-2 rounded-md ring-light-grey text-center focus:outline-nonee ${
                  isEditMode &&
                  !isDragging &&
                  "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
                }`}
                rows={element.rows}
                onDoubleClick={() => setIsEditMode(true)}
                onChange={event => updateFieldValue(index, event)}
                value={element.fieldValue}
                readOnly={!isEditMode}
              />
              {isEditMode && (
                <FieldFooter index={index} updateFieldRows={updateFieldRows} />
              )}
            </div>
          ) : (
            <input
              className={`flex w-full mr-3 ring-2 rounded-md ring-light-grey text-center focus:outline-none ${
                isEditMode &&
                !isDragging &&
                "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
              }`}
              type={element.fieldType}
              onDoubleClick={() => setIsEditMode(true)}
              onChange={event => updateFieldValue(index, event)}
              value={element.fieldValue}
              readOnly={!isEditMode}
            />
          )}
        </div>
      </div>
    );
  });
}

export default FieldList;
