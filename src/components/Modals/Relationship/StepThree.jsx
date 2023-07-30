import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";

import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import Content from "../SharedItems/Content";
import FieldWizard from "./WizardItems/FieldsWizard";

function StepThree({ setRelationshipStep, relationData, setRelationData }) {
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const targetDb = relationData.foreignDb;

  async function setRelationShip(updatedRelationData) {
    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/relationships}`,
      updatedRelationData,
    );
  }

  const { mutate: fetchRelationshipUpdate } = useMutation(setRelationShip, {
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  function handleBackClick() {
    setRelationData({
      ...relationData,
      fieldsToDisplay: [],
    });

    setRelationshipStep("stepTwo");
  }

  function handleNextClick() {
    const { foreignDb, ...updatedRelationData } = relationData;

    fetchRelationshipUpdate(updatedRelationData);

    setRelationshipStep("Done");
  }

  return (
    <>
      <Title>Step 3</Title>
      <Message>
        <p>
          {`Please choose fields from ${targetDb.name} that you would like to display on the
          portal list`}
        </p>
      </Message>
      <Content>
        <div className="flex flex-col items-center justify-evenly">
          <img src="/assets/relation_portal_preview.svg" alt="relation start" />
          <span className="text-blue">
            The auto-query result will be displayed here!
          </span>
        </div>
        <div className="flex justify-center items-center h-60 w-60">
          <FieldWizard
            fields={targetDb.documents[0].fields}
            databaseName={targetDb.name}
            relationData={relationData}
            setRelationData={setRelationData}
            status="portal"
          />
        </div>
      </Content>
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

export default StepThree;
