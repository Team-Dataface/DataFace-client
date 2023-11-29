import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  currentDBIdAtom,
  currentDocIndexAtom,
  isEditModeAtom,
  relationshipsDataAtom,
  documentsIdsAtom,
  userAtom,
  docDataAtom,
  primaryFieldAtom,
  draggingElementAtom,
  elementScaleAtom,
} from "../../../atoms/atoms";

import Loading from "../../shared/Loading";
import Elements from "./Elements";

import fetchData from "../../../utils/axios";
import useLoading from "../../../utils/useLoading";
import moveField from "../../../utils/moveField";
import movePortal from "../../../utils/movePortal";
import CONSTANT from "../../../constants/constant";

function DetailView() {
  const canvasRef = useRef(null);
  const canvasElement = canvasRef.current;
  let canvasRect = null;

  const { userId } = useAtomValue(userAtom);
  const elementScale = useAtomValue(elementScaleAtom);

  const [docData, setDocData] = useAtom(docDataAtom);
  const [draggingElement, setDraggingElement] = useAtom(draggingElementAtom);
  const [relationshipsData, setRelationshipsData] = useAtom(
    relationshipsDataAtom,
  );

  const currentDBId = useAtomValue(currentDBIdAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  const setDocumentsIds = useSetAtom(documentsIdsAtom);
  const setPrimaryField = useSetAtom(primaryFieldAtom);

  if (canvasElement) {
    canvasRect = canvasElement.getBoundingClientRect();
  }

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { isLoading: gettingAllDocument } = useQuery(
    ["DocumentsList", currentDBId],
    getDocumentsList,
    {
      enabled: !!userId && !!currentDBId,
      refetchOnWindowFocus: false,
      onSuccess: result => {
        const documentsId = result.documents.map(document => {
          return document._id;
        });
        setDocumentsIds(documentsId);
        setDocData(result.documents);

        if (result.relationships?.length) {
          setRelationshipsData(result.relationships);

          const primaryFieldsList = result.relationships.map(element => {
            return element.primaryFieldName;
          });

          setPrimaryField(primaryFieldsList);

          return;
        }

        setRelationshipsData(null);
      },
    },
  );

  const loadingTimeout = useLoading(gettingAllDocument);

  if (loadingTimeout) {
    return <Loading />;
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
      <Elements />
    </div>
  );
}

export default DetailView;
