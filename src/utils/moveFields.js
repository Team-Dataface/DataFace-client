import CONSTANT from "../constants/constant";

const { X_DRAG_ADJUSTMENT, Y_DRAG_ADJUSTMENT } = CONSTANT;

function moveFields(
  event,
  isEditMode,
  isDragging,
  docData,
  currentDocIndex,
  draggedElementIndex,
  setIsDragging,
  setDocData,
) {
  if (isEditMode && isDragging) {
    const newArr = [...docData];

    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
      event.clientX - X_DRAG_ADJUSTMENT;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
      event.clientY - Y_DRAG_ADJUSTMENT;

    if (event.clientX - X_DRAG_ADJUSTMENT < -1) {
      newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate = 0;
    }

    if (event.clientY - Y_DRAG_ADJUSTMENT < -1) {
      newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate = 0;
    }

    if (event.clientX - X_DRAG_ADJUSTMENT > 1101) {
      newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate = 1100;
    }

    if (event.clientY - Y_DRAG_ADJUSTMENT > 571) {
      newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate = 570;
    }

    if (
      event.clientX - X_DRAG_ADJUSTMENT < -30 ||
      event.clientX - X_DRAG_ADJUSTMENT > 1130 ||
      event.clientY - Y_DRAG_ADJUSTMENT < -30 ||
      event.clientY - Y_DRAG_ADJUSTMENT > 590
    ) {
      setIsDragging(false);
    }

    setDocData(newArr);
  }
}

export default moveFields;
