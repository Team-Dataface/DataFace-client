import CONSTANT from "../constants/constant";

function moveField(
  canvasRect,
  event,
  docData,
  setDocData,
  currentDocIndex,
  draggingElement,
  elementScale,
) {
  const canvasX = canvasRect.left;
  const canvasY = canvasRect.top;
  const cursorX = event.clientX;
  const cursorY = event.clientY;
  const currentXBasedOnCanvasArea = cursorX - canvasX - 70;
  const currentYBasedOnCanvasArea = cursorY - canvasY - 30;
  const draggedElementIndex = Number(draggingElement.split("-")[1]);

  const elementWidth = 370;
  const elementHeight = elementScale[1] + 40;

  const newArr = [...docData];

  const isAboveCanvas = currentYBasedOnCanvasArea < 0;
  const isLeftOfCanvas = currentXBasedOnCanvasArea < 0;
  const isRightOfCanvas =
    currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - elementWidth;
  const isBelowCanvas =
    currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight;

  function setCoordinates(x, y) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate = x;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate = y;
    setDocData(newArr);
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

export default moveField;
