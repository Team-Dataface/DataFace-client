import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { relationshipStepAtom, relationDataAtom } from "../../../atoms/atoms";

import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import DatabasesWizard from "./WizardItems/DatabasesWizard";

function StepOne() {
  const [isNotSelected, setIsNotSelected] = useState(false);

  const relationData = useAtomValue(relationDataAtom);

  const setRelationshipStep = useSetAtom(relationshipStepAtom);

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
        <DatabasesWizard />
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
