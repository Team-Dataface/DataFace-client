/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";

function DatabasesWizard({
  databaseName,
  targetDatabases,
  relationData,
  setRelationData,
}) {
  const [isSelected, setIsSelected] = useState("");

  function handleDatabaseClick(id) {
    setIsSelected(id);

    setRelationData({
      ...relationData,
      foreignDbId: id,
    });
  }

  return (
    <div className="flex flex-col justify-around items-center w-60 h-auto">
      <div className="flex justify-center items-center w-full p-2 border-2 rounded-lg bg-blue bg-opacity-50">
        <p>{databaseName}</p>
      </div>
      <div className="border border-blue border-dashed h-16"></div>
      <div className="flex flex-col items-center w-full max-h-[190px] border-2 rounded-lg overflow-y-scroll">
        <ul className="w-full h-auto text-center">
          {targetDatabases.map((database, index) => (
            <li
              className={`w-full py-1 border-b-2 border-grey
              ${isSelected === database._id ? "bg-yellow" : ""}
              ${index === targetDatabases.length - 1 ? "border-b-0" : ""}`}
              key={database._id}
              onClick={() => handleDatabaseClick(database._id)}
            >
              {database.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DatabasesWizard;
