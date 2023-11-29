import { useRef } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  currentDocIndexAtom,
  isEditModeAtom,
  relationshipsDataAtom,
  docDataAtom,
  draggingElementAtom,
  elementScaleAtom,
} from "../../../atoms/atoms";

import Elements from "./Elements";

import moveField from "../../../utils/moveField";
import movePortal from "../../../utils/movePortal";
import CONSTANT from "../../../constants/constant";
import useGetSingleDatabase from "../../../apis/useGetSingleDatabase";

function DetailView() {
  const canvasRef = useRef(null);
  const canvasElement = canvasRef.current;
  let canvasRect = null;

  const elementScale = useAtomValue(elementScaleAtom);

  const [docData, setDocData] = useAtom(docDataAtom);
  const [draggingElement, setDraggingElement] = useAtom(draggingElementAtom);
  const [relationshipsData, setRelationshipsData] = useAtom(
    relationshipsDataAtom,
  );

  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  const { singleDatabase } = useGetSingleDatabase();

  if (canvasElement) {
    canvasRect = canvasElement.getBoundingClientRect();
  }

  function handleMouseUp() {
    setDraggingElement(null);
  }

  function handleMouseMove(event) {
    if (draggingElement.includes("field")) {
      moveField(
        canvasRect,
        event,
        docData,
        setDocData,
        currentDocIndex,
        draggingElement,
        elementScale,
      );
    }

    if (draggingElement.includes("portal")) {
      movePortal(
        canvasRect,
        event,
        relationshipsData,
        setRelationshipsData,
        draggingElement,
        elementScale,
      );
    }
  }

  return (
    <div
      className={`flex p-3 bg-white drop-shadow-md
        ${isEditMode ? "ring-4 ring-blue" : null}
    `}
      style={{
        width: `${CONSTANT.CANVAS_W}px`,
        height: `${CONSTANT.CANVAS_H}px`,
      }}
      role="presentation"
      onMouseMove={isEditMode && draggingElement ? handleMouseMove : null}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
    >
      {singleDatabase && <Elements documents={singleDatabase.documents} />}
    </div>
  );
}

export default DetailView;
