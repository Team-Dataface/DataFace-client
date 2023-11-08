import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import FieldList from "./FieldList";
import Loading from "../../shared/Loading";
import Portal from "./Portal";

import fetchData from "../../../utils/axios";
import movePortal from "../../../utils/movePortal";
import moveFields from "../../../utils/moveFields";
import useLoading from "../../../utils/useLoading";

function DetailView({
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  setDocumentsIds,
  isOnSave,
  setIsOnSave,
  relationshipsData,
  setRelationshipsData,
}) {
  const [docData, setDocData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementIndex, setDraggedElementIndex] = useState(null);
  const [draggedPortalIndex, setDraggedPortalIndex] = useState(null);
  const [primaryField, setPrimaryField] = useState(null);

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

  const { isLoading: gettingAllDocument } = useQuery(
    ["dbDocumentList", currentDBId],
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
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents/${docData[currentDocIndex]._id}`,
      { fields: docData[currentDocIndex].fields },
    );

    if (relationshipsData?.length) {
      await fetchData(
        "PUT",
        `/users/${userId}/databases/${currentDBId}/relationships`,
        relationshipsData,
      );
    }
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

  async function deleteRelationship(index) {
    await fetchData(
      "DELETE",
      `/users/${userId}/databases/${currentDBId}/relationships/${relationshipsData[index]._id}`,
    );
  }

  const { mutate: fetchDeleteRelationship } = useMutation(deleteRelationship, {
    onSuccess: () => {
      setRelationshipsData(null);
      queryClient.refetchQueries(["dbDocumentList", currentDBId]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  const loadingTimeout = useLoading(gettingAllDocument);

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

  function updateFieldRows(index, value) {
    const newArr = [...docData];

    newArr[currentDocIndex].fields[index].rows = value;

    setDocData(newArr);
  }

  function startDraggingPortal(index) {
    setIsDragging(true);
    setDraggedPortalIndex(index);
  }

  function endDraggingPortal() {
    setIsDragging(false);
    setDraggedPortalIndex(null);
  }

  function handleMouseFieldMove(event) {
    moveFields(
      event,
      isEditMode,
      isDragging,
      setIsDragging,
      docData,
      setDocData,
      currentDocIndex,
      draggedElementIndex,
    );
  }

  function handleMousePortalMove(event) {
    movePortal(
      event,
      isEditMode,
      isDragging,
      setIsDragging,
      relationshipsData,
      setRelationshipsData,
      draggedPortalIndex,
    );
  }

  return (
    <div
      className={`flex w-[1150px] h-[610px] p-3 bg-white drop-shadow-md
        ${isEditMode ? "ring-4 ring-blue" : null}
    `}
      onMouseMove={event => {
        if (isEditMode && isDragging && draggedElementIndex !== null) {
          handleMouseFieldMove(event);
        }
        if (isEditMode && isDragging && draggedPortalIndex !== null) {
          handleMousePortalMove(event);
        }
      }}
    >
      {relationshipsData &&
        relationshipsData.map((relationship, index) => {
          return (
            <Portal
              index={index}
              key={relationship._id}
              relationship={relationship}
              setRelationshipsData={setRelationshipsData}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              isDragging={isDragging}
              startDraggingPortal={startDraggingPortal}
              endDraggingPortal={endDraggingPortal}
              handleClickDelete={fetchDeleteRelationship}
              docData={docData}
              currentDocIndex={currentDocIndex}
              primaryField={primaryField}
              relationshipsData={relationshipsData}
            />
          );
        })}
      <div className="flex flex-col absolute">
        {docData[currentDocIndex] && (
          <FieldList
            document={docData[currentDocIndex]}
            isDragging={isDragging}
            isEditMode={isEditMode}
            updateFieldValue={updateFieldValue}
            updateFieldRows={updateFieldRows}
            setIsEditMode={setIsEditMode}
            startDraggingField={startDraggingField}
            endDraggingField={endDraggingField}
          />
        )}
      </div>
    </div>
  );
}

DetailView.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

export default DetailView;
