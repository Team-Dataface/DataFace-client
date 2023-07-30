import CONSTANT from "../constants/constant";

const { X_DRAG_ADJUSTMENT, Y_DRAG_ADJUSTMENT } = CONSTANT;

function movePortal(
  event,
  isEditMode,
  isDragging,
  portalStyle,
  setIsDragging,
  setPortalStyle,
) {
  if (isEditMode && isDragging) {
    const newData = { ...portalStyle };

    newData.xCoordinate = event.clientX - X_DRAG_ADJUSTMENT;
    newData.yCoordinate = event.clientY - Y_DRAG_ADJUSTMENT;

    if (event.clientX - X_DRAG_ADJUSTMENT < -1) {
      newData.xCoordinate.xCoordinate = 0;
    }

    if (event.clientY - Y_DRAG_ADJUSTMENT < -1) {
      newData.yCoordinate.yCoordinate = 0;
    }

    if (
      event.clientX - X_DRAG_ADJUSTMENT < -30 ||
      event.clientX - X_DRAG_ADJUSTMENT > 1130 ||
      event.clientY - Y_DRAG_ADJUSTMENT < -30 ||
      event.clientY - Y_DRAG_ADJUSTMENT > 590
    ) {
      setIsDragging(false);
    }

    setPortalStyle(newData);
  }
}

export default movePortal;
