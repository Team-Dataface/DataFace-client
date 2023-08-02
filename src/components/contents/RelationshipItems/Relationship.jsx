import { useContext, useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";

import DatabaseFields from "./DatabaseFields";
import Button from "../../shared/Button";
import RelationshipModal from "../../Modals/Relationship/RelationshipModal";
import Loading from "../../shared/Loading";

function Relationship() {
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);
  const [docs, setDocs] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  async function getRelationships() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}/relationships`,
    );

    return response.data.foreignDatabases;
  }

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

  const [documentQuery, relationQuery] = useQueries({
    queries: [
      {
        queryKey: ["dbDocumentList", currentDBId],
        queryFn: getDocumentsList,
        enabled: !!userId && !!currentDBId,
        refetchOnWindowFocus: false,
        onSuccess: result => {
          setRelationships(result.relationships);
        },
      },
      {
        queryKey: ["dbRelationShips", currentDBId],
        queryFn: getRelationships,
        refetchOnWindowFocus: false,
      },
    ],
  });

  // eslint-disable-next-line consistent-return
  useMemo(() => {
    if (documentQuery.data && relationQuery.data) {
      const newDb = [documentQuery.data, ...relationQuery.data];

      setDocs(sortDatabases(newDb));
    }
  }, [documentQuery.data, relationQuery.data]);

  if (documentQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row w-full justify-center items-start">
        {docs?.map((database, index) => (
          <div className="flex flex-row mb-10" key={database._id}>
            <DatabaseFields
              key={crypto.randomUUID()}
              fields={database.documents[0].fields}
              databaseName={database.name}
              primaryDbId={currentDBId}
              databaseId={database._id}
              dbIndex={index}
              relationships={relationships}
            />
            {docs.length === 2 && index === 0 && (
              <div className="border border-dashed w-80 h-0 mt-16 border-blue"></div>
            )}
            {docs.length === 3 && (index === 0 || index === 1) && (
              <div
                className={`border border-dashed w-80 h-0 border-blue ${
                  index === 0 ? "mt-24" : "mt-16"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {docs.length === 1 && (
          <span className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[2rem]">
            No Relationship Yet.
          </span>
        )}
        <Button
          className="w-[250px] h-[30px] rounded-md bg-black-bg text-white hover:bg-dark-grey"
          onClick={() => {
            setShowRelationshipModal(true);
          }}
        >
          Create Relationship
        </Button>
        {showRelationshipModal && (
          <RelationshipModal
            closeModal={() => setShowRelationshipModal(false)}
            databaseName={documentQuery.data.name}
          />
        )}
      </div>
    </div>
  );
}

export default Relationship;
