import CONSTANT from "../constants/constant";

const { X_DRAG_ADJUSTMENT, Y_DRAG_ADJUSTMENT } = CONSTANT;

function movePortal(
  event,
  isEditMode,
  isDragging,
  setIsDragging,
  relationshipsData,
  setRelationshipsData,
  draggedPortalIndex,
) {
  if (isEditMode && isDragging) {
    const newArr = [...relationshipsData];

    newArr[draggedPortalIndex].xCoordinate = event.clientX - X_DRAG_ADJUSTMENT;
    newArr[draggedPortalIndex].yCoordinate = event.clientY - Y_DRAG_ADJUSTMENT;

    if (event.clientX - X_DRAG_ADJUSTMENT < -1) {
      newArr[draggedPortalIndex].xCoordinate = 0;
    }

    if (event.clientY - Y_DRAG_ADJUSTMENT < -1) {
      newArr[draggedPortalIndex].yCoordinate = 0;
    }

    if (
      event.clientX - X_DRAG_ADJUSTMENT < -30 ||
      event.clientY - Y_DRAG_ADJUSTMENT < -30
    ) {
      setIsDragging(false);
    }

    setRelationshipsData(newArr);
  }
}

export default movePortal;
