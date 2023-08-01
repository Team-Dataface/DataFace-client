/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQueries } from "@tanstack/react-query";
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
  isDragging,
  startDraggingPortal,
  endDraggingPortal,
  isEditMode,
  setIsEditMode,
  handleClickDelete,
  docData,
  currentDocIndex,
  primaryField,
  relationshipsData,
}) {
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getForeignDocuments(relationshipsIndex) {
    let queryValue = "";

    docData[currentDocIndex].fields.forEach(element => {
      if (primaryField[relationshipsIndex] === element.fieldName) {
        queryValue = element.fieldValue.trim();
      }
    });

    if (relationshipsData[relationshipsIndex]) {
      const response = await fetchData(
        "GET",
        `users/${userId}/databases/${currentDBId}/relationships/${relationshipsData[relationshipsIndex]._id}?primaryFieldValue=${queryValue}`,
      );

      return response.data;
    }

    return [];
  }

  const [portal1, portal2] = useQueries({
    queries: [
      {
        enabled:
          !!userId &&
          !!currentDBId &&
          currentDocIndex !== undefined &&
          !!relationshipsData,
        refetchOnWindowFocus: false,
        queryKey: ["foreignDocuments1", currentDBId, currentDocIndex],
        queryFn: () => getForeignDocuments(0),
        onFailure: () => {
          console.log("sending user to errorpage");
        },
      },
      {
        enabled:
          !!userId &&
          !!currentDBId &&
          currentDocIndex !== undefined &&
          !!relationshipsData,
        refetchOnWindowFocus: false,
        queryKey: ["foreignDocuments2", currentDBId, currentDocIndex],
        queryFn: () => getForeignDocuments(1),
        onFailure: () => {
          console.log("sending user to errorpage");
        },
      },
    ],
  });

  if (portal1.isLoading || portal2.isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="absolute w-auto m-5"
      style={{
        top: `${relationship.yCoordinate}px`,
        left: `${relationship.xCoordinate}px`,
      }}
      onMouseDown={() => {
        startDraggingPortal(index);
      }}
      onMouseUp={() => {
        endDraggingPortal(index);
      }}
    >
      <div
        className={`h-[${relationship.portalSize}px] overflow-y-scroll border`}
        onDoubleClick={() => setIsEditMode(true)}
      >
        <PortalTable
          index={index}
          isEditMode={isEditMode}
          isDragging={isDragging}
          relationship={relationship}
          foreignDocuments={
            index === 0
              ? portal1.data.displayedDocuments
              : portal2.data.displayedDocuments
          }
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
