import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";

import DatabaseFields from "./DatabaseFields";
import Button from "../../shared/Button";

function RelationView() {
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
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      retry: false,
      enabled: !!userId && !!currentDBId,
      onSuccess: result => {
        // will be added..
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading && currentDBId) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <DatabaseFields
        fields={data.documents[0].fields}
        databaseName={data.name}
      />
      <div>
        <h1 className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[2rem]">
          No Relation Yet.
        </h1>
        <Button
          className="w-[250px] h-[30px] rounded-md bg-black-bg text-white hover:bg-dark-grey"
          // onClick={() => {
          //   setShowCreateDBModal(true);
          // }}
        >
          Start making relation!
        </Button>
      </div>
    </div>
  );
}

export default RelationView;
