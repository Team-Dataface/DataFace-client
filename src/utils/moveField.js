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
  const elementHeight = elementScale[1];

  const newArr = [...docData];

  // 좌측상단꼭지점
  if (currentYBasedOnCanvasArea < 0 && currentXBasedOnCanvasArea < 0) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate = 0;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate = 0;
    setDocData(newArr);
    return;
  }

  // 우측상단꼭지점
  if (
    currentYBasedOnCanvasArea < 0 &&
    currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - 370
  ) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
      CONSTANT.CANVAS_W - 370;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate = 0;
    setDocData(newArr);
    return;
  }

  // 좌측하단꼭지점
  if (
    currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight - 40 &&
    currentXBasedOnCanvasArea < 0
  ) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate = 0;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
      CONSTANT.CANVAS_H - elementHeight - 40;
    setDocData(newArr);
    return;
  }

  // 우측하단꼭지점
  if (
    currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight - 40 &&
    currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - 370
  ) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
      CONSTANT.CANVAS_W - 370;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
      CONSTANT.CANVAS_H - elementHeight - 40;
    setDocData(newArr);
    return;
  }

  // top 제한
  if (currentYBasedOnCanvasArea < 0) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
      currentXBasedOnCanvasArea;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate = 0;
    setDocData(newArr);
    return;
  }

  // left 제한
  if (currentXBasedOnCanvasArea < 0) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate = 0;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
      currentYBasedOnCanvasArea;
    setDocData(newArr);
    return;
  }

  // right 제한
  if (currentXBasedOnCanvasArea > CONSTANT.CANVAS_W - 370) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
      CONSTANT.CANVAS_W - 370;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
      currentYBasedOnCanvasArea;
    setDocData(newArr);
    return;
  }

  // bottom 제한
  if (currentYBasedOnCanvasArea > CONSTANT.CANVAS_H - elementHeight - 40) {
    newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
      currentXBasedOnCanvasArea;
    newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
      CONSTANT.CANVAS_H - elementHeight - 40;
    setDocData(newArr);
    return;
  }

  // 중앙 자유이동
  newArr[currentDocIndex].fields[draggedElementIndex].xCoordinate =
    currentXBasedOnCanvasArea;
  newArr[currentDocIndex].fields[draggedElementIndex].yCoordinate =
    currentYBasedOnCanvasArea;
  setDocData(newArr);
}

export default moveField;
