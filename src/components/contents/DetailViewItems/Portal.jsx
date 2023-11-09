/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import PortalFooter from "./PortalFooter";
import PortalTable from "./PortalTable";
import Button from "../../shared/Button";

import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import UserContext from "../../../context/UserContext";
import Loading from "../../shared/Loading";

import fetchData from "../../../utils/axios";

function Portal({
  index,
  relationship,
  setRelationshipsData,
  draggingElement,
  setDraggingElement,
  isEditMode,
  setIsEditMode,
  handleClickDelete,
  docData,
  currentDocIndex,
  primaryField,
  relationshipsData,
  setElementScale,
}) {
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

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
      className={`absolute w-auto m-5 ${isEditMode && "hover:cursor-move"}`}
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
          isEditMode={isEditMode}
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
      {isEditMode && (
        <PortalFooter
          relationshipsData={relationshipsData}
          setRelationshipsData={setRelationshipsData}
          index={index}
        />
      )}
    </div>
  );
}

export default Portal;
