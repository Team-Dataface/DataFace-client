import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import FieldList from "./FieldList";
import Loading from "../../shared/Loading";
import Portal from "./Portal";

import fetchData from "../../../utils/axios";
import useLoading from "../../../utils/useLoading";
import movePortal from "../../../utils/movePortal";
import moveFields from "../../../utils/moveFields";
import foreignDocuments from "./foreignDocuments";

function DetailView({
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  setDocumentsIds,
  isOnSave,
  setIsOnSave,
}) {
  const [docData, setDocData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementIndex, setDraggedElementIndex] = useState(null);
  const [portalStyle, setPortalStyle] = useState({
    xCoordinate: 0,
    yCoordinate: 0,
    size: 150,
  });

  const queryClient = useQueryClient();

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { data, isLoading } = useQuery(
    ["dbDocumentList", currentDBId, currentDocIndex],
    getDocumentsList,
    {
      enabled: !!userId,
      onSuccess: result => {
        const documentsId = result.documents.map(document => {
          return document._id;
        });

        setDocumentsIds(documentsId);
        setDocData(result.documents);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
    },
  );

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents/${data.documents[currentDocIndex]._id}`,
      { fields: docData[currentDocIndex].fields },
    );
  }

  const { mutate: fetchDocumentUpdate } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList", currentDBId]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  const loadingTimeout = useLoading(isLoading);

  if (loadingTimeout) {
    return <Loading />;
  }

  if (!isEditMode && isOnSave) {
    fetchDocumentUpdate();
    setIsOnSave(false);
  }

  function startDraggingField(index) {
    setIsDragging(true);
    setDraggedElementIndex(index);
  }

  function endDraggingField() {
    setIsDragging(false);
    setDraggedElementIndex(null);
  }

  function updateFieldValue(index, event) {
    const newArr = [...docData];

    newArr[currentDocIndex].fields[index].fieldValue = event.target.value;

    setDocData(newArr);
  }

  function startDraggingPortal() {
    setIsDragging(true);
    setDraggedElementIndex("portal");
  }

  function endDraggingPortal() {
    setIsDragging(false);
    setDraggedElementIndex(null);
  }

  function handleMouseMove(event) {
    if (draggedElementIndex !== "portal") {
      moveFields(
        event,
        isEditMode,
        isDragging,
        docData,
        currentDocIndex,
        draggedElementIndex,
        setIsDragging,
        setDocData,
      );
    } else {
      movePortal(
        event,
        isEditMode,
        isDragging,
        portalStyle,
        setIsDragging,
        setPortalStyle,
      );
    }
  }

  return (
    <div className="flex w-full bg-grey">
      <div
        className={`flex w-full m-2 p-5 bg-white drop-shadow-md ${
          isEditMode ? "ring-4 ring-blue" : null
        }
      `}
        onMouseMove={event => handleMouseMove(event)}
      >
        <Portal
          foreignDocuments={foreignDocuments}
          isDragging={isDragging}
          startDraggingPortal={startDraggingPortal}
          endDraggingPortal={endDraggingPortal}
          isEditMode={isEditMode}
          portalStyle={portalStyle}
          setPortalStyle={setPortalStyle}
        />
        <div className="flex flex-col absolute">
          {docData[currentDocIndex] && (
            <FieldList
              document={docData[currentDocIndex]}
              isEditMode={isEditMode}
              updateFieldValue={updateFieldValue}
              setIsEditMode={setIsEditMode}
              isDragging={isDragging}
              startDraggingField={startDraggingField}
              endDraggingField={endDraggingField}
            />
          )}
        </div>
      </div>
    </div>
  );
}

DetailView.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

export default DetailView;
