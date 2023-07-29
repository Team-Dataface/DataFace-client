import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import FieldList from "./FieldList";

import CONSTANT from "../../../constants/constant";

import fetchData from "../../../utils/axios";

const { X_DRAG_ADJUSTMENT, Y_DRAG_ADJUSTMENT } = CONSTANT;

function DetailView({
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  documentsIds,
  isOnSave,
  setIsOnSave,
}) {
  const [docData, setDocData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementIndex, setDraggedElementIndex] = useState(null);

  const queryClient = useQueryClient();

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getDocument() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}/documents/${documentsIds[currentDocIndex]}`,
    );

    return response.data.document;
  }

  const { isLoading } = useQuery(["document", currentDocIndex], getDocument, {
    enabled: !!userId && !!documentsIds,
    onSuccess: result => {
      const receivedFields = result.fields.map(element => {
        return {
          fieldName: element.fieldName,
          fieldType: element.fieldType,
          fieldValue: element.fieldValue,
          xCoordinate: element.xCoordinate,
          yCoordinate: element.yCoordinate,
          fieldId: element._id,
        };
      });

      setDocData(receivedFields);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents/${documentsIds[currentDocIndex]}`,
      { fields: docData },
    );
  }

  const { mutate: fetchDocumentUpdate } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!isEditMode && isOnSave) {
    fetchDocumentUpdate();
    setIsOnSave(false);
  }

  const handleMouseMove = event => {
    if (isEditMode && isDragging) {
      const newArr = [...docData];

      newArr[draggedElementIndex].xCoordinate =
        event.clientX - X_DRAG_ADJUSTMENT;
      newArr[draggedElementIndex].yCoordinate =
        event.clientY - Y_DRAG_ADJUSTMENT;

      if (event.clientX - X_DRAG_ADJUSTMENT < -1) {
        newArr[draggedElementIndex].xCoordinate = 0;
      }

      if (event.clientY - Y_DRAG_ADJUSTMENT < -1) {
        newArr[draggedElementIndex].yCoordinate = 0;
      }

      if (event.clientX - X_DRAG_ADJUSTMENT > 1101) {
        newArr[draggedElementIndex].xCoordinate = 1100;
      }

      if (event.clientY - Y_DRAG_ADJUSTMENT > 571) {
        newArr[draggedElementIndex].yCoordinate = 570;
      }

      if (
        event.clientX - X_DRAG_ADJUSTMENT < -30 ||
        event.clientX - X_DRAG_ADJUSTMENT > 1130 ||
        event.clientY - Y_DRAG_ADJUSTMENT < -30 ||
        event.clientY - Y_DRAG_ADJUSTMENT > 590
      ) {
        setIsDragging(false);
      }

      setDocData(newArr);
    }
  };

  function startDragging(index) {
    setIsDragging(true);
    setDraggedElementIndex(index);
  }

  function endDragging() {
    setIsDragging(false);
    setDraggedElementIndex(null);
  }

  function updateFieldValue(index, event) {
    const newArr = [...docData];

    newArr[index].fieldValue = event.target.value;

    setDocData(newArr);
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
        <div className="flex flex-col absolute w-[150px] h-10 ">
          <FieldList
            docData={docData}
            isEditMode={isEditMode}
            updateFieldValue={updateFieldValue}
            setIsEditMode={setIsEditMode}
            isDragging={isDragging}
            startDragging={startDragging}
            endDragging={endDragging}
          />
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