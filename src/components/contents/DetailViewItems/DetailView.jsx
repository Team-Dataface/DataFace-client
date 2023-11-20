import { useState, useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useAtomValue } from "jotai";

import { currentDBIdAtom, currentDocIndexAtom } from "../../../atoms/atoms";
import UserContext from "../../../context/UserContext";
import Loading from "../../shared/Loading";
import Elements from "./Elements";

import fetchData from "../../../utils/axios";
import useLoading from "../../../utils/useLoading";
import moveField from "../../../utils/moveField";
import movePortal from "../../../utils/movePortal";
import getTodaysDate from "../../../utils/getTodaysDate";
import CONSTANT from "../../../constants/constant";

function DetailView({
  isEditMode,
  setIsEditMode,
  setDocumentsIds,
  isOnSave,
  setIsOnSave,
  relationshipsData,
  setRelationshipsData,
}) {
  const canvasRef = useRef(null);
  const canvasElement = canvasRef.current;
  let canvasRect = null;

  const [docData, setDocData] = useState([]);
  const [primaryField, setPrimaryField] = useState(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const [elementScale, setElementScale] = useState([]);

  const queryClient = useQueryClient();

  const { userId } = useContext(UserContext);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);

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

  function updateDateModified(newDocData, fields) {
    const dateModifiedFieldIndex = fields.findIndex(
      field => field.fieldType === "Date modified",
    );

    if (dateModifiedFieldIndex !== -1) {
      newDocData[currentDocIndex].fields[dateModifiedFieldIndex].fieldValue =
        getTodaysDate();
    }
  }

  function updateFieldValue(index, event) {
    const newDocData = [...docData];

    newDocData[currentDocIndex].fields[index].fieldValue = event.target.value;

    updateDateModified(newDocData, newDocData[currentDocIndex].fields);
    setDocData(newDocData);
  }

  function updateFieldRows(index, value) {
    const newDocData = [...docData];

    newDocData[currentDocIndex].fields[index].rows = value;

    setDocData(newDocData);
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
      <Elements
        handleMouseUp={handleMouseUp}
        draggingElement={draggingElement}
        setDraggingElement={setDraggingElement}
        relationshipsData={relationshipsData}
        setRelationshipsData={setRelationshipsData}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        fetchDeleteRelationship={fetchDeleteRelationship}
        docData={docData}
        primaryField={primaryField}
        updateFieldValue={updateFieldValue}
        updateFieldRows={updateFieldRows}
        setElementScale={setElementScale}
      />
    </div>
  );
}

DetailView.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

export default DetailView;
