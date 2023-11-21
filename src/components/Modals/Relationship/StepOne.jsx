import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../../../utils/axios";

import {
  currentDBIdAtom,
  relationshipStepAtom,
  userAtom,
  relationDataAtom,
  targetDatabasesAtom,
} from "../../../atoms/atoms";

import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";
import DatabasesWizard from "./WizardItems/DatabasesWizard";

function StepOne({ databaseName }) {
  const [isNotSelected, setIsNotSelected] = useState(false);

  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const relationData = useAtomValue(relationDataAtom);

  const setRelationshipStep = useSetAtom(relationshipStepAtom);
  const setTargetDatabases = useSetAtom(targetDatabasesAtom);

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
        <DatabasesWizard databaseName={databaseName} />
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
