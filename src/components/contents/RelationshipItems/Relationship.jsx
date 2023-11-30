import { useState, useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  currentDBIdAtom,
  showRelationshipModalAtom,
} from "../../../atoms/atoms";

import DatabaseFields from "./DatabaseFields";
import Button from "../../shared/Button";
import RelationshipModal from "../../Modals/Relationship/RelationshipModal";
import useGetSingleDatabase from "../../../apis/useGetSingleDatabase";
import useGetForeignDatabases from "../../../apis/useGetForeignDatabases";

function Relationship() {
  const [sortedDatabases, setSortedDatabases] = useState([]);
  const [showRelationshipModal, setShowRelationshipModal] = useAtom(
    showRelationshipModalAtom,
  );
  const currentDBId = useAtomValue(currentDBIdAtom);

  const { singleDatabase } = useGetSingleDatabase();
  const { foreignDatabases } = useGetForeignDatabases();

  // eslint-disable-next-line consistent-return
  function sortDatabases(array) {
    const { length } = array;
    const primaryDbIndex = array.findIndex(item => item._id === currentDBId);

    if (length === 1) {
      return array;
    }
    if (length === 2) {
      const newDatabases = primaryDbIndex === 0 ? [array[0], array[1]] : array;

      return newDatabases;
    }
    if (length === 3) {
      const newDatabases = [array[2], array[primaryDbIndex], array[1]];

      return newDatabases;
    }
  }

  // eslint-disable-next-line consistent-return
  useMemo(() => {
    if (singleDatabase && foreignDatabases) {
      const newDb = [singleDatabase, ...foreignDatabases];

      setSortedDatabases(sortDatabases(newDb));
    }
  }, [singleDatabase, foreignDatabases]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row w-full justify-center items-start">
        {sortedDatabases?.map((database, index) => (
          <div className="flex flex-row mb-10" key={database._id}>
            <DatabaseFields
              key={crypto.randomUUID()}
              singleDatabase={singleDatabase}
              fields={database.documents[0].fields}
              databaseName={database.name}
              databaseId={database._id}
              dbIndex={index}
            />
            {sortedDatabases.length === 2 && index === 0 && (
              <div className="border border-dashed w-80 h-0 mt-16 border-blue"></div>
            )}
            {sortedDatabases.length === 3 && (index === 0 || index === 1) && (
              <div
                className={`border border-dashed w-40 h-0 border-blue ${
                  index === 0 ? "mt-24" : "mt-16"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {sortedDatabases.length === 1 && (
          <span className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[2rem]">
            No Relationship Yet.
          </span>
        )}
        {sortedDatabases.length < 3 && (
          <Button
            className="w-[250px] h-[30px] rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={() => {
              setShowRelationshipModal(true);
            }}
          >
            Create Relationship
          </Button>
        )}
        {showRelationshipModal && (
          <RelationshipModal databaseName={singleDatabase.name} />
        )}
      </div>
    </div>
  );
}

export default Relationship;
