import { useState } from "react";

import Modal from "../../shared/Modal";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Start from "./Start";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Done from "./Done";

function RelationshipModal({ closeModal, databaseName }) {
  const [relationshipStep, setRelationshipStep] = useState("start");
  const [relationData, setRelationData] = useState({
    primaryFieldId: "",
    foreignDbId: "",
    foreignFieldId: "",
    fieldsToDisplay: "",
  });

  return (
    <Modal onClick={closeModal}>
      <ContentWrapper>
        {relationshipStep === "start" && (
          <Start setRelationshipStep={setRelationshipStep} />
        )}
        {relationshipStep === "stepOne" && (
          <StepOne
            setRelationshipStep={setRelationshipStep}
            databaseName={databaseName}
            relationData={relationData}
            setRelationData={setRelationData}
          />
        )}
        {relationshipStep === "stepTwo" && (
          <StepTwo
            setRelationshipStep={setRelationshipStep}
            relationData={relationData}
            setRelationData={setRelationData}
          />
        )}
        {relationshipStep === "stepThree" && (
          <StepThree
            setRelationshipStep={setRelationshipStep}
            relationData={relationData}
            setRelationData={setRelationData}
          />
        )}
        {relationshipStep === "Done" && (
          <Done
            setRelationshipStep={setRelationshipStep}
            closeModal={closeModal}
          />
        )}
      </ContentWrapper>
    </Modal>
  );
}

RelationshipModal.propTypes = {};

export default RelationshipModal;
