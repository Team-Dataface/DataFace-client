import CONSTANT from "../constants/constant";

function movePortal(
  canvasRect,
  event,
  relationshipsData,
  setRelationshipsData,
  draggingElement,
  elementScale,
) {
  const canvasX = canvasRect.left;
  const canvasY = canvasRect.top;
  const cursorX = event.clientX;
  const cursorY = event.clientY;
  const currentXBasedOnCanvasArea = cursorX - canvasX - 30;
  const currentYBasedOnCanvasArea = cursorY - canvasY - 30;
  const draggedPortalIndex = Number(draggingElement.split("-")[1]);

  const elementWidth = elementScale[0];
  const elementHeight = elementScale[1] + 10;

  const newArr = [...relationshipsData];

  const isAboveCanvas = currentYBasedOnCanvasArea < 0;
  const isLeftOfCanvas = currentXBasedOnCanvasArea < 0;
  const isRightOfCanvas =
    currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - elementWidth;
  const isBelowCanvas =
    currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight;

  function setCoordinates(x, y) {
    newArr[draggedPortalIndex].xCoordinate = x;
    newArr[draggedPortalIndex].yCoordinate = y;
    setRelationshipsData(newArr);
  }

  if (isAboveCanvas && isLeftOfCanvas) {
    setCoordinates(0, 0);
    return;
  }

  if (isAboveCanvas && isRightOfCanvas) {
    setCoordinates(CONSTANT.CANVAS_W - elementWidth, 0);
    return;
  }

  if (isBelowCanvas && isLeftOfCanvas) {
    setCoordinates(0, CONSTANT.CANVAS_H - elementHeight);
    return;
  }

  if (isBelowCanvas && isRightOfCanvas) {
    setCoordinates(
      CONSTANT.CANVAS_W - elementWidth,
      CONSTANT.CANVAS_H - elementHeight,
    );

    return;
  }

  if (isAboveCanvas || isLeftOfCanvas || isRightOfCanvas || isBelowCanvas) {
    setCoordinates(
      Math.max(
        0,
        Math.min(currentXBasedOnCanvasArea, CONSTANT.CANVAS_W - elementWidth),
      ),
      Math.max(
        0,
        Math.min(currentYBasedOnCanvasArea, CONSTANT.CANVAS_H - elementHeight),
      ),
    );

    return;
  }

  setCoordinates(currentXBasedOnCanvasArea, currentYBasedOnCanvasArea);
}

export default movePortal;
