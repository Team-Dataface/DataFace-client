/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";

import {
  currentDBIdAtom,
  currentDocIndexAtom,
  isEditModeAtom,
  relationshipsDataAtom,
  userAtom,
} from "../../../atoms/atoms";

import fetchData from "../../../utils/axios";

import Loading from "../../shared/Loading";
import PortalFooter from "./PortalFooter";
import PortalTable from "./PortalTable";
import Button from "../../shared/Button";

function Portal({
  index,
  relationship,
  draggingElement,
  setDraggingElement,
  handleClickDelete,
  docData,
  primaryField,
  setElementScale,
}) {
  const { userId } = useAtomValue(userAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);

  const currentDBId = useAtomValue(currentDBIdAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const relationshipsData = useAtomValue(relationshipsDataAtom);

  async function getForeignDocuments(relationshipsIndex) {
    let queryValue = "";

    docData[currentDocIndex]?.fields.forEach(element => {
      if (primaryField[relationshipsIndex] === element.fieldName) {
        queryValue = element.fieldValue.trim();
      }
    });

    if (relationship._id) {
      const response = await fetchData(
        "GET",
        `users/${userId}/databases/${currentDBId}/relationships/${relationship._id}?primaryFieldValue=${queryValue}`,
      );

      return response.data;
    }

    return [];
  }

  const { data: foreignDocuments, isLoading } = useQuery(
    ["foreignDocuments1", currentDBId, currentDocIndex, relationship._id],
    () => getForeignDocuments(index),
    {
      enabled:
        !!userId &&
        !!currentDBId &&
        currentDocIndex !== undefined &&
        !!relationshipsData,
      refetchOnWindowFocus: false,
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`absolute w-auto m-5 group ${
        isEditMode && "hover:cursor-move"
      }`}
      style={{
        top: `${relationship.yCoordinate}px`,
        left: `${relationship.xCoordinate}px`,
      }}
      onMouseDown={event => {
        setDraggingElement(`portal-${index}`);
        setElementScale([
          event.currentTarget.clientWidth,
          event.currentTarget.clientHeight,
        ]);
      }}
      onMouseUp={() => {
        setDraggingElement(null);
        setElementScale([]);
      }}
    >
      <div
        className="overflow-y-scroll border"
        style={{ height: `${relationship.portalSize}px` }}
        onDoubleClick={() => setIsEditMode(true)}
      >
        <PortalTable
          index={index}
          draggingElement={draggingElement}
          relationship={relationship}
          foreignDocuments={foreignDocuments.displayedDocuments}
        />
        {isEditMode && (
          <Button
            className="absolute -top-3 -right-3 w-6 rounded-full"
            onClick={() => handleClickDelete(index)}
          >
            <img src="/assets/close_icon.svg" alt="close button" />
          </Button>
        )}
      </div>
      <div className="hidden group-hover:flex hover:flex">
        {isEditMode && <PortalFooter index={index} />}
      </div>
    </div>
  );
}

export default Portal;
