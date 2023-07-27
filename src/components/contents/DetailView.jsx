/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

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

      newArr[draggedElementIndex].coordinates.x = event.clientX - 330;
      newArr[draggedElementIndex].coordinates.y = event.clientY - 177;

      setDocData(newArr);
    }
  };

  function startToggle(index) {
    setIsDragging(true);
    setDraggedElementIndex(index);
  }

  function endToggle() {
    setIsDragging(false);
    setDraggedElementIndex(null);
  }

  useEffect(() => {
    const arr = [];

    mockUp[currentDocIndex].elements.forEach((element, index) => {
      return arr.push({
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

  function renderFields(parameter) {
    return parameter.map((element, index) => {
      return (
        <div
          key={element.field_id}
          className={`absolute w-[350px]
            ${isEditMode && isDragging ? "rounded-md drop-shadow-md" : null}
          `}
          style={{
            top: `${element.coordinates.y}px`,
            left: `${element.coordinates.x}px`,
          }}
        >
          <div className="flex w-full p-2">
            <span
              className={`flex justify-end mr-3 w-[100px] select-none
              ${isEditMode ? "hover:cursor-move" : null}`}
              onMouseDown={event => startToggle(index, event)}
              onMouseUp={() => endToggle(index)}
            >
              {element.name}
            </span>
            <textarea
              className={`flex w-full h-7 mr-3 ring-2 rounded-md ring-light-grey text-center focus:outline-none ${
                isEditMode && !isDragging
                  ? "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
                  : null
              }`}
              maxLength="15"
              onDoubleClick={() => setIsEditMode(true)}
              onChange={event => updateFieldValue(index, event)}
              value={element.value}
              readOnly={!isEditMode}
            />
          </div>
        </div>
      );
    });
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
          {renderFields(docData)}
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
