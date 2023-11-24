/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  databasesAtom,
  currentDBIdAtom,
  relationshipStepAtom,
  relationDataAtom,
} from "../../../atoms/atoms";

import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import FieldWizard from "./WizardItems/FieldsWizard";

function StepTwo() {
  const [isNotSelected, setIsNotSelected] = useState(false);
  const [relationData, setRelationData] = useAtom(relationDataAtom);

  const currentDBId = useAtomValue(currentDBIdAtom);
  const databases = useAtomValue(databasesAtom);

  const setRelationshipStep = useSetAtom(relationshipStepAtom);

  const stepTwoSetUpData = {};

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
      setIsNotSelected(true);

      return;
    }

    setRelationData({
      ...relationData,
      foreignDb: stepTwoSetUpData.targetDb,
    });

    setRelationshipStep("stepThree");
  }

  databases.forEach(database => {
    if (database._id === currentDBId) {
      stepTwoSetUpData.baseDb = database;
    }
    if (database._id === relationData.foreignDbId) {
      stepTwoSetUpData.targetDb = database;
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
      {stepTwoSetUpData && (
        <div className="flex justify-center items-start h-full">
          <FieldWizard
            fields={stepTwoSetUpData.baseDb.documents[0].fields}
            databaseName={stepTwoSetUpData.baseDb.name}
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
            fields={stepTwoSetUpData.targetDb.documents[0].fields}
            databaseName={stepTwoSetUpData.targetDb.name}
            databaseType="target"
          />
        </div>
      )}
      <Message>
        <p>
          {`Documents within ${stepTwoSetUpData.targetDb.name} will be automatically queried and displayed`}
        </p>
        <p>{`based on the match between the ${relationData.primaryFieldName} field and the ${relationData.foreignFieldName} field`}</p>
      </Message>
      {isNotSelected && (
        <p className="mt-2 text-red text-sm">Please choose fields to proceed</p>
      )}
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
