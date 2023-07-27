import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import DetailViewFields from "./ContentsItems/DetailViewFields";

import CONSTANT from "../../constants/constant";

const { X_DRAG_ADJUSTMENT, Y_DRAG_ADJUSTMENT } = CONSTANT;

// import fetchData from "../../utils/axios";

function DetailView({
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  // user,
  // currentDBId,
  // documentsIds,
}) {
  const [docData, setDocData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementIndex, setDraggedElementIndex] = useState(null);

  const mockUp = [
    {
      _id: "64c0df15d1635c84c3170f41",
      elements: [
        {
          name: "내용",
          value: "첫번째 실험",
          coordinates: { x: 0, y: 0 },
          _id: "64c0df15d1635c84c3170f42",
        },
        {
          name: "만든날짜",
          value: "2023.07.26",
          coordinates: { x: 0, y: 0 },
          _id: "64c0df15d1635c84c3170f43",
        },
        {
          name: "만든시각",
          value: "17:53",
          coordinates: { x: 0, y: 0 },
          _id: "64c0df15d1635c84c3170f44",
        },
      ],
      __v: 0,
    },
    {
      _id: "64c0df15d1635c84c3170f41",
      elements: [
        {
          name: "내용",
          value: "두번째 실험",
          coordinates: { x: 0, y: 0 },
          _id: "64c0df15d1635c84c3170f42",
        },
        {
          name: "만든날짜",
          value: "2023.07.27",
          coordinates: { x: 0, y: 0 },
          _id: "64c0df15d1635c84c3170f43",
        },
        {
          name: "만든시각",
          value: "1:40",
          coordinates: { x: 0, y: 0 },
          _id: "64c0df15d1635c84c3170f44",
        },
      ],
      __v: 0,
    },
  ];

  const handleMouseMove = event => {
    if (isEditMode && isDragging) {
      const newArr = [...docData];

      newArr[draggedElementIndex].coordinates.x =
        event.clientX - X_DRAG_ADJUSTMENT;
      newArr[draggedElementIndex].coordinates.y =
        event.clientY - Y_DRAG_ADJUSTMENT;

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

  useEffect(() => {
    const arr = [];

    mockUp[currentDocIndex].elements.forEach((element, index) => {
      arr.push({
        field_id: element._id,
        name: element.name,
        coordinates: { x: 0, y: index * 40 },
        value: element.value,
      });
    });

    setDocData(arr);
  }, [currentDocIndex]);

  function updateFieldValue(index, event) {
    const newArr = [...docData];

    newArr[index].value = event.target.value;

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
          <DetailViewFields
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
  // user: PropTypes.string.isRequired,
  // currentDBId: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

export default DetailView;
