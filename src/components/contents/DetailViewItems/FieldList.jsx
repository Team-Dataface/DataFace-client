/* eslint-disable jsx-a11y/no-static-element-interactions */
function FieldList({
  document,
  isEditMode,
  updateFieldValue,
  setIsEditMode,
  isDragging,
  startDragging,
  endDragging,
}) {
  console.log(document);
  return document.fields.map((element, index) => {
    return (
      <div
        key={element.fieldName}
        className={`absolute w-[350px]
          ${isEditMode && isDragging && "rounded-md drop-shadow-md"}
        `}
        style={{
          top: `${element.yCoordinate}px`,
          left: `${element.xCoordinate}px`,
        }}
      >
        <div className="flex w-full p-2">
          <span
            className={`flex justify-end mr-3 w-[100px] select-none
            ${isEditMode && "hover:cursor-move"}`}
            onMouseDown={event => startDragging(index, event)}
            onMouseUp={() => endDragging(index)}
          >
            {element.fieldName}
          </span>
          <textarea
            className={`flex w-full h-7 mr-3 ring-2 rounded-md ring-light-grey text-center focus:outline-none ${
              isEditMode &&
              !isDragging &&
              "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
            }`}
            maxLength="15"
            onDoubleClick={() => setIsEditMode(true)}
            onChange={event => updateFieldValue(index, event)}
            value={element.fieldValue}
            readOnly={!isEditMode}
          />
        </div>
      </div>
    );
  });
}

export default FieldList;
