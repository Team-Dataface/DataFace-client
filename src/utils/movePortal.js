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
  const currentXBasedOnCanvasArea = cursorX - canvasX - 50;
  const currentYBasedOnCanvasArea = cursorY - canvasY - 30;
  const draggedPortalIndex = Number(draggingElement.split("-")[1]);
  const elementWidth = elementScale[0];
  const elementHeight = elementScale[1];

  const newArr = [...relationshipsData];

  // 좌측상단꼭지점
  if (currentYBasedOnCanvasArea < 0 && currentXBasedOnCanvasArea < 0) {
    newArr[draggedPortalIndex].xCoordinate = 0;
    newArr[draggedPortalIndex].yCoordinate = 0;
    setRelationshipsData(newArr);
    return;
  }

  // 우측상단꼭지점
  if (
    currentYBasedOnCanvasArea < 0 &&
    currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - elementWidth
  ) {
    newArr[draggedPortalIndex].xCoordinate = CONSTANT.CANVAS_W - elementWidth;
    newArr[draggedPortalIndex].yCoordinate = 0;
    setRelationshipsData(newArr);
    return;
  }

  // 좌측하단꼭지점
  if (
    currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight - 40 &&
    currentXBasedOnCanvasArea < 0
  ) {
    newArr[draggedPortalIndex].xCoordinate = 0;
    newArr[draggedPortalIndex].yCoordinate =
      CONSTANT.CANVAS_H - elementHeight - 40;
    setRelationshipsData(newArr);
    return;
  }

  // 우측하단꼭지점
  if (
    currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight - 40 &&
    currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - elementWidth
  ) {
    newArr[draggedPortalIndex].xCoordinate = CONSTANT.CANVAS_W - elementWidth;
    newArr[draggedPortalIndex].yCoordinate =
      CONSTANT.CANVAS_H - elementHeight - 40;
    setRelationshipsData(newArr);
    return;
  }

  // top 제한
  if (currentYBasedOnCanvasArea < 0) {
    newArr[draggedPortalIndex].xCoordinate = currentXBasedOnCanvasArea;
    newArr[draggedPortalIndex].yCoordinate = 0;
    setRelationshipsData(newArr);
    return;
  }

  // left 제한
  if (currentXBasedOnCanvasArea < 0) {
    newArr[draggedPortalIndex].xCoordinate = 0;
    newArr[draggedPortalIndex].yCoordinate = currentYBasedOnCanvasArea;
    setRelationshipsData(newArr);
    return;
  }

  // right 제한
  if (currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - elementWidth) {
    newArr[draggedPortalIndex].xCoordinate = CONSTANT.CANVAS_W - elementWidth;
    newArr[draggedPortalIndex].yCoordinate = currentYBasedOnCanvasArea;
    setRelationshipsData(newArr);
    return;
  }

  // bottom 제한
  if (currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight - 40) {
    newArr[draggedPortalIndex].xCoordinate = currentXBasedOnCanvasArea;
    newArr[draggedPortalIndex].yCoordinate =
      CONSTANT.CANVAS_H - elementHeight - 40;
    setRelationshipsData(newArr);
    return;
  }

  // 중앙 자유이동
  newArr[draggedPortalIndex].xCoordinate = currentXBasedOnCanvasArea;
  newArr[draggedPortalIndex].yCoordinate = currentYBasedOnCanvasArea;
  setRelationshipsData(newArr);
}

export default movePortal;
