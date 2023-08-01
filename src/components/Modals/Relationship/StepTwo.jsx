/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";

import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import FieldWizard from "./WizardItems/FieldsWizard";
import Loading from "../../shared/Loading";

function StepTwo({ setRelationshipStep, relationData, setRelationData }) {
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const databases = {};

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response.data.databases;
  }

  const { data, isLoading } = useQuery(["dbs"], getDatabaseList, {
    enabled: !!userId,
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  function handleBackClick() {
    setRelationData({
      ...relationData,
      primaryFieldName: "",
      foreignFieldName: "",
    });

    setRelationshipStep("stepOne");
  }

  function handleNextClick() {
    if (!relationData.primaryFieldName || !relationData.foreignFieldName) {
      alert("Please choose fields to procceed");

      return;
    }

    setRelationData({
      ...relationData,
      foreignDb: databases.targetDb,
    });

    setRelationshipStep("stepThree");
  }

  data.forEach(database => {
    if (database._id === currentDBId) {
      databases.baseDb = database;
    }
    if (database._id === relationData.foreignDbId) {
      databases.targetDb = database;
    }
  });

  return (
    <>
      <Title>Step 2</Title>
      <Message>
        <p>
          Please choose one field from each Database that you would like to link
        </p>
      </Message>
      {databases && (
        <div className="flex justify-center items-start h-full">
          <FieldWizard
            fields={databases.baseDb.documents[0].fields}
            databaseName={databases.baseDb.name}
            relationData={relationData}
            setRelationData={setRelationData}
            databaseType="base"
          />
          <div className="flex items-center h-[160px] my-10">
            <div
              className={`border border-dashed w-40 h-0 mb-10 ${
                relationData.primaryFieldName && relationData.foreignFieldName
                  ? "border-blue"
                  : "border-white"
              }`}
            ></div>
          </div>
          <FieldWizard
            fields={databases.targetDb.documents[0].fields}
            databaseName={databases.targetDb.name}
            relationData={relationData}
            setRelationData={setRelationData}
            databaseType="target"
          />
        </div>
      )}
      <Message>
        <p>
          {`Documents within ${databases.targetDb.name} will be automatically queried and displayed`}
        </p>
        <p>{`based on the match between the ${relationData.primaryFieldName} field and the ${relationData.foreignFieldName} field`}</p>
      </Message>
      <div className="flex justify-between items-center w-full">
        <Button
          className="w-20 h-8 mt-5 rounded-md bg-dark-grey text-white hover:bg-grey"
          onClick={handleBackClick}
        >
          Back
        </Button>
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

export default StepTwo;
