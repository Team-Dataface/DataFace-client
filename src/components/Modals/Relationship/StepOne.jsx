import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";
import DatabasesWizard from "./WizardItems/DatabasesWizard";

function StepOne({
  setRelationshipStep,
  databaseName,
  relationData,
  setRelationData,
}) {
  const [targetDatabases, setTargetDatabases] = useState([]);
  const [isNotSelected, setIsNotSelected] = useState(false);

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response.data.databases;
  }

  const { isLoading } = useQuery(["dbs"], getDatabaseList, {
    enabled: !!userId,
    onSuccess: result => {
      const filteredDbs = result.filter(
        database => database._id !== currentDBId,
      );

      setTargetDatabases(filteredDbs);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  function handleNextClick() {
    if (!relationData.foreignDbId) {
      setIsNotSelected(true);

      return;
    }

    setRelationshipStep("stepTwo");
  }

  return (
    <>
      <Title>Step 1</Title>
      <Message>
        <p>Please choose a database that you would like to link with DBNAME</p>
      </Message>
      <Content>
        <DatabasesWizard
          databaseName={databaseName}
          targetDatabases={targetDatabases}
          relationData={relationData}
          setRelationData={setRelationData}
        />
      </Content>
      {isNotSelected && (
        <p className="mt-2 text-red text-sm">
          Please choose database to proceed
        </p>
      )}
      <div className="flex justify-end items-center w-full">
        <Button
          className="w-20 h-8 mt-5 rounded-md ring-2 ring-blue text-blue hover:bg-blue hover:text-white"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default StepOne;
